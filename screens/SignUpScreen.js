import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingComponent from "../components/keyboardWrap";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth();

const imageLink =
  "https://media.licdn.com/dms/image/C4E03AQHADVRP7OML1w/profile-displayphoto-shrink_800_800/0/1642982063201?e=2147483647&v=beta&t=s_85jvwNiLw6RWT8TE8SvQtbEo_6znuNsJg7bUjVzpI";

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("exemple@Ex.com");
  const [password, setPassword] = useState("password");
  const [name, setName] = useState("name");
  const [validationMessage, setValidationMessage] = useState("");
  async function createAccount() {
    email === "" || password === "" ? setValidationMessage("required filled missing") : "";
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageLink,
      });
      navigation.navigate("Login");
    } catch (error) {
      setValidationMessage(error.message);
    } finally {
      setLoading(false);
    }
  }
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingComponent>
      <View className="flex-1 bg-white " style={{ backgroundColor: themeColors.bg }}>
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/bg.png")}
              style={{ width: 500, height: 200 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={name}
              placeholder="Enter Name"
              onChangeText={(text) => setName(text)}
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              placeholder="Enter Email"
              onChangeText={(text) => setEmail(text)}
            />
            <Text className="text-gray-700 ml-4">Password</Text>

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value={password}
              textContentType="password"
              placeholder="Enter Password"
              onChangeText={(text) => setPassword(text)}
            />
            <Text className="text-gray-500 font-semibold">{validationMessage}</Text>
            {loading ? (
              <ActivityIndicator className="py-3 bg-blue-950 rounded-xl" />
            ) : (
              <TouchableOpacity
                className="py-3 bg-blue-950 rounded-xl"
                onPress={() => createAccount()}
              >
                <Text className="font-xl font-bold text-center text-white">Sign Up</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-bold text-blue-400"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingComponent>
  );
}
