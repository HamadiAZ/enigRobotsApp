import { View, Text, Image, TouchableOpacity, ImageBackground, BackHandler } from "react-native";
import React from "react";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
export default function UserRobots({ data, paymentInfo, getCurrentUserRobotList }) {
  const navigation = useNavigation();
  images = {
    fighter: require("../../assets/images/death.png"),
    lineF: require("../../assets/images/lineF.jpg"),
    race: require("../../assets/images/race.jpg"),
  };
  image = images[data.type];
  //console.log(data);
  classBorderColor = "flex m-2 border-2 " + (data.payment ? "border-green-800" : "border-rose-900");
  classTextColor =
    "font-bold text-xl ml-3 mt-2 " + (data.payment ? "text-green-800" : "text-rose-900");
  return (
    <View
      className={classBorderColor}
      style={{ backgroundColor: themeColors.bg, height: 100, width: "96%", overflow: "hidden" }}
    >
      <TouchableOpacity
        onPress={() => {
          !data.payment &&
            navigation.navigate("RobotPayment", { data, paymentInfo, getCurrentUserRobotList });
        }}
        style={{ height: 200, width: "100%" }}
      >
        <ImageBackground source={image} style={{ height: 200, width: "100%" }}>
          <Text className="font-bold text-l ml-3 mt-2 text-slate-300">{data.Rname}</Text>
          <Text className=" text-l ml-3 mt-2 text-white">{data.type}</Text>
          <View className="flex flex-row items-baseline">
            <Text className="font-bold text-l ml-3 mt-2 text-white">{data.price} DT </Text>
            <Text className={classTextColor}>{data.payment ? "[payed]" : "[not payed]"}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
