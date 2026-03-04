window.addEventListener('load', init)

function init() {
    bind()
}

function bind() {
    community();
    connectDB();
}

// 커뮤니티 메인 페이지
function community() {
    const write = document.querySelector('#write')

    const name = 'open 연습'
    let option = 'width=800,height=600'
    const url = 'stage01_00.html'


    // 글쓰기 클릭 시 게시판 열기
    write.addEventListener('click', function () {
        window.open(url, name, option)
    })


    // 메인 페이지 클릭 시 이동
    const btn_main = document.querySelector("#btn-main");

    btn_main.addEventListener("click", function () {
        window.location.href = "./main.html";
    })

    // 로그인 페이지 클릭 시 이동
    const btn_login = document.querySelector("#btn-login");

    btn_login.addEventListener("click", () => {
        window.location.href = "./login.html";
    })

    // 회원가입 페이지 클릭 시 이동
    const btn_join = document.querySelector("#btn-join");

    btn_join.addEventListener("click", () => {
        window.location.href = "./join.html";
    })



    // 로그인 상태 받아오기
    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin == "true") {
        try {
            const loginUser = JSON.parse(localStorage.getItem("loginUser"));

            if (!loginUser) throw new Erroer("유저 정보 없음");

            console.log("로그인 상태:", isLogin);
            console.log("loginUser:", loginUser);

            changeLogin();

        } catch (e) {
            console.log("로그인 안 됨");
            changeLogout();
        }
    }

    // 로그아웃 클릭 시 로그인 상태 변경
    const btn_logout = document.querySelector("#btn-logout");

    btn_logout.addEventListener("click", function () {
        localStorage.removeItem("loginUser");

        localStorage.setItem("loginPossible", "false");
        isLogin = localStorage.getItem("loginPossible");
        changeLogout();
    })

    // 검색 버튼 클릭 시 검색
    const search_btn = document.querySelector("#search-btn");

    search_btn.addEventListener("click", () => {
        const search_input = document.querySelector("#search-input").value;

        const postList = JSON.parse(localStorage.getItem("postList"));

        for (let i = 0; i < postList.items.length; i++) {
            // postList.items[i].title
            if (postList.items[i].title.includes(search_input)
                || postList.items[i].content.includes(search_input)) {

                let content_tr = document.createElement("tr");
                content.innerHTML = "";
                content_tr.innerHTML = `
                    <td>${postList.items[i].postId}</td>
                    <td>${postList.items[i].title}</td>
                    <td>${postList.items[i].authorId}</td>
                    <td>${postList.items[i].createdAt.split('T')[0]}</td>
                    <td>${postList.items[i].viewCount}</td>
                    <td>0</td>
                `

                // 개별 게시글 클릭 시 이동
                content_tr.addEventListener("click", () => {
                    window.location.href = `./post.html?postNo=${postList.items[i].postId}`;
                })

                content.append(content_tr);
            }
        }
    })


    // 전체글 누르면 다시 DB 연결
    const main_list = document.querySelector("#main_list");

    main_list.addEventListener("click", () => {
        connectDB();
    })


}

// 글쓰기 페이지
// 전략 : textarea.value = 

// 작성 페이지


function todo1() {
    const tdInput = document.querySelector('#Todo_input') // todo 내용
    const btnAdd = document.querySelector('#btnAdd') // 추가 버튼
    const dltAll = document.querySelector('#dltAll') // 선택 삭제 버튼
    const sltAll = document.querySelector('#sltAll') // 전체 체크박스
    const table = document.querySelector('#board6') // 전체 테이블


    btnAdd.addEventListener('click', function () {

        // 열
        const row = document.createElement('tr')
        row.setAttribute('class', 'rowIdx')

        // 체크박스
        const chk = document.createElement('input')
        chk.type = 'checkbox'
        chk.classList.add('chkbx')

        // 내용
        const span = document.createElement('span')
        span.innerText = tdInput.value

        // 개별 삭제 버튼
        const del = document.createElement('button')
        del.innerText = '삭제'

        // 테이블>열>객체
        row.append(chk, span, del)
        table.append(row)

        // 6-2 삭제 버튼 클릭 시 행 삭제
        del.addEventListener('click', function () {
            row.remove()
        })

        // 6-3 전체선택 [인풋 -> 바뀌면] 모든 체크박스 선택/해제
        sltAll.addEventListener('change', function () {
            // 모든 체크박스 = sltAll
            // 개별 체크박스 = chk
            if (sltAll.checked) {
                chk.checked = true;
            }
            else {
                chk.checked = false;
            }
        })

        // 6-4 전체 선택 후 하나라도 해제되면 전체 선택도 해제/ 전체면 체크

        // 전략: selectAll, 배열 개별 검사 -> 해제
        // flag 통과 -> 전체선택

        chk.addEventListener('change', function () {
            const chkbx = document.querySelectorAll('.chkbx') // 배열 길이 상시 체크
            let flag = true; // 깃발 세우고
            for (const item of chkbx) { // 깃발 내리면 체크(전체)해제.
                if (!(item.checked)) {
                    flag = false
                    sltAll.checked = false
                    break;
                }
            } // 깃발 생존 = 전체 체크
            if (flag) sltAll.checked = true
        })

        // 6-5 선택 삭제
        // 전략: 선택 삭제 버튼 클릭 시 - 반복문으로 체크된 것 검사 -> if(chkbx.checked)row.remove

        dltAll.addEventListener('click', function () {

            const rowIdx = table.querySelectorAll('.rowIdx') // 행 번호
            const chkbx = document.querySelectorAll('.chkbx') // 체크박스 번호
            // 참고: 체크박스 인덱스 == row 인덱스 / 순서대로 만들어져서 동일함

            chkbx.forEach((val, idx) => { // forEach 돌면서 번호 반환
                // forEach idx === 체크박스 인덱스 === 행 인덱스
                // 나중에 언젠가 종속관계 여행(parentNode) 떠나서 삭제하는 것도 해보자.
                if (val.checked) rowIdx[idx].remove()
            })
        })


    })
}

function connectDB() {
    // =========================================================
    // 공통 로그 유틸
    // =========================================================
    const logCall = (label, method, url, body) => {
        console.log(`[CALL] ${label} :: ${method} ${url}`);
        if (body !== undefined) console.log(`[BODY] ${label}`, body);
    };

    const logRes = (label, res) => console.log(`[RES] ${label}`, res);
    const logErr = (label, xhr) => {
        const rj = xhr?.responseJSON;
        const status = xhr?.status;
        const msg = rj?.message || rj?.error || xhr?.statusText || "요청 실패";
        console.log(`[ERR] ${label} :: status=${status}`, rj || msg);
    };
    ////////////////////////////////////////////////////////////

    postLoad();
    const postList = JSON.parse(localStorage.getItem("postList"));
    console.log("postList:", postList);



    // 테이블에 내용 넣기
    const content = document.querySelector("#content");

    console.log(postList.items.length);

    // postList.length에 따라서 아래 페이지 넣기
    const page = document.querySelector(".page");
    // console.log("page", page)
    // console.log(postList.items.length)

    const pageSize = 2

    for (let i=0; i<pageSize; i++) {
        if (postList.items.length>20*i) {
            // console.log("됨?")
            let span = document.createElement("span");
            span.innerHTML = `${i+1}`;
    
            page.appendChild(span);
        }
    }

    // 일단 1페이지에 strong
    const firstPage = document.querySelector("span span:nth-child(1)");
    console.log("firstPage", firstPage)
    firstPage.style.color = "rgb(123, 45, 210)";
    firstPage.style.fontWeight = "1000";

    const pages = document.querySelectorAll("span>span");
    // console.log(pages)
    for (let i=0; i<pages.length; i++) {
        pages[i].addEventListener("click", () => {
            for (let j=0; j<pages.length; j++) {
                pages[j].style.color = "#8b8b8b";
                pages[j].style.color = "300";
            }

            pages[i].style.color = "rgb(123, 45, 210)";
            pages[i].style.fontWeight = "1000";
        })
    }



    // for (let i = 0; i < postList.items.length; i++) {
    for (let i = 0; i < 20; i++) {
        let content_tr = document.createElement("tr");
        content_tr.innerHTML = `
            <td>${postList.items[i].postId}</td>
            <td>${postList.items[i].title}</td>
            <td>${postList.items[i].authorId}</td>
            <td>${postList.items[i].createdAt.split('T')[0]}</td>
            <td>${postList.items[i].viewCount}</td>
            <td>0</td>
        `

        // 개별 게시글 클릭 시 이동
        content_tr.addEventListener("click", () => {
            window.location.href = `./post.html?postNo=${postList.items[i].postId}`;
        })

        content.append(content_tr);
    }








    async function postLoad() {
        // SJ-POST-1) 글 목록
        const listQ = { page: 1, pageSize: 100 };
        const listUrl = DD.V1.url(DD.V1.API.SJ_POSTS_LIST, null, listQ);
        logCall("SJ-POST-1 POSTS_LIST", "GET", listUrl);
        try {
            const listRes = await DD.V1.SJ.Posts.list(listQ);
            logRes("SJ-POST-1 POSTS_LIST", listRes);

            localStorage.setItem("postList", JSON.stringify(listRes));
        } catch (e) {
            logErr("SJ-POST-1 POSTS_LIST", e);
        }
    }
}

function changeLogin() {
    // beforeLogin, afterLogin
    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    beforeLogin.style.display = "none";
    afterLogin.style.display = "flex";
}

function changeLogout() {
    // beforeLogin, afterLogin
    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    login = false;
    beforeLogin.style.display = "flex";
    afterLogin.style.display = "none";
}

// function trClick() {
//     // 개별 게시글 클릭 시 이동
//     const trAll = document.querySelectorAll("#content tr");

//     for (let i = 0; i < trAll.length; i++) {
//         trAll[i].addEventListener("click", () => {
//             window.location.href = `./post.html?postNo=${postList.items[i].postId}`;
//         })
//     }
// }



