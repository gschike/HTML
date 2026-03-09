window.addEventListener("load", () => {
    init();
})

function init() {
    bind();
}

function bind() {

    ///////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////
    // 회원가입 관련 요소
    ///////////////////////////////////////////////////////

    const join = document.querySelector("#join");
    const join_success = document.querySelector("#join-success-overlay");

    const join_id = document.querySelector("#join-id");
    const join_message = document.querySelector(".join-message");

    const join_pw = document.querySelector("#join-pw");
    const join_pw_check = document.querySelector("#join-pw-check");

    const join_pw_chk = document.querySelector("#join-pw-chk");

    const join_fin = document.querySelector("#join-fin");

    const btn_main = document.querySelector("#btn-main");
    const move_login = document.querySelector("#login");


    ///////////////////////////////////////////////////////
    // 상태 변수
    ///////////////////////////////////////////////////////

    let joinPossible = false;

    let join_id_value = "";
    let join_pw_value = "";
    let join_pw_chk_value = "";


    ///////////////////////////////////////////////////////
    // 정규식
    ///////////////////////////////////////////////////////

    // id (5~20자) : 영문 소문자 + 숫자만 허용
    const idReg = /^[a-z0-9]{5,20}$/;

    // pw (8~20자) : 영문, 숫자 최소 1개씩 포함
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;


    ///////////////////////////////////////////////////////
    // 이벤트 바인딩
    ///////////////////////////////////////////////////////

    bindEnterKeyMove();
    bindPasswordView();
    bindJoinButton();
    bindMainMove();
    bindLoginMove();



    ///////////////////////////////////////////////////////
    // 기능 메소드
    ///////////////////////////////////////////////////////


    // =========================================================
    // 엔터키 입력 시 다음 입력칸 이동 및 회원가입 실행
    // =========================================================
    function bindEnterKeyMove() {

        // 아이디 → 비밀번호
        join_id.addEventListener("keyup", (e) => {

            if (e.keyCode == 13) {

                join_pw.focus();

            }

        })


        // 비밀번호 → 비밀번호 확인
        join_pw.addEventListener("keyup", (e) => {

            if (e.keyCode == 13) {

                join_pw_chk.focus();

            }

        })


        // 비밀번호 확인 → 회원가입 버튼 클릭
        join_pw_chk.addEventListener("keyup", (e) => {

            if (e.keyCode == 13) {

                join_fin.click();

            }

        })

    }



    // =========================================================
    // 비밀번호 보기 버튼 (누르는 동안 표시)
    // =========================================================
    function bindPasswordView() {

        join_pw_check.addEventListener("pointerdown", () => {

            join_pw.type = "text";

        })

        join_pw_check.addEventListener("pointerup", () => {

            join_pw.type = "password";

        })

        join_pw_check.addEventListener("pointerleave", () => {

            join_pw.type = "password";

        })

    }



    // =========================================================
    // 회원가입 버튼 클릭 이벤트
    // =========================================================
    function bindJoinButton() {

        join_fin.addEventListener("click", async () => {

            join_id_value = join_id.value.trim();
            join_pw_value = join_pw.value.trim();
            join_pw_chk_value = join_pw_chk.value.trim();


            // =========================================================
            // 입력값 검증
            // =========================================================

            // 빈 값 검사
            if (join_id_value == "" || join_pw_value == "") {

                join_message.innerHTML = "아이디와 비밀번호를 모두 입력해주세요.";

                return;

            }


            // 아이디 형식 검사
            if (!idReg.test(join_id_value)) {

                join_message.innerHTML = "아이디는 5~20자 영문 소문자, 숫자만 가능합니다.";

                join_id.focus();

                return;

            }


            // 비밀번호 형식 검사
            if (!pwReg.test(join_pw_value)) {

                join_message.innerHTML = "비밀번호는 8~20자 영어, 숫자가 하나 이상 있어야 합니다.";

                join_pw.focus();

                return;

            }


            // 비밀번호 재확인 검사
            if (join_pw_value != join_pw_chk_value) {

                join_message.innerHTML = "비밀번호가 서로 다릅니다. 다시 입력해주세요.";

                join_pw_chk.focus();

                return;

            }


            // =========================================================
            // 서버 중복 검사
            // =========================================================

            await duplCheck();

        })

    }



    // =========================================================
    // 메인 페이지 이동 버튼
    // =========================================================
    function bindMainMove() {

        btn_main.addEventListener("click", () => {

            window.location.href = "./home.html";

        })

    }



    // =========================================================
    // 로그인 페이지 이동 버튼
    // =========================================================
    function bindLoginMove() {

        move_login.addEventListener("click", () => {

            window.location.href = "./login.html";

        })

    }



    ///////////////////////////////////////////////////////
    // 아이디 중복 검사 및 회원가입 처리
    ///////////////////////////////////////////////////////

    async function duplCheck() {

        const SJ_ID = join_id_value;
        const SJ_PW = join_pw_value;
        const SJ_NICK = "미정";

        // =========================================================
        // SJ-AUTH-1 : 아이디 중복 체크
        // =========================================================

        const checkQ = { loginId: SJ_ID };

        let checkRes;

        try {

            checkRes = await API.V1.SJ.Auth.checkLoginId(checkQ);

            logRes("SJ-AUTH-1 CHECK_ID", checkRes);

        } catch (e) {

            logErr("SJ-AUTH-1 CHECK_ID", e);

            return;

        }


        const exists = !!checkRes?.exists;


        // =========================================================
        // 이미 존재하는 사용자
        // =========================================================

        if (exists) {

            join_message.innerHTML = "이미 존재하는 사용자입니다.";

            return;

        }


        // =========================================================
        // SJ-AUTH-2 : 회원가입 실행
        // =========================================================

        if (!exists) {

            const signupBody = { loginId: SJ_ID, password: SJ_PW, nickname: SJ_NICK };

            try {

                const signupRes = await API.V1.SJ.Auth.signup(signupBody);

                logRes("SJ-AUTH-2 SIGNUP", signupRes);

                join_message.innerHTML = "회원가입 성공!";

            } catch (e) {

                logErr("SJ-AUTH-2 SIGNUP", e);

                join_message.innerHTML = "회원가입에 실패하였습니다.";

                return;

            }

        } else {

            console.log("[SKIP] SJ-AUTH-2 SIGNUP: 이미 존재해서 생략");

        }

    }

} // bind end