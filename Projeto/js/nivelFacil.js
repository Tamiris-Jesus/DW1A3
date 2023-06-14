// selecionando elementos HTML pela classe 

const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');

const timer = document.querySelector('.timer');

// Array com o nome dos personagens (que são os mesmos nomes das imagens)
const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

// Função auxiliar para criar elementos com classes 
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// variáveis das cartas selecionadas pelo jogador 
let firstCard = '';
let secondCard = '';

let players = []; // lista de jogadores

// Função para exibir a tabela de classificação dos jogadores
const showRanking = () => {
  // Cria os elementos da tabela
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Cabeçalho da tabela
  const thRank = document.createElement('th');
  const thName = document.createElement('th');
  const thTime = document.createElement('th');
  thRank.textContent = '#'; // Texto do cabeçalho do ranking
  thName.textContent = 'Nome'; // Texto do cabeçalho do nome do jogador
  thTime.textContent = 'Tempo (segundos)'; // Texto do cabeçalho do tempo do jogador
  thead.appendChild(thRank);
  thead.appendChild(thName);
  thead.appendChild(thTime);
  table.appendChild(thead);

  // Linhas da tabela com os jogadores classificados
  players.sort((a, b) => a.time - b.time); // Classifica os jogadores pelo tempo
  players.forEach((player, index) => {
    const tr = document.createElement('tr'); // Linha da tabela
    const tdRank = document.createElement('td'); // Coluna para o número da posição do jogador
    const tdName = document.createElement('td'); // Coluna para o nome do jogador
    const tdTime = document.createElement('td'); // Coluna para o tempo do jogador
    tdRank.textContent = index + 1; // Número da posição do jogador (inicia em 1)
    tdName.textContent = player.name; // Nome do jogador
    tdTime.textContent = player.time; // Tempo do jogador
    tr.appendChild(tdRank);
    tr.appendChild(tdName);
    tr.appendChild(tdTime);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Adiciona a tabela de classificação ao elemento HTML com a classe "ranking"
  const ranking = document.querySelector('.ranking');
  ranking.appendChild(table);
};

// Função para reiniciar o jogo
const restartGame = () => {
  const container = document.querySelector('.container');
  container.style.display = 'none'; // Esconde o container do jogo

  clearInterval(this.loop); // Limpa o intervalo do temporizador
  timer.innerHTML = '00'; // Reinicia o valor do temporizador para "00"
  grid.innerHTML = ''; // Limpa o conteúdo do grid
  loadGame(); // Carrega um novo jogo
  startTimer(); // Inicia o temporizador novamente

  // Limpa o conteúdo do ranking para evitar duplicação
  const ranking = document.querySelector('.ranking');
  ranking.innerHTML = '';
};



// Função para voltar para a página inicial
const goToHomePage = () => {
  clearInterval(this.loop); // Limpa o intervalo do temporizador
  window.location.href = '../index.html'; // Redireciona o navegador para a página inicial
};


// Função para verificar se o jogo foi concluído
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === 20) { // Se todas as cartas estiverem desabilitadas (jogo concluído)
    clearInterval(this.loop); // Limpa o intervalo do temporizador
    alert(`Parabéns, ${spanPlayer.innerHTML}! Você zerou o jogo. Seu tempo foi: ${timer.innerHTML} segundos`);

    endGameMenu(); // Chama a função endGameMenu() para exibir o menu de fim de jogo

    // Armazena o tempo e nome do jogador no localStorage
    localStorage.setItem('playerTime', timer.innerHTML);
    localStorage.setItem('playerName', spanPlayer.innerHTML);
  }
};



// Função para exibir o menu de fim de jogo
const endGameMenu = () => {
  /*
  const menu = document.querySelector('.menu');
  menu.style.display = 'block';
  */
  const container = document.querySelector('.container');
  container.style.display = 'flex'; // Exibe o container do jogo

  const restartBtn = document.querySelector('.restart-btn');
  const homeBtn = document.querySelector('.home-btn');

  // Adiciona ouvintes de evento para os botões de reiniciar e voltar para a página inicial
  restartBtn.addEventListener('click', () => {
    restartGame();
  });
  homeBtn.addEventListener('click', () => {
    goToHomePage();
  });

  const playerName = spanPlayer.innerHTML;
  const playerTime = timer.innerHTML;
  players.push({ name: playerName, time: playerTime }); // Adiciona o jogador atual à lista de jogadores

  localStorage.setItem('players', JSON.stringify(players)); // Armazena a lista de jogadores no localStorage
  showRanking(); // Exibe a tabela de classificação dos jogadores
};


// Função para verificar se as cartas selecionadas são iguais
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter == secondCharacter) {
    // Se as cartas são iguais, adiciona a classe "disabled-card" para desabilitá-las
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame(); // Verifica se o jogo foi concluído
  } else {
    setTimeout(() => {
      // Se as cartas são diferentes, remove a classe "reveal-card" para ocultá-las novamente
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500); // Aguarda 500ms antes de ocultar as cartas novamente
  }
};


// Função para revelar uma carta
// target - elemento que foi clicado (carta)
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return; // Se a carta já estiver revelada, retorna sem fazer nada
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards(); // Verifica se as cartas selecionadas são iguais
  }
};

// Função para criar uma carta com base no nome do personagem
const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../imagensFacil/${character}.png')`; // Define a imagem de fundo da face frontal da carta

  card.appendChild(front);
  card.append(back);

  card.addEventListener('click', revealCard); // Adiciona um ouvinte de evento para revelar a carta ao ser clicada

  card.setAttribute('data-character', character); // Define o atributo "data-character" com o nome do personagem para verificar se as cartas são iguais

  return card;
};

// Função para carregar o jogo (criar as cartas)
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5); // Embaralha o array de personagens

  shuffledArray.forEach((character) => {
    const card = createCard(character); // Cria uma carta com base no nome do personagem
    grid.appendChild(card); // Adiciona a carta ao grid do jogo
  });
};

// Função para iniciar o temporizador
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000); // Atualiza o temporizador a cada 1 segundo
};

// Função que é executada quando a página é carregada
window.onload = () => {
  const container = document.querySelector('.container');
  container.style.display = 'none'; // Esconde o container do jogo

  const storedPlayers = JSON.parse(localStorage.getItem('players'));
  if (storedPlayers) {
    players = storedPlayers; // Carrega a lista de jogadores do localStorage, se existir
  }

  spanPlayer.innerHTML = localStorage.getItem('player'); // Obtém o nome do jogador do localStorage e exibe no elemento HTML
  startTimer(); // Inicia o temporizador
  loadGame(); // Carrega o jogo (cria as cartas)
};
