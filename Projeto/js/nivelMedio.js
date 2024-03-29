const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');

const timer = document.querySelector('.timer');

const characters = [
  'bella',
  'bill',
  'cedrico',
  'dobby',
  'draco',
  'dumb',
  'gemeos',
  'harry',
  'hermione',
  'lupin',
  'rony',
  'sirius',
  'snape',
  'sraweasley',
  'srweasley',
  'tonks',
  'vold',
  'gina',
  'umbridge',
  'murta',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';

let players2 = []; // lista de jogadores

const showRanking = () => {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // cabeçalho da tabela
  const thRank = document.createElement('th');
  const thName = document.createElement('th');
  const thTime = document.createElement('th');
  thRank.textContent = '#';
  thName.textContent = 'Nome';
  thTime.textContent = 'Tempo (segundos)';
  thead.appendChild(thRank);
  thead.appendChild(thName);
  thead.appendChild(thTime);
  table.appendChild(thead);

  // linhas da tabela
  players2.sort((a, b) => a.time - b.time);
  players2.forEach((player, index) => {
    const tr = document.createElement('tr');
    const tdRank = document.createElement('td');
    const tdName = document.createElement('td');
    const tdTime = document.createElement('td');
    tdRank.textContent = index + 1;
    tdName.textContent = player.name;
    tdTime.textContent = player.time;
    tr.appendChild(tdRank);
    tr.appendChild(tdName);
    tr.appendChild(tdTime);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  const ranking = document.querySelector('.ranking');
  ranking.appendChild(table);
};


const restartGame = () => {
  const container = document.querySelector('.container');
  container.style.display = 'none';

  clearInterval(this.loop);
  timer.innerHTML = '00';
  grid.innerHTML = '';
  loadGame();
  startTimer();

  // limpando o conteudo do ranking para evitar duplicação 
  const ranking = document.querySelector('.ranking');
  ranking.innerHTML = '';
};


const goToHomePage = () => {
  clearInterval(this.loop);
  window.location.href = '../index.html';
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === 40) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! você zerou o jogo. Seu tempo foi: ${timer.innerHTML} segundos`);

    endGameMenu(); // chama a função endGameMenu() para mostrar o menu de fim de jogo

    localStorage.setItem('playerT', timer.innerHTML);
    localStorage.setItem('playerN', spanPlayer.innerHTML);
  }
};


const endGameMenu = () => {

  /*
  const menu = document.querySelector('.menu');
  menu.style.display = 'block';
  */

  const container = document.querySelector('.container');
  container.style.display = 'flex';




  const restartBtn = document.querySelector('.restart-btn');
  const homeBtn = document.querySelector('.home-btn');

  restartBtn.addEventListener('click', () => {
    const container = document.querySelector('.container');
    container.style.display = 'none';
    restartGame();
  });
  homeBtn.addEventListener('click', () => {
    goToHomePage();
  });

  const playerN = spanPlayer.innerHTML;
  const playerT = timer.innerHTML;
  players2.push({ name: playerN, time: playerT }); // adiciona o jogador atual à lista de jogadores

  localStorage.setItem('players2', JSON.stringify(players2)); // armazena a lista de jogadores no localStorage
  showRanking();
};


const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter){

      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');

      firstCard = '';
      secondCard = '';

      checkEndGame();
    }
      else{
        setTimeout(() => {

          firstCard.classList.remove('reveal-card');
          secondCard.classList.remove('reveal-card');

          firstCard = '';
          secondCard = '';

        }, 500);  
      }
  }

const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')){
      return;
    }

    if(firstCard === ''){
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
    }
      else if(secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode; 
        checkCards();
      }  
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    /*  alterando pasta de onde vão vir as imagens    */ 

    front.style.backgroundImage = `url('../imagensMedio/${character}.jpg')`;


    card.appendChild(front);
    card.append(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    const duplicateCharacters = [ ... characters, ... characters ];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
}


window.onload = () => {

  const container = document.querySelector('.container');
  container.style.display = 'none';

  const storPlayers = JSON.parse(localStorage.getItem('players2'));
if (storPlayers) {
  players2 = storPlayers;
}

  
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

