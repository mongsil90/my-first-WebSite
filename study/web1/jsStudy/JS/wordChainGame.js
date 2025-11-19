// ==== 요소 선택 ====
const startForm = document.querySelector(".startForm");
const headCount = document.querySelector(".headCount");

const wordGameForm = document.querySelector(".wordGameForm");
const wordInput = document.querySelector(".wordInput");
const wordSubmit = document.querySelector(".wordSubmit");

const users = document.querySelector(".users");
const userNumber = document.querySelector(".userNumber");
const lastWords = document.querySelector(".lastWords");
const gameOver = document.querySelector(".gameOver");


// reset 버튼 생성
let resetButton;
if (!resetButton) {
    resetButton = document.createElement("button");
    resetButton.className = "reset hidden";
    resetButton.textContent = "Reset Game 🚀";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

// ==== 1. 상태 통합 object ====
const state = {
    players: 0,
    turn: 1,
    words: [],
    prev: null,
    over: false
}


// ==== 표시/숨김 유틸 ====
function show(el) { if (el) el.classList.remove("hidden") };
function hide(el) { if (el) el.classList.add("hidden") };


// ==== 화면 랜더 전용 함수 ====
// 참가 인원 랜더링
function renderUsers() {
    users.textContent = state.players ? `참가자: ${state.players}명` : "";
}

// 참가자 순서 랜더링
function renderTurn() {
    userNumber.textContent = `[ ${state.turn} ] 번 참가자의 순서입니다.`;
}

// 단어 입력 후 꺽쇠 표시 랜더링
function appendWordToList(w) {
    lastWords.textContent += `${w} > `;
}

// 게임 종료 시 화면 랜더링
function endGameUI(msg) {
    gameOver.textContent = msg;
    state.over = true;
    wordInput.disabled = true;
    wordSubmit.disabled = true;
    show(resetButton);
}


// UI 초기화
function clearUI() {
    headCount.value = "";
    wordInput.value = "";
    lastWords.textContent = "";
    gameOver.textContent = "";
    users.textContent = "";
    userNumber.textContent = "";
    wordInput.disabled = false;
}


// ==== 순수 로직 함수 ====
// 단어 검증 함수
function validateWord(prev, curr, seen) {
    if (!curr || curr.length !== 3) return "3글자 단어가 아닙니다!";
    if (seen.has(curr)) return "중복된 단어입니다!";
    if (prev && prev.at(-1) !== curr.at(0)) return "잘못된 단어입니다!";
    return null;
}

// 순서 리턴 함수(마지막 순서 -> 첫 순서)
function nextTurn() {
    state.turn += 1;
    if (state.turn > state.players) state.turn = 1;
}


// ==== 초기화(리셋 버튼 클릭) ====
function resetGame() {
    state.players = 0;
    state.turn = 1;
    state.prev = null;
    state.words = [];
    state.over = false;

    clearUI();
    hide(wordGameForm);
    hide(resetButton);
    show(startForm);

    headCount.focus();
}


// ==== 3. 콜백 함수 ====
// 게임 시작 버튼 클릭 시 작동(참가 인원 입력)
function startGame(e) {
    e.preventDefault();

    const n = Number(headCount.value);
    if (!Number.isInteger(n) || n < 1) {
        alert("1명 이상의 인원 수를 숫자로 입력하세요!");
        headCount.textContent = "";
        headCount.focus();
        return;
    }

    state.players = n;
    renderUsers();
    renderTurn();

    hide(startForm);
    show(wordGameForm);

    wordInput.disabled = false;
    wordSubmit.disabled = false;

    wordInput.focus();
}

// 쿵쿵따 버튼 클릭 시 작동(단어 입력)
function handleWords(e) {
    e.preventDefault();

    if (state.over) return;

    const curr = wordInput.value.trim();
    const err = validateWord(state.prev, curr, new Set(state.words));

    if (err) {
        endGameUI(`${err} [ ${state.turn} ] 번 참가자, 탈락!`);
        return;
    }

    state.words.push(curr);
    state.prev = curr;

    appendWordToList(curr);
    wordInput.value = "";

    nextTurn();
    renderTurn();
}


// ==== 2. 이벤트 핸들러 ====
// 참가 인원 입력 시 작동
startForm.addEventListener("submit", startGame);

// 단어 제출 시 작동
wordGameForm.addEventListener("submit", handleWords);


// 초기 포커스
headCount.focus();
