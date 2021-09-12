import { getTodoItems, addTodoItem , updateTodoItem, deleteTodoItem} from "./model.js";
import { state } from "./model.js";
import todoContainerView from "./view/todoContainerView.js";
import infoView from "./view/infoView.js";
import backgroundView from "./view/backgroundView.js";
import { toggleItemStatus } from "./util.js";

const addItem = async function (event) {
  event.preventDefault();
  let todoInput = document.getElementById("todo-input");
  try {
    await addTodoItem(todoInput.value);
    todoContainerView.render(state.todoItems);
    infoView.render(state);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  todoInput.value = "";
};

const controlClickTodoContainer = async function (recordId) {
   const selectedItem = state.todoItems.find(item => item.id === recordId);
   toggleItemStatus(selectedItem);
   await updateTodoItem(selectedItem);
   todoContainerView.toggleStatus(selectedItem);
   infoView.updateActiveItems(state.todoItems);
   state.displayOption = 'all';
   infoView.updateDisplayOption(state.displayOption);
   todoContainerView.render(state.todoItems);
};

const controlDisplayOptions = function(displayOption){
   state.displayOption = displayOption;
   let filteredItems = [];
   if(displayOption === 'all'){
      filteredItems = state.todoItems;
   }else if(displayOption === 'active'){
      filteredItems = state.todoItems.filter(item => item.status === 'active');
   }else {
      filteredItems = state.todoItems.filter(item => item.status === 'completed');
   }
   todoContainerView.render(filteredItems);
   infoView.updateDisplayOption(state.displayOption);
};

const controlClearCompleted = function(){
    const completedTodoItems = state.todoItems.filter(item => item.status === 'completed');
    completedTodoItems.forEach(item => deleteTodoItem(item.id));
    state.todoItems = state.todoItems.filter(item => item.status === 'active');
    todoContainerView.render(state.todoItems);
    infoView.render(state);
};

const init = async function () {
  await getTodoItems();
  todoContainerView.addHandlerClickTodoContainer(controlClickTodoContainer);
  infoView.addHandlerDisplayOptions(controlDisplayOptions);
  infoView.addHandlerClearCompleted(controlClearCompleted);
  todoContainerView.renderSpinner();
  infoView.renderSpinner();
  const todoInputForm = document.getElementById("todo-input-form");
  todoInputForm.addEventListener("submit", addItem);
  todoContainerView.render(state.todoItems);
  infoView.render(state);
};

init();