import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ImageGallery } from "../components/ImageGallery";
import CircularProgress from "react-native-circular-progress-indicator";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  calculatedRates = {
    fighter: 90,
    lineF: 95,
    race: 100,
  };
  return (
    <SafeAreaView className="flex flex-1" style={{ backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View className="flex-row justify-center">
          <Image source={require("../assets/images/bg.png")} style={{ width: 500, height: 200 }} />
        </View>
        <Text className="text-white font-bold text-2xl text-center mt-4 mb-0">
          welcome to our 4.0th edition !
        </Text>
        <ImageGallery />
        <Text className="text-white font-bold text-2xl text-center mt-12">
          We garantie these Prises for the Winners :
        </Text>
        <View className="flex flex-row justify-evenly mt-2">
          <Text className="text-white font-bold text-l">Line Follower</Text>
          <Text className="text-white font-bold text-l mx-7">All Terrain</Text>
          <Text className="text-white font-bold text-l">Fight Robots</Text>
        </View>
        <View className="flex flex-row justify-evenly ">
          <Text className="text-rose-700 font-bold text-2xl">1000 DT</Text>
          <Text className="text-rose-700 font-bold text-2xl mx-4">1500 DT</Text>
          <Text className="text-rose-700 font-bold text-2xl">1800 DT</Text>
        </View>
        <Text className="text-white font-bold text-2xl text-center mt-12">
          Last version (3.0) insights
        </Text>
        <View className="flex flex-row justify-evenly mt-5">
          <Text className="text-white font-bold text-l">Line Follower</Text>
          <Text className="text-white font-bold text-l mx-7">All Terrain</Text>
          <Text className="text-white font-bold text-l">Fight Robots</Text>
        </View>

        <View className="flex flex-row justify-evenly mt-1 ">
          <CircularProgress
            radius={50}
            value={calculatedRates.lineF}
            textColor="#ffffff"
            activeStrokeColor={calculatedRates.lineF >= 50 ? "#2ecc71" : themeColors.logo}
            fontSize={15}
            valueSuffix={"%"}
            inActiveStrokeColor={calculatedRates.lineF >= 50 ? "#2ecc71" : "#6e6c6b"}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={2000}
          />
          <CircularProgress
            radius={50}
            value={calculatedRates.race}
            textColor="#ffffff"
            fontSize={15}
            valueSuffix={"%"}
            activeStrokeColor={calculatedRates.race >= 50 ? "#2ecc71" : themeColors.logo}
            inActiveStrokeColor={calculatedRates.race >= 50 ? "#2ecc71" : "#6e6c6b"}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={2000}
          />
          <CircularProgress
            radius={50}
            value={calculatedRates.fighter}
            activeStrokeColor={calculatedRates.fighter >= 50 ? "#2ecc71" : themeColors.logo}
            textColor="#ffffff"
            fontSize={15}
            valueSuffix={"%"}
            inActiveStrokeColor={calculatedRates.fighter >= 50 ? "#2ecc71" : "#6e6c6b"}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={2000}
          />
        </View>
        <View className="flex flex-row justify-evenly ">
          <Text className="text-rose-700 font-bold text-xl">47 / 50</Text>
          <Text className="text-rose-700 font-bold text-xl mx-6">60 / 60</Text>
          <Text className="text-rose-700 font-bold text-xl">36 / 40</Text>
        </View>
        <Text className="text-white text-m p-3 mx-2 mb-10">
          {"     "}With a total of <Text className="font-extrabold text-l text-red-800"> 143 </Text>{" "}
          robot registered, and more than{" "}
          <Text className="font-extrabold text-l text-red-800"> 400 </Text> participants ,
          <Text className="font-extrabold text-l text-red-800"> 90 </Text> Engineers and industrial
          worker, and social Media reach of around
          <Text className="font-extrabold text-l text-red-800"> 88000 </Text> person. ENIGROBOTs it
          the perfect event for exploring robotics enthusiasm.
        </Text>
        <Text className="text-white font-bold text-l text-center mt-1">About us</Text>
        <Text className="text-white text-m p-3 mx-2" style={{ height: 250 }}>
          {"  "}ENIGROBOTs is an innovative event organized by The National Engineering School of
          Gabes with intention to promote the quality of research in the field of technology in
          Tunisia. This event is an assembly of students coming to win the challenge using their
          wits and spirits. It is a place to exchange knowledge, make memories ,form long lasting
          bonds of friendship and also have the opportunity to cooperate with teams from other
          establishments for future projects. A one day challenge full of surprises for attendants
          and prices for champions
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
