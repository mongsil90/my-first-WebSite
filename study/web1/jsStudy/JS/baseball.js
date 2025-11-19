// ==== 요소 가져오기 ====
const startForm = document.querySelector(".startForm");
const startBtn = document.querySelector(".startBtn");
const playForm = document.querySelector(".playForm");
const inputNumber = document.querySelector(".inputNumber");
const submitNumber = document.querySelector(".submitNumber");
const resultEl = document.querySelector(".result");
const logEl = document.querySelector(".log");


let resetButton;

// 상태 객체
const state = {
    secretNumbers: [],
    turn: 1,
    history: [],
}

// 사라지고 나타나고
function show(el) { if (el) el.classList.remove("hidden") };
function hide(el) { if (el) el.classList.add("hidden") };



// ==== 게임 리셋 ====
// 리셋 버튼
function resetBtn() {
    inputNumber.disabled = true;
    submitNumber.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

// 게임 리셋
function resetGame() {
    
    // UI 전환
    hide(resetButton);
    hide(playForm);
    show(startBtn);

    inputNumber.disabled = false;
    submitNumber.disabled = false;
    inputNumber.value = "";

    resultEl.textContent = "";
    logEl.textContent = "";
}


// ==== 3자리 비밀 숫자 중복 없이 생성 ====
function setSecretNumber() {
    state.secretNumbers = []; // <-- 초기화 (굳이 초기화 해야하나?)

    while (state.secretNumbers.length < 3) {
        const num = Math.floor(Math.random() * 10);

        if (!state.secretNumbers.includes(num)) {
            state.secretNumbers.push(num);
        }
    }
    console.log(state.secretNumbers); // 디버깅용
}



// ==== 입력 값 판별 ====
function matchNumber(guess) {
    // guess : [n, n, n]

    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
        if (guess[i] === state.secretNumbers[i]) {
            strike++;
        } else if (state.secretNumbers.includes(guess[i])) {
            ball++;
        }
    }

    const out = strike === 0 && ball === 0;
    return { strike, ball, out };    
}


// 정확히 3자리 숫자인지 판별
function toDigits3(input) {

    const s = String(input).trim();      // 입력 값을 빈 칸 없는 문자열로 저장
    if (!/^\d{3}$/.test(s)) return null; // 정확히 3자리 숫자가 아니면 null 반환

    const arr = Array.from(s, Number);
    
    if (new Set(arr).size !== arr.length) return null; // 중복 제거 후 길이 비교
    return arr;
}


// ===== UI 핸들러 =====
function clickPitch(e) {
    e.preventDefault();

    const verified = toDigits3(inputNumber.value);

    // 압력 숫자에 중복이 있으면 에러 메시지 출력
    if (!verified) {
        inputNumber.value = "";
        resultEl.textContent = "중복되지 않은 3자리 숫자를 입력하세요!";
        inputNumber.focus();
        return;
    } 

    const { strike, ball, out } = matchNumber(verified);


    // 결과 표시
    if (strike === 3) {
        resultEl.textContent = `3 Strike! 승리!🎉 (정답: ${state.secretNumbers.join("")})`;
        resetBtn();
        return;
    } else if (state.turn >= 9) {
        const gameOver = document.createElement("p");
        gameOver.textContent = `패배! 다시 도전하세요! (정답: ${state.secretNumbers.join("")})`;
        document.body.append(gameOver);
        resetBtn();
    } else {
        resultEl.textContent = out ? "OUT" : `${strike}S, ${ball}B`;
    }


    // 결과 저장
    const div = document.createElement("div");
    div.textContent += `${state.turn}회: ${verified.join("")} → ${resultEl.textContent}`;
    logEl.appendChild(div);

    state.turn += 1;
    inputNumber.value = "";
    inputNumber.focus();
}


// Game Start
function gameStart(e) {
    e.preventDefault();

    // UI 전환
    hide(startBtn);
    show(playForm);

    state.turn = 1;
    inputNumber.focus();
    setSecretNumber();
}



// 이벤트 리스너
playForm.addEventListener("submit", clickPitch);
startForm.addEventListener("submit", gameStart);

