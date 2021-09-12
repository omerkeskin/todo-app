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
                ${this._data.filter(item => item.status === 'active').length } items left
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



}

export default new InfoView();