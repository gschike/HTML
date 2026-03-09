// 페이지 로드 시 초기화
window.addEventListener('load', init)

function init() {
    bind()
}


// 전체 이벤트 바인딩
function bind() {

    // 커뮤니티 기본 UI 및 메뉴 기능
    community();

    // 게시글 타입 확인 (공지 / 일반)
    let postType = localStorage.getItem("postType")

    // 공지사항 모드
    if (postType == "notice") {
        notice();
        return;
    }

    // 일반 커뮤니티 DB 연결
    connectDB();
}



let pageNum = 0;



///////////////////////////////////////////////////////
// 커뮤니티 메인 페이지 UI / GNB / LNB / 검색
///////////////////////////////////////////////////////
function community() {

    // 글쓰기 버튼 클릭 시 글쓰기 창 열기
    const write = document.querySelector('#write')

    const name = 'open 연습'
    let option = 'width=800,height=600'
    const url = 'stage01_00.html'

    write.addEventListener('click', function () {
        window.open(url, name, option)
    })


    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");



    ///////////////////////////////////////////////////////
    // GNB 기능
    ///////////////////////////////////////////////////////

    let loginUser;


    // 로그인 상태 확인
    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin == "true") {

        try {

            loginUser = JSON.parse(localStorage.getItem("loginUser"));

            if (!loginUser) throw new Error("유저 정보 없음");

            console.log("로그인 상태:", isLogin);
            console.log("loginUser:", loginUser);

            console.log("현재 로그인 유저:", loginUser.userId);
            console.log("권한:", loginUser.role);

            // 로그인 된 계정의 userId
            loginUser = loginUser.userId;

            changeLogin();

        } catch (e) {

            console.log("로그인 안 됨");
            changeLogout();

        }

    } else {

        changeLogout();

    }



    // 로그인 페이지 이동
    const btn_login = document.querySelector("#btn-login");

    btn_login.addEventListener("click", () => {
        sessionStorage.setItem("prevPage", location.href);
        window.location.href = "./login.html";
    })


    // 회원가입 페이지 이동
    const btn_join = document.querySelector("#btn-join");

    btn_join.addEventListener("click", () => {
        window.location.href = "./join.html";
    })


    // 로그아웃 처리
    const btn_logout = document.querySelector("#btn-logout");

    btn_logout.addEventListener("click", () => {

        localStorage.removeItem("loginUser");

        localStorage.setItem("loginPossible", "false");

        isLogin = localStorage.getItem("loginPossible");

        changeLogout();

    })



    // 로그인 UI 변경
    function changeLogin() {
        beforeLogin.style.display = "none";
        afterLogin.style.display = "flex";
    }

    // 로그아웃 UI 변경
    function changeLogout() {
        login = false;
        loginUser = "";
        beforeLogin.style.display = "flex";
        afterLogin.style.display = "none";
    }



    ///////////////////////////////////////////////////////
    // LNB 기능
    ///////////////////////////////////////////////////////


    // 마이페이지 메뉴
    const LNBmyPage = document.getElementById("LNBmyPage");

    LNBmyPage.addEventListener("click", () => {

        if (localStorage.getItem("loginPossible") != "true") {
            alert("마이페이지는 로그인 후 이용 가능합니다.");
            sessionStorage.setItem("prevPage", "./myPage.html");
            window.location.href = "./login.html";
            return;
        }

        window.location.href = "./myPage.html";

    })



    // 공지사항 메뉴
    const LNBnotice = document.getElementById("LNBnotice");

    LNBnotice.addEventListener("click", () => {

        localStorage.setItem("postType", "notice");

        window.location.href = "./community.html";

    })



    // 커뮤니티 메뉴
    const LNBcomm = document.getElementById("LNBcomm");

    LNBcomm.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");

        window.location.href = "./community.html";

    })



    ///////////////////////////////////////////////////////
    // 검색 기능
    ///////////////////////////////////////////////////////


    const search_btn = document.querySelector("#search-btn");

    search_btn.addEventListener("click", () => {

        const search_input = document.querySelector("#search-input").value;

        if (!search_input) {
            alert("검색어를 입력하세요.");
            return;
        }

        const postList = JSON.parse(localStorage.getItem("postList"));

        const content = document.querySelector("#content");

        for (let i = 0; i < postList.items.length; i++) {

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

                // 게시글 클릭 시 상세 페이지 이동
                content_tr.addEventListener("click", () => {
                    window.location.href = `./post.html?postNo=${postList.items[i].postId}`;
                })

                content.append(content_tr);
            }
        }

    })



    ///////////////////////////////////////////////////////
    // 게시글 목록 기능
    ///////////////////////////////////////////////////////


    // 전체글 버튼
    const main_list = document.querySelector("#main_list");

    main_list.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");

        connectDB();

    })


    // 공지사항 버튼
    const noticeBtn = document.querySelector("#notice");

    noticeBtn.addEventListener("click", () => {

        localStorage.setItem("postType", "notice");

        notice();

    })

}



///////////////////////////////////////////////////////
// 게시글 DB 연결 및 목록 로드
///////////////////////////////////////////////////////
async function connectDB() {


    // API 호출 로그
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



    // 게시글 목록 불러오기
    await postLoad();

    const postList = JSON.parse(localStorage.getItem("postList"));

    console.log("postList:", postList);



    const content = document.querySelector("#content");

    const page = document.querySelector(".page");



    ///////////////////////////////////////////////////////
    // 페이지네이션 생성
    ///////////////////////////////////////////////////////

    const pageLength = Math.floor(postList.items.length / 20) + 1;

    page.innerHTML = "";

    for (let i = 0; i < pageLength; i++) {

        page.innerHTML += `<span class="pageNum">${i + 1}</span>`;

    }

    const pages = document.querySelectorAll(".pageNum");





    ///////////////////////////////////////////////////////
    // 페이지 이동 이벤트
    ///////////////////////////////////////////////////////
    
    // 페이지네이션 화살표 기능 (한 페이지씩 이동)

    const pagePrev = document.querySelector("#pagePrev");
    const pageNext = document.querySelector("#pageNext");

    pagePrev.addEventListener("click", () => {

        if (pageNum <= 0) return;

        pageNum--;

        pages[pageNum].click();

    });

    pageNext.addEventListener("click", () => {

        if (pageNum >= pages.length - 1) return;

        pageNum++;

        pages[pageNum].click();

    });

    // 페이지 클릭 시 해당 페이지로 이동
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

                // 게시글 클릭 시 상세 페이지 이동
                content_tr.addEventListener("click", () => {
                    window.location.href = `./post.html?postNo=${postList.items[k].postId}`;
                })

                content.append(content_tr);

            }

        })

    }



    ///////////////////////////////////////////////////////
    // 첫 페이지 게시글 출력
    ///////////////////////////////////////////////////////

    content.innerHTML = "";

    for (let i = pageNum * 20; i < 20 * (pageNum + 1) && i < postList.items.length; i++) {

        let content_tr = document.createElement("tr");

        content_tr.innerHTML = `
            <td>${postList.items[i].postId}</td>
            <td>${postList.items[i].title}</td>
            <td>${postList.items[i].authorId}</td>
            <td>${postList.items[i].createdAt.split('T')[0]}</td>
            <td>${postList.items[i].viewCount}</td>
            <td>0</td>
        `

        content_tr.addEventListener("click", () => {
            window.location.href = `./post.html?postNo=${postList.items[i].postId}`;
        })

        content.append(content_tr);

    }



    ///////////////////////////////////////////////////////
    // 게시글 목록 API 호출
    ///////////////////////////////////////////////////////
    async function postLoad() {

        const listQ = { page: 1, pageSize: 100 };

        try {

            const listRes = await API.V1.SJ.Posts.list(listQ);

            logRes("SJ-POST-1 POSTS_LIST", listRes);

            localStorage.setItem("postList", JSON.stringify(listRes));

        } catch (e) {

            logErr("SJ-POST-1 POSTS_LIST", e);

        }

    }

}



///////////////////////////////////////////////////////
// 로그인 UI 변경 함수
///////////////////////////////////////////////////////
function changeLogin() {

    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    beforeLogin.style.display = "none";
    afterLogin.style.display = "flex";

}



///////////////////////////////////////////////////////
// 로그아웃 UI 변경 함수
///////////////////////////////////////////////////////
function changeLogout() {

    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    login = false;

    beforeLogin.style.display = "flex";
    afterLogin.style.display = "none";

}



///////////////////////////////////////////////////////
// 공지사항 게시글 출력
///////////////////////////////////////////////////////
function notice() {

    const postList = JSON.parse(localStorage.getItem("postList"));

    const content = document.querySelector("#content");

    content.innerHTML = "";

    let adminCount = 0;

    for (let i = 0; i < postList.items.length; i++) {

        if (postList.items[i].authorId == 'admin') {

            let content_tr = document.createElement("tr");

            content_tr.innerHTML = `
                <td>${postList.items[i].postId}</td>
                <td>${postList.items[i].title}</td>
                <td>${postList.items[i].authorId}</td>
                <td>${postList.items[i].createdAt.split('T')[0]}</td>
                <td>${postList.items[i].viewCount}</td>
                <td>0</td>
            `

            content_tr.addEventListener("click", () => {
                window.location.href = `./post.html?postNo=${postList.items[i].postId}`;
            })

            content.append(content_tr);

            adminCount++;

        }

    }



    ///////////////////////////////////////////////////////
    // 공지사항 페이지네이션 생성
    ///////////////////////////////////////////////////////

    let noticeLength = Math.floor(adminCount / 20) + 1;

    const page = document.querySelector(".page");

    page.innerHTML = "";

    for (let i = 0; i < noticeLength; i++) {

        page.innerHTML += `<span class="pageNum">${i + 1}</span>`;

    }

}