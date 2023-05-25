import { View } from "react-native";
import React, { useState } from "react";
import { Appbar, Drawer } from "react-native-paper";

export default function MyAppBar({ navigation, title }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerClick = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <View>
      <Appbar.Header style={{ margin: 0, padding: 0, height: 20, top: -10 }}>
        <Appbar.Action
          style={{ margin: 0, padding: 0, backgroundColor: "red" }}
          icon="menu"
          onPress={() => handleDrawerClick()}
        />
        <Appbar.Content style={{ margin: 0, padding: 0, backgroundColor: "red" }} title={"test"} />
      </Appbar.Header>
      {isDrawerOpen && (
        <Drawer.Section>
          <Drawer.Item label="Item 1" onPress={() => {}} />
          <Drawer.Item label="Item 2" onPress={() => {}} />
          <Drawer.Item label="Item 3" onPress={() => {}} />
        </Drawer.Section>
      )}
    </View>
  );
}
