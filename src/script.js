const addItem = function(event){
  event.preventDefault();
  let text = document.getElementById("todo-input");
  console.log(`${text.value}`);
}