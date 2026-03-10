window.addEventListener("load", () => {
    init();
})

let nowUserId = "";

function init() {

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

    bind();
}

function bind() {
    if (!checkLogin()) return;

    userId();
    bindGNB();
    bindLNB();
    bindNickname();
    bindPassword();
    bindDeleteAccount();

    postList();
}



///////////////////////////////////////////////////////
// GNB
///////////////////////////////////////////////////////

function bindGNB() {

    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    const btn_myPage = document.querySelector("#btn-myPage");

    btn_myPage.addEventListener("click", () => {
        window.location.href = "./myPage.html"
    })

    let loginUser;

    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin == "true") {

        try {

            loginUser = JSON.parse(localStorage.getItem("loginUser"));

            if (!loginUser) throw new Error("유저 정보 없음");

            console.log("로그인 상태:", isLogin);
            console.log("loginUser:", loginUser);

            console.log("현재 로그인 유저:", loginUser.userId);
            console.log("권한:", loginUser.role);

            nowUserId = loginUser.userId;

            changeLogin();

        } catch (e) {

            console.log("로그인 안 됨");
            changeLogout();

        }

    } else {

        changeLogout();

    }


    const btn_login = document.querySelector("#btn-login");

    btn_login.addEventListener("click", () => {
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

        isLogin = localStorage.getItem("loginPossible");

        changeLogout();

        window.location.href = "./home.html";

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



///////////////////////////////////////////////////////
// LNB
///////////////////////////////////////////////////////

function bindLNB() {
    const LNBadminPage = document.getElementById("LNBadminPage");
    
    if (nowUserId == "admin") {
        LNBadminPage.style.display = "inline-block";
    }

    const LNBmyPage = document.getElementById("LNBmyPage");

    LNBmyPage.addEventListener("click", () => {

        if (!checkLogin()) return;

        window.location.href = "./myPage.html";
    })


    const LNBnotice = document.getElementById("LNBnotice");

    LNBnotice.addEventListener("click", () => {

        localStorage.setItem("postType", "notice");
        window.location.href = "./community.html";

    })


    const LNBcomm = document.getElementById("LNBcomm");

    LNBcomm.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");
        window.location.href = "./community.html";

    })

}


///////////////////////////////////////////////////////


// =================================================
// 로그인 안 했으면 마이페이지 접근 차단
// =================================================
function checkLogin() {

    if (localStorage.getItem("loginPossible") != "true") {

        alert("로그인이 필요합니다.");
        window.location.href = "./login.html";

        return false;
    }

    return true;

}


///////////////////////////////////////////////////////
// 아이디 정보 가져오기
///////////////////////////////////////////////////////
function userId() {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const idInfo = document.getElementById("idInfo");

    idInfo.innerHTML = loginUser.userId;
}



///////////////////////////////////////////////////////
// 닉네임 변경
///////////////////////////////////////////////////////

function bindNickname() {

    const nickMessage = document.getElementById("nickMessage");

    const nickInput = document.getElementById("nickInput");

    let loginUserJson = JSON.parse(localStorage.getItem("loginUser"));

    nickInput.value = loginUserJson.nickname;


    const nickBtn = document.getElementById("nickBtn");

    nickBtn.addEventListener("click", () => {

        const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;

        let nickInputValue = nickInput.value.trim();

        try {

            if (!nicknameRegex.test(nickInputValue)) {

                nickMessage.innerText = "닉네임은 2~10글자, 특수문자 사용 불가합니다.";
                return;

            }

            loginUserJson.nickname = nickInputValue;

            localStorage.setItem("loginUser", JSON.stringify(loginUserJson));

            nickMessage.innerText = "닉네임을 변경하였습니다."

        } catch (e) {

            nickMessage.innerText = "닉네임 변경을 실패하였습니다."
            console.log("실패:", e.message);

        }

        setTimeout(() => {

            nickMessage.innerText = "";

        }, 3000)

    })


    nickInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            nickBtn.click();

        }

    });

}



///////////////////////////////////////////////////////
// 비밀번호 변경
///////////////////////////////////////////////////////

function bindPassword() {

    const pwBtn = document.getElementById("pwBtn");
    const pwOverlay = document.getElementById("pwOverlay");

    pwBtn.addEventListener("click", () => {
        pwOverlay.style.display = "flex";
    })


    const pc_closeBtn = document.getElementById("pc-closeBtn");

    pc_closeBtn.addEventListener("click", () => {
        pwOverlay.style.display = "none";
    })


    const newPw = document.getElementById("newPw");
    const newPwChk = document.getElementById("newPwChk");


    newPw.addEventListener("keydown", (e) => {

        if (e.key === "Tab") {
            e.preventDefault();
            newPwChk.focus();
        }

    })


    newPwChk.addEventListener("keydown", e => {

        if (e.key === "Tab") {
            e.preventDefault();
            pc_closeBtn.focus();
        }

    })


    const pc_changeBtn = document.getElementById("pc-changeBtn");

    pc_changeBtn.addEventListener("click", () => {
        changePw();
    })


    const newPw_btn = document.getElementById("newPw-btn");
    const newPwChk_btn = document.getElementById("newPwChk-btn");


    newPw_btn.addEventListener("pointerdown", () => {
        newPw.type = "text";
    })

    newPw_btn.addEventListener("pointerup", () => {
        newPw.type = "password";
    })

    newPw_btn.addEventListener("pointerleave", () => {
        newPw.type = "password";
    })


    newPwChk_btn.addEventListener("pointerdown", () => {
        newPwChk.type = "text";
    })

    newPwChk_btn.addEventListener("pointerup", () => {
        newPwChk.type = "password";
    })

    newPwChk_btn.addEventListener("pointerleave", () => {
        newPwChk.type = "password";
    })

}



///////////////////////////////////////////////////////
// 계정 삭제
///////////////////////////////////////////////////////

function bindDeleteAccount() {

    const delBtn = document.getElementById("delBtn");
    const delOverlay = document.getElementById("delOverlay");

    delBtn.addEventListener("click", () => {
        delOverlay.style.display = "flex";
    })


    const ad_closeBtn = document.getElementById("ad-closeBtn");

    ad_closeBtn.addEventListener("click", () => {
        delOverlay.style.display = "none";
    })


    const ad_changeBtn = document.getElementById("ad-changeBtn");

    ad_changeBtn.addEventListener("click", () => {

        localStorage.setItem("loginPossible", "false");
        localStorage.removeItem("loginUser");

        window.location.href = "./home.html";

    })

}



///////////////////////////////////////////////////////
// 내가 쓴 글
///////////////////////////////////////////////////////

async function postList() {

    const postList = JSON.parse(localStorage.getItem("postList")).items;
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const postsTableTbody = document.getElementById("postsTableTbody")

    let postsIdArr = [];


    for (let i = 0; i < postList.length; i++) {

        if (postList[i].authorId == loginUser.userId) {

            postsTableTbody.innerHTML += `
                <tr class="postsList">
                    <td class="postsTitle">${postList[i].title}</td>
                    <td calss="postsDate">${postList[i].createdAt.split("T")[0]}</td>
                </tr>
            `

            postsIdArr.push(Number(postList[i].postId));

        }

    }


    const posts = document.querySelectorAll("td.postsTitle");


    for (let i = 0; i < posts.length; i++) {

        posts[i].addEventListener("click", () => {

            let postNo = postsIdArr[i];

            if (!postNo) {

                alert("잘못된 접근입니다.");
                return;

            }

            window.location.href = `./post.html?postNo=${postNo}`

        })

    }

}



///////////////////////////////////////////////////////
// 비밀번호 변경 실행
///////////////////////////////////////////////////////

async function changePw() {

    const nowPw = document.getElementById("nowPw")
    const nowPwValue = nowPw.value.trim();

    const newPw = document.getElementById("newPw")
    const newPwValue = newPw.value.trim();

    const newPwChk = document.getElementById("newPwChk")
    const newPwChkValue = newPwChk.value.trim();

    const pwMessage = document.getElementById("pwMessage");


    if (!nowPwValue || !newPwValue || !newPwChkValue) {

        pwMessage.innerText = "비밀번호를 모두 입력해주세요."
        return;

    }


    const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

    if (!pwReg.test(newPwValue)) {

        pwMessage.innerText = "비밀번호는 8~20자 영어, 숫자가 하나 이상 있어야 합니다.";
        newPw.focus();
        return;

    }


    if (newPwValue != newPwChkValue) {

        pwMessage.innerText = "비밀번호가 서로 다릅니다. 다시 입력해주세요."
        newPwChk.focus();
        return;

    }


    const test = await API.V1.SJ.Auth.changePassword({

        loginId: JSON.parse(localStorage.getItem("loginUser")).userId,
        oldPassword: nowPwValue,
        newPassword: newPwValue

    }).then(console.log("성공")).catch(console.log("실패"));


    if (test.changed) {

        pwMessage.innerText = "비밀번호가 변경되었습니다."

        nowPw.value = "";
        newPw.value = "";
        newPwChk.value = "";

    } else {

        pwMessage.innerText = "비밀번호 변경을 실패하였습니다."

    }

}