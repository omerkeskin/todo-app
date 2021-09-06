import { getTodoItems, addTodoItem } from "./model.js";
import { state } from "./model.js";

const addItem = async function(event){
  event.preventDefault();
  let todoInput = document.getElementById("todo-input");
  try { 
    addTodoItem(todoInput.value);   
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  todoInput.value = '';
};

const init = function(){
   const todoInputForm = document.getElementById("todo-input-form");
   todoInputForm.addEventListener('submit', addItem);
   getTodoItems();
};

init();
console.log(state);
