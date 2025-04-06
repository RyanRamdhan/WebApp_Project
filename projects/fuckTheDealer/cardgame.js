const cardOrder = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const cards = {'A': 4,'2': 4,'3': 4,'4': 4,'5': 4,'6': 4,'7': 4,'8': 4,'9': 4,'10': 4,'J': 4,'Q': 4,'K': 4};
const buttons = document.querySelectorAll(".button");
let correctCard = null;
let guessCount = 0;

function selectCard(){
    let cardsLeft = false;
    for(const card in cards){
        if(card > 0){
            cardsLeft = true;
        }  
    }
    if(!cardsLeft){
        console.log("No cards Left. Game Over!");
        return null;
    }
    const cardNames = Object.keys(cards);
    const cardIndex = Math.floor(Math.random() * cardNames.length);
    let card = cardOrder[cardIndex];
    cards[card]--;

    if(cards[card] == 0){
        delete cards[card];
    }
    
    return card;
}

function startGame(){
    document.getElementById("output").textContent = "Guess The Card";
    correctCard = selectCard();
    if(!correctCard) return;
    console.log("New Round", correctCard);
    guessCount = 0;

    buttons.forEach(button => {
        button.addEventListener("click", handleFirstGuess);
    });


}

function handleFirstGuess(event){
    const clickedCard = event.target.textContent;
    console.log("You picked:", clickedCard);

    if (clickedCard == correctCard) {
        document.getElementById(correctCard).textContent = cards[clickedCard] + " left";
        document.getElementById("output").textContent = "Correct!";
        console.log("Correct!");
        
        nextRound();
    } else {
        guessCount++;
        if(cardOrder.indexOf(clickedCard)<cardOrder.indexOf(correctCard)){
            document.getElementById("output").textContent = "Higher";
            console.log("Higher");
            buttons.forEach(button => {
                button.removeEventListener("click", handleFirstGuess);
                button.addEventListener("click", handleSecondGuess);
            });
        }
        else{
            document.getElementById("output").textContent = "Lower";
            console.log("Lower");
            buttons.forEach(button => {
                button.removeEventListener("click", handleFirstGuess);
                button.addEventListener("click", handleSecondGuess);
            });
        }


    }
}
function handleSecondGuess(event){
    const clickedCard = event.target.textContent;
    console.log("You picked:", clickedCard);

    if (clickedCard === correctCard) {
        document.getElementById(correctCard).textContent = cards[clickedCard] + " left";
        document.getElementById("output").textContent = "Correct!";
        console.log("Correct!");
        nextRound();
    } else {
        document.getElementById(correctCard).textContent = cards[clickedCard] + " left";
        document.getElementById("output").textContent = "You Lost :(";
        console.log("You Lost");
        nextRound();

    }
}








function nextRound(){
    buttons.forEach(button => {
        if (guessCount == 0){
            button.removeEventListener("click", handleFirstGuess);
        }
        else{
            button.removeEventListener("click", handleSecondGuess);
        }
        
    });
    

    if (Object.keys(cards).length > 0) {
        setTimeout(startGame, 1000); // Start new round after 1 second
    } else {
        document.getElementById("output").textContent = "🎉 Game over! No more cards.";
        console.log("🎉 Game over! No more cards.");
    }

}
startGame();