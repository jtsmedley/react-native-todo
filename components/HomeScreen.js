import React from "react";
import { Button, View, Text } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to the Todo List"
        onPress={() => navigation.navigate("Tasks")}
      />
      <Button title="About" onPress={() => navigation.navigate("About")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}

export default HomeScreen;
