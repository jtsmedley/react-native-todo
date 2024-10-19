import React from "react";
import { Button, View, Text } from "react-native";

function About({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        This REACT Native application was built for the October OKLATHON
      </Text>
      <Button
        title="Go to the Todo List"
        onPress={() => navigation.navigate("Tasks")}
      />
      <Button title="Return Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default About;
