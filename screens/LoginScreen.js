import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userAuth } from "../components/userAuth";

export default function LoginScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  async function login() {
    if (email === "" || password === "") {
      setValidationMessage("required fields missing");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      user = getAuth().currentUser;

      setTimeout(() => {
        if (user?.photoURL == "admin") navigation.navigate("Admin");
        else navigation.navigate("Client");
      }, 2000);
    } catch (error) {
      setValidationMessage(error.message);
    }
  }
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white p-2 rounded ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require("../assets/images/bg.png")} style={{ width: 500, height: 200 }} />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            placeholder="Enter Email"
            onChangeText={(text) => setEmail(text)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <Text className="text-gray-700">{validationMessage}</Text>

          <TouchableOpacity className="py-3 bg-blue-950 rounded-xl" onPress={login}>
            <Text className="text-xl font-bold text-center text-white">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-bold text-blue-400"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
