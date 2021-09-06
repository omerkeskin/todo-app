import { firebaseApp } from "./config.js";
import { getFirestore, collection, getDocs, addDoc} from "firebase/firestore";
import { async } from "@firebase/util";

export const state = {
  todoItems : []
};
const db = getFirestore();

export const getTodoItems = async function(){

  try{   
    const querySnapshot = await getDocs(collection(db, "todo-items"));
    state.todoItems = [];
    querySnapshot.forEach((doc) => {
       let item = {
          text : doc.data().text,
          status : doc.data().status
       };
       state.todoItems.push(item);
    });


  }catch (err) {
      throw err;
  }

};

export const addTodoItem = async function(data){

  try{   
    if(data){
      const docRef = await addDoc(collection(db, "todo-items"), {
        text: data,
        status: "active"
      });
      console.log("Document written with ID: ", docRef.id);
    }

  }catch (err) {
      throw err;
  }
};