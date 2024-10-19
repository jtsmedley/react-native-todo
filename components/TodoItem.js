import React from "react";
import { View, Text, CheckBox, Button } from "react-native";

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View>
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleCompleted(task.id)}
      />
      <Text
        style={{ textDecorationLine: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </Text>
      <Button
        style={{ $$css: true, _: 'w-1/2' }}
        title="X"
        onPress={() => deleteTask(task.id)}
      />
    </View>
  );
}
