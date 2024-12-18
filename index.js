// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 

// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//     databaseURL: "https://blackjack-game-abr-default-rtdb.firebaseio.com/"
// }
// console.log(appSettings);

// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const gameDataInDB = ref(database, "GameData");




let deckId;
const startBtn = document.querySelector('.start');
const hitBtn = document.querySelector('.hit');
const messageEl = document.querySelector('.message-el');

const stayBtn = document.querySelector('.stay');

let playerCards = document.querySelector(".playerCards");
let houseCards = document.querySelector('.houseCards');
let playerScore = 0;
let houseScore = 0;
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

startBtn.addEventListener("click", startGame);

    function startGame(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
            console.log(data)
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
             
                houseCards.innerHTML = `
                <img src="${data.cards[0].image}"/>
                <img src="https://deckofcardsapi.com/static/img/back.png"/>`
                console.log(data.cards)

                playerCards.innerHTML =  `
                <img src="${data.cards[2].image}"/>
                <img src="${data.cards[3].image}"/>`
                        
                houseScore = cardValues[data.cards[0].value] + cardValues[data.cards[1].value]
                playerScore = cardValues[data.cards[2].value] + cardValues[data.cards[3].value]

        
                console.log(houseScore);
                console.log(playerScore);
        })

    })
}

    function drawCards(count){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.cards.forEach(card => {
                    playerCards.innerHTML += `
                    <img src="${card.image}"/>`
                    playerScore += cardValues[card.value];
                    console.log(playerScore);
                    playGamePlayer();
                })
    })
}

        function playGamePlayer(){
            if(playerScore === 21 || houseScore === 21){
                messageEl.textContent = "BLACKJACK!";
                gameOver = true;
            } else if (playerScore > 21){
                messageEl.innerHTML = "You Bust! Gameover";
                gameOver = true;
            } else if (playerScore < 21) {
                messageEl.textContent = "Would you like to hit or stay?"
            }
        }

        function playGameHouse(){
            if(houseScore > 21) {
                messageEl.innerHTML = "House Busts! You win!";
                gameOver= true;
            } else if (houseCards < 17){
                messageEl.innerHTML = "House can draw another card";
            }
        }

    

        function stay(){
            // reveal 2nd housecard
            
        }

    hitBtn.addEventListener("click", ()=> drawCards(1));
    stayBtn.addEventListener("click", stay)


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
