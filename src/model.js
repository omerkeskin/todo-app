import { firebaseApp } from "./config.js";
import { getFirestore, collection, getDocs, addDoc} from "firebase/firestore";
import { async } from "@firebase/util";

/* export const state = {
  todoItems : []
}; */

export const state = {
  todoItems : []
};

const db = getFirestore();

export const getTodoItems = async function(){

  const tempArr = [];
  try{      
    //state.todoItems = [];
    const querySnapshot = await getDocs(collection(db, "todo-items"));   
    querySnapshot.forEach((doc) => {
       let item = {
          id: doc.id,
          ...doc.data()
       };
       tempArr.push(item);
    });
    state.todoItems = [...tempArr];
    console.log(state.todoItems);
  }catch (err) {
      throw err;
  }

};

export const addTodoItem = async function(data){
  const newRecord = {
    id: null,
    text: data,
    status: "active"
  };

  try{   
    if(data){
      const docRef = await addDoc(collection(db, "todo-items"), newRecord);
      newRecord.id = docRef.id;
      state.todoItems.push(newRecord);
    }

  }catch (err) {
      throw err;
  }
};