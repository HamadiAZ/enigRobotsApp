import db from "./fireBaseCfg";
import { doc, setDoc, getDoc, collection, updateDoc, onSnapshot } from "firebase/firestore";

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
    const dataRef = doc(db, path + "/" + parameterId);
    const dataSnapshot = await getDoc(dataRef);
    const Data = dataSnapshot.data();
    setFn(Data);
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}

export async function updateData(path, parameterId, newData) {
  // usage : mithel path = users, id=1000 , newDataSameAsBefore
  //RETURN OBJ
  try {
    const dataRef = doc(db, path + "/" + parameterId);
    updateDoc(dataRef, newData);
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}

export async function updatePaymentStatus(path, parameterId, paymentStatus) {
  // usage : mithel path = users, id=1000 , true
  //RETURN OBJ
  try {
    const dataRef = doc(db, path + "/" + parameterId);
    await updateDoc(dataRef, { payment: paymentStatus });
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}
