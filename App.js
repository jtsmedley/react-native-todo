import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import About from "./components/About";
import TasksTabs from "./components/TasksTabs";

const Stack = createStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      completed: true,
      createdAt: 1629360060142,
      completedAt: 1639360060142,
    },
    {
      id: 2,
      text: "Meeting at School",
      completed: false,
      createdAt: 1659360060142,
      completedAt: 0,
    },
  ]);

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, completedAt: Date.now() }
          : task
      )
    );
  }

  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Tasks"
          children={() => (
            <TasksTabs
              tasks={tasks}
              setTasks={setTasks}
              toggleCompleted={toggleCompleted}
              deleteTask={deleteTask}
            />
          )}
        />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
