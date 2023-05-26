// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyDJEJhMnxm_5IwNIGqvN0OR4ky7vwE4iPM",
  authDomain: "enigrobots-a960a.firebaseapp.com",
  projectId: "enigrobots-a960a",
  storageBucket: "enigrobots-a960a.appspot.com",
  messagingSenderId: "1058508571960",
  appId: "1:1058508571960:web:d62457e85d222715e86dcd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default fireStoreDB = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
//console.log(" checking db here");

//console.log(fireStoreDB);
