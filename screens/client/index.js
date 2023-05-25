import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  //const { user } = userAuth();
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex flex-1" style={{ backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/bg.png")}
            style={{ width: 500, height: 200 }}
          />
        </View>
        <Text className="text-white font-bold text-2xl text-center my-7">welcome USER !!!!</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
