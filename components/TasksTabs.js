import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TodoList from "./TodoList";
import CompletedTasks from "./CompletedTasks";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Tab = createMaterialTopTabNavigator();

// Tab Navigator for Tasks
const TasksTabs = ({
  tasks,
  setTasks,
  navigation,
  user,
  isAuthenticated,
  getTasksBackend,
}) => {
  //const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated === false || !user) {
      navigation.navigate("Profile");
    }
  }, [isAuthenticated, user]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Active Tasks"
        children={() => (
          <TodoList
            tasks={tasks}
            setTasks={setTasks}
            user={user}
            isAuthenticated={isAuthenticated}
            getTasksBackend={getTasksBackend}
          />
        )}
      />
      <Tab.Screen
        name="Completed Tasks"
        children={() => (
          <CompletedTasks
            tasks={tasks}
            setTasks={setTasks}
            user={user}
            getTasksBackend={getTasksBackend}
          />
        )}
      />
    </Tab.Navigator>
  );
};
export default TasksTabs;
