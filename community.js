// 페이지 로드 시 초기화
window.addEventListener('load', init)

function init() {
    bind()
}

let nowUserId = "";


// 전체 이벤트 바인딩
function bind() {

    community();

    let postType = localStorage.getItem("postType")

    if (postType == "notice") {
        notice();
        return;
    }

    connectDB();
}

let pageNum = 0;
let currentPosts = [];

///////////////////////////////////////////////////////
// 커뮤니티 메인 페이지 UI / GNB / LNB / 검색
///////////////////////////////////////////////////////
function community() {

    const write = document.querySelector('#write')

    const name = 'open 연습'
    let option = 'width=800,height=600'
    const url = './post_Writer.html'

    write.addEventListener('click', function () {
        window.location.href = url;
    })


    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    ///////////////////////////////////////////////////////
    // GNB 기능
    ///////////////////////////////////////////////////////

    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin == "true") {

        try {

            loginUser = JSON.parse(localStorage.getItem("loginUser"));

            if (!loginUser) throw new Error("유저 정보 없음");

            nowUserId = loginUser.userId;

            changeLogin();

        } catch (e) {

            changeLogout();

        }

    } else {

        changeLogout();

    }

    const btn_login = document.querySelector("#btn-login");

    btn_login.addEventListener("click", () => {
        sessionStorage.setItem("prevPage", location.href);
        window.location.href = "./login.html";
    })

    const btn_join = document.querySelector("#btn-join");

    btn_join.addEventListener("click", () => {
        window.location.href = "./join.html";
    })

    const btn_logout = document.querySelector("#btn-logout");

    btn_logout.addEventListener("click", () => {

        localStorage.removeItem("loginUser");

        localStorage.setItem("loginPossible", "false");

        changeLogout();

    })

    function changeLogin() {
        beforeLogin.style.display = "none";
        afterLogin.style.display = "flex";
    }

    function changeLogout() {
        login = false;
        loginUser = "";
        beforeLogin.style.display = "flex";
        afterLogin.style.display = "none";
    }

    ///////////////////////////////////////////////////////
    // LNB 기능
    ///////////////////////////////////////////////////////

    const LNBadminPage = document.getElementById("LNBadminPage");
    if (nowUserId == "admin") {
        LNBadminPage.style.display = "inline-block";
    }

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

    const LNBnotice = document.getElementById("LNBnotice");

    LNBnotice.addEventListener("click", () => {

        localStorage.setItem("postType", "notice");

        notice();

    })

    const LNBcomm = document.getElementById("LNBcomm");

    LNBcomm.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");

        connectDB();

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

        if (!postList) return;

        currentPosts = [];

        for (let i = 0; i < postList.items.length; i++) {

            if (postList.items[i].title.includes(search_input)
                || postList.items[i].content.includes(search_input)) {

                currentPosts.push(postList.items[i]);

            }

        }

        pageNum = 0;

        renderPagination();
        renderPosts();

    })

    ///////////////////////////////////////////////////////
    // 게시글 목록 기능
    ///////////////////////////////////////////////////////

    const main_list = document.querySelector("#main_list");

    main_list.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");

        connectDB();

    })

    const noticeBtn = document.querySelector("#notice");

    noticeBtn.addEventListener("click", () => {

        localStorage.setItem("postType", "notice");

        notice();

    })

}

///////////////////////////////////////////////////////
// 게시글 출력
///////////////////////////////////////////////////////
function renderPosts() {

    const content = document.querySelector("#content");

    content.innerHTML = "";

    for (let i = pageNum * 20; i < 20 * (pageNum + 1) && i < currentPosts.length; i++) {

        let post = currentPosts[i];

        let content_tr = document.createElement("tr");

        content_tr.innerHTML = `
            <td>${post.postId}</td>
            <td>${post.title}</td>
            <td>${post.authorNick}</td>
            <td>${post.createdAt.split('T')[0]}</td>
            <td>${post.viewCount}</td>
            <td>0</td>
        `

        content_tr.addEventListener("click", () => {
            window.location.href = `./post.html?postNo=${post.postId}`;
        })

        content.append(content_tr);

    }

}

///////////////////////////////////////////////////////
// 페이지네이션
///////////////////////////////////////////////////////
function renderPagination() {

    const page = document.querySelector(".page");

    page.innerHTML = "";

    const pageLength = Math.ceil(currentPosts.length / 20);

    for (let i = 0; i < pageLength; i++) {

        const span = document.createElement("span");

        span.className = "pageNum";

        span.innerText = i + 1;

        span.addEventListener("click", () => {

            pageNum = i;

            renderPosts();

        })

        page.append(span);

    }

}

///////////////////////////////////////////////////////
// 게시글 DB 연결 및 목록 로드
///////////////////////////////////////////////////////
async function connectDB() {

    async function postLoad() {

        const listQ = { page: 1, pageSize: 500 };

        try {

            const listRes = await API.V1.SJ.Posts.list(listQ);

            localStorage.setItem("postList", JSON.stringify(listRes));

        } catch (e) {

            console.log(e);

        }

    }

    await postLoad();

    const postList = JSON.parse(localStorage.getItem("postList"));

    if (!postList) return;

    currentPosts = postList.items;

    pageNum = 0;

    renderPagination();
    renderPosts();

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

    let postList = JSON.parse(localStorage.getItem("postList"));

    if (!postList) {
        connectDB();
        return;
    }

    currentPosts = [];

    for (let i = 0; i < postList.items.length; i++) {

        if (postList.items[i].authorId == 'admin') {

            currentPosts.push(postList.items[i]);

        }

    }

    pageNum = 0;

    renderPagination();
    renderPosts();

}