import { View, Text, Image, TouchableOpacity, ImageBackground, BackHandler } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
const RobotGallery = ({ data }) => {
  const navigation = useNavigation();
  images = {
    fighter: require("../assets/images/death.png"),
    lineF: require("../assets/images/lineF.jpg"),
    race: require("../assets/images/race.jpg"),
  };
  image = images[data.type];
  return (
    <View
      className="flex m-2 border-2 border-rose-900  "
      style={{ backgroundColor: themeColors.bg, height: 100, width: "96%", overflow: "hidden" }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("RobotReg", { data })}
        style={{ height: 200, width: "100%" }}
      >
        <ImageBackground source={image} style={{ height: 200, width: "100%" }}>
          <Text className="font-bold text-l ml-3 mt-2 text-slate-300">{data.name}</Text>
          <Text className="font-bold text-l ml-3 mt-2 text-white">{data.price} DT</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default RobotGallery;
