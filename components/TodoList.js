import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import TodoItem from "./TodoItem";
import axios from "axios";
import { addTaskBackend } from "../utilities/database-calls";

export default function TodoList({
  tasks,
  setTasks,
  user,
  isAuthenticated,
  getTasksBackend,
}) {
  const [text, setText] = useState("");

  const addTask = async () => {
    try {
      const newTaskAdded = await addTaskBackend(user, text); // Await the result of the async function
      if (!newTaskAdded) return;
      getTasksBackend();

      setText(""); // Reset the text input
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "flex-end" }}>
      <View style={{ flex: 1 }}>
        {tasks.activeTasks.length > 0 ? (
          tasks.activeTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              user={user}
              getTasksBackend={getTasksBackend}
            />
          ))
        ) : (
          <Text>No active tasks</Text>
        )}
      </View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New Task"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button title="Add" disabled={text.length === 0} onPress={addTask} />
    </View>
  );
}
