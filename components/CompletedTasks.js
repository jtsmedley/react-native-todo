import React from "react";
import { View, Text } from "react-native";
import TodoItem from "./TodoItem";

export default function CompletedTasks({ tasks, toggleCompleted, setTasks }) {
  // Filter completed tasks
  const completedTasks = tasks.filter((task) => task.completed);
  // const completedTasks = [{ id: 0, toggleCompleted: () => {} }];
  console.log({ tasks });

  return (
    <View style={{ padding: 16 }}>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            setTasks={setTasks}
            toggleCompleted={toggleCompleted}
          />
        ))
      ) : (
        <Text>No completed tasks</Text>
      )}
    </View>
  );
}
