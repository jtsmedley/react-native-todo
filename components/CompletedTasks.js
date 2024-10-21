import React from "react";
import { View, Text } from "react-native";
import TodoItem from "./TodoItem";

export default function CompletedTasks({ tasks, user, getTasksBackend }) {
  // Filter completed tasks
  // const completedTasks = tasks.filter((task) => task.completedAt !== null);

  return (
    <View style={{ padding: 16 }}>
      {tasks.completedTasks.length > 0 ? (
        tasks.completedTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            user={user}
            getTasksBackend={getTasksBackend}
          />
        ))
      ) : (
        <Text>No completed tasks</Text>
      )}
    </View>
  );
}
