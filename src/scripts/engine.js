const state ={
    score:{
        player:0,
        computer:0,
        scoreBox: document.getElementById('score_points'),
    },
    cardSprites:{
        avatar:document.getElementById('card-image'),
        name:document.getElementById('card-name'),
        type:document.getElementById('card-type'),
    },
    fieldCards:{
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    players: {
        player1: "player",
        player1Box: document.querySelector(".card-box.framed#player"),
        player2: "computer",
        player2Box: document.querySelector(".card-box.framed#computer"),
    },
    button: document.getElementById('next-duel'),
}

const cards = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "./src/assets/icons/dragon.png",
        winOf:[1],
        loseOf:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: "./src/assets/icons/magician.png",
        winOf:[2],
        loseOf:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: "./src/assets/icons/exodia.png",
        winOf:[0],
        loseOf:[1],
    }
]

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cards[index].img;
    state.cardSprites.name.innerText = cards[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cards[index].type;
}
async function checkDuel(playerCardId, computerCardId){
    let duelResult = "Empate";
    let playerCard = cards[playerCardId];

    if(playerCard.winOf.includes(computerCardId)){
        duelResult = "Ganhou";
        state.score.player++;
        playAudio("win");}
    else if(playerCard.loseOf.includes(computerCardId)){
        duelResult = "Perdeu";
        state.score.computer++;
        playAudio("lose");}
    return duelResult;
}
async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.player} | Lose: ${state.score.computer}`;
}
async function drawButton(text){
    state.button.innerText = text;
    state.button.style.display = "block";
}

async function setCardsField(id){
    await removeAllCardsImage();

    let computerCard = await getRandomCardId();
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cards[id].img;
    state.fieldCards.computer.src = cards[computerCard].img;

    let duelResult = await checkDuel(id, computerCard);
    //console.log(duelResult);

    await updateScore();
    await drawButton(duelResult);
}
async function removeAllCardsImage(){
    let cards = state.players.player1Box;
    let imgElementts = cards.querySelectorAll("img");
    imgElementts.forEach(element => {
        element.remove();
    });

    cards = state.players.player2Box;
    imgElementts = cards.querySelectorAll("img");
    imgElementts.forEach(element => {
        element.remove();
    });
}

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex].id;
}
async function getImage(id, player){
    const cardImage = document.createElement('img');
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", id);
    cardImage.classList.add("card");

    if(player === state.players.player1){
        cardImage.addEventListener("mouseover", () =>{
            drawSelectCard(id);
        })
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        })
    }
    

    return cardImage;
}
async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}
async function drawCards(amount, playername){
    for(let i=0; i<amount; i++){
        const randomIdCard = await getRandomCardId();
        const image = await getImage(randomIdCard, playername);

        document.getElementById(playername).appendChild(image);
    }
}

function init(){
    drawCards(5, state.players.player1);
    drawCards(5, state.players.player2);
}
function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    init();
}

init();