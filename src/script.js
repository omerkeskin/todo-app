import { getTodoItems, addTodoItem } from "./model.js";
import { state } from "./model.js";
import todoContainerView from "./view/todoContainerView.js";

const addItem = async function(event){
  event.preventDefault();
  let todoInput = document.getElementById("todo-input");
  try { 
    await addTodoItem(todoInput.value); 
    todoContainerView.render(state.todoItems);  
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  todoInput.value = '';
};


const init = async function(){
   await getTodoItems();
   const todoInputForm = document.getElementById("todo-input-form");
   todoInputForm.addEventListener('submit', addItem);
   todoContainerView.render(state.todoItems);
};

init();

