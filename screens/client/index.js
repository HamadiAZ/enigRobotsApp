import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { signUserOut, userAuth } from "../../components/userAuth";
import RobotGallery from "../../components/RobotGallery";
import { getData } from "../../functions";
import UserRobots from "./UserRobots";

export default function Index({ route }) {
  let updateData = undefined;
  if (route != undefined) updateData = route.params;
  const user = userAuth();
  const navigation = useNavigation();
  const [robotList, setRobotList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);

  async function getCurrentUserRobotList() {
    if (user !== undefined) {
      await getData("robots", setRobotList, { base: "uid", value: user.uid });
      await getData("payments", setPaymentList, { base: "uid", value: user.uid });
    }
  }

  useEffect(() => {
    getCurrentUserRobotList();
    // const backAction = () => {
    //   console.log("blocked back");
    //   return true;
    // };
    // backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    // return () => backHandler.remove(); // Clean up the event listener
  }, [user]);

  return (
    <SafeAreaView className="flex flex-1" style={{ backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/bg.png")}
            style={{ width: 500, height: 200 }}
          />
        </View>
        <Text className="text-white font-bold text-2xl text-center my-7">
          welcome {user?.displayName} !
        </Text>
        <Text className="text-white font-bold text-l text-center mb-4">
          register your robot now
        </Text>

        {robots.map((a, index) => {
          return <RobotGallery key={index} data={a} />;
        })}
        <Text className="text-white text-l font-bold p-3 mx-3 my-4">
          {robotList.length > 0
            ? "Check your inscriptions below :"
            : "You have no subscriptions, please choose robot category from above"}
        </Text>
        <ScrollView>
          {robotList?.map((a, index) => {
            robotId = a.id;
            paymentInfo = paymentList.filter((item) => {
              return item?.robotId == robotId ? true : false;
            });
            if (a != undefined)
              return <UserRobots key={index} data={a} paymentInfo={paymentInfo[0]} />;
          })}
        </ScrollView>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => {
              signUserOut();
              backHandler?.remove();
              navigation.navigate("Welcome");
            }}
            className="py-3  mx-7 rounded-xl"
            style={{ backgroundColor: themeColors.logo }}
          >
            <Text className="text-xl font-bold text-center text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
