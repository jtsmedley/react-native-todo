const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Enable CORS for port 8081
app.use(cors({ origin: "http://localhost:8081" })); // Allow only React Native dev origin

// API to handle user upsertion
app.post("/api/user", async (req, res) => {
  const { auth0Id, name } = req.body;
  console.log({ auth0Id, name });

  try {
    const user = await prisma.user.upsert({
      where: { auth0Id },
      update: {},
      create: {
        auth0Id,
        name,
      },
    });
    res.json(user);
  } catch (error) {
    console.error("Error upserting user:", error);
    res.status(500).json({ error: "Failed to upsert user" });
  }
});

app.delete("/api/deleteTask", async (req, res) => {
  try {
    const { taskId, auth0Id } = req.body; // Get taskId and auth0Id from the request body

    // Find the user based on auth0Id to ensure task belongs to the user
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        todoItems: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure the task belongs to the user
    const task = user.todoItems.find((item) => item.id === taskId);
    if (!task) {
      return res
        .status(403)
        .json({ error: "Task does not belong to the user" });
    }

    // Delete the task
    await prisma.todoItem.delete({
      where: { id: taskId },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/toggleCompleted", async (req, res) => {
  try {
    const { taskId, auth0Id } = req.body; // Get taskId and auth0Id from the request body

    // Find the user based on auth0Id to ensure task belongs to the user
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        todoItems: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the task and ensure it belongs to the user
    const task = user.todoItems.find((item) => item.id === taskId);
    if (!task) {
      return res
        .status(403)
        .json({ error: "Task does not belong to the user" });
    }

    // Toggle the 'completedAt' field
    const updatedTask = await prisma.todoItem.update({
      where: { id: taskId },
      data: {
        completedAt: task.completedAt ? null : new Date(), // If completedAt is already set, set it to null, otherwise set it to current time
      },
    });

    res.json({ message: "Task completion status updated", task: updatedTask });
  } catch (error) {
    console.error("Error toggling task completion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getTasks", async (req, res) => {
  console.log("api/getTasks hit");
  try {
    const { auth0Id } = req.query; // Get auth0Id from the request body

    // Fetch the user by their auth0Id
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        todoItems: true, // Include their associated TodoItems (tasks)
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send back the list of tasks associated with the user
    res.json(user.todoItems);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
});

app.post("/api/add", async (req, res) => {
  const { auth0Id, task } = req.body;

  try {
    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { auth0Id: auth0Id },
    });

    if (!user) {
      res.status(500).json({ error: "user not found" });
      return;
    }

    console.log("user found");

    console.log(task);

    // Add the task associated with the user
    const newTask = await prisma.todoItem.create({
      data: {
        text: task, // Assuming the task is just a string title
        user: {
          connect: { id: user.id }, // Connect the task with the user
        },
      },
    });

    res.json(newTask); // Send the new task as the response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding task");
    return;
  }
  console.log("post");
  console.log(task);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
