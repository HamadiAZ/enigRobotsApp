import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ScrollViewBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { signUserOut, userAuth } from "../../components/userAuth";
import RobotGallery from "../../components/RobotGallery";
import { getData } from "../../functions";
import UserRobots from "./UserRobots";
export default function Index() {
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
    const backAction = () => {
      console.log("pressed back");
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove(); // Clean up the event listener
  }, [user]);
  console.log(robotList);
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

        {robots.map((a) => {
          return <RobotGallery key={a.type} data={a} />;
        })}
        <Text className="text-white text-l font-bold p-3 mx-3 my-4">
          Check your inscriptions below :
        </Text>
        <ScrollView>
          {robotList.map((a) => {
            uid = a.uid;
            paymentInfo = paymentList.filter((item) => {
              item?.uid == uid ? true : false;
            });
            return <UserRobots key={a.type} data={a} paymentInfo={paymentInfo} />;
          })}
        </ScrollView>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => {
              signUserOut();
              navigation.navigate("Home");
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
