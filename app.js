
const gameArea = document.getElementById('cellContainer');
const win = document.getElementById("winner");
const cell = document.getElementsByClassName("cell");
const letter = document.getElementsByClassName("letter");
const newGameBtn = document.getElementById("newGameBtn");
const onePlayerBtn = document.getElementById("onePlayerBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const playerTwo = document.getElementById("playerTwo");
const playerone = document.getElementById("playerOne");

let running = true;
let winner = "";
let currentPlayer = randNum;
let count = 0;
let positions = ["", "", "", "", "", "", "", "", ""];
let emptyCells = [];
let chosenMode = "";
let hasPosition = false;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

win.innerHTML = "Start Game!";

function twoPlayer() {
    document.getElementById("twoPlayerBtn").classList.add("modeSelected");

    if (chosenMode === "onePlayer") {
        window.location.reload();
        document.getElementById("onePlayerBtn").classList.add("modeSelected");
        document.getElementById("twoPlayerBtn").classList.remove("modeSelected");
    }
    randNum();
    chosenMode = "twoPlayer";
    function turnChange(event) {

        if (running) {
            win.innerHTML = "";

            let target = event.target;
            const cellIndex = target.getAttribute("cellIndex");
            if (target.innerText === "") {
                if (currentPlayer == "O") {
                    document.getElementById("playerTwo").classList.add("turnBorder");
                    document.getElementById("playerOne").classList.remove("turnBorder");
                    currentPlayer = "X";
                } else if (currentPlayer == "X") {
                    document.getElementById("playerOne").classList.add("turnBorder");
                    document.getElementById("playerTwo").classList.remove("turnBorder");
                    currentPlayer = "O"
                }
            }

            if (positions[cellIndex] === "") {
                positions[cellIndex] = currentPlayer;
                if (target.innerText === "") {
                    target.innerText = currentPlayer;
                }
            }
        }

        for (let i = 0; i < winConditions.length; i++) {

            let currArr = winConditions[i];
            let firstElement = positions[currArr[0]];
            let secondElement = positions[currArr[1]];
            let thirdElement = positions[currArr[2]];

            if (firstElement == "" || secondElement == "" || thirdElement == "") {
                continue;
            }

            if (firstElement == secondElement && secondElement == thirdElement && running == true) {

                const winArr = winConditions[i];
                for (let i = 0; i < winArr.length; i++) {
                    const elementId = winArr[i];
                    document.getElementById(elementId).classList.add("winnerCells");
                }

                if (currentPlayer === "X") {
                    if (document.getElementById("playerOne").value.length > 0) {
                        win.innerHTML = document.getElementById("playerOne").value + " won!";
                    } else {
                        win.innerHTML = "X won!";
                    }

                } else if (currentPlayer === "O") {

                    if (document.getElementById("playerTwo").value.length > 0) {
                        win.innerHTML = document.getElementById("playerTwo").value + " won!";
                    } else {
                        win.innerHTML = "O won!";
                    }
                }
                winner = currentPlayer;
                running = false;
            }
        }
        if (!positions.includes("") && running) {
            win.innerHTML = "Draw";
            document.getElementById("names").classList.add("drawBorder");
            document.getElementById("playerOne").classList.remove("turnBorder");
            document.getElementById("playerTwo").classList.remove("turnBorder");
        }
    }
    gameArea.addEventListener("click", turnChange);
}

win.innerHTML = "Start Game!";

function onePlayer() {
    win.innerHTML = "Start Game!";
    document.getElementById("onePlayerBtn").classList.add("modeSelected");

    if (chosenMode === "twoPlayer") {
        window.location.reload();
        document.getElementById("twoPlayerBtn").classList.add("modeSelected");
        document.getElementById("onePlayerBtn").classList.remove("modeSelected");
    }
    chosenMode = "onePlayer";
    playerTwo.value = "Computer";
    function turnChangeOne(event) {

        if (running) {
            win.innerHTML = "";
            let target = event.target;
            const cellIndex = target.getAttribute("cellIndex");

            if (positions[cellIndex] === "") {
                positions[cellIndex] = "X";
                if (target.innerText === "") {
                    target.innerText = "X";
                    for (let i = 0; i < positions.length; i++) {
                        if (positions[i] === "") {
                            emptyCells.push(i);
                            count++;
                        }
                    }

                    let randPos = Math.floor(Math.random() * emptyCells.length);
                    randPos = emptyCells[randPos];

                    for (let i = 0; i < winConditions.length; i++) {
                        let currArr = winConditions[i];
                        let firstElement = positions[currArr[0]];
                        let secondElement = positions[currArr[1]];
                        let thirdElement = positions[currArr[2]];

                        //Better than guess for computer
                        if (firstElement != "" && secondElement != "" || thirdElement != "" && secondElement != "") {
                            if (firstElement === secondElement || secondElement === thirdElement) {
                                for (let j = 0; j < currArr.length; j++) {
                                    if (positions[currArr[j]] === "" && hasPosition === false && running) {
                                        document.getElementById(currArr[j]).innerHTML = "O";
                                        positions[currArr[j]] = "O";
                                        hasPosition = true;
                                    }
                                }
                            }
                        }
                    }
                    if (running && emptyCells.length > 0 && hasPosition === false) {
                        document.getElementById(randPos).innerHTML = "O";
                        positions[randPos] = "O";
                        hasPosition = true;
                    }
                }
                hasPosition = false;
                emptyCells = [];
            }

            for (let i = 0; i < winConditions.length; i++) {
                let currArr = winConditions[i];
                let firstElement = positions[currArr[0]];
                let secondElement = positions[currArr[1]];
                let thirdElement = positions[currArr[2]];

                if (firstElement === "" || secondElement === "" || thirdElement === "") {
                    continue;
                }

                if (firstElement === secondElement && secondElement === thirdElement && running) {
                    const winArr = winConditions[i];
                    for (let i = 0; i < winArr.length; i++) {
                        const elementId = winArr[i];
                        document.getElementById(elementId).classList.add("winnerCells");
                    }
                    if (secondElement === "X" || firstElement === "X" || thirdElement === "X") {
                        win.innerHTML = "You won!";
                        winner = "X"
                        running = false;
                    } else if (secondElement == "O") {
                        win.innerText = "Computer Won!";
                        running = false;
                    }
                }
            }
            if (!positions.includes("") && running) {
                win.innerHTML = "Draw";
                document.getElementById("names").classList.add("drawBorder");
                running = false;
            }
        }
    }
    gameArea.addEventListener("click", turnChangeOne);
}

function randNum() {
    const randNum = Math.floor(Math.random() * 2);
    if (randNum === 0) {
        currentPlayer = "O";
        document.getElementById("playerOne").classList.add("turnBorder");
        document.getElementById("playerTwo").classList.remove("turnBorder");
    } else if (randNum === 1) {
        currentPlayer = "X";
        document.getElementById("playerTwo").classList.add("turnBorder");
        document.getElementById("playerOne").classList.remove("turnBorder");
    }
}

function newGame() {
    win.innerHTML = "Start Game!";
    count = 0;
    hasPosition = false;
    running = true;
    winner = "";
    positions = ["", "", "", "", "", "", "", "", ""];
    emptyCells = [];
    currentPlayer = randNum;

    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = "";
    }
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).classList.remove("winnerCells");
    }
    if (chosenMode === "onePlayer") {
    } else if (chosenMode === "twoPlayer") {
        twoPlayer();
    }
    document.getElementById("playerOne").classList.remove("turnBorder");
    document.getElementById("playerTwo").classList.remove("turnBorder");
    document.getElementById("names").classList.remove("drawBorder");
}

twoPlayerBtn.addEventListener("click", twoPlayer);
onePlayerBtn.addEventListener("click", onePlayer);
newGameBtn.addEventListener("click", newGame);


