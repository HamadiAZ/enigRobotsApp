import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { signUserOut, userAuth } from "../../components/userAuth";
import { getData } from "../../functions";
import UserRobots from "../client/UserRobots";
import { AnimatedCircularProgress } from "react-native-circular-progress";
export default function Admin() {
  const user = userAuth();
  const navigation = useNavigation();
  const [robotList, setRobotList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  robotCounter = {
    fighter: robotList.filter((a) => {
      return a.type == "fighter";
    }).length,
    lineF: robotList.filter((a) => {
      return a.type == "lineF";
    }).length,
    race: robotList.filter((a) => {
      return a.type == "race";
    }).length,
  };
  PaymentCounter = {
    fighter: robotList.filter((a) => {
      return a.payment && a.type == "fighter";
    }).length,
    lineF: robotList.filter((a) => {
      return a.payment && a.type == "lineF";
    }).length,
    race: robotList.filter((a) => {
      return a.payment && a.type == "race";
    }).length,
  };
  async function getAllData() {
    await getData("robots", setRobotList);
    await getData("payments", setPaymentList);
  }
  useEffect(() => {
    getAllData();
    const backAction = () => {
      console.log("pressed back");
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove(); // Clean up the event listener
  }, [user]);
  goals = {
    fighter: 25,
    lineF: 30,
    race: 50,
  };
  calculatedRates = {
    fighter: (100 * PaymentCounter.fighter) / robotCounter.fighter,
    lineF: (100 * PaymentCounter.lineF) / robotCounter.lineF,
    race: (100 * PaymentCounter.race) / robotCounter.race,
  };

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
          welcome admin : {user?.displayName} !
        </Text>

        <Text className="text-white font-bold text-xl text-center mb-4">Here are few insights</Text>
        <Text className="text-white font-bold text-l text-center mb-4">Goal progress</Text>
        <View className="flex flex-row justify-evenly ">
          <Text className="text-white font-bold text-l">Line Follower</Text>
          <Text className="text-white font-bold text-l mx-7">All Terrain</Text>
          <Text className="text-white font-bold text-l">Fight Robots</Text>
        </View>
        <View className="flex flex-row justify-evenly mt-10">
          <Text className="text-white font-bold text-l">
            {robotCounter.lineF} / {goals.lineF}
          </Text>
          <Text className="text-white font-bold text-l mx-7">
            {robotCounter.race} / {goals.race}
          </Text>
          <Text className="text-white font-bold text-l">
            {robotCounter.fighter} / {goals.fighter}
          </Text>
        </View>
        <View className="flex flex-row justify-evenly -mt-14">
          <AnimatedCircularProgress
            key={1}
            size={100}
            width={15}
            fill={(100 * robotCounter.lineF) / goals.lineF}
            rotation={-140}
            arcSweepAngle={280}
            duration={1000}
            tintColor={themeColors.logo}
            backgroundColor="#6e6c6b"
          />
          <AnimatedCircularProgress
            key={2}
            size={100}
            width={15}
            fill={(100 * robotCounter.race) / goals.race}
            rotation={-140}
            arcSweepAngle={280}
            duration={1000}
            tintColor={themeColors.logo}
            backgroundColor="#6e6c6b"
          />
          <AnimatedCircularProgress
            key={3}
            size={100}
            width={15}
            fill={(100 * robotCounter.fighter) / goals.fighter}
            rotation={-140}
            arcSweepAngle={280}
            duration={1000}
            tintColor={themeColors.logo}
            backgroundColor="#6e6c6b"
          />
        </View>
        <Text className="text-white font-bold text-l text-center mb-4 mt-10">Payment progress</Text>
        <View className="flex flex-row justify-evenly ">
          <Text className="text-white font-bold text-l">Line Follower</Text>
          <Text className="text-white font-bold text-l mx-7">All Terrain</Text>
          <Text className="text-white font-bold text-l">Fight Robots</Text>
        </View>
        <View className="flex flex-row justify-evenly mt-10">
          <Text className="text-white font-bold text-l">
            {PaymentCounter.lineF} / {robotCounter.lineF}
          </Text>
          <Text className="text-white font-bold text-l mx-8">
            {PaymentCounter.race} / {robotCounter.race}
          </Text>
          <Text className="text-white font-bold text-l">
            {PaymentCounter.fighter} / {robotCounter.fighter}
          </Text>
        </View>
        <View className="flex flex-row justify-evenly -mt-14">
          <AnimatedCircularProgress
            key={4}
            size={100}
            width={15}
            fill={calculatedRates.lineF}
            rotation={-140}
            arcSweepAngle={280}
            tintColor={themeColors.logo}
            duration={1000}
            backgroundColor="#6e6c6b"
          />
          <AnimatedCircularProgress
            key={5}
            size={100}
            width={15}
            fill={calculatedRates.race}
            rotation={-140}
            arcSweepAngle={280}
            tintColor={themeColors.logo}
            duration={1000}
            backgroundColor="#6e6c6b"
          />
          <AnimatedCircularProgress
            key={6}
            size={100}
            width={15}
            duration={1000}
            fill={calculatedRates.fighter}
            rotation={-140}
            arcSweepAngle={280}
            tintColor={themeColors.logo}
            backgroundColor="#6e6c6b"
          />
        </View>
        <Text className="text-white text-l font-bold p-3 mx-3 my-4">
          Check your inscriptions below :
        </Text>

        <ScrollView>
          {robotList.map((a) => {
            robotId = a.id;
            paymentInfo = paymentList.filter((item) => {
              return item?.robotId == robotId ? true : false;
            });
            return (
              <UserRobots
                key={robotId}
                data={a}
                paymentInfo={paymentInfo[0]}
                navigationEvent="RobotCheck"
              />
            );
          })}
        </ScrollView>
        <View className="space-y-4 my-10">
          <TouchableOpacity
            onPress={() => {
              signUserOut();
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
