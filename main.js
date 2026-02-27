userList = {
    0: {
        "name": "admin",
        "id": "admin",
        "pw": "admin",
        "stage": 0,
        // stage 단계 관리 : 1~0(완료)
        "access": 0
        // 관리자 권한 : 0, 회원 권한 : 1~2
        // access가 1보다 작거나 같다~ 하는 조건으로 접근제한
    },
    1: {
        "name": "user1",
        "id": "user1",
        "pw": "user1pw",
        "stage": 1,
        "access": 2
    },
    2: {
        "name": "user2",
        "id": "user2",
        "pw": "user2pw",
        "stage": 2,
        "access": 2
    },
    3: {
        "name": "user3",
        "id": "user3",
        "pw": "user3pw",
        "stage": 3,
        "access": 2
    },
    4: {
        "name": "user4",
        "id": "user4",
        "pw": "user4pw",
        "stage": 0,
        "access": 1
    }
}

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

    const login = document.querySelector("#login");
    const join = document.querySelector("#join");
    const manual = document.querySelector(".manual");


    const join_success = document.querySelector("#join-success-overlay");
    const login_success = document.querySelector("#login-success-overlay");

    const messageOverlay = document.querySelector("#message-overlay");
    const messageBox = document.querySelector("#messageBox");

    // 로그인 상태에 따라서 user 버튼 교체 (.beforeLogin <> .afterLogin)

    // 회원가입 버튼 클릭 시 회원가입 팝업

    const btn_join = document.querySelector("#btn-join");

    btn_join.addEventListener("click", () => {
        login.style.display = "none";
        manual.style.display = "none";
        join.style.display = "block";
    })

    // 아이디가 기존에 있으면, 거절
    // 없으면, 가능
    const join_id = document.querySelector("#join-id");
    const join_id_check = document.querySelector("#join-id-check");
    const join_message = document.querySelector(".join-message");

    let joinPossible = false;

    // join_id_check.addEventListener("click", () => {
    //     join_message.innerHTML = "";
    //     const join_id_value = join_id.value.trim();

    //     for (let key in userList) {
    //         if (join_id_value == userList[key].id) {
    //             join_message.innerHTML = "이미 존재하는 사용자입니다.";
    //             joinPossible = false;
    //             break;
    //         }
    //     }
    //     // console.log(joinPossible);
    // })

    // 비밀번호 보기 클릭 시 타입 text로 변환
    const join_pw = document.querySelector("#join-pw");
    const join_pw_check = document.querySelector("#join-pw-check");

    join_pw_check.addEventListener("mousedown", () => {
        join_pw.type = "text";
    })
    join_pw_check.addEventListener("mouseup", () => {
        join_pw.type = "password";
    })
    join_pw_check.addEventListener("mouseleave", () => {
        join_pw.type = "password";
    })

    // 회원가입 버튼 클릭
    const join_fin = document.querySelector("#join-fin");

    join_fin.addEventListener("click", () => {
        const join_id_value = join_id.value.trim();
        const join_pw_value = join_pw.value.trim();

        
        
        // 아이디, 비번 빈칸이면 안 됨
        if (join_id_value == "" || join_pw_value == "") {
            joinPossible = false;
            join_message.innerHTML = "아이디 혹은 비밀번호를 입력해주세요.";
        } else {
            if (duplCheck(join_id_value)) {
                console.log(duplCheck(join_id_value));
                joinPossible = false;
                join_message.innerHTML = "이미 존재하는 사용자입니다.";
                console.log(join_message.innerHTML);
            } else {
                join_message.innerHTML = "";
                joinPossible = true;
            }
        }


        if (joinPossible) {
            // console.log("회원가입 성공!");

            join.style.display = "none";
            join_success.style.display = "block";

            setTimeout(() => {
                join_success.style.display = "none";
            }, 1000)
        }
    })

    // 회원가입 팝업 닫기 버튼 클릭 시 사라짐
    const join_close = document.querySelector("#join-close");

    join_close.addEventListener("click", () => {
        join.style.display = "none";
    })



    // 로그인 버튼 클릭 시 로그인 팝업
    const btn_login = document.querySelector("#btn-login");

    btn_login.addEventListener("click", () => {
        join.style.display = "none";
        manual.style.display = "none";
        login.style.display = "block";
    })

    // 로그인 팝업 내 보기 버튼 클릭 시 비밀번호 보임
    const login_pw = document.querySelector("#login-pw");
    const login_pw_check = document.querySelector("#login-pw-check");

    login_pw_check.addEventListener("mousedown", () => {
        login_pw.type = "text";
    })
    login_pw_check.addEventListener("mouseup", () => {
        login_pw.type = "password";
    })
    login_pw_check.addEventListener("mouseleave", () => {
        login_pw.type = "password";
    })

    // 로그인 팝업 내 로그인 버튼 클릭 시
    // 아이디, 비밀번호 value 가져와서 비교하기
    const login_fin = document.querySelector("#login-fin");
    const login_message = document.querySelector(".login-message");

    let loginPossible = false;

    login_fin.addEventListener("click", () => {
        const login_id_value = document.querySelector("#login-id").value.trim();
        const login_pw_value = document.querySelector("#login-pw").value.trim();
        // console.log(login_id_value, login_pw_value);

        let result = loginCheck(login_id_value);
        console.log(result);
        console.log(login_id_value, login_pw_value);


        loginPossible = false;        
        // 빈칸이면 입력해달라는 키 나옴
        if (login_id_value == "" || login_pw_value == "") {
            // console.log("빈칸임");
            login_message.innerHTML = "아이디 혹은 비밀번호를 입력해주세요.";
            login_message.style.display = "block";
        } else if (!result) {
            login_message.innerHTML = "가입되지 않은 아이디입니다.";
            login_message.style.display = "block";
        } else if (result != login_pw_value) {
            login_message.innerHTML = "아이디 혹은 비밀번호가 틀렸습니다.";
            login_message.style.display = "block";
        } else {
            login_message.innerHTML = "";
            login_message.style.display = "none";
            loginPossible = true;
        }

        if (loginPossible) {
            // console.log("로그인 성공!");

            login.style.display = "none";
            login_success.style.display = "block";

            changeLogin();

            setTimeout(() => {
                login_success.style.display = "none";
            }, 1000)
        }
    })

    // 로그인 팝업 닫기 클릭 시 팝업 사라짐
    const login_close = document.querySelector("#login-close");

    login_close.addEventListener("click", () => {
        login.style.display = "none";
    })

    // 커뮤니티 버튼 클릭 시 커뮤니티 링크로 이동
    // const 

    // 햄버거 메뉴 클릭 시 오른쪽 팝업

    // 로그아웃 버튼 클릭 시 다시 탑메뉴 바뀜
    const btn_logout = document.querySelector("#btn-logout");

    btn_logout.addEventListener("click", () => {
        changeLogout();
        console.log("됨?");
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
        messageBox.innerHTML = "세이브 포인트로 이동 중...";
        messageOverlay.style.display = "flex";

        setTimeout(() => {
            messageOverlay.style.display = "none";
            ///////// 페이지 이동
            window.location.href = "http://naver.com";
        }, 1000)
    })

    // 게임 설명서 버튼 누르면 .manual 열리기
    const btn_manual = document.querySelector("#btn-manual");

    btn_manual.addEventListener("click", () => {
        manual.style.display = "block";
    })

    // 돌아가기 버튼 누르면 .manual 닫히기
    const manual_close = document.querySelector("#manual-close");

    manual_close.addEventListener("click", () => {
        manual.style.display = "none";
    })


    /////////////

    function duplCheck(id) {

        for (let key in userList) {
            if (id == userList[key].id) {
                return true;
            }
        }

    }

    function loginCheck(id) {

        for (let key in userList) {
            if (id == userList[key].id) {
                nowUserId = userList[key].id;
                return userList[key].pw;
            }
        }

    }

    function changeLogin() {
        beforeLogin.style.display = "none";
        afterLogin.style.display = "flex";
    }

    function changeLogout() {
        beforeLogin.style.display = "flex";
        afterLogin.style.display = "none";
    }
}
