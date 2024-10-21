import { useAuth0 } from "@auth0/auth0-react";
import { Button, View, Text } from "react-native";

export default function Profile({
  loginWithRedirect,
  logout,
  isAuthenticated,
  user,
}) {
  // const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  if (!isAuthenticated) {
    return (
      <View>
        <View>
          <Text>Log in to view/add items on your To Do list.</Text>
        </View>
        <Button title="Log in" onPress={loginWithRedirect} />
      </View>
    );
  }

  return (
    <View>
      <p>{user.name}</p>
      <Button
        title="Log out"
        onPress={() => logout({ returnTo: window.location.origin })}
      />
    </View>
  );
}
