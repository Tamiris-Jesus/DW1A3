

const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');

const buttonMedio = document.querySelector('.medio_button');
const buttonDificil = document.querySelector('.dificil_button');


const validateInput = ({ target }) => {
  if(target.value.length > 2){
    button.removeAttribute('disabled');
    buttonMedio.removeAttribute('disabled');
    buttonDificil.removeAttribute('disabled');
    return;
  }
  
    button.setAttribute('disabled', '');
  
}



const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}

const handleMediumButtonClick = (event) => {
  event.preventDefault();
  window.location.href = 'pages/nivelMedio.html';
}

const handleDificilButtonClick = (event) => {
  event.preventDefault();
  window.location.href = 'pages/nivelDificil.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
buttonMedio.addEventListener('click', handleMediumButtonClick);
buttonDificil.addEventListener('click', handleDificilButtonClick);


