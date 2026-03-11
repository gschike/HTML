window.addEventListener("load", () => {
    init();
});

// 전역 변수
let first_confirm
let second_confirm
let third_confirm
let btn_cancel
let modal_wrap
let password = []
let count = 0

function init() {
    bind();
}

function bind() {
    fxd_btn()
    Manager_gnb()
    visitorsCount()
    errorLog()
    schedule()
    Breaker()
}

// FIXED 메인페이지로 버튼
function fxd_btn() {

    const btn = document.querySelector('#mainpageBtn')
    if (!btn) return

    btn.addEventListener('click', function () {
        window.location.href = "./home.html";
    })
}

// 관리자 페이지 GNB 기능
function Manager_gnb() {

    const logo = document.querySelector('#logo')
    const main = document.querySelector('#main_btn')
    const manager = document.querySelector('#manager_btn')
    const logOut = document.querySelector('#logOut')

    if (logo) {
        logo.onclick = () => {
            if (confirm("메인페이지로 이동하시겠습니까?")) {
                window.location.href = "./home.html"
            }
        }
    }

    if (main)
        main.onclick = () => window.location.href = "./home.html"

    if (manager)
        manager.onclick = () => window.location.href = "./main_Mng.html"

    if (logOut)
        logOut.onclick = () => alert("관리자 페이지에서는 로그아웃 하실 수 없습니다.")

}

// 방문자 
function visitorsCount() {

    const today_visitor_span = document.querySelector('#today_visitor>span')
    const weekly_visitor_span = document.querySelector('#weekly_visitor>span')
    const month_visitor_span = document.querySelector('#month_visitor>span')
    const visitor_now_span = document.querySelector('#visitor_now>span')

    if (!today_visitor_span) return

    setInterval(() => {

        let randomAdd = Math.floor(Math.random() * 4);
        let randomAdd2 = Math.floor(Math.random() * 5 - 2);

        let countToday = parseInt(today_visitor_span.textContent)
        today_visitor_span.textContent = countToday + randomAdd

        let countWeekly = parseInt(weekly_visitor_span.textContent)
        weekly_visitor_span.textContent = countWeekly + randomAdd

        let countMonth = parseInt(month_visitor_span.textContent)
        month_visitor_span.textContent = countMonth + randomAdd

        let countNow = parseInt(visitor_now_span.textContent) + randomAdd2
        if (countNow < 0) countNow = 0

        visitor_now_span.textContent = countNow

    }, 1000);
}

// 버그 리포트
function errorLog() {

    const content = document.querySelectorAll('.contents')

    // 방법 1 try / catch 전달인자로 에러 발생시키고 출력
    a = null
    try {
        a.length
    } catch (e) {
        // console.log(content[0])
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

// 스케줄러
function schedule() { }

// 브레이커
function Breaker() {

    const btn_wrap = document.querySelectorAll('.btn_wrap')

    btn_wrap.forEach((val) => {

        val.addEventListener('click', function () {
            modal()
        })

    });
}

// 모달
function modal() {

    count = 0

    modal_wrap = document.querySelector(`#modal_wrap`)
    if (!modal_wrap) return

    modal_wrap.style.display = 'flex'

    first_confirm = document.querySelector('#first-confirm')
    second_confirm = document.querySelector('#second-confirm')

    first_confirm.style.display = 'block'

    btn_cancel = document.querySelectorAll('.btn-cancel')

    // 취소1
    if (btn_cancel[0]) {
        btn_cancel[0].onclick = function () {

            modal_wrap.style.display = 'none'
            first_confirm.style.display = 'none'

        }
    }

    // 확인1
    const confirmBtn = document.querySelector('.btn-confirm')

    if (confirmBtn)
        confirmBtn.onclick = function () {

            first_confirm.style.display = 'none'
            second_confirm.style.display = 'block'

            // 취소2
            if (btn_cancel[1]) {
                btn_cancel[1].onclick = function () {

                    modal_wrap.style.display = 'none'
                    second_confirm.style.display = 'none'

                }
            }

            password = [

                Math.floor(Math.random() * 8 + 1),
                Math.floor(Math.random() * 8 + 1),
                Math.floor(Math.random() * 8 + 1),
                Math.floor(Math.random() * 8 + 1)

            ]

            const randomPWspan = document.querySelector('#random-PW')

            randomPWspan.textContent =
                `${password[0]}-${password[1]}-${password[2]}-${password[3]} 를 순서대로 클릭하세요.`

            checkPW()
        }

}

// 패스워드 체크
function checkPW() {

    third_confirm = document.querySelector('#third-confirm')

    document.querySelectorAll('.number').forEach((val2) => {

        val2.onclick = function () {

            let PW = parseInt(val2.textContent)

            let clicked = document.querySelector('#clicked-PW>span')

            clicked.textContent += PW

            if (PW === password[count]) {

                count++

                if (count === 4) {

                    second_confirm.style.display = 'none'
                    third_confirm.style.display = 'block'

                    lastConfirm()

                    count = 0
                    clicked.textContent = ""

                }

            } else {

                alert("올바른 숫자를 입력해주세요.");

                modal_wrap.style.display = 'none'
                second_confirm.style.display = 'none'

                count = 0
                clicked.textContent = ""

            }

        }

    })

}

// 마지막 확인
function lastConfirm() {

    const confirmBtn = document.querySelectorAll('.btn-confirm')[1]

    if (confirmBtn)
        confirmBtn.onclick = function () {
            
            // !!!!! 점검중 페이지
            // window.location.href = ""
        }

    if (btn_cancel[2])
        btn_cancel[2].onclick = function () {

            modal_wrap.style.display = 'none'
            third_confirm.style.display = 'none'

        }

}