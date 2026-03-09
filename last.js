window.addEventListener("load", () => {
    init();
});

// 전역 변수
let pageIndex = 0;
let talkIndex = 0;

let talk;
let nextPageBtn;

function init() {
    stage2Input(); // 가장 먼저 실행해야 함
    stage3Remove(); // 먼저 실행

    ////////////////////////////////////////////////
    // DOM 가져오기
    talk = document.getElementById("talk");
    nextPageBtn = document.querySelector("#nextPage-btn");

    bind();
    talk.innerHTML = pageContent[pageIndex][talkIndex];
}

function bind() {
    sessionRemove();

    bindMainMove();
    // fragContent();
    bindGame();
}

////////////////////////////////////////////////
// 메인 페이지 이동
function bindMainMove() {

    const btn_main = document.querySelector("#btn-main");

    btn_main.addEventListener("click", () => {
        window.location.href = "./home.html";
    });
}

////////////////////////////////////////////////
// fragment 숫자 넣기
function fragContent() {
    const frag1 = document.getElementById("frag1");
    const frag2 = document.getElementById("frag2");
    const frag3 = document.getElementById("frag3");

    const a = atob("MjMw"); // 230
    const b = atob("MzU3"); // 357
    const c = atob("NTE5"); // 519

    frag1.innerHTML += "첫번째: " + a;
    frag2.innerHTML += "두번째:<br> " + b;
    frag3.innerHTML += "세번째: " + c;
}

////////////////////////////////////////////////
// 말풍선 내용

// 0
const talkContent_0 = [
    "안녕!!! 만나서 반가워!",
    "이 게임은 3개의 스테이지로 이루어져 있고,<br>각 스테이지의 정답은 3자리의 숫자 조각 3개로 이루어져 있어.",
    "3개의 숫자 조각을 찾아서 순서대로 입력하고<br>정답 버튼을 누르면 다음 스테이지로 넘어갈 수 있어.",
    "그리고 이 게임은 모든 스테이지에서<br>'개발자 도구'를 사용할 거야.",
    "우선, 개발자 도구 창을 켜볼까?<br><br>우클릭 하고 '검사' 버튼을 누르거나,<br> F12 버튼을 눌러서 개발자 도구 창을 켜줘!",
    "개발자 도구를 켰으면, '넘어가기' 버튼을 눌러줘."
];

// 1
const talkContent_1_0 = [
    "개발자 도구의 위쪽을 보면,<br> 가장 먼저 'Elements' 페이지가 켜져있을 거야.",
    "개발자 도구는 크게 3가지 영역이 있어",
    "1. 상단 탭 영역 (Elements, Console 등의 탭이 보일 거야)<br>2. 왼쪽 패널 (코드나 DOM이 보일 거야)<br>3. 오른쪽 패널 (styles 등의 탭이 보일 거야)",
    "첫번째 스테이지에 대해서 설명할게!",
    "첫번째 스테이지는 오른쪽 패널의 styles 탭을 이용할 거야.",
    "지금은 보이지 않지만, 이 페이지 안에<br>첫번째 스테이지를 풀 수 있는 정답이 숨겨져 있어.",
    "그리고 styles를 이용해서 숨겨진 정답을 찾을 거야!",
    "자 그럼 첫번째 스테이지를 시작해볼까?<br>'넘어가기' 버튼을 눌러줘!"
];

// 2
const talkContent_1_1 = [
    "첫번째 조각은 정답 입력창 아래에 있어.<br>하지만 보이지 않게 숨어 있어서 찾기가 어렵지!",
    "개발자 도구의 styles를 조작해서 첫번째 조각을 찾아줘!",
    "첫번째 조각을 찾았다면, '넘어가기' 버튼을 눌러줘!<br>그러면 두번째 조각이 나타날 거야!"
];

// 3
const talkContent_1_2 = [
    "두번째 조각은 내 뒤에 있어!<br>하지만 나보다 밑에 있어서 보이지 않을 걸?",
    "개발자 도구의 styles를 조작해서 두번째 조각을 찾아줘!",
    "두번째 조각을 찾았다면, '넘어가기' 버튼을 눌러줘!<br>그러면 세번째 조각이 나타날 거야!"
];

// 4
const talkContent_1_3 = [
    "짠! 세번째 조각이 나타났어!<br>하지만 세번째 조각이 너무 흐리게 보이지?",
    "개발자 도구의 styles를 조작해서<br>세번째 조각이 선명하게 보이게 만들어보자!",
    "그리고 첫번째, 두번째, 세번째 조각을 순서대로 입력하고<br>정답 버튼을 누르면 다음 스테이지로 넘어갈 수 있을 거야!"
];

// 5
const talkContent_2_0 = [
    "와 정답이야!",
    "이제 두번째 스테이지를 풀어볼까?",
    "이번 스테이지는 개발자 도구의 'Application' 탭을 이용할 거야.",
    "Application 탭은 웹사이트가 저장해 둔<br>데이터를 확인하고 수정할 수 있는 곳이야.",
    "Local Storage, Session Storage, Cookies<br>같은 것들이 저장되어 있지.",
    "이곳에서는 웹사이트가 기억하고 있는 값들을 볼 수도 있고,<br>필요하다면 값을 수정하거나 새로 추가할 수도 있어.",
    "이번 스테이지의 단서는 그 중 Session Storage 안에 숨어 있어!",
    "이제 '넘어가기' 버튼을 이용해 두번째 스테이지를 시작해볼까?"
];

// 6
const talkContent_2_1 = [
    "두번째 스테이지의 첫번째 조각은<br>Session Storage에 바로 저장되어 있어.",
    "'첫번째 조각'이라고 되어있는 Session Storage를 찾아보자!",
    "첫번째 조각을 찾았다면, '넘어가기' 버튼을 눌러줘."
]

// 7
const talkContent_2_2 = [
    "두번째 조각은 Session Storage의 '두번째 조각'이 true가 되면 나올 거야!",
    "콘솔 창을 이용해서 '두번째 조각'의 Value를 true로 만들어보자!",
    "두번째 조각을 찾았다면, '넘어가기' 버튼을 눌러줘."
]

// 8
const talkContent_2_3 = [
    "앗! sessionStorage에 가짜 조각이 나타났어!",
    "콘솔 창을 이용해서 '가짜 조각'을 지우면 진짜 조각이 나타날 거야!",
    "세번째 조각까지 모두 찾았다면, 조각을 순서대로 입력하고 정답을 눌러줘!"
]

// 9
const talkContent_3_0 = [
    "와! 잘했어! 벌써 마지막 스테이지네?",
    "마지막 스테이지는 개발자 도구의 'Sources' 탭을 이용할 거야.",
    "Sources 탭에서는 HTML, CSS, JavaScript 등<br>이 사이트를 움직이고 있는 코드 파일을 볼 수 있어.",
    "특히, Sources 탭에서는 '디버그 모드(Debugger)'를 주로 사용해.",
    "디버그 모드를 사용하면 프로그램을 잠깐 멈추고,<br>코드가 어떤 순서로 실행되는지 한 줄씩 보거나<br>멈춘 상태의 변수 값도 확인할 수 있지!",
    "Sources 탭에서 'last.js'를 선택하고, 코드를 열어줘.",
    "자, 이제 '넘어가기' 버튼을 이용해 마지막 스테이지를 시작해보자!"
]

// 10
const talkContent_3_1 = [
    "먼저 'breakpoint 1'을 검색하고,<br>그 줄에 breakpoint를 걸어줘!",
    "'첫번째_조각'이 보이지만 무슨 값인지 알 수 없지?",
    "이제 <strong>'다시실행'</strong> 버튼을 클릭하면 breakpoint에 멈추면서<br>오른쪽의 Scope에 첫번째 조각의 값이 보일 거야!<br><strong>절대 새로고침을 하면 안 되고, 꼭 '다시 실행' 버튼을 눌러줘!</strong><br>값을 찾았다면 상단의 Resume 버튼이나 키보드의 F8을 눌러서 계속 진행해줘!",
    "첫번째 조각을 찾았다면, 넘어가기를 눌러줘."
]

// 11
const talkContent_3_2 = [
    "이제 다시 코드에서 'breakpoint 2'를 검색하고,<br>그 줄에 breakpoint를 걸어줘!",
    "'두번째_조각'의 값이 계속 변하고 있지?",
    "<strong>'다시실행'</strong> 버튼을 클릭하고,<br>개발자 도구의 'step over(한 줄 실행)'를 클릭하거나<br>'F10'을 눌러서 '진짜 조각'이라고 표시된 줄까지 한 줄 씩 내려가보자!<br>'진짜 조각' 줄에 있는 값이 두번째 조각의 값이 될 거야!",
    "두번째 조각을 찾았다면, 넘어가기를 눌러줘."
]

// 12
const talkContent_3_3 = [
    "마지막으로 다시 코드에서 'breakpoint 3'을 검색하고,<br>그 줄에 breakpoint를 걸어줘!",
    "앗! 주석에 세번째 조각을 구하는 방법을 알려주고 있네!",
    "<strong>'다시실행'</strong> 버튼을 클릭하고,<br>주석에 적혀있는대로 세번째 조각을 구해보자!",
    "마지막으로 세번째 조각까지 모주 찾았다면<br>조각을 순서대로 입력하고 정답을 눌러줘!"
]

// 13
const talkContent_3_4 = [
    "정답! 마지막 문제까지 푼 걸 축하해!",
    "다음에 또 만나! 안녕!"
]

const pageContent = [
    talkContent_0,
    talkContent_1_0,
    talkContent_1_1,
    talkContent_1_2,
    talkContent_1_3,
    talkContent_2_0,
    talkContent_2_1,
    talkContent_2_2,
    talkContent_2_3,
    talkContent_3_0,
    talkContent_3_1,
    talkContent_3_2,
    talkContent_3_3,
    talkContent_3_4
];

////////////////////////////////////////////////
// 게임 진행

function bindGame() {

    const nextBtn = document.querySelector("#next-btn");
    const beforeBtn = document.querySelector("#before-btn");
    const replayBtn = document.querySelector("#replay-btn");
    const finBtn = document.querySelector("#fin-btn");

    nextBtn.addEventListener("click", () => {

        if (talkIndex < pageContent[pageIndex].length - 1) {

            talkIndex++;
            talk.innerHTML = pageContent[pageIndex][talkIndex];
        }

        if (talkIndex == pageContent[pageIndex].length - 1
            && pageIndex !== 4 && pageIndex !== 8
            && pageIndex !== 12 && pageIndex !== 13) {
            nextPageBtn.style.display = "inline-block";
            return;
        }

        if (pageIndex === 4 && talkIndex === pageContent[4].length - 1) {
            answer(230357519);
            return;
        }

        if (pageIndex === 8 && talkIndex === pageContent[8].length - 1) {
            answer(446854190);
            return;
        }

        if (pageIndex === 10 && talkIndex === 2) {
            replayBtn.style.display = "inline-block";

            replayBtn.onclick = () => {
                stage3_1();
            }
            return;
        }

        if (pageIndex === 11 && talkIndex === 0) {
            replayBtn.style.display = "none";

            return;
        }

        if (pageIndex === 11 && talkIndex === 2) {
            replayBtn.style.display = "inline-block";

            replayBtn.onclick = () => {
                stage3_2();
            }
            return;
        }

        if (pageIndex === 11 && talkIndex === 0) {
            replayBtn.style.display = "none";

            return;
        }

        if (pageIndex === 12 && talkIndex === 2) {
            replayBtn.style.display = "inline-block";

            replayBtn.onclick = () => {
                stage3_3();
            }
            return;
        }
        
        if (pageIndex === 12 && talkIndex === pageContent[12].length - 1) {
            answer(209266115);
            return;
        }

        if (pageIndex === 13 && talkIndex === 0) {
            replayBtn.style.display = "none";

            return;
        }

        if (pageIndex === 13 && talkIndex === pageContent[12].length - 1) {
            finBtn.style.display = "inline-block";

            finBtn.onclick = () => {
                // 게임 종료 창
            }
            return;
        }
    });

    beforeBtn.addEventListener("click", () => {

        if (talkIndex > 0) {

            talkIndex--;
            talk.innerHTML = pageContent[pageIndex][talkIndex];
        }
    });

    nextPageBtn.addEventListener("click", () => {
        nextPage();
    });

}

////////////////////////////////////////////////
// 세번째 스테이지
function stage3_1() {
    const encoded = "NjUtNDAtNTAtNTM=";

    const nums = atob(encoded)
        .split("-")
        .map(n => parseInt(n));

    let 첫번째_조각 = nums.reduce((a, b) => a + b, 0) + 1;

    첫번째_조각; // breakpoint 1

}

function stage3_2() {
    let 두번째_조각 = 0; // breakpoint 2

    두번째_조각++;

    두번째_조각 += 124;
    두번째_조각 -= 10;
    두번째_조각 += 223;
    두번째_조각 -= 21;
    두번째_조각 += 65;
    두번째_조각 += 7;
    두번째_조각 -= 123;
    두번째_조각 -= 11; // 진짜 조각
    두번째_조각 += 25;
    두번째_조각 -= 98;
    두번째_조각 += 234;
    두번째_조각 += 65;
    두번째_조각 += 7;
    두번째_조각 -= 123;
}

function stage3_3() {

    let breakpoint3 = 0; // breakpoint 3
    // 세번째 조각은 i == stop일 때의 code의 값과 같다!
    // for문 안쪽에 breakpoint를 걸고, 조건을 "i == stop"으로 수정한 후
    // Resume(실행 계속)을 누르거나, 키보드의 F8을 눌러 계속 실행하여
    // i == stop일 때의 code 값을 구하자!

    // 힌트 : Edit breakpoint

    let code = 0;
    const stop = 145;
    const limit = 277;

    for (let i = 1; i <= limit; i++) {
        code = (i * 7) % 300;
        code = code + 0; // bp : i == stop;
    }

    return;
}





////////////////////////////////////////////////
// fragment 숨기기
function bindFragDisplayNone() {

    const frags = document.querySelectorAll(".stage1");

    frags.forEach(frag => {
        frag.style.display = "none";
    });
}

////////////////////////////////////////////////
// 다음 스테이지
function nextPage() {
    if (pageIndex >= pageContent.length - 1) {
        return;
    }

    // console.log(pageIndex);
    pageIndex++;
    // console.log(pageIndex);

    talkIndex = 0;

    nextPageBtn.style.display = "none";

    talk.innerHTML = pageContent[pageIndex][talkIndex];

    const frag2 = document.getElementById("frag2");
    const frag3 = document.getElementById("frag3");

    if (pageIndex === 3) {
        frag2.style.display = "inline-block";
        return;
    }

    if (pageIndex === 4) {
        frag3.style.display = "inline-block";
        return;
    }

    if (pageIndex === 5) {
        bindFragDisplayNone();
        return;
    }

    if (pageIndex === 6) {
        sessionStorage.setItem("첫번째 조각", "446");
        return;
    }

    if (pageIndex === 7) {
        sessionStorage.setItem("두번째 조각", "false");
        return;
    }

    if (pageIndex === 8) {
        sessionStorage.setItem("가짜 조각", "가짜 조각을 없애면 진짜 조각이 나타납니다!");
        return;
    }

    if (pageIndex === 9) {
        sessionRemove();
        return;
    }
}



////////////////////////////////////////////////
// 정답 입력
function answer(correct) {
    // console.log(correct);
    const answerBtn = document.getElementById("answer-btn");

    answerBtn.onclick = () => {

        const answerInputValue = document.getElementById("answer-input").value.trim();
        document.getElementById("answer-input").value = "";

        if (answerInputValue == String(correct)) {
            nextPage();

            return;
        }

        if (answerInputValue != String(correct)) {
            // console.log(answerInputValue);
            talk.style.color = "red";
            talk.innerText = "틀렸어! 다시 시도해보자!";

            setTimeout(() => {
                talk.style.color = "black";
            }, 1000);

            answerBinded = true;
        }
    };
}



////////////////////////////////////////////////
// 세션 스토리지 관리
function sessionRemove() {
    sessionStorage.removeItem("첫번째 조각");
    sessionStorage.removeItem("두번째 조각");
}

function stage2Input() {
    const originalSetItem = sessionStorage.setItem;

    sessionStorage.setItem = function (key, value) {
        originalSetItem.apply(this, arguments);

        if (key === "두번째 조각" && value === true) {
            console.log("두번째 조각 : 854");
        }
    };
}

function stage3Remove() {
    const originalRemoveItem = sessionStorage.removeItem;

    sessionStorage.removeItem = function (key) {
        originalRemoveItem.apply(this, arguments);

        if (key === "가짜 조각") {
            console.log("가짜 조각이 제거되었습니다!");
            console.log("진짜 조각이 나타났습니다.");
            console.log("세번째 조각 : 190");
        }
    };
}