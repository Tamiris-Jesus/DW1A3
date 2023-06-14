
const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');

const timer = document.querySelector('.timer');

const characters = [
 'incriveis1',
 'incriveis2',
 'incriveis3',
 'incriveis4',
 'incriveis5',
 'monstrosa1',
 'monstrosa2',
 'monstrosa3',
 'monstrosa4',
 'monstrosa5',
 'toystory1',
 'toystory2',
 'toystory4',
 'toystory5',
 'toystory6',
 'up1',
 'up2',
 'up3',
 'up4',
 'up5',
 'up6',
 'valente1',
 'valente2',
 'valente3',
 'valente4',
 'valente6',
 'viva1',
 'viva2',
 'viva3',
 'viva4',
 'viva5',
 'nemo1',
 'nemo2',
 'nemo3',
 'nemo4',
 'nemo5',

];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';

let playersDificil = []; // lista de jogadores

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
  playersDificil.sort((a, b) => a.time - b.time);
  playersDificil.forEach((player, index) => {
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
};

const goToHomePage = () => {
  clearInterval(this.loop);
  window.location.href = '../index.html';
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === 72) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! você zerou o jogo. Seu tempo foi: ${timer.innerHTML} segundos`);

    endGameMenu(); // chama a função endGameMenu() para mostrar o menu de fim de jogo

    localStorage.setItem('playerTim', timer.innerHTML);
    localStorage.setItem('playerNo', spanPlayer.innerHTML);
  }
};


// const endGameMenu = () => {

//   /*
//   const menu = document.querySelector('.menu');
//   menu.style.display = 'block';
//   */

//   const container = document.querySelector('.container');
//   container.style.display = 'flex';




//   const restartBtn = document.querySelector('.restart-btn');
//   const homeBtn = document.querySelector('.home-btn');

  

//   restartBtn.addEventListener('click', () => {
//     const container = document.querySelector('.container');
//     container.style.display = 'none';
//     restartGame();
//   });
//   homeBtn.addEventListener('click', () => {
//     goToHomePage();
//   });

//   const playerN = spanPlayer.innerHTML;
//   const playerT = timer.innerHTML;
//   playersDificil.push({ name: playerN, time: playerT }); // adiciona o jogador atual à lista de jogadores

//   localStorage.setItem('playersDificil', JSON.stringify(playersDificil)); // armazena a lista de jogadores no localStorage
//   showRanking();
// };

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
    restartGame();
  });
  homeBtn.addEventListener('click', () => {
    goToHomePage();
  });

  const playerName = spanPlayer.innerHTML;
  const playerTime = timer.innerHTML;
  players.push({ name: playerName, time: playerTime }); // adiciona o jogador atual à lista de jogadores

  localStorage.setItem('players', JSON.stringify(players)); // armazena a lista de jogadores no localStorage
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

    front.style.backgroundImage = `url('../imagensDificil/${character}.jpg')`;


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

  const storPlayers = JSON.parse(localStorage.getItem('playersDificil'));
if (storPlayers) {
  playersDificil = storPlayers;
}

  
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

