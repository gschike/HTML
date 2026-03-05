window.addEventListener("load", () => {
    init();
})

function init() {
    bind();
}

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
    ///////////////////////////////////////////////////////


    const join = document.querySelector("#join");
    const join_success = document.querySelector("#join-success-overlay");

    const join_id = document.querySelector("#join-id");
    const join_message = document.querySelector(".join-message");

    const join_pw = document.querySelector("#join-pw");
    const join_pw_check = document.querySelector("#join-pw-check");

    const join_pw_chk = document.querySelector("#join-pw-chk");

    let joinPossible = false;

    // id (5~20자) : 영문 소문자 + 숫자만 허용
    // pw (8~20자) : 영문, 숫자 최소 1개씩 포함
    const idReg = /^[a-z0-9]{5,20}$/;
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

    // 엔터 치면 이동
    join_id.addEventListener("keyup", (e) => {
        if (e.keyCode == 13) {
            join_pw.focus();
        }
    })

    join_pw.addEventListener("keyup", (e) => {
        if (e.keyCode == 13) {
            join_fin.focus();
        }
    })

    // 비밀번호 보기 클릭 시 타입 text로 변환

    join_pw_check.addEventListener("pointerdown", () => {
        join_pw.type = "text";
    })
    join_pw_check.addEventListener("pointerup", () => {
        join_pw.type = "password";
    })
    join_pw_check.addEventListener("pointerleave", () => {
        join_pw.type = "password";
    })

    // 회원가입 버튼 클릭
    const join_fin = document.querySelector("#join-fin");
    let join_id_value = "";
    let join_pw_value = ""

    join_fin.addEventListener("click", async () => {
        join_id_value = join_id.value.trim();
        join_pw_value = join_pw.value.trim();
        join_pw_chk_value = join_pw_chk.value.trim();

        // 빈 값 검사
        if (join_id_value == "" || join_pw_value == "") {
            join_message.innerHTML = "아이디 혹은 비밀번호를 입력해주세요.";

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
        if (join_pw_value !=  join_pw_chk_value) {
            join_message.innerHTML = "비밀번호가 서로 다릅니다. 다시 입력해주세요.";
            join_pw_chk.focus();

            return;
        }

        // 서버 중복 검사 실행
        await duplCheck();
    })



    // 메인 페이지 클릭 시 이동
    const btn_main = document.querySelector("#btn-main");
    btn_main.addEventListener("click", () => {
        window.location.href = "./main.html";
    })


    // 로그인 페이지 클릭 시 이동
    const btn_login = document.querySelector("#btn-login");
    btn_login.addEventListener("click", () => {
        window.location.href = "./login.html";
    })





    ////////////////////////////////////////

    async function duplCheck() {
        const SJ_ID = join_id_value;
        const SJ_PW = join_pw_value;
        const SJ_NICK = "";

        // SJ-AUTH-1) 중복 체크
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

        // 이미 존재하는 사용자
        if (exists) {
            join_message.innerHTML = "이미 존재하는 사용자입니다.";

            return;
        }

        // SJ-AUTH-2) 회원가입 (없을 때만)
        if (!exists) {
                const signupBody = { loginId: SJ_ID, password: SJ_PW, nickname: SJ_NICK };
                // const signupUrl = DD.V1.url(DD.V1.API.SJ_AUTH_SIGNUP);
                // logCall("SJ-AUTH-2 SIGNUP", "POST", signupUrl, signupBody);
                try {
                    const signupRes = await API.V1.SJ.Auth.signup(signupBody);
                    logRes("SJ-AUTH-2 SIGNUP", signupRes);

                    join_message.innerHTML = "회원가입 성공!";
                } catch (e) {
                    logErr("SJ-AUTH-2 SIGNUP", e);
                    return;
                }
            } else {
                console.log("[SKIP] SJ-AUTH-2 SIGNUP: 이미 존재해서 생략");
            }

    };

} // bind end