import db from "./fireBaseCfg";
import { doc, setDoc, collection, updateDoc, onSnapshot } from "firebase/firestore";

export async function addToDb(path, Data) {
  // usage : mithel path = users , data={id:1,username:"test",pw:"123"}
  try {
    await setDoc(doc(db, path + "/" + Data.id), Data);
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}

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

export async function updateData(path, parameterId, newData) {
  // usage : mithel path = users, id=1000 , newDataSameAsBefore
  //RETURN OBJ
  try {
    const messageDocRef = doc(db, path + "/" + parameterId);
    updateDoc(messageDocRef, newData);
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}
