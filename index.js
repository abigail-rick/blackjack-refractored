// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 

// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//     databaseURL: "https://blackjack-game-abr-default-rtdb.firebaseio.com/"
// }
// console.log(appSettings);

// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const gameDataInDB = ref(database, "GameData");


let playerCards = [];
let sum = 0;
let houseSum = 0;

const sumEl = document.getElementById('sum-el');
const messageEl = document.getElementById('message-el');
const cardEl = document.getElementById('card-el');
const startBtn = document.getElementById('start');
const stay = document.getElementById('stay');
let playerEl = document.getElementById("player");
let houseEl = document.getElementById('house-el');

function getRandomCard(){
    let randomCard = Math.floor(Math.random() * 13) + 1;
    if (randomCard === 1){
        return 11;
   } else if (randomCard > 10){
    return 10;
   } else {
    return randomCard;
   }
}
 
startBtn.addEventListener("click", function(){

        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res => res.json())
        .then(data => {
            const deckId = data.deck_id;
            console.log(data)
        
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
                data.cards;
                console.log(data)
        })
    })
    })

    // resetBtn.innerHTML = "RESET";
    // let playerFirstCard = getRandomCard();
    // let playerSecondCard = getRandomCard();    
    // playerCards.push(playerFirstCard);
    // playerCards.push(playerSecondCard);
    // houseFirstCard = getRandomCard();
    // houseSecondCard = getRandomCard();
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
