import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { signUserOut, userAuth } from "../../components/userAuth";
import { getData } from "../../functions";
import UserRobots from "../client/UserRobots";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CircularProgress from "react-native-circular-progress-indicator";

export default function Admin() {
  const user = userAuth();
  const [viewList, setViewList] = useState(false);
  const [viewPaymentList, setViewPaymentList] = useState(false);
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

  insights = {
    robotsNumber: robotCounter.fighter + robotCounter.lineF + robotCounter.race,
    registeredUser: new Set(
      robotList.map((item) => {
        return item.uid;
      })
    ).size,
    registeredUniversities: new Set(
      robotList.map((item) => {
        return item.university;
      })
    ).size,
    registeredUniClubs: new Set(
      robotList.map((item) => {
        return item.university;
      })
    ).size,
  };
  //console.log(insights);
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

  useEffect(() => {
    getAllData();
    const backAction = () => {
      console.log("pressed back");
      return true;
    };
    if (!!calculatedRates.fighter || calculatedRates.fighter === 0) setViewPaymentList(true);
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove(); // Clean up the event listener
  }, [user, calculatedRates.fighter]);

  return (
    <SafeAreaView className="flex flex-1" style={{ backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/bg.png")}
            style={{ width: 500, height: 200 }}
          />
        </View>
        <Text className="text-rose-800 font-bold text-2xl text-center my-7">
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
        {viewPaymentList && (
          <View>
            <Text className="text-white font-bold text-l text-center  mt-10 mb-3">
              Payment progress
            </Text>
            <View className="flex flex-row justify-evenly ">
              <Text className="text-white font-bold text-l">Line Follower</Text>
              <Text className="text-white font-bold text-l mx-8">All Terrain</Text>
              <Text className="text-white font-bold text-l">Fight Robots</Text>
            </View>
            <View className="flex flex-row justify-evenly mt-3 -mb-9">
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
            <View className="flex flex-row justify-evenly mt-10">
              <Text className="text-white font-bold text-l">
                {PaymentCounter.lineF} / {robotCounter.lineF}
              </Text>
              <Text className="text-white font-bold text-l mx-10">
                {PaymentCounter.race} / {robotCounter.race}
              </Text>
              <Text className="text-white font-bold text-l">
                {PaymentCounter.fighter} / {robotCounter.fighter}
              </Text>
            </View>
          </View>
        )}
        <View className="space-y-4 mt-10">
          <Text className="text-sm font-bold text-center text-white mb-7">
            As a summary ,{" "}
            <Text className="font-extrabold text-xl text-red-800"> {insights.registeredUser}</Text>{" "}
            users have registered the total of{" "}
            <Text className="font-extrabold text-xl text-red-800">{insights.robotsNumber}</Text>{" "}
            robots from{" "}
            <Text className="font-extrabold text-xl text-red-800">
              {" "}
              {insights.registeredUniClubs}
            </Text>{" "}
            clubs and
            <Text className="font-extrabold text-xl text-red-800">
              {" "}
              {insights.registeredUniversities}
            </Text>{" "}
            universities
          </Text>
          <TouchableOpacity
            onPress={() => {
              setViewList(!viewList);
            }}
            className="py-3  mx-7 rounded-xl"
            style={{ backgroundColor: themeColors.logo }}
          >
            <Text className="text-xl font-bold text-center text-white">
              {!viewList && "View list of registered robots"}
              {viewList && "Hide list of registered robots"}
            </Text>
          </TouchableOpacity>
        </View>

        {viewList && (
          <ScrollView>
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
          </ScrollView>
        )}
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
