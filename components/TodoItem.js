import React from "react";
import { View, Text, Button, CheckBox } from "react-native";
import { StyleSheet } from "react-native";

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View style={styles.vertical}>
      <View style={styles.container}>
        <View
          style={{
            textDecorationLine: task.completed ? "line-through" : "none",
          }}
        >
          <Text>{task.text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={task.completed ? "←" : "✓"}
            onPress={() => toggleCompleted(task.id)}
            color={task.completed ? "" : "green"}
          />

          <Button
            title="x"
            onPress={() => deleteTask(task.id)}
            color="red" // Set the button color to red
          />
        </View>
      </View>
      <Text style={styles.createdAtText}>
        Created: {new Date(task.createdAt).toLocaleString()}
      </Text>
      {task.completed && (
        <Text style={styles.createdAtText}>
          Completed: {new Date(task.completedAt).toLocaleString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: "column",
    padding: 10, // Add some padding for the whole item
    borderBottomWidth: 1, // Optional: to separate tasks
    borderBottomColor: "#ccc", // Optional: light gray color for the border
  },
  container: {
    flexDirection: "row", // Align children in a row
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Space items evenly
  },
  buttonContainer: {
    flexDirection: "row", // Align buttons in a row
    justifyContent: "flex-end", // Align buttons to the right
  },
  createdAtText: {
    marginTop: 5, // Add some space above the created date
    fontSize: 12, // Adjust font size if necessary
    color: "#555", // Optional: change color for better visibility
  },
});
