import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { themeColors } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingComponent from "../../components/keyboardWrap";

import robots from "../../constants";
import { addToDb } from "../../functions";
import { userAuth } from "../../components/userAuth";

const imageLink =
  "https://media.licdn.com/dms/image/C4E03AQHADVRP7OML1w/profile-displayphoto-shrink_800_800/0/1642982063201?e=2147483647&v=beta&t=s_85jvwNiLw6RWT8TE8SvQtbEo_6znuNsJg7bUjVzpI";

export default function RobotRegistration({ route }) {
  const user = userAuth();
  const { data } = route.params;
  //console.log(data);
  const [loading, setLoading] = useState(false);
  const [Rname, setRname] = useState("");
  const [type, setType] = useState(data.type);
  const [price, setPrice] = useState(data.price);
  const [university, setUniversity] = useState("");
  const [club, setClub] = useState("");
  const [email, setEmail] = useState("");
  const [chef, setChef] = useState("");
  const [phone, setPhone] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  async function registerRobot() {
    condition =
      Rname === "" || club === "" || email === "" || chef === "" || email === "" || phone === "";

    condition ? setValidationMessage("required filled missing") : "";
    if (!condition) {
      try {
        robotData = {
          id: phone + (Math.floor(Math.random() * 1000) + 1),
          Rname,
          price,
          type,
          university,
          club,
          email,
          chef,
          phone,
          member1,
          member2,
          payment: false,
          uid: user.uid,
        };
        await addToDb("robots", robotData);
        navigation.navigate("Client");
      } catch (error) {
        setValidationMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
  }
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingComponent>
      <ScrollView className="flex-1 bg-white " style={{ backgroundColor: themeColors.bg }}>
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white p-2 ml-4">
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image
              source={require("../../assets/images/bg.png")}
              style={{ width: 500, height: 200 }}
            />
          </View>
        </SafeAreaView>
        <ScrollView
          className="flex-1 bg-white px-8 pt-8 mt-1"
          style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        >
          <ScrollView className="form space-y-2">
            <Text className="text-gray-700 ml-4">Robot name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={Rname}
              placeholder="Enter Name"
              onChangeText={(text) => setRname(text)}
            />
            <Text className="text-gray-700 ml-4">Robot type</Text>
            <Picker
              selectedValue={type}
              style={{ height: 50, width: 320 }}
              onValueChange={(itemValue, itemIndex) => {
                setType(itemValue);
                setPrice(robots[itemIndex].price);
              }}
            >
              {robots.map((robots) => {
                return <Picker.Item key={robots.name} label={robots.name} value={robots.type} />;
              })}
            </Picker>
            <View className="flex flex-row">
              <Text className="text-gray-700 ml-4">Price :</Text>
              <Text className="text-red-600 ml-4 font-extrabold">{price}</Text>
            </View>
            <Text className="text-gray-700 ml-4">Team leader name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={chef}
              placeholder="Enter Name"
              onChangeText={(text) => setChef(text)}
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              placeholder="Enter Email"
              onChangeText={(text) => setEmail(text)}
            />
            <Text className="text-gray-700 ml-4">First member name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={member1}
              placeholder="Enter Name"
              onChangeText={(text) => setMember1(text)}
            />
            <Text className="text-gray-700 ml-4">Second member name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              value={member2}
              placeholder="Enter Name"
              onChangeText={(text) => setMember2(text)}
            />
            <Text className="text-gray-700 ml-4">Phone number</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              value={phone}
              placeholder="Phone"
              onChangeText={(text) => setPhone(text)}
            />
            <Text className="text-gray-700 ml-4">University</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={university}
              placeholder=""
              onChangeText={(text) => setUniversity(text)}
            />
            <Text className="text-gray-700 ml-4">Club</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={club}
              placeholder=""
              onChangeText={(text) => setClub(text)}
            />
            <Text className="text-gray-500 font-semibold">{validationMessage}</Text>
            {loading ? (
              <ActivityIndicator className="py-3 bg-blue-950 rounded-xl" />
            ) : (
              <TouchableOpacity
                className="py-3 bg-blue-950 rounded-xl mb-11"
                onPress={() => registerRobot()}
              >
                <Text className="font-xl font-bold text-center text-white">Register robot</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingComponent>
  );
}
