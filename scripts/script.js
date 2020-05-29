let playerSelection, computerSelection, 
    gameState = false, 
    playerScore, computerScore,
    rounds, roundsPlayed;

const options = ["Rock", "Paper", "Scissors"];
const win = "You win!", lose = "You lose!", tie = "You tied!";
const result = document.querySelector('#result');
const scorePara = document.querySelector('#score');
const userChoices = document.querySelectorAll('.choice');
const btn = document.querySelector('#btn');


// Standardize user input
function capitalize(word) {
    return upWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
}


// Select random value from options
function computerPlay() {
    return options[Math.floor(Math.random() * 3)];
}


// Round logic
function playRound(playerSelection, computerSelection) {
    playerSelection = capitalize(playerSelection);
    if ((playerSelection == options[0] && computerSelection == options[2]) || (playerSelection == options[1] && computerSelection == options[0]) || (playerSelection == options[2] && computerSelection == options[1])) {
        return win + ` ${playerSelection} beats ${computerSelection}.`;
    } else if (playerSelection == computerSelection) {
        return tie + ` You both selected ${playerSelection}.`;
    } else {
        return lose + ` ${computerSelection} beats ${playerSelection}.`;
    }
}


// When button is clicked, begin new game
btn.addEventListener('click', function() {
    if (!gameState) {
        game();
    } else {
        window.alert("Game is already in progress");
    }
});


userChoices.forEach((choice) => {
    
    // for each choice, play a round
    choice.addEventListener('click', (e) => {
        if (gameState) {
            roundsPlayed++;
            computerSelection = computerPlay();
            roundEnd = playRound(choice.id, computerSelection);
            // display round results and update scores
            result.textContent = roundEnd;
            if (roundEnd.includes("win")) {
                playerScore++;
            }
            else if (roundEnd.includes("lose")) {
                computerScore++;
            }

            updateScores(playerScore, computerScore, roundsPlayed);
        }
    });
});


// Start new game
function game() {
    roundsPlayed = playerScore = computerScore = 0;
    gameState = true;
    // Check if user input is a valid integer
    rounds = window.prompt("How many rounds do you want to play?");
    while (!Number.isInteger(+rounds) || !rounds || +rounds < 1) {
        rounds = window.prompt(`${rounds} is not a valid round number. Please try again.`);
    }
    result.innerHTML = `May luck be on your side!`;
    scorePara.classList.remove("fadeIn");
    changeContent(`&nbsp;`, `#000`);
    btn.textContent = `Play`;
}


// check for game end
function updateScores(playerScore, computerScore, roundsPlayed) {
    // if it's still going, update score
    if (roundsPlayed !== +rounds) {
        scorePara.textContent = `Score: ${playerScore} - ${computerScore}`;
    }
    // If not, show final result
    else {
        if (playerScore > computerScore) {
            scorePara.classList.add("fadeIn");
            changeContent(`Congrats! You are the winner :)`, `green`);
        }
        else if (playerScore < computerScore) {
            scorePara.classList.add("fadeIn");
            changeContent(`I'm sorry, you lost! :(`, `red`);
        } else {
            scorePara.classList.add("fadeIn");
            changeContent(`Looks like it's a tie.`, `blue`);
        }
        result.innerHTML = `&nbsp;`;
        btn.textContent = `Play Again`;
        // and end the game
        gameState = false;
    }
}


function changeContent(text, color) {
    scorePara.innerHTML = text;
    scorePara.style.color = color;
}