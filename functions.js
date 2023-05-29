import db from "./fireBaseCfg";
import { doc, setDoc, getDoc, collection, updateDoc, onSnapshot } from "firebase/firestore";

export async function addToDb(path, Data, id) {
  // usage : mithel path = users , data={id:1,username:"test",pw:"123"}
  // if id is given , it will take it as id
  try {
    id == undefined
      ? await setDoc(doc(db, path + "/" + Data.id), Data)
      : await setDoc(doc(db, path + "/" + id), Data);
  } catch (error) {
    console.error("There was an error adding data to db:", error);
  }
}

export async function getData(path, setFn, filterDict) {
  // usage : mithel path = users , setStateFunction
  // filterDict optional , si utilisé { base :"uuid",value:"1342fzefze341"}
  //RETURN OBJ
  try {
    const ref = collection(db, path);
    await onSnapshot(ref, (dataSnap) => {
      let Data = dataSnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      //console.log("Current groups in database: ", Data);
      if (filterDict === undefined) {
        setFn(Data);
      } else {
        //console.log(Data);
        Data = Data.filter((item) => {
          filterBase = filterDict.base;
          filterValue = filterDict.value;
          return item[filterBase] == filterValue;
        });
        setFn(Data);
      }
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
