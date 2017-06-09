/**
 * Created by Ivan on 09.06.2017.
 */
let weapons = ["rock", "scissors", "paper"];
let rules = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
};
let dict = {
    80: "paper",
    82: "rock",
    83: "scissors",
    112: "paper",
    114: "rock",
    115: "scissors"
};

let body = document.querySelector("body");
let sessionButton = document.querySelector("#newSession");
let displayResultButton = document.querySelector("#show");
let player = document.querySelector("#Player");
let computer = document.querySelector("#Computer");
let result = document.querySelector("#result");
let num = document.querySelector("#num");
let output = document.querySelector("#output");
let gameNumber = 0;
let playerChoice = '';
let computerChoice = '';
let start = 0;
let data = [];
let count = 0;

let removeAllClick = function () {
    for(let i=1;i<player.children.length;i++) {
        let playerChild = player.children[i];
        let computerChild = computer.children[i];
        playerChild.className = playerChild.className.replace(" playerClick", "")
        computerChild.className = playerChild.className.replace(" computerClick", "");
    }
};
let clearTable = function () {
    output.innerHTML = "<tr><th>№</th><th>Player</th> <th>Computer</th> <th>Result</th> </tr>";
};
let showTable =function () {
    updateTable();
    if(!(count %2)){
        output.style.visibility = "visible";
    } else {
        output.style.visibility = "hidden";
    }
    count++;
};
let computerChoose = function () {
    let randNum = Math.floor(Math.random() * 3);
    computer.children[1 + randNum].className += " computerClick";
    return weapons[randNum];
};

let game = function (playerChoice, computerChoice) {
    result.innerHTML = (function () {
        if (playerChoice === computerChoice) {
            return "FriendShip";
        } else if (rules[playerChoice] === computerChoice) {
            return "Player";
        } else {
            return "Computer";
        }
    })();
    gameNumber++;
    num.innerHTML = gameNumber;
    data.push([gameNumber, playerChoice, computerChoice, result.textContent]);
    updateTable();
};

let changeStyle = function(element) {
    element.className += " playerClick";
};
let updateTable = function() {
    clearTable();
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let row = data[i];
            for(let j = 0; j < row.length; j++) {
                let element = row[j];
                let td = document.createElement("td");
                let node = document.createTextNode(element);
                td.appendChild(node);
                tr.appendChild(td);
            }
            output.appendChild(tr);
        }
    }
};
let newSession = function () {
    data = [];
    removeAllClick();
    gameNumber = 0;
    start = 1;
    num.innerHTML = gameNumber;
    clearTable();
};
sessionButton.addEventListener("click", newSession);

displayResultButton.addEventListener("click", showTable);

player.addEventListener("mousedown", function (e){
    if (e.target.id !== 'Player' && e.target.tagName !== 'H4' && start) {
        removeAllClick();
        let element = e.target;
        playerChoice = element.className.replace("col-4 ", "");
        changeStyle(element);
        computerChoice = computerChoose();
        game(playerChoice, computerChoice);
    }
});

body.addEventListener("keypress", function(event){
    let key = event.keyCode;
    playerChoice = dict[key];
    if (start && playerChoice) {
        removeAllClick();
        changeStyle(document.querySelector("#Player ." + playerChoice));
        computerChoice = computerChoose();
        game(playerChoice, computerChoice);
    }
    console.log(key);
    if (key === 110 || key === 78 ) {
        newSession();
    } else if (key === 122 || key === 90) {
        showTable();
    }
});