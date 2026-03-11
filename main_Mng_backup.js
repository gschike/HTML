window.addEventListener("load", () => {
    init();
});

function init() {
    bind();

    let first_confirm
    let second_confirm
    let third_confirm
    let btn_cancel
    let password = []
    let count = 0
}

function bind() {
    fxd_btn() // 메인페이지로
    Manager_gnb() // gnb
    visitorsCount() // 방문자 수
    errorLog() // 에러 로그
    schedule() // 스케쥴러
    Breaker() // game 브레이커
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
function schedule() {

}

// 브레이커
function Breaker() {

    const btn_wrap = document.querySelectorAll('.btn_wrap')
    btn_wrap.forEach((val, idx) => {
        val.addEventListener('click', function (evt) { // 클릭 시
            modal()
        })
    });
}

// 정지 확인 모달
function modal() {
    count = 0
    const modal_wrap = document.querySelector(`#modal_wrap`)
    modal_wrap.style.display = 'flex'
    first_confirm = document.querySelector('#first-confirm')
    second_confirm = document.querySelector('#second-confirm')


    first_confirm.style.display = 'block'

    // 취소 버튼 1
    btn_cancel = document.querySelectorAll('.btn-cancel')
    btn_cancel[0].addEventListener('click', function (e) {
        modal_wrap.style.display = 'none'
        first_confirm.style.display = 'none'
    })

    // 확인 버튼 1
    document.querySelector('.btn-confirm')
        .addEventListener('click', function () {
            first_confirm.style.display = 'none'

            second_confirm.style.display = 'block'



            // 취소 버튼 2
            btn_cancel[1].addEventListener('click', function () {
                modal_wrap.style.display = 'none'
                second_confirm.style.display = 'none'
            })

            // 랜덤 패스워드 생성
            password = [
                parseInt(Math.floor(Math.random() * 8 + 1)),
                parseInt(Math.floor(Math.random() * 8 + 1)),
                parseInt(Math.floor(Math.random() * 8 + 1)),
                parseInt(Math.floor(Math.random() * 8 + 1))
            ]

            const randomPWspan = document.querySelector('#random-PW')
            randomPWspan.textContent =
                `
                    ${password[0]}-${password[1]}-${password[2]}-${password[3]} 를 순서대로 클릭하세요.
                `

            checkPW()
        })



}

function checkPW() {

    third_confirm = document.querySelector('#third-confirm')

    document.querySelectorAll('.number').forEach((val2, idx2) => {
        val2.addEventListener('click', function () { //클릭
            // PW = 클릭한 번호
            let PW = parseInt(val2.textContent)
            // 클릭한 번호 보여주기
            let clicked = document.querySelector('#clicked-PW>span')
            clicked.textContent += "" + PW

            // 클릭한 번호 === 패스워드[단계]
            if (PW === password[count]) {
                count++
                if (count === 4) {
                    second_confirm.style.display = 'none'
                    third_confirm.style.display = 'block'

                    lastConfirm()
                   count = 0
                   clicked.textContent = ""
                   PW=""
                }
            } else {
                alert("올바른 숫자를 입력해주세요.");
                modal_wrap.style.display = 'none'
                second_confirm.style.display = 'none'
                count = 0
                clicked.textContent = ""
                PW=""
            }

        })
    })

}

function lastConfirm() {
    console.log(btn_cancel)

    document.querySelectorAll('.btn-confirm')[1]
        .addEventListener('click', function () {
            // window.location.href = () => 
        })

    // 취소
    btn_cancel[2].addEventListener('click', function () {
        modal_wrap.style.display = 'none'
        third_confirm.style.display = 'none'
    })
}








