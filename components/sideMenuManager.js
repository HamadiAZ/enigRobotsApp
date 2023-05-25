import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { QueueListIcon } from "react-native-heroicons/solid";
import SideMenu from "./SideMenu";
export default function sideMenuManager() {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={{ zIndex: 100, position: "absolute", width: "100%", height: "100%", top: -35 }}>
      {hidden == false && <SideMenu setHidden={setHidden} />}
      {hidden == true && (
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => setHidden(false)}
            className="bg-white p-2 rounded ml-2 mt-12"
          >
            <QueueListIcon size="24" color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
