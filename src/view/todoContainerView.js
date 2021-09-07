import iconCheck from 'url:/assets/icon-check.svg';
import iconCross from 'url:/assets/icon-cross.svg';
import icons from 'url:/assets/icons.svg';

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

  renderSpinner() {
    const markup = `
      <div class="spinner">
          <svg>
                <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
   `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data){
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup);
  }

  addHandlerClickTodoContainer(handler){
     this._parentElement.addEventListener('click', function(e){
        const target = e.target;
        const checkStatusImg = target.closest('.todo-item').querySelector('img');
        checkStatusImg.src = iconCross;
        console.log(checkStatusImg);
     });
  }
  
}

export default new TodoContainerView();