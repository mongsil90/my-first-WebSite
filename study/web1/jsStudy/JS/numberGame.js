// 요소 가져오기
const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");

const leftoverChance = document.querySelector(".leftoverChance");
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");


// 난수 생성 변수
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);


// resetButton 정의
let resetButton;

// 사용자 턴 수
let userTurns = 1;
guessField.focus();


//callback function

// checkGuess
function checkGuess(event) {
    event.preventDefault();
    const inputValue = Number(guessField.value);

    // 입력 값 저장
    if (userTurns === 1) {
        guesses.textContent = "Previous Guesses: ";
    }
    guesses.textContent += inputValue + " ";

    // 정답? 오답?
    if (inputValue === randomNumber) {
        lastResult.textContent = "Correct! 🎉";
        setGameOver();
    } else if (userTurns === 10) {
        lastResult.textContent = "Game Over.. 😢";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong Number! ❌";
        let userchange = 10 - userTurns;
        leftoverChance.textContent = `You have [ ${userchange} ] chances left`;
        if (inputValue > randomNumber) {
            lowOrHi.textContent = "Too high! 🔺";
        } else if (inputValue < randomNumber) {
            lowOrHi.textContent = "Too low! 🔻";
        }
    }

    userTurns++;
    guessField.value = "";
    guessField.focus();
}

// setGameOver
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    lowOrHi.textContent = "";
    
    // 리셋 버튼 만들기
    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game! 🚀";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

// setResetGame
function resetGame() {
    userTurns = 1;

    // 결과 문단 지우기
    const resultParas = document.querySelectorAll(".resultParas p");
    for (const para of resultParas) {
        para.textContent = "";
    }

    // resetButton 지우기
    resetButton.remove();

    // 입력 칸, 버튼 살리기
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.focus();

    // 난수 재생성
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(randomNumber);
}

// event listener
guessSubmit.addEventListener("click", checkGuess);
