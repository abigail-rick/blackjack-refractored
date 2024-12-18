// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 

// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//     databaseURL: "https://blackjack-game-abr-default-rtdb.firebaseio.com/"
// }
// console.log(appSettings);

// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const gameDataInDB = ref(database, "GameData");



let sum = 0;
let houseSum = 0;

const start = document.querySelector('.start');

const sumEl = document.querySelector('.sum-el');
const messageEl = document.querySelector('.message-el');
const cardEl = document.querySelector('.card-el');

const stay = document.querySelector('.stay');

let playerCards = document.querySelector(".playerCards");
let houseCards = document.querySelector('.houseCards');

let gameOver = false;

let cardValues = {
    "QUEEN": 10,
    "KING": 10,
    "JACK": 10,
    "ACE": 11, // You can handle the special Ace logic later
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10
};

start.addEventListener("click", startGame);

    function startGame(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res => res.json())
        .then(data => {
            const deckId = data.deck_id;
            console.log(data)
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
             
                houseCards.innerHTML = `
                <img src="${data.cards[0].image}"/>
                <img src="${data.cards[1].image}"/>`
                console.log(data.cards)

                playerCards.innerHTML =  `
                <img src="${data.cards[2].image}"/>
                <img src="${data.cards[3].image}"/>`
                messageEl.textContent = "Would you like to hit or stay?"
                
                let houseScore = cardValues[data.cards[0].value] + cardValues[data.cards[1].value]
                let playerScore = cardValues[data.cards[2].value] + cardValues[data.cards[3].value]

                if(playerScore === 21 || houseScore === 21){
                    messageEl.textContent = "BLACKJACK!";
                    gameOver = true;
                } else {
                    playGame();
                }
                console.log(houseScore);
                console.log(playerScore);
        })

    })
}

    function playGame(){
        if (playerScore < 21){
            
        }
    }



    // resetBtn.innerHTML = "RESET";
    
    // playerCards.push(playerFirstCard);
    // playerCards.push(playerSecondCard);
  
    // houseSum = houseFirstCard + houseSecondCard;
    // sum = playerFirstCard + playerSecondCard;
    // houseEl.textContent = "The House's cards: ?, " + houseSecondCard;
    // renderGame();
    // console.log(playerCards);
    // console.log(houseFirstCard, houseSecondCard);
    

//     stay.addEventListener("click", function() {
//        houseEl.textContent = "The House's cards: " + houseFirstCard + " , " + houseSecondCard;
        
//               if (houseSum <= 16 && sum > houseSum) {
//                 messageEl.textContent = "The House draws a third card";
//                 setTimeout(function() {
//                 let houseThirdCard = getRandomCard();  // House draws a third card
//                 houseSum += houseThirdCard;
//                 houseEl.textContent = "The House's cards: " + houseFirstCard + " , " + houseSecondCard + " , " + houseThirdCard;    
//                 renderGamePart2();
                
            
//         }, 3000);  
//     } else {
//         renderGamePart2();
//         }
//     });

//     function renderGame() {
//     cardEl.textContent = "Cards: " + playerCards.join(", ");
//     sumEl.textContent = "Sum: " + sum;
//     if (sum > 21) {
//         messageEl.textContent = "You're out of the game!";
//         } else if (sum === 21) { 
//         messageEl.textContent = "Wohoo! You've got Blackjack!";
//     } else {
//         messageEl.textContent = "Do you want to draw a new card?";
//     }
//     push(gameDataInDB, playerCards);
// }
// function renderGamePart2(){
//     if (houseSum > 21) {
//         messageEl.textContent = "House busted!";
//     } else if (sum <= 21 && houseSum > sum) {
//         messageEl.textContent = "The House wins with " + houseSum + "!";
        
//     } else if (sum <= 21 && houseSum < sum) {
//         messageEl.textContent = "You win!";
        
//     } else if (sum === houseSum) {
//         messageEl.textContent = "It's a standoff";
      
//     }
//     push(gameDataInDB, playerCards);
// }

// function newCard(){
//     let thirdCard = getRandomCard();
//     playerCards.push(thirdCard);
//     sum += thirdCard;
//     cardEl.textContent = "Cards: " + playerCards.join(", ");
//     renderGame();
// }

// resetBtn.addEventListener("click", function restart() {
//     playerCards = [];
    
//     sum = 0;
//     houseSum = 0;
    

//     messageEl.textContent = "Do you want to draw another card?";
//     cardEl.textContent = "Cards:";
//     sumEl.textContent = "Sum:";
//     houseEl.textContent = "The House's Cards: ?, ?"
    
//     startGame();
// });

//     window.startGame = startGame;
//     window.newCard = newCard;
