import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./components/Home";

//I had to strip App.js and put it all into Home to get Auth working from a top-level.

export default function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Home />
    </Auth0Provider>
  );
}
