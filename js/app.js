//creating list
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
//To shuffle the cards,we are calling shuffle function
 shuffle(icons);
//creating variables
const cardsContainer = document.querySelector(".deck");
var card;
let openedCards = [];
let matchedCards = [];
let span = document.getElementsByClassName('close');
let modal = document.getElementById('myModal');
//This function add cards to the cardsContainer using for loop
function init() {
  for (let i = 0; i < icons.length; i++) {
    card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);
    click(card);
  }
}

let isFirstClick = true;
//click function
function click(card) {
  card.addEventListener("click", function() {

    if (isFirstClick) {
      // Start our timer
      startTimer();
      isFirstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];

    if (openedCards.length === 1) {

      card.classList.add("open", "show", "disable");
      openedCards.push(this);
      compare(currentCard, previousCard);

    } else {

      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);
    }

  });
}
//comparision between cards
function compare(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard, previousCard);
    openedCards = [];

    // Check if the game is over!
    isOver();

  } else {

    // Wait 200ms
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");

    }, 200);

    openedCards = [];
  }

  // Add New Move
  addMove();
}

/*
 * Check if the game is over!
 */
function isOver() {
  if (matchedCards.length === icons.length) {
    // Stop our timer

    stopTimer();
    popup();
  }
}

/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
  moves += 1;
  movesContainer.innerHTML = moves;
  rating();
}
//creating starsContainer
var starsContainer = document.querySelector(".stars");
var star = `<li class="starobj"><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
console.log(starsContainer);

function rating() {
  //assigning star rating
  if (moves < 10) {
    starsContainer.innerHTML = star + star + star;
    console.log(starsContainer.innerHTML);
  } else if (moves < 15) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}

const timerContainer = document.querySelector(".timer");
let liveTimer,
  totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';
//stop timer method
function stopTimer() {
  clearInterval(liveTimer);

}
//popup function
function popup() {
  modal.style.display = "flex";
  document.getElementById("p1").innerHTML = 'You did it in ' + (moves + 1) + ' moves' + ' and ' + totalSeconds + ' seconds.';
  document.querySelector(".starimg").innerHTML = " Stars  " + starsContainer.innerHTML;
}

function startTimer() {
  liveTimer = setInterval(function() {
    // Increase the totalSeconds by 1
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalSeconds + 's';
  }, 1000);
}


const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  // Delete ALL cards
  cardsContainer.innerHTML = "";

  // Call `init` to create new cards
  init();

  // Reset the game
  reset();

});

function reset() {
  matchedCards = [];
  // Reset `moves`
  moves = 0;
  movesContainer.innerHTML = moves;
  // Reset `rating`
  starsContainer.innerHTML = star + star + star;
  stopTimer();
  isFirstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds + "s";
}
// Start the game for the first time!
init();

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
