const hint = document.getElementById("hintSection");
const answer = document.getElementById("answerSection");
const guess = document.getElementById("guess");
const userguess = document.getElementById("wordguess");
const check = document.getElementById("checkmyguess");
const restart = document.getElementById("restart");
const canvas = document.getElementById('hangman');
const context = canvas.getContext("2d");
const totalscore = document.getElementById("totalscore");
const gameover = new Audio("./music/gameover.mp3");
const select = new Audio("./music/move.mp3");
const wrong = new Audio("./music/wrong.mp3");

const draws = [
    'gallows',
    'head',
    'body',
    'rightArm',
    'leftArm',
    'rightLeg',
    'leftLeg'
];

let words = [
    ["TATA", "A steel company"],
    ["MUMBAI", "The city of joy"],
    ["CANBERRA", "The capital city of Australia"],
    ["BHUBANESWAR", "The capital city of Odisha"],
    ["ASIA", "The largest continent"],
    ["JUDGING", "Form an opinion or conclusion"],
    ["FANATICAL", "Excessively enthusiastic about something"],
    ["PASSIONATE", "Having or expressing strong emotions"],
    ["JUPITER", "The largest planent"],
    ["MANGALYAAN", "Mars Orbiter Mission"],
    ["AMAZON", "The largest forest"],
    ["INDUS", "The largest river in India"],
    ["INTERSTELLAR", "A sci-fi Adventure Movie"]
];

let word;
let str;
let count;
let totalGuesses;
let correctword;
let step;
var letters = /^[A-Za-z]+$/;
let score = 0;

startGame();

function startGame() {
    restart.style.visibility = "hidden";
    check.disabled = false;
    userguess.disabled = false;
    word = "";
    str = "";
    step = 0;
    let index = Math.floor(Math.random() * words.length);
    hint.innerText = words[index][1];
    for (let i = 0; i < words[index][0].length; i++) {
        str += "#";
    }
    answer.innerText = str;
    word = words[index][0];
    count = 0;
    totalGuesses = words[index][0].length + draws.length;
    guess.innerText = `Total guesses remaining ${totalGuesses}\nTotal wrong guesses ${step}/${draws.length}`;
    correctword = words[index][0];
}

check.addEventListener("click", () => {
    let value = userguess.value.toUpperCase();
    if (value.length === 1 && value.match(letters)) {
        if (word.includes(value)) {
            let index = word.indexOf(value);
            str = replaceAt(str, word.indexOf(value), value);
            word = replaceAt(word, index, " ");
            userguess.value = "";
            count++;
            totalGuesses--;
            answer.innerText = str;
            select.play();
        } else {
            wrong.play();
            userguess.value = "";
            totalGuesses--;
            drawHangman(draws[step++]);
        }
    } else {
        userguess.value = "";
        alert("Invalid input - please input alphabets only.");
    }

    guess.innerText = `Total guesses remaining ${totalGuesses}\nTotal wrong guesses ${step}/${draws.length}`;

    if (count === word.length) {
        score++;
        gameOver();
        totalscore.innerText = `Score: ${score}`;
        alert("Congrats!! You have won the game.");
    }

    if (step === draws.length) {
        answer.innerText = correctword;
        gameOver();
        gameover.play();
        alert("Game Over!! Better luck next time.");
    }
});

function replaceAt(string, index, replacement) {
    if (index < string.length) {
        return string.substring(0, index) + replacement + string.substring(index + 1);
    } else {
        return;
    }
}

function gameOver() {
    check.disabled = true;
    userguess.disabled = true;
    restart.style.visibility = "visible";
}

restart.addEventListener("click", () => {
    clearCanvas();
    startGame();
});

function drawHangman(draw) {
    switch (draw) {
        case "gallows":
            context.strokeStyle = 'black';
            context.lineWidth = 10;
            context.beginPath();
            context.moveTo(175, 225);
            context.lineTo(5, 225);
            context.moveTo(30, 225);
            context.lineTo(25, 5);
            context.lineTo(100, 5);
            context.lineTo(100, 25);
            context.stroke();
            break;

        case 'head':
            context.lineWidth = 5;
            context.beginPath();
            context.arc(100, 50, 25, 0, Math.PI * 2, true);
            context.fillStyle = "red";
            context.fill();
            context.closePath();
            context.stroke();
            break;

        case 'body':
            context.strokeStyle = "pink";
            context.beginPath();
            context.moveTo(100, 75);
            context.lineTo(100, 145);
            context.stroke();
            break;


        case 'rightArm':
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(60, 100);
            context.stroke();
            break;

        case 'leftArm':
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(140, 100);
            context.stroke();
            break;

        case 'rightLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(80, 190);
            context.stroke();
            break;

        case 'leftLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(125, 190);
            context.stroke();
            break;
    }
}

clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}




