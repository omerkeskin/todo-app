import { firebaseApp } from "./config.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { async } from "@firebase/util";

export const state = {
  todoItems : [],
  displayFilter : 'all'
};

const db = getFirestore();

export const getTodoItems = async function(){

  const tempArr = [];
  try{      
    const querySnapshot = await getDocs(collection(db, "todo-items"));   
    querySnapshot.forEach((doc) => {
       let item = {
          id: doc.id,
          text: doc.data().text,
          status: doc.data().status
       };
       tempArr.push(item);
    });
    state.todoItems = [...tempArr];
  }catch (err) {
      throw err;
  }

};

export const addTodoItem = async function(data){
  const newRecord = {
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

export const updateTodoItem = async function(item){
  try{   
    if(item){
      const docRef = doc(db, 'todo-items', item.id);
        await updateDoc(docRef, {
          status: item.status
        });
    }

  }catch (err) {
      throw err;
  }
};

export const deleteTodoItem = async function(itemId){
  try{   
    if(itemId){
        const docRef = doc(db, 'todo-items', itemId);
        await deleteDoc(docRef);
    }

  }catch (err) {
      throw err;
  }
};