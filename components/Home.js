import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import About from "./About";
import TasksTabs from "./TasksTabs";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Text } from "react-native";
import { getTasks } from "../utilities/database-calls";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [loading, setLoading] = useState(true);

  const getTasksBackend = async () => {
    const result = await getTasks(user);
    console.log({ result });
    setTasks(result);
  };

  useEffect(() => {
    const upsertUser = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/user", {
          auth0Id: user.sub,
          name: user.name,
        });
        console.log("User upserted:", response.data);
      } catch (error) {
        console.error("Error upserting user:", error);
      }
    };

    if (isAuthenticated && user) {
      upsertUser();
      getTasksBackend();
    }

    setLoading(false);
  }, [isAuthenticated, user]);

  const [tasks, setTasks] = useState({ activeTasks: [], completedTasks: [] });

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Simulate some asynchronous task (e.g., loading fonts, fetching data)
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Example: wait for 2 seconds
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen after the task is complete
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Tasks" options={{ headerShown: true }}>
          {({ navigation }) => (
            <TasksTabs
              tasks={tasks}
              setTasks={setTasks}
              navigation={navigation}
              user={user}
              isAuthenticated={isAuthenticated}
              getTasksBackend={getTasksBackend}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Profile">
          {({}) => (
            <Profile
              loginWithRedirect={loginWithRedirect}
              logout={logout}
              isAuthenticated={isAuthenticated}
              user={user}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      {isAuthenticated ? <Text>{user.name}</Text> : <Text>not auth</Text>}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
