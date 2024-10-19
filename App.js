import { Text, View } from "react-native-web";
import TodoList from "./components/TodoList";
import "./global.css"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import About from "./components/About";
import Navbar from "./components/Navbar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Todo List" component={TodoList} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
