import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TodoList from "./TodoList";
import CompletedTasks from "./CompletedTasks";

const Tab = createMaterialTopTabNavigator();

// Tab Navigator for Tasks
const TasksTabs = ({ tasks, setTasks, toggleCompleted, deleteTask }) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Active Tasks"
      children={() => (
        <TodoList
          tasks={tasks}
          setTasks={setTasks}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
        />
      )}
    />
    <Tab.Screen
      name="Completed Tasks"
      children={() => (
        <CompletedTasks
          tasks={tasks}
          setTasks={setTasks}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
        />
      )}
    />
  </Tab.Navigator>
);

export default TasksTabs;
