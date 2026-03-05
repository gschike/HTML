window.addEventListener("load", () => {
    init();
})

function init() {
    let nowUserId = "";
    bind();
}

function bind() {
    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    // GNB
    // 마이 페이지로 이동
    const btn_myPage = document.querySelector("#btn-myPage");
    btn_myPage.addEventListener("click", () => {
        window.location.href = "./myPage.html"
    })

    let loginUser;


    // 로그인 상태에 따라서 user 버튼 교체 (.beforeLogin <> .afterLogin)
    // localStorage.setItem("loginPossible", "false");

    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin == "true") {
        try {
            loginUser = JSON.parse(localStorage.getItem("loginUser"));

            if (!loginUser) throw new Error("유저 정보 없음");

            console.log("로그인 상태:", isLogin);
            console.log("loginUser:", loginUser);
            /* createdAt: null
                email : null
                nickname : "SJ테스트유저"
                role : "USER"
                savePoint : 0
                userId : "user5"
                userNo : 7
            */

            console.log("현재 로그인 유저:", loginUser.userId);
            console.log("권한:", loginUser.role);


            // 로그인 된 계정의 #userId
            loginUser = loginUser.userId;

            changeLogin();
        } catch (e) {
            console.log("로그인 안 됨");
            changeLogout();
        }
    } else {
        changeLogout();
    }

    // 로그인 버튼 클릭 시 로그인 창으로 이동
    const btn_login = document.querySelector("#btn-login");

    btn_login.addEventListener("click", () => {
        window.location.href = "./login.html";
    })

    // 회원가입 버튼 클릭 시 회원가입 창으로 이동
    const btn_join = document.querySelector("#btn-join");

    btn_join.addEventListener("click", () => {
        window.location.href = "./join.html";
    })

    // 로그아웃 버튼 클릭 시 다시 로그인 상태 바뀜
    const btn_logout = document.querySelector("#btn-logout");

    btn_logout.addEventListener("click", () => {
        localStorage.removeItem("loginUser");

        localStorage.setItem("loginPossible", "false");
        isLogin = localStorage.getItem("loginPossible");
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
}