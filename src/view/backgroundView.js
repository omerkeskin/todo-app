import iconSun from 'url:/assets/icon-sun.svg';
import iconMoon from 'url:/assets/icon-moon.svg';
import bgDesktopLight from 'url:/assets/bg-desktop-light.jpg';
import bgDesktopDark from 'url:/assets/bg-desktop-dark.jpg';


class BackgroundView {

  _parentElement = document.querySelector('.header');
  _data;

  constructor(){
    this.render();
    this.changeMood();
  }

  _clear(){
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(){
    return `
        <div class="title">TODO</div>
        <div data-mood="dark" class="theme">
          <img class="mood-icon" src="${iconMoon}">
        </div>
    `;
  }

  render(){
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup);
  }

  changeMood(){
    const backgroundImage = document.querySelector('.background-image');
    const theme = this._parentElement.querySelector('.theme');
    theme.addEventListener('click', function(e){
      const moodIcon = this.querySelector('.mood-icon');
      if(this.dataset.mood === 'light'){
        this.dataset.mood = 'dark';
        moodIcon.src = iconMoon;
        backgroundImage.src = bgDesktopDark;
      }else{
        this.dataset.mood = 'light';
        moodIcon.src = iconSun;
        backgroundImage.src = bgDesktopLight;
      }
      console.log(backgroundImage);
      
    });
  }
    

}

export default new BackgroundView();