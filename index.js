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
let houseCard1;
let houseCard2;
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
                messageEl.textContent = "Cards have been dealt";
                houseCard1 = data.cards[0].image;
                houseCard2 = data.cards[1].image;
                houseCards.innerHTML = `
                <img src="${houseCard1}" style="width: 200px; height: auto;"/>
                <img src="https://deckofcardsapi.com/static/img/back.png" style="width: 200px; height: auto;"/>`
                console.log(data.cards)
                houseCard2 = data.cards[1].image;

                playerCards.innerHTML =  `
                <img src="${data.cards[2].image}" style="width: 200px; height: auto;"/>
                <img src="${data.cards[3].image}" style="width: 200px; height: auto;"/>`
                        
                houseScore = cardValues[data.cards[0].value] + cardValues[data.cards[1].value]
                playerScore = cardValues[data.cards[2].value] + cardValues[data.cards[3].value]

        
                console.log(houseScore);
                console.log(playerScore);
        })

    })
}

    function drawCardsPlayer(count){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.cards.forEach(card => {
                    playerCards.innerHTML += `
                    <img src="${card.image}" style="width: 200px; height: auto;"/>`
                    playerScore += cardValues[card.value];
                    console.log(playerScore);
                    playGamePlayer();
                })
    })
}

    function drawCardsHouse(count){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.cards.forEach(card => {
                    houseCards.innerHTML += `
                    <img src="${card.image}" style="width: 200px; height: auto;"/>`
                    houseScore += cardValues[card.value];
                    playGameHouse();
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
            if (houseScore > 21) {
                messageEl.innerHTML = "House Busts! You win!";
            } else if (playerScore > houseScore) {
                messageEl.innerHTML = "You win!"
                gameOver = true;
            } else {
                messageEl.innerHTML = "House wins!"
                gameOver = true;
            }
        }

        function stay(){
             houseCards.innerHTML = `
                <img src="${houseCard1}" style="width: 200px; height: auto;"/>
                <img src="${houseCard2}" style="width: 200px; height: auto;"/>`;
                if (houseScore < 17 && houseScore < playerScore){
                    messageEl.textContent = "House can draw another card";
                    drawCardsHouse(1);
                } else if (houseScore > playerScore){
                    messageEl.textContent = "House wins!"
                    gameOver = true;
                } 
        }

    hitBtn.addEventListener("click", ()=> drawCardsPlayer(1));
    stayBtn.addEventListener("click", stay)
 