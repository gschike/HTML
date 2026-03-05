window.addEventListener('load', init)

function init() {
    bind()
}

function bind() {
    community();
    connectDB();
}

let pageNum = 0;


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

async function connectDB() {
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

    await postLoad();
    const postList = JSON.parse(localStorage.getItem("postList"));
    console.log("postList:", postList);



    // 테이블에 내용 넣기
    const content = document.querySelector("#content");

    // console.log(postList.items.length);

    // postList.length에 따라서 아래 페이지 넣기
    const page = document.querySelector(".page");
    // console.log("page", page)
    // console.log(postList.items.length)

    const pageSize = 2

    for (let i = 0; i < pageSize; i++) {
        if (postList.items.length > 20 * i) {
            // console.log("됨?")
            let span = document.createElement("span");
            span.innerHTML = `${i + 1}`;

            page.appendChild(span);
        }
    }

    const pages = document.querySelectorAll("span>span");
    for (let i = 0; i < pages.length; i++) {
        pages[i].addEventListener("click", () => {
            for (let j = 0; j < pages.length; j++) {
                pages[j].style.color = "#8b8b8b";
                pages[j].style.fontWeight = "100";
            }

            pages[i].style.color = "rgb(123, 45, 210)";
            pages[i].style.fontWeight = "1000";

            pageNum = i;
            content.innerHTML = "";

            for (let k = pageNum * 20; k < 20 * (pageNum + 1) && k < postList.items.length; k++) {

                let content_tr = document.createElement("tr");
                content_tr.innerHTML = `
                     <td>${postList.items[k].postId}</td>
                     <td>${postList.items[k].title}</td>
                     <td>${postList.items[k].authorId}</td>
                     <td>${postList.items[k].createdAt.split('T')[0]}</td>
                     <td>${postList.items[k].viewCount}</td>
                     <td>0</td>
                    `

                // 개별 게시글 클릭 시 이동
                content_tr.addEventListener("click", () => {
                    window.location.href = `./post.html?postNo=${postList.items[k].postId}`;
                })

                content.append(content_tr);
            }
        })
    }

    // 화살표 클릭하면 하나씩 이동
    // const lt = document.querySelector("#lt");

    // lt.addEventListener("click", () => {
    //     pageNum--;
    // })



    // for (let i = 0; i < postList.items.length; i++) {
    for (let i = pageNum * 20; i < 20 * (pageNum + 1); i++) {
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
        //const listUrl = API.V1.url(API.V1.SJ.Posts.list, null, listQ);
        //const listUrl = API.V1.SJ.Posts.list(listQ);
        //logCall("SJ-POST-1 POSTS_LIST", "GET", listUrl);
        try {
            const listRes = await API.V1.SJ.Posts.list(listQ);
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

function paging() {

}



