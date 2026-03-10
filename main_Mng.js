window.addEventListener("load", () => {
    init();
});

function init() {
    bind();
}

function bind() {
    fxd_btn() // 메인페이지로
    Manager_gnb() // gnb
    visitorsCount() // 방문자 수
    errorLog() // 에러 로그
    schedule() // 스케쥴러
}

// FIXED 메인페이지로 버튼
function fxd_btn() {
    document.querySelector('#mainpageBtn')
        .addEventListener('click', function () {
            window.location.href = "./home.html";
        })
}

// 관리자 페이지 GNB 기능
function Manager_gnb() {
    document.querySelector('#main_btn')
        .addEventListener('click', function () {
            window.location.href = "./home.html";
        })
    document.querySelector('#manager_btn')
        .addEventListener('click', function () {
            window.location.href = "./main_Mng.html";
        })
    document.querySelector('#userManager_btn')
        .addEventListener('click', function () {
            // window.location.href = "./home.html";
            // !!!!! 성래님 만드시면 확인 후 넣을 것
        })
}

// 방문자 
function visitorsCount() {
    const today_visitor_span = document.querySelector('#today_visitor>span')
    const weekly_visitor_span = document.querySelector('#weekly_visitor>span')
    const month_visitor_span = document.querySelector('#month_visitor>span')
    const visitor_now_span = document.querySelector('#visitor_now>span')

    if (today_visitor_span) {
        setInterval(() => {
            // 0에서 3 사이의 랜덤한 정수 생성
            let randomAdd = Math.floor(Math.random() * 4);
            // 실시간용 빠지는 기능
            let randomAdd2 = Math.random() * 5 - 2;

            // DAY VISITOR
            let countToday = parseInt(today_visitor_span.textContent)
            // 숫자 계산 후 삽입
            countToday = parseInt(countToday) + randomAdd

            today_visitor_span.textContent = countToday

            // WEEKLY VISITOR
            let countWeekly = parseInt(weekly_visitor_span.textContent) + randomAdd

            weekly_visitor_span.textContent = countWeekly

            // MONTH VISITOR
            let countMonth = parseInt(month_visitor_span.textContent) + randomAdd

            month_visitor_span.textContent = countMonth

            // VISITOR NOW
            let countNow = parseInt(visitor_now_span.textContent) + parseInt(randomAdd2)

            if (countNow < 0) countNow = 0

            visitor_now_span.textContent = countNow

        }, 1000);
    }
}

// 버그 리포트
function errorLog() {

    const content = document.querySelectorAll('.contents')

    // 방법 1 try / catch 전달인자로 에러 발생시키고 출력
    a = null
    try {
        a.length
    } catch (e) {
        console.log(content[0])
        content[0].textContent = e
    }

    // 방법 2 그냥 하드코딩 (JSON 연습)

    const bugDataString = `[
    {
        "bugReports": [
            {
                "id": 1,
                "target": "메인페이지",
                "level": "Critical",
                "code": "E001",
                "message": "TypeError: Cannot read properties of null (reading 'length')",
                "timestamp": "2026-03-10 15:20:44"
            },
            {
                "id": 2,
                "target": "커뮤니티페이지",
                "level": "Warning",
                "code": "E005",
                "message": "ReferenceError: postList is not defined at community.js:42",
                "timestamp": "2026-03-10 15:21:02"
            },
            {
                "id": 3,
                "target": "회원가입/로그인",
                "level": "Error",
                "code": "E012",
                "message": "NetworkError: Failed to fetch auth-token (Status: 500)",
                "timestamp": "2026-03-10 15:22:15"
            },
            {
                "id": 4,
                "target": "데이터베이스",
                "level": "Critical",
                "code": "E099",
                "message": "ConnectionTimeout: Database pool exhausted",
                "timestamp": "2026-03-10 15:23:01"
            }
        ]
    }
]`;

    const bugJSON = JSON.parse(bugDataString)[0]['bugReports']

    // test
    // console.log(bugJSON[i])
    // console.log(bugJSON[i]['code'])

    setInterval(() => {
        // 어디 에러창에 띄울지
        let random = parseInt(Math.floor(Math.random() * content.length))

        // 에러 배열 랜덤 선택
        let randomAdd = parseInt(Math.floor(Math.random() * 4))

        content[random].innerHTML +=
            `
                code: ${bugJSON[randomAdd]['code']} /
                message: ${bugJSON[randomAdd]['message']} /
                timelog: ${bugJSON[randomAdd]['timestamp']}
                <br>
            `
    }, 2500);

    const logErr = document.querySelectorAll('.console')
    logErr[0].onclick = () => { window.location.href = "./home.html" }
    logErr[1].onclick = () => { window.location.href = "./community.html" }
    logErr[2].onclick = () => { window.location.href = "./login.html" }
} // fetch를 이용한 JSON 사용 공부할 것

function schedule() {

}








