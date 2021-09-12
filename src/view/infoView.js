import icons from 'url:/assets/icons.svg';

class InfoView {

  _parentElement = document.querySelector('.info-wrapper');
  _data;

  _clear(){
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(){
    return `
          <div class="todo-items-info">
            <div class="items-left">
                ${this._data.todoItems.filter(item => item.status === 'active').length } items left
            </div>
            <div class="items-statuses">
                <span class="display-option ${this._data.displayFilter === 'all' ? 'active': ''}"" data-display-option="all" >All</span>
                <span class="display-option ${this._data.displayFilter === 'active' ? 'active': ''}" data-display-option="active" >Active</span>
                <span class="display-option ${this._data.displayFilter === 'completed' ? 'active': ''}" data-display-option="completed" >Completed</span>
            </div>
            <div class="items-clear">
              <span>Clear Completed</span>
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
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  render(data){
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend',markup);
  }

  updateActiveItems(items){
    
    if(items){
      let activeItemCount = items.filter(item => item.status === 'active').length;
      let message = '';
      if(activeItemCount < 2){
        message = `${activeItemCount} item left`;
      }else{
        message = `${activeItemCount} items left`;
      }

      const activeItemText = document.querySelector('.items-left');
      activeItemText.innerHTML = message;

    }
  }

  updateDisplayOption(selectedOption){
     const options = this._parentElement.querySelectorAll('.display-option');
     options.forEach(el => {
        el.classList.remove('active');
        if(selectedOption === el.dataset.displayOption){
          el.classList.add('active');
        }
     } );
     
  }

  addHandlerDisplayOptions(handler){
     this._parentElement.addEventListener('click', function(e){
        const target = e.target;
        if(target.classList.contains('display-option')){
          const displayOption = target.dataset.displayOption;
          handler(displayOption);
        }
     });
  }

  addHandlerClearCompleted(handler){
      this._parentElement.addEventListener('click', function(e){
         const target = e.target;
         const itemsClearDiv = target.closest('.items-clear');
         if(itemsClearDiv){
          handler();
         }
      });
  }



}

export default new InfoView();