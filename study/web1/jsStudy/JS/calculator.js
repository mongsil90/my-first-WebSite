const calForm = document.querySelector(".calForm");
const numberInput = document.querySelector(".numberInput");
const resultEl = document.querySelector(".result");
const errorEl = document.querySelector(".error");


// 파싱
function parseExpression(str) {
    // 입력 값과 정규 표현식 매칭
    const re = /^\s*([+-]?\d*\.?\d+)\s*([+\-*/])\s*([+-]?\d*\.?\d+)\s*$/
    const m = str.match(re);

    if (!m) return null;
    
    // 파싱 결과 저장
    const a = parseFloat(m[1]);
    const op = m[2];
    const b = parseFloat(m[3]);

    if (Number.isNaN(a) || Number.isNaN(b)) return null;
    return {a, op, b};
}

// 계산식 객체
const OPS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b === 0 ? NaN : a / b),
}

// 계산 함수
function calculate(a, op, b) {
    const fn = OPS[op];

    if (!fn) return NaN;
    return fn(a, b); // <-- a, b는 객체 안의 함수로 전달할 매개 변수
}


// UI 핸들러
function handleCal(e) {
    e.preventDefault();

    // 입력 값을 파싱하기
    const inputValue = numberInput.value;
    const parsed = parseExpression(inputValue);

    if (!parsed) {
        showError("형식이 올바르지 않습니다.");
        return; // <-- 리턴 이유? 이후로 진행되는 것을 막기 위해서.
    }

    // 파싱한 데이터 계산하기
    const {a, op, b} = parsed;
    const result = calculate(a, op, b);

    if (!Number.isFinite(result)) {
        showError(op === "/" && b === 0 ? "0으로 나눌 수 없습니다." : "사칙 연산만 가능합니다.");
        return numberInput.value = a; 
    }

    // 입력 유지 + 결과 별도 표시
    showResult(`${a} ${op} ${b} = ${result}`);
    numberInput.value = result;
}


// 에러 메시지 함수
function showError(text) {
    errorEl.textContent = text;
}

// 결과 출력 함수
function showResult(text) {
    const li = document.createElement("li");
    li.textContent = text;
    document.body.append(li);
}

numberInput.focus();
calForm.addEventListener("submit", handleCal);