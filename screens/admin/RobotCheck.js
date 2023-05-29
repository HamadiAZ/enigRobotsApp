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
import { updateData, addToDb } from "../../functions";

const imageLink =
  "https://media.licdn.com/dms/image/C4E03AQHADVRP7OML1w/profile-displayphoto-shrink_800_800/0/1642982063201?e=2147483647&v=beta&t=s_85jvwNiLw6RWT8TE8SvQtbEo_6znuNsJg7bUjVzpI";

export default function RobotCheck({ route }) {
  const { data, paymentInfo } = route.params;
  const triedPayingBefore = !!paymentInfo;
  const [loading, setLoading] = useState(false);
  const [Rname, setRname] = useState(data.Rname);
  const [type, setType] = useState(data.type);
  const [price, setPrice] = useState(data.price);
  const [university, setUniversity] = useState(data.university);
  const [club, setClub] = useState(data.club);
  const [email, setEmail] = useState(data.email);
  const [chef, setChef] = useState(data.chef);
  const [phone, setPhone] = useState(data.phone);
  const [member1, setMember1] = useState(data.member1);
  const [member2, setMember2] = useState(data.member2);
  const [payment, setPayment] = useState(data.payment);
  const [validationMessage, setValidationMessage] = useState("");
  const [paymentId, setPaymentId] = useState(!!paymentInfo ? paymentInfo?.paymentId : "");
  const [paymentMethod, setPaymentMethod] = useState(
    !!paymentInfo ? paymentInfo?.paymentMethod : ""
  );

  async function updateRobot(paymentStatus = undefined) {
    condition =
      Rname === "" || club === "" || email === "" || chef === "" || email === "" || phone === "";

    condition ? setValidationMessage("required filled missing") : "";
    if (!condition) {
      try {
        moveToClient = true;
        robotData = {
          id: data.id,
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
          payment: paymentStatus == undefined ? payment : paymentStatus,
          uid: data.uid,
        };
        paymentData = {
          paymentId,
          robotId: robotData.id,
          paymentMethod,
          uid: data.uid,
        };
        await updateData("robots", robotData.id, robotData);
        if (triedPayingBefore) {
          await updateData("payments", robotData.id, paymentData);
        } else {
          if (paymentId !== "" && paymentId.length >= 8) {
            await addToDb("payments", paymentData, robotData.id);
            moveToClient = false;
            navigation.navigate("Admin", { updateData: true });
          } else if (paymentId == "") {
            setValidationMessage("Payment not set, updating robot info only");
            moveToClient = false;
            setTimeout(() => {
              navigation.navigate("Admin");
            }, 2000);
          } else {
            setValidationMessage("Payment id is not accepted");
            moveToClient = false;
          }
        }
        moveToClient && navigation.navigate("Admin");
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
            {payment ? (
              <TouchableOpacity
                className="py-3 bg-red-500 rounded-xl mb-2"
                onPress={() => {
                  updateRobot(false);
                }}
              >
                <Text className="font-xl font-bold text-center text-white">Mark as NOT PAID</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="py-3 bg-green-500 rounded-xl mb-2"
                onPress={() => {
                  updateRobot(true);
                }}
              >
                <Text className="font-xl font-bold text-center text-white">Mark as PAID</Text>
              </TouchableOpacity>
            )}
            <Text className="text-gray-700 ml-4">Robot name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={Rname}
              placeholder="Enter Name"
              onChangeText={(text) => setRname(text)}
            />
            <Text className="text-gray-700 ml-4">payment Reference</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl -mb-2"
              value={paymentId}
              placeholder=""
              onChangeText={(text) => setPaymentId(text)}
            />
            <Text className="text-gray-700 mb-5 ml-4">
              *if not yet payed, just ignore this case
            </Text>
            <Text className="text-gray-700 ml-4">payment Reference</Text>
            <Picker
              selectedValue={paymentMethod}
              style={{ height: 50, width: 320 }}
              onValueChange={(itemValue) => {
                setPaymentMethod(itemValue);
              }}
            >
              <Picker.Item label="D17" value="D17" />
              <Picker.Item label="Mondat" value="Mondat" />
            </Picker>
            {paymentMethod === "D17" && (
              <Text className="text-red-700 text font-extrabold ml-4">D17 number : 93111251</Text>
            )}
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
              <Text className="text-red-600 ml-4 font-extrabold">{price} DT</Text>
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
                onPress={() => updateRobot()}
              >
                <Text className="font-xl font-bold text-center text-white">Update</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingComponent>
  );
}
