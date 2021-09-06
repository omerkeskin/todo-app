import iconCheck from 'url:/assets/icon-check.svg';
import iconCross from 'url:/assets/icon-cross.svg';

class TodoContainerView {

  _parentElement = document.querySelector('.todo-items-wrapper');
  _data;

  _clear(){
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(){
    return `
          <div class="todo-items">
             ${this._data.map(this._generateTodoItemList).join('')}
          </div>

          <div class="todo-items-info">
            <div class="items-left">
                5 items left
            </div>
            <div class="items-statuses">
                <span>All</span>
                <span>Active</span>
                <span class="active">Completed</span>
            </div>
            <div class="items-clear">
              <span>Clear Completed</span>
            </div>
          </div>
    `;
  }

  _generateTodoItemList(item){
     return `
        <div class="todo-item">
            <div class="check">
              <div class="check-mark">
                  <img src="${item.status === 'active' ? iconCheck : iconCross}" >
              </div>
            </div>
            <div class="todo-text">
                ${item.text}
            </div>
        </div>
     `;
  }

  render(data){
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup);
  }
  
}

export default new TodoContainerView();