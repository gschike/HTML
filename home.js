window.addEventListener("load", () => {
    init();
});

let nowUserId = "";
let loginUser = null;

function init() {
    bind();
}

function bind() {

    bindGNB();
    bindLNB();

    initAdCarousel();
    initGamesCarousel();

    initCommunity();
    initNotice();
    initNews();

    gameSearch();
}

/* =========================
   GNB
========================= */

function bindGNB() {

    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    const btn_myPage = document.querySelector("#btn-myPage");
    const btn_login = document.querySelector("#btn-login");
    const btn_join = document.querySelector("#btn-join");
    const btn_logout = document.querySelector("#btn-logout");

    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin === "true") {
        try {
            loginUser = JSON.parse(localStorage.getItem("loginUser"));

            if (!loginUser) throw new Error("유저 없음");

            nowUserId = loginUser.userId;

            changeLogin();

        } catch (e) {
            changeLogout();
        }
    } else {
        changeLogout();
    }

    btn_myPage.addEventListener("click", () => {
        window.location.href = "./myPage.html";
    });

    btn_login.addEventListener("click", () => {
        sessionStorage.setItem("prevPage", location.href);
        window.location.href = "./login.html";
    });

    btn_join.addEventListener("click", () => {
        window.location.href = "./join.html";
    });

    btn_logout.addEventListener("click", () => {

        localStorage.removeItem("loginUser");
        localStorage.setItem("loginPossible", "false");

        changeLogout();
    });

    function changeLogin() {
        beforeLogin.style.display = "none";
        afterLogin.style.display = "flex";
    }

    function changeLogout() {
        nowUserId = "";
        loginUser = null;

        beforeLogin.style.display = "flex";
        afterLogin.style.display = "none";
    }
}


/* =========================
   LNB
========================= */

function bindLNB() {

    const LNBmyPage = document.getElementById("LNBmyPage");
    const LNBnotice = document.getElementById("LNBnotice");
    const LNBcomm = document.getElementById("LNBcomm");

    const LNBadminPage = document.getElementById("LNBadminPage");
    if (nowUserId == "admin") {
        LNBadminPage.style.display = "inline-block";
    }

    LNBmyPage.addEventListener("click", () => {

        if (localStorage.getItem("loginPossible") !== "true") {
            alert("마이페이지는 로그인 후 이용 가능합니다.");
            sessionStorage.setItem("prevPage", "./myPage.html");
            window.location.href = "./login.html";
            return;
        }

        window.location.href = "./myPage.html";
    });

    LNBnotice.addEventListener("click", () => {

        localStorage.setItem("postType", "notice");
        window.location.href = "./community.html";
    });

    LNBcomm.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");
        window.location.href = "./community.html";
    });
}


/* =========================
   광고 캐러셀
========================= */

function initAdCarousel() {

    const track = document.querySelector(".track");
    const slides = document.querySelectorAll(".slide");

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let currentIndex = 0;

    function moveSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {

        if (currentIndex < slides.length - 1) {
            currentIndex++;
            moveSlide();
        }
    });

    prevBtn.addEventListener("click", () => {

        if (currentIndex > 0) {
            currentIndex--;
            moveSlide();
        }
    });

    window.addEventListener("resize", moveSlide);
}


/* =========================
   게임 캐러셀
========================= */

function initGamesCarousel() {

    const gamesTrack = document.querySelector(".games-track");
    const gamesSlides = document.querySelectorAll(".games-slide");

    const gamesNext = document.querySelector(".games-next");
    const gamesPrev = document.querySelector(".games-prev");

    const viewport = document.querySelector(".games-viewport");

    let gamesIndex = 0;

    moveGamesSlide();

    function moveGamesSlide() {

        const slide = gamesSlides[0];

        const slideWidth = slide.getBoundingClientRect().width;

        const trackStyle = getComputedStyle(gamesTrack);
        const gap = parseFloat(trackStyle.gap) || 0;

        const viewportWidth = viewport.getBoundingClientRect().width;

        const centerOffset = (viewportWidth - slideWidth) / 2;

        const moveX = centerOffset - (gamesIndex * (slideWidth + gap));

        gamesTrack.style.transform = `translateX(${moveX}px)`;
    }

    gamesNext.addEventListener("click", () => {

        if (gamesIndex < gamesSlides.length - 1) {
            gamesIndex++;
            moveGamesSlide();
        }
    });

    gamesPrev.addEventListener("click", () => {

        if (gamesIndex > 0) {
            gamesIndex--;
            moveGamesSlide();
        }
    });

    window.addEventListener("resize", moveGamesSlide);
}


/* =========================
   커뮤니티
========================= */

async function initCommunity() {

    await postLoad();

    const postList = JSON.parse(localStorage.getItem("postList"));

    const tbody = document.querySelector("#comm-content-tbody");

    tbody.innerHTML = "";

    postList.items.slice(0, 10).forEach(post => {

        const postId = post.postId;

        tbody.innerHTML += `
            <tr class="commContent">
                <td class="contentTitle">
                    <a href="./post.html?postNo=${postId}" class="rowLink">
                        ${post.title}
                    </a>
                </td>
                <td class="contentTime">
                    <a href="./post.html?postNo=${postId}" class="rowLink">
                        ${post.createdAt.split("T")[0]}
                    </a>
                </td>
            </tr>
        `;
    });

    const gotoComm = document.getElementById("gotoComm");

    gotoComm.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");
        window.location.href = "./community.html";
    });
}


/* =========================
   공지사항
========================= */

function initNotice() {

    const postList = JSON.parse(localStorage.getItem("postList"));

    const tbody = document.querySelector("#notice-content-tbody");

    const adminPosts = postList.items.filter(post => post.authorNo === 1);

    tbody.innerHTML = "";

    adminPosts.slice(0, 10).forEach(post => {

        const postId = post.postId;

        tbody.innerHTML += `
            <tr class="noticeContent">
                <td class="contentTitle">
                    <a href="./post.html?postNo=${postId}" class="rowLink">
                        ${post.title}
                    </a>
                </td>
                <td class="contentTime">
                    <a href="./post.html?postNo=${postId}" class="rowLink">
                        ${post.createdAt.split("T")[0]}
                    </a>
                </td>
            </tr>
        `;
    });


}


/* =========================
   뉴스
========================= */

function initNews() {

    fetch("./asset/json/invenNews.json")
        .then(res => res.json())
        .then(data => {

            const newsBox = document.querySelector("#news");

            newsBox.innerHTML = "";

            data.news.forEach(item => {

                const li = document.createElement("li");

                li.innerHTML = `
                <a href="${item.link}" target="_blank" class="newsList">
                ${item.title}
                </a>
                `;

                newsBox.appendChild(li);
            });
        });
}


/* =========================
   POSTS API
========================= */

async function postLoad() {

    const listQ = { page: 1, pageSize: 100 };

    try {

        const listRes = await API.V1.SJ.Posts.list(listQ);

        localStorage.setItem("postList", JSON.stringify(listRes));

    } catch (e) {

        console.log("SJ-POST-1 POSTS_LIST", e);
    }
}

///////////////////////////////////////////////////////
// 게임 검색 기능
///////////////////////////////////////////////////////

function gameSearch() {
    const searchBtn = document.querySelector("#search-btn");
    const searchInput = document.querySelector("#search-input");
    const games = document.querySelectorAll(".agGames");
    const agTitle = document.querySelector("#agTitle");

    // 검색 버튼
    searchBtn.addEventListener("click", () => {
        const keyword = searchInput.value.trim().toLowerCase();

        games.forEach(game => {
            const title = game.querySelector(".agGamesTitle").innerText.toLowerCase();

            if (title.includes(keyword)) {
                game.parentElement.style.display = "block";
            } else {
                game.parentElement.style.display = "none";
            }
        });
    });

    // 모든 게임 다시 보기
    agTitle.addEventListener("click", () => {
        searchInput.value = "";

        games.forEach(game => {
            game.parentElement.style.display = "block";
        });
    });
}