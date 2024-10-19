import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList({
  tasks,
  setTasks,
  toggleCompleted,
  deleteTask,
}) {
  const [text, setText] = useState("");

  // Function to Add Task
  function addTask() {
    const currentTime = Date.now();
    console.log(currentTime);
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: currentTime,
      completedAt: 0,
    };
    setTasks([...tasks, newTask]);
    setText("");
  }

  // Filter active tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "flex-end" }}>
      <View style={{ flex: 1 }}>
        {activeTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
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
