import axios from "axios";

export const getTasks = async (user) => {
  try {
    const getTasksResponse = await axios.get(
      `http://localhost:5000/api/getTasks`,
      {
        params: {
          auth0Id: user.sub, // Send auth0Id as a query parameter
        },
      }
    );
    const completedTasks = getTasksResponse.data.filter(
      (task) => task.completedAt !== null
    );
    const activeTasks = getTasksResponse.data.filter(
      (task) => task.completedAt === null
    );
    return { completedTasks, activeTasks };
  } catch (error) {
    console.error("Error fetching tasks", error);
    return [];
  }
};

export const addTaskBackend = async (user, task) => {
  try {
    const addTaskBackendResponse = await axios.post(
      "http://localhost:5000/api/add",
      {
        auth0Id: user.sub,
        task,
      }
    );
    console.log("added task", addTaskBackendResponse.data);
    return true;
  } catch (error) {
    console.error("Error adding task", error);
    return false;
  }
};

export const deleteTask = async (user, taskId) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/api/deleteTask",
      {
        data: { taskId, auth0Id: user.sub }, // Pass taskId and auth0Id in the body
      }
    );

    if (response.status === 200) {
      console.log("Task deleted successfully");
      // Optionally, refresh the task list or update the UI
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const toggleCompleted = async (user, taskId) => {
  try {
    console.log(user);
    const response = await axios.put(
      "http://localhost:5000/api/toggleCompleted",
      {
        taskId,
        auth0Id: user.sub, // Send both taskId and auth0Id
      }
    );

    if (response.status === 200) {
      console.log("Task completion status updated", response.data.task);
      // Optionally refresh the task list or update the UI
    }
  } catch (error) {
    console.error("Error toggling task completion:", error);
  }
};
