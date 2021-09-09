import { getTodoItems, addTodoItem , updateTodoItem} from "./model.js";
import { state } from "./model.js";
import todoContainerView from "./view/todoContainerView.js";
import { toggleItemStatus } from "./util.js";

const addItem = async function (event) {
  event.preventDefault();
  let todoInput = document.getElementById("todo-input");
  try {
    await addTodoItem(todoInput.value);
    todoContainerView.render(state.todoItems);
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
};

const init = async function () {
  await getTodoItems();
  todoContainerView.addHandlerClickTodoContainer(controlClickTodoContainer);
  todoContainerView.renderSpinner();
  const todoInputForm = document.getElementById("todo-input-form");
  todoInputForm.addEventListener("submit", addItem);
  todoContainerView.render(state.todoItems);
};

init();