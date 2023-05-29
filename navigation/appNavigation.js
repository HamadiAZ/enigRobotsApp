import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RobotRegistration from "../screens/client/RobotRegistration";
import SignUpScreen from "../screens/SignUpScreen";
import Client from "../screens/client";
import RobotPayment from "../screens/client/RobotPayment";
import Admin from "../screens/admin/Admin";
import RobotCheck from "../screens/admin/RobotCheck";
const Stack = createNativeStackNavigator();
//
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Client" options={{ headerShown: false }} component={Client} />
        <Stack.Screen name="Admin" options={{ headerShown: false }} component={Admin} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="RobotCheck" options={{ headerShown: false }} component={RobotCheck} />
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
