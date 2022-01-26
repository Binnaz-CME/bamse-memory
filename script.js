//Create node
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
const newBtn = document.querySelector('.new-btn');
let playerLives = 10;
let cardData;

//Link text
playerLivesCount.textContent = playerLives;

//Generate data
const getData = () => [
  { imgSrc: './images/skalman-book.png', name: 'skalman book' },
  { imgSrc: './images/farmor.png', name: 'farmor' },
  { imgSrc: './images/little-witch.png', name: 'little witch' },
  { imgSrc: './images/nalle-maja-tennis.png', name: 'nalle maja tennis' },
  { imgSrc: './images/reinard-fox.png', name: 'reinard fox' },
  { imgSrc: './images/skutt.png', name: 'skutt' },
  { imgSrc: './images/mini-hopp.png', name: 'mini-hopp' },
  { imgSrc: './images/farmor.png', name: 'farmor' },
  { imgSrc: './images/billy-boy.png', name: 'billy boy' },
  { imgSrc: './images/skalman-book.png', name: 'skalman book' },
  { imgSrc: './images/mini-hopp.png', name: 'mini-hopp' },
  { imgSrc: './images/little-witch.png', name: 'little witch' },
  { imgSrc: './images/nalle-maja-tennis.png', name: 'nalle maja tennis' },
  { imgSrc: './images/reinard-fox.png', name: 'reinard fox' },
  { imgSrc: './images/skutt.png', name: 'skutt' },
  { imgSrc: './images/billy-boy.png', name: 'billy boy' },
];

//Backface image
const backface = { imgSrc: './images/bamse-backface.jpeg' };

//randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {
  cardData = randomize();
  //Generate HTML
  cardData.forEach(item => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    // const back = document.createElement("div");
    const back = document.createElement('img');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    //Attach info to cards
    face.src = item.imgSrc;
    back.src = backface.imgSrc;
    card.setAttribute('name', item.name);
    //Attach the cards to the section
    section.append(card);
    card.append(face);
    card.append(back);

    // //show cards in the beginning
    // setTimeout(() => {
    //   card.classList.toggle('toggleCard');
    // }, 10000);
    //flip to backface to start game
    // card.classList.toggle('toggleCard');
    //toggle cards
    card.addEventListener('click', e => {
      //Run our flip animation
      card.classList.toggle('toggleCard');
      checkCards(e);
    });
  });
};
//check cards
const checkCards = e => {
  const clickedCard = e.target;
  // console.log(clickedCard)
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');
  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1500);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        setTimeout(() => {
          restart();
        }, 5000);
      }
    }
  }
  if (toggleCard.length === 16) {
    setTimeout(() => {
      restart();
    }, 2000);
  }
};

//Restart
const restart = () => {
  cardData = randomize();
  const faces = document.querySelectorAll('.face');
  const cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      section.style.pointerEvents = 'all';
    }, 1000);
  });
  playerLives = 10;
  playerLivesCount.textContent = playerLives;
};

newBtn.addEventListener('click', e => {
  restart();
});

cardGenerator();
