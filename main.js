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

    const manual = document.querySelector(".manual");

    const messageOverlay = document.querySelector("#message-overlay");
    const messageBox = document.querySelector("#messageBox");

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
            const userId = document.querySelector("#userId");
            userId.innerHTML = loginUser.userId;

            // 로그인 된 계정의 정보에 따라서 #savePoint 내용 변경
            const savePoint = document.querySelector("#savePoint");
            savePoint.innerHTML = loginUser.savePoint;

            changeLogin();
        } catch (e) {
            console.log("로그인 안 됨");
            changeLogout();
        }
    } else {
        changeLogout();
    }




    // 커뮤니티 버튼 클릭 시 커뮤니티 링크로 이동
    const btn_comm = document.querySelector("#btn-comm");
    btn_comm.addEventListener("click", () => {
        window.location.href = "./community.html";
    })





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




    // 햄버거 메뉴 클릭 시 오른쪽 팝업
    const btn_ham = document.querySelector("#btn-ham");
    const ham_menu_overlay = document.querySelector("#ham-menu-overlay");
    btn_ham.addEventListener("click", () => {
        ham_menu_overlay.style.display = "block";
    })

    const ham_menu_close = document.querySelector("#ham-menu-close");
    ham_menu_close.addEventListener("click", () => {
        ham_menu_overlay.style.display = "none";
    })

    // 헴버거 메뉴에서 커뮤니티 클릭 시 페이지 이동
    const ham_menu_comm = document.querySelector(".ham-menu-comm");
    ham_menu_comm.addEventListener("click", () => {
        window.location.href = "./community.html";
    })



    // 처음부터 시작 클릭 시 1stage 이동
    const btn_sFirst = document.querySelector("#btn-sFirst");

    btn_sFirst.addEventListener("click", () => {
        messageBox.innerHTML = "게임으로 이동 중...";
        messageOverlay.style.display = "flex";

        setTimeout(() => {
            messageOverlay.style.display = "none";
            ///////// 페이지 이동
            window.location.href = "http://naver.com";
        }, 1000)
    })

    // 이어서 시작 클릭 시 저장된 페이지 링크로 이동
    const btn_sLast = document.querySelector("#btn-sLast");

    btn_sLast.addEventListener("click", () => {
        messageBox.innerHTML = "세이브 포인트 확인 중...";
        messageOverlay.style.display = "flex";
        
        // 세이브 포인트 정보 가져오기
        const loginUser = JSON.parse(localStorage.getItem("loginUser"));
        const savePoint = loginUser.savePoint;
        let savePointURL = "";

        // 만약 끝까지 깼으면 이어서하기 어떻게 할 건지?
        if (savePoint == 0) {
            savePointURL = "stage1주소.html";
        } else if (savePoint == 1) {
            savePointURL = "stage2주소.html";
        } else if (savePoint == 2) {
            savePointURL = "stage3주소.html";
        } else {
            savePointURL = "완성!";
        }

        setTimeout(() => {
            messageOverlay.style.display = "none";

            ///////// 페이지 이동
            window.location.href = savePointURL;
        }, 1000)
    })



    // 게임 설명서 버튼 누르면 .manual 열리기
    const btn_manual = document.querySelector("#btn-manual");

    btn_manual.addEventListener("click", () => {
        manual.style.display = "flex";
    })

    // 닫기 버튼 누르면 .manual 닫히기
    const manual_close = document.querySelector("#manual-close");

    manual_close.addEventListener("click", () => {
        manual.style.display = "none";
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
