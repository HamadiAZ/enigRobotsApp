import db from "./fireBaseCfg";
import { doc, setDoc, collection, query, onSnapshot } from "firebase/firestore";
//import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
// export async function getData(collection) {
//   const cols = collection(db, collection);
//   const snapShot = await getDocs(cols);
//   const dataList = snapShot.docs.map((doc) => doc.data());
//   return dataList;
// }

export async function addToDb(path, Data) {
  // usage : mithel path = users , data={id:1,username:"test",pw:"123"}
  try {
    await setDoc(doc(db, path + "/" + Data.id), Data);
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}
const data = {
  id: 1234344,
  name: "gabes",
  phone: 931112551,
  payment: true,
};
export async function getData(path, setFn) {
  // usage : mithel path = users , setStateFunction
  //RETURN OBJ
  try {
    const ref = collection(db, path);
    await onSnapshot(ref, (dataSnap) => {
      const Data = dataSnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      //console.log("Current groups in database: ", Data);
      setFn(Data);
    });
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}
export async function getDataById(path, parameterId, setFn) {
  // usage : mithel path = users, id=1000 , setStateFunction
  //RETURN OBJ
  try {
    const ref = collection(db, path);
    await onSnapshot(ref, (dataSnap) => {
      var Data = dataSnap.docs.map((doc) => {
        if (doc.id == parameterId) return { id: doc.id, ...doc.data() };
      });
      Data = Data.filter((item) => item !== undefined);
      //console.log("Current groups in database: ", Data);
      setFn(Data[0]);
    });
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}
// addToDb("testpath", data);
