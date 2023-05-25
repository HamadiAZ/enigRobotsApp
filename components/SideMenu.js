import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { QueueListIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function SideMenu({ setHidden }) {
  const navigation = useNavigation();
  bgred = {
    backgroundColor: "#71162c",
  };

  return (
    <View
      className="flex flex-row content-stretch"
      style={{ position: "absolute", top: 35, left: 0, height: "100%" }}
    >
      <View style={{ width: "40%", backgroundColor: themeColors.bg }}>
        <View className=" space-y-2">
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/logoPng.png")}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setHidden(true);
              navigation.navigate("Welcome");
            }}
            className="py-3 rounded-xl m-3"
            style={bgred}
          >
            <Text className="font-xl font-bold text-center text-white">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="py-3  rounded-xl m-3"
            style={bgred}
          >
            <Text className="font-xl font-bold text-center text-white">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3 rounded-xl m-3"
            style={bgred}
          >
            <Text className="font-xl font-bold text-center text-white">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setHidden(true)}
        className=" p-2 rounded  bg-black"
        style={{ width: "100%", heigh: "100%", opacity: 0.6 }}
      />
    </View>
  );
}
