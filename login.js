window.addEventListener("load", () => {
    init();
})

function init() {
    let nowUserId = "";
    bind();
} // init end

function bind() {
    // userList = {
    //     0: {
    //         "name": "admin",
    //         "id": "admin",
    //         "pw": "admin",
    //         "stage": 0,
    //         // stage 단계 관리 : 1~0(완료)
    //         "access": 0
    //         // 관리자 권한 : 0, 회원 권한 : 1~2
    //         // access가 1보다 작거나 같다~ 하는 조건으로 접근제한
    //     },
    //     1: {
    //         "name": "user1",
    //         "id": "user1",
    //         "pw": "user1pw",
    //         "stage": 1,
    //         "access": 2
    //     },
    //     2: {
    //         "name": "user2",
    //         "id": "user2",
    //         "pw": "user2pw",
    //         "stage": 2,
    //         "access": 2
    //     },
    //     3: {
    //         "name": "user3",
    //         "id": "user3",
    //         "pw": "user3pw",
    //         "stage": 3,
    //         "access": 2
    //     },
    //     4: {
    //         "name": "user4",
    //         "id": "user4",
    //         "pw": "user4pw",
    //         "stage": 0,
    //         "access": 1
    //     }
    // }


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
    const login = document.querySelector("#login");
    const login_success = document.querySelector("#login-success-overlay");




    // 로그인 팝업 내 보기 버튼 클릭 시 비밀번호 보임
    const login_id = document.querySelector("#login-id");
    const login_pw = document.querySelector("#login-pw");
    const login_pw_check = document.querySelector("#login-pw-check");

    // 엔터 치면 이동
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

    login_pw_check.addEventListener("pointerdown", () => {
        login_pw.type = "text";
    })
    login_pw_check.addEventListener("pointerup", () => {
        login_pw.type = "password";
    })
    login_pw_check.addEventListener("pointerleave", () => {
        login_pw.type = "password";
    })

    // 로그인 팝업 내 로그인 버튼 클릭 시
    const login_fin = document.querySelector("#login-fin");
    const login_message = document.querySelector(".login-message");

    // let loginPossible = false;
    let login_id_value = "";
    let login_pw_value = "";

    login_fin.addEventListener("click", () => {
        login_id_value = document.querySelector("#login-id").value.trim();
        login_pw_value = document.querySelector("#login-pw").value.trim();

        // 빈칸이면 입력해달라는 키 나옴
        if (login_id_value == "" || login_pw_value == "") {
            login_message.innerHTML = "아이디 혹은 비밀번호를 입력해주세요.";
        } else {
            loginCheck();
        }
    })





    // 메인 페이지 버튼 클릭 시 이동
    const btn_main = document.querySelector("#btn-main");
    btn_main.addEventListener("click", () => {
        // window.location.href = "./main.html";
        window.location.href = "./home.html";
    })

    // 커뮤니티 페이지 버튼 클릭 시 이동
    const btn_comm = document.querySelector("#btn-comm");
    btn_comm.addEventListener("click", () => {
        window.location.href = "./community.html";
    })




    ////////////////////////////////////

    async function loginCheck() {
        const loginBody = { loginId: login_id_value, password: login_pw_value };
        // console.log(login_id_value);
        // console.log(login_pw_value);

        let loginRes;

        try {
            loginRes = await DD.V1.SJ.Auth.login(loginBody);
            logRes("SJ-AUTH-3 LOGIN", loginRes);

            login_message.innerHTML = ""
            // loginPossible = true;

            localStorage.setItem("loginPossible", "true");
            localStorage.setItem("loginUser", JSON.stringify(loginRes.user));

            // console.log("loginRes:", loginRes);

            // window.location.href = "./main.html";
            window.location.href = "./home.html";

        } catch (e) {
            logErr("SJ-AUTH-3 LOGIN", e);
            console.log("=> 로그인 실패면 SJ 글/댓글 테스트는 중단");
            console.log("에러 전체:", e);

            login_message.innerHTML = "아이디 혹은 비밀번호가 틀렸습니다.";
            return;
        }
    }

} // bind