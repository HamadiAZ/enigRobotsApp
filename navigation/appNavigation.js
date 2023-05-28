import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RobotRegistration from "../screens/client/RobotRegistration";
import SignUpScreen from "../screens/SignUpScreen";
import Client from "../screens/client";
import RobotPayment from "../screens/client/RobotPayment";
const Stack = createNativeStackNavigator();
//<Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Client" options={{ headerShown: false }} component={Client} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Client} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen
          name="RobotReg"
          options={{ headerShown: false }}
          component={RobotRegistration}
        />
        <Stack.Screen
          name="RobotPayment"
          options={{ headerShown: false }}
          component={RobotPayment}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
