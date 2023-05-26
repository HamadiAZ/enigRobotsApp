import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { addToDb, getData, getDataById, updateData } from "../functions";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState(undefined);

  console.log("itemmms : ", items);
  useEffect(() => {
    getDataById("testpath", 123, setItems);
  }, []);

  return (
    <SafeAreaView className="flex flex-1" style={{ backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View className="flex-row justify-center">
          <Image source={require("../assets/images/bg.png")} style={{ width: 500, height: 200 }} />
        </View>
        <Text className="text-white font-bold text-2xl text-center my-7">
          welcome to our 4.0th edition !
        </Text>
        <Text className="text-white font-bold text-l text-center ">About Us</Text>
        <Text className="text-white text-m p-3" style={{ height: 300 }}>
          ENIGROBOTs is an innovative event organized by The National Engineering School of Gabes
          with intention to promote the quality of research in the field of technology in Tunisia.
          This event is an assembly of students coming to win the challenge using their wits and
          spirits. It is a place to exchange knowledge, make memories ,form long lasting bonds of
          friendship and also have the opportunity to cooperate with teams from other establishments
          for future projects. A one day challenge full of surprises for attendants and prices for
          champions
        </Text>
        <Text className="text-white text-m p-3" style={{ height: 300 }}>
          ENIGROBOTs is an innovative event organized by The National Engineering School of Gabes
          with intention to promote the quality of research in the field of technology in Tunisia.
          This event is an assembly of students coming to win the challenge using their wits and
          spirits. It is a place to exchange knowledge, make memories ,form long lasting bonds of
          friendship and also have the opportunity to cooperate with teams from other establishments
          for future projects. A one day challenge full of surprises for attendants and prices for
          champions
        </Text>
        <Text className="text-white text-m p-3" style={{ height: 300 }}>
          ENIGROBOTs is an innovative event organized by The National Engineering School of Gabes
          with intention to promote the quality of research in the field of technology in Tunisia.
          This event is an assembly of students coming to win the challenge using their wits and
          spirits. It is a place to exchange knowledge, make memories ,form long lasting bonds of
          friendship and also have the opportunity to cooperate with teams from other establishments
          for future projects. A one day challenge full of surprises for attendants and prices for
          champions
        </Text>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3  mx-7 rounded-xl"
            style={{ backgroundColor: themeColors.logo }}
          >
            <Text className="text-xl font-bold text-center text-white">Sign Up</Text>
          </TouchableOpacity>
          <View className="flex-row justify-center my-5">
            <Text className="text-white font-bold">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-bold ml-2" style={{ color: themeColors.logo }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
