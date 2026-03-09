window.addEventListener("load", () => {
    init();
})

function init() {
    let nowUserId = "";
    bind();
} // init end


function bind() {

    //////////////////////////////////////////////////////////
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


    //////////////////////////////////////////////////////////
    // 로그인 관련 요소
    //////////////////////////////////////////////////////////

    const login = document.querySelector("#login");
    const login_success = document.querySelector("#login-success-overlay");

    const login_id = document.querySelector("#login-id");
    const login_pw = document.querySelector("#login-pw");
    const login_pw_check = document.querySelector("#login-pw-check");

    const login_fin = document.querySelector("#login-fin");
    const login_message = document.querySelector(".login-message");

    let login_id_value = "";
    let login_pw_value = "";


    //////////////////////////////////////////////////////////
    // 이벤트 바인딩 시작
    //////////////////////////////////////////////////////////

    bindEnterKeyMove();
    bindPasswordView();
    bindLoginButton();
    bindMainMove();


    //////////////////////////////////////////////////////////
    // 기능 메소드
    //////////////////////////////////////////////////////////


    // =========================================================
    // 아이디 / 비밀번호 입력 후 엔터키 이동 기능
    // =========================================================
    function bindEnterKeyMove() {

        login_id.addEventListener("keyup", (e) => {
            if (e.keyCode == 13) {
                login_pw.focus();
            }
        })

        login_pw.addEventListener("keyup", (e) => {
            if (e.keyCode == 13) {
                login_fin.focus();
            }
        })

    }


    // =========================================================
    // 비밀번호 보기 버튼 (누르는 동안 비밀번호 표시)
    // =========================================================
    function bindPasswordView() {

        login_pw_check.addEventListener("pointerdown", () => {
            login_pw.type = "text";
        })

        login_pw_check.addEventListener("pointerup", () => {
            login_pw.type = "password";
        })

        login_pw_check.addEventListener("pointerleave", () => {
            login_pw.type = "password";
        })

    }


    // =========================================================
    // 로그인 버튼 클릭 이벤트
    // =========================================================
    function bindLoginButton() {

        login_fin.addEventListener("click", () => {

            login_id_value = document.querySelector("#login-id").value.trim();
            login_pw_value = document.querySelector("#login-pw").value.trim();

            // 입력값 검증
            if (login_id_value == "" || login_pw_value == "") {

                login_message.innerHTML = "아이디 혹은 비밀번호를 입력해주세요.";

            } else {

                loginCheck();

            }

        })

    }


    // =========================================================
    // 메인 페이지 이동 버튼
    // =========================================================
    function bindMainMove() {

        const btn_main = document.querySelector("#btn-main");

        btn_main.addEventListener("click", () => {

            window.location.href = "./home.html";

        })

    }



    //////////////////////////////////////////////////////////
    // 로그인 처리 API
    //////////////////////////////////////////////////////////

    async function loginCheck() {

        const loginBody = { loginId: login_id_value, password: login_pw_value };

        let loginRes;

        try {

            loginRes = await API.V1.SJ.Auth.login(loginBody);

            logRes("SJ-AUTH-3 LOGIN", loginRes);

            login_message.innerHTML = ""

            localStorage.setItem("loginPossible", "true");
            localStorage.setItem("loginUser", JSON.stringify(loginRes.user));

            // 로그인 성공 시 전페이지 혹은 홈으로 이동
            const prevPage = sessionStorage.getItem("prevPage");
            if (prevPage) {
                window.location.href = prevPage;
            } else {
                window.location.href = "./home.html";
            }

        } catch (e) {

            logErr("SJ-AUTH-3 LOGIN", e);

            console.log("=> 로그인 실패면 SJ 글/댓글 테스트는 중단");
            console.log("에러 전체:", e);

            login_message.innerHTML = "아이디 혹은 비밀번호가 틀렸습니다.";

            return;

        }

    }

} // bind end