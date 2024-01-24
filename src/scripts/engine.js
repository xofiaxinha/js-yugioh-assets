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
    button: document.getElementById('next-duel'),
}

const cards = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: ".src/assets/icons/dragon.png",
        winOf:[1],
        loseOf:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: ".src/assets/icons/magician.png",
        winOf:[2],
        loseOf:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: ".src/assets/icons/exodia.png",
        winOf:[0],
        loseOf:[1],
    }
]

const players = {
    player1: "player-field-card",
    player2: "computer-field-card",
}

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex].id;
}
async function getImage(id, player){
    const cardImage = document.createElement('img');
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", ".src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", id);
    cardImage.classList.add("card");

    if(player === players.player1){
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        })
    }
    
    cardImage.addEventListener("mouseover", () =>{
        drawSelectCard(id);
    })

    return cardImage;
}

async function drawCards(amount, playername){
    for(let i=0; i<amount; i++){
        const randomIdCard = await getRandomCardId();
        const image = await getImage(randomIdCard, playername);

        document.getElementById(playername).appendChild(image);
    }
}

function init(){
    drawCards(5, players.player1);
    drawCards(5, players.player2);
}

init();