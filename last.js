window.addEventListener("load", () => {
    init();
})
function init() {
    bind();
}

// 말풍선 내용 담긴 json
const talkContent_0 = [
    "안녕!!! 만나서 반가워!",
    "이 게임은 3개의 스테이지로 이루어져 있고,",
    "각 스테이지의 정답은 3자리의 숫자 조각 3개로 이루어져 있어.",
    "3개의 숫자 조각을 찾아서 순서대로 입력하고<br>정답 버튼을 누르면 다음 스테이지로 넘어갈 수 있어.",
    "예를 들어, '123456789' 이런 식으로!",
    "그리고 모든 스테이지에서 '개발자 도구'를 사용할 거야.",
    "우선, 개발자 도구 창을 켜볼까?",
    "우클릭 하고 '검사' 버튼을 누르거나,<br> F12 버튼을 눌러서 개발자 도구 창을 켜줘!",
    "개발자 도구를 켰으면, '넘어가기' 버튼을 눌러줘."
]

const talkContent_1_0 = [
    "개발자 도구를 켰지?",
    "개발자 도구의 위쪽을 보면,<br> 가장 먼저 'Elements' 페이지를 보고 있는 걸 알 수 있을 거야.",
    "개발자 도구는 크게 3가지 영역이 있어",
    "1. 상단 탭 영역 (Elements, Console 등의 탭이 보일 거야)<br>2. 왼쪽 패널 (코드나 DOM이 보일 거야)<br>3. 오른쪽 패널 (styles 등의 탭이 보일 거야)",
    "첫번째 스테이지에 대해서 설명할게!",
    "첫번째 스테이지는 오른쪽 패널의 styles 탭을 이용할 거야.",
    "지금은 보이지 않지만, 이 페이지 안에<br>첫번째 스테이지를 풀 수 있는 정답이 숨겨져 있어.",
    "그리고 styles를 이용해서 숨겨진 정답을 찾을 거야!",
    "자 그럼 첫번째 스테이지를 시작해볼까?<br>'넘어가기' 버튼을 눌러줘!"
]

const talkContent_1_1 = [
    ""
]

const pageContent = [
    talkContent_0,
    talkContent_1_0,
    talkContent_1_1
    // talkContent_1_2,
    // talkContent_1_3
]

function bind() {
    const nextBtn = document.querySelector("#next-btn");
    const beforeBtn = document.querySelector("#before-btn");

    const talk = document.getElementById("talk");

    const nextPageBtn = document.querySelector("#nextPage-btn"); 
    let pageIndex = 0;
    let talkIndex = 0;

    // next, before 버튼 클릭으로 말풍선 내용 바꾸기
    nextBtn.addEventListener("click", () => {
        if (talkIndex < pageContent[pageIndex].length-1) {
            talkIndex++;
            talk.innerHTML = pageContent[pageIndex][talkIndex];
            console.log(talkIndex);
        }

        if (talkIndex == pageContent[pageIndex].length-1 &&
            pageIndex != 5
        ) {
            nextPageBtn.style.display = "inline";
        }
    })
    beforeBtn.addEventListener("click", () => {
        if (talkIndex > 0) {
            talkIndex--;
            talk.innerHTML = pageContent[pageIndex][talkIndex];
            console.log(talkIndex);
        }
    })

    // 넘어가기 버튼 클릭 시 페이지 넘어가기
    // 대화 인덱스는 0 만들고
    // 넘어가기 버튼 숨기고
    // innerHTML 다시 바꾸고
    nextPageBtn.addEventListener("click", () => {
        pageIndex++;
        talkIndex = 0;
        nextPageBtn.style.display = "none";

        talk.innerHTML = pageContent[pageIndex][talkIndex];
    })

}