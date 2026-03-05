window.addEventListener("load", () => {
    init();
})

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
    // GNB
    // 홈으로 이동
    const home = document.querySelector("#home");
    home.addEventListener("click", () => {
        window.location.href = "./home.html";
    })


    // 닉네임 value
    const nickMessage = document.getElementById("nickMessage");

    const nickInput = document.getElementById("nickInput");
    let loginUserJson = JSON.parse(localStorage.getItem("loginUser"));

    nickInput.value = loginUserJson.nickname;

    // if (JSON.parse(localStorage.getItem("loginUser")).nickname) {
    //     nickInput.value = JSON.parse(localStorage.getItem("loginUser")).nickname
    // } else {
    //     nickInput.placeholder = "닉네임 없음";
    // }


    // 확인 버튼 누르면 닉네임 value 전송
    const nickBtn = document.getElementById("nickBtn");

    nickBtn.addEventListener("click", () => {
        const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
        let nickInputValue = nickInput.value.trim();

        try {
            // 닉네임은 2~10글자, 특수문자 사용 불가
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

    // 닉네임 칸에서 엔터 쳐도 확인 버튼 눌린 것처럼
    nickInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            nickBtn.click();
        }
    });


    // 비밀번호 변경하기 누르면 팝업
    const pwBtn = document.getElementById("pwBtn");
    const pwOverlay = document.getElementById("pwOverlay");

    pwBtn.addEventListener("click", () => {
        pwOverlay.style.display = "flex";
    })

    // 비밀번호 팝업 : 닫기 누르면 사라짐
    const pc_closeBtn = document.getElementById("pc-closeBtn");

    pc_closeBtn.addEventListener("click", () => {
        pwOverlay.style.display = "none";
    })

    // 변경하기 버튼
    const pc_changeBtn = document.getElementById("pc-changeBtn");

    pc_changeBtn.addEventListener("click", () => {
        changePw();
    })

    // 비밀번호 보이기 누르면 보임
    const newPw_btn = document.getElementById("newPw-btn");
    const newPwChk_btn = document.getElementById("newPwChk-btn");

    const newPw = document.getElementById("newPw")
    const newPwChk = document.getElementById("newPwChk")

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




    // 내 계정 삭제 누르면 팝업
    const delBtn = document.getElementById("delBtn");
    const delOverlay = document.getElementById("delOverlay");

    delBtn.addEventListener("click", () => {
        delOverlay.style.display = "flex";
    })

    // 삭제 팝업 닫기 버튼
    const ad_closeBtn = document.getElementById("ad-closeBtn");

    ad_closeBtn.addEventListener("click", () => {
        delOverlay.style.display = "none";
    })

    // 삭제하기 버튼 누르면 안타깝게도 삭제는 진짜 안 되지만...
    const ad_changeBtn = document.getElementById("ad-changeBtn");

    ad_changeBtn.addEventListener("click", () => {
        localStorage.setItem("loginPossible", "false");
        localStorage.removeItem("loginUser");

        window.location.href = "./home.html";
    })





    // 내가 쓴 글 가져오기
    postList();

}

// 내가 쓴 글 가져오기 함수
async function postList() {
    // console.log("내가 쓴 글:", JSON.parse(localStorage.getItem("postList")).items);
    const postList = JSON.parse(localStorage.getItem("postList")).items;
    // console.log("로그인 중인 유저:", loginUser);
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

    console.log(postsIdArr);


    // 포스트 클릭하면 이동!
    const posts = document.querySelectorAll("td.postsTitle");

    for (let i = 0; i < posts.length; i++) {
        posts[i].addEventListener("click", () => {
            let postNo = postsIdArr[i];
            console.log(postNo);

            if (!postNo) {
                alert("잘못된 접근입니다.");
                return;
            }

            window.location.href = `./post.html?postNo=${postNo}`
        })
    }

}


// 비밀번호 변경하기 함수
async function changePw() {
    const nowPw = document.getElementById("nowPw")
    const nowPwValue = nowPw.value.trim();
    const newPw = document.getElementById("newPw")
    const newPwValue = newPw.value.trim();
    const newPwChk = document.getElementById("newPwChk")
    const newPwChkValue = newPwChk.value.trim();

    const pwMessage = document.getElementById("pwMessage");


    // 하나라도 비어있으면 안 됨
    if (!nowPwValue || !newPwValue || !newPwChkValue) {
        pwMessage.innerText = "비밀번호를 모두 입력해주세요."
        return;
    }

    // 비밀번호 조건
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

    if (!pwReg.test(newPwValue)) {
        pwMessage.innerText = "비밀번호는 8~20자 영어, 숫자가 하나 이상 있어야 합니다.";
        newPw.focus();
        return;
    }

    // 비밀번호 재확인 검사
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
    } else {
        pwMessage.innerText = "비밀번호 변경을 실패하였습니다."
    }
}