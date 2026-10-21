const boxes = document.querySelectorAll(".box");
let player1 = true;
let chance = document.querySelector("#chance");
let newGame = document.querySelector(".newGame");
let newGameId = document.querySelector("#newGame");
let msg = document.querySelector("#msg");
let reset = document.querySelector("#reset");
let gameOver = false;

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

newGameId.addEventListener("click",()=>{
    player1 = true;
    for(let box of boxes)
    {
        box.innerText = "";
        box.style.backgroundColor = "lightcoral";
        box.style.pointerEvents = "auto";
    }
    chance.innerText = "Player X turn!";
    newGame.style.display="none";
    gameOver = false;
})

const checkWin = () =>{
    for(let pattern of winPattern)
    {
        let box1 = boxes[pattern[0]].innerText;
        let box2 = boxes[pattern[1]].innerText;
        let box3 = boxes[pattern[2]].innerText;
        console.log(box1 , box2 , box3);
        if(box1 !== "" && box1 === box2 && box2 === box3)
        {
            newGame.style.display = "block";
            msg.innerText = player1=== true ? "Congratulations Player X Won" : "Congratulations Player O Won";
            chance.innerText = "Game Over!";
            gameOver = true;
            return;
        }
    }
    const isDraw = [...boxes].every(box => box.innerText !== "");

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        newGame.style.display = "block";
        chance.innerText = "Game Over!";
        gameOver = true;
    }
}

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents="auto";
        box.style.backgroundColor = "lightcoral";
    });

    player1 = true;
    gameOver = false;
    chance.innerText = "Player X turn!";
    newGame.style.display = "none";
};

reset.addEventListener("click",()=>{
    resetGame();
})

const startGame = (box) =>{
    if(box.innerText !== "" || gameOver)
    {
        return;
    }
    if(player1 === true)
    {
        chance.innerText = "Player O turn!";
        box.innerText = "X";
        box.style.pointerEvents = "none";
        box.style.backgroundColor = "rgb(244, 211, 211)";
        checkWin();
        player1 = false;
    }
    else
    {
        chance.innerText = "Player X turn!";
        box.innerText = "O";
        box.style.pointerEvents = "none";
        box.style.backgroundColor = "rgb(244, 211, 211)";
        checkWin();
        player1 = true;
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        startGame(box);
    })
})
