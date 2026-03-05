
window.addEventListener("load", () => {
    init();
})

function init() {
    const params = new URLSearchParams(window.location.search);
    const postNo = params.get("postNo");

    loadPost(postNo);
    bind();
}

function bind() {
    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin == "true") {
        changeLogin();
    } else {
        changeLogout();
    }

    const btn_comm = document.querySelector("#btn-comm");
    const btn_main = document.querySelector("#btn-main");
    const btn_login = document.querySelector("#btn-login");
    const btn_join = document.querySelector("#btn-join");
    const btn_logout = document.querySelector("#btn-logout");


    // 목록 버튼 누르면 목록으로 이동
    btn_comm.addEventListener("click", () => {
        window.location.href = "./community.html";
    })

    // 메인페이지 버튼 누르면 창 이동
    btn_main.addEventListener("click", () => {
        window.location.href = "./main.html";
    })

    // 로그인 버튼 누르면 창 이동
    btn_login.addEventListener("click", () => {
        window.location.href = "./login.html";
    })

    // 회원가입 버튼 누르면 창 이동
    btn_join.addEventListener("click", () => {
        window.location.href = "./join.html";
    })

    // 로그아웃 클릭 시 로그인 상태 변경
    btn_logout.addEventListener("click", function () {
        localStorage.removeItem("loginUser");

        localStorage.setItem("loginPossible", "false");
        isLogin = localStorage.getItem("loginPossible");
        changeLogout();
    })




    function changeLogin() {
        // beforeLogin, afterLogin
        const beforeLogin = document.querySelector(".beforeLogin");
        const afterLogin = document.querySelector(".afterLogin");

        beforeLogin.style.display = "none";
        afterLogin.style.display = "flex";
    }

    function changeLogout() {
        // beforeLogin, afterLogin
        const beforeLogin = document.querySelector(".beforeLogin");
        const afterLogin = document.querySelector(".afterLogin");

        login = false;
        beforeLogin.style.display = "flex";
        afterLogin.style.display = "none";
    }



    ///////////////////////////////////////////////////////////
    // 댓글
    let count = 0
    const inputCmtarea = document.querySelector('.inputCmt')
    const mainInput = createInputComment()
    inputCmtarea.append(mainInput.cmt)

    mainInput.add_txt.addEventListener('click', function () {
        //isLogin 정보 가져오기
        let isLogin = localStorage.getItem("loginPossible");

        console.log(isLogin);

        if (isLogin == "true") {
            const val = mainInput.txtarea.value.trim()
            if (!val) return
            createRow(document.querySelector('.cmt_Space'), val)
            mainInput.txtarea.value = ""
        } else {
            alert("댓글을 입력하려면 로그인 해주세요.")
        }

    })

    function getFormattedDate() {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        const hour = String(today.getHours()).padStart(2, '0')
        const minute = String(today.getMinutes()).padStart(2, '0')
        const second = String(today.getSeconds()).padStart(2, '0')

        return `${year}.${month}.${day} ${hour}:${minute}:${second}`
    }

    function createRow(parent, text) {
        const row = document.createElement('div');
        row.className = 'commentRow';

        //localStorage 정보 가져오기
        let loginUser = JSON.parse(localStorage.getItem("loginUser"));

        const row_top = document.createElement("div");
        row_top.className = "commentRow-top";

        // 왼쪽 묶음
        const span_left = document.createElement('span');
        // <닉네임>
        const nickname = document.createElement('em');
        nickname.textContent = loginUser.userId;
        // <댓글 번호>
        const count_CommentNum = document.createElement('span');
        count_CommentNum.textContent = "(댓글 번호: " + count + ")";
        // 왼쪽 묶음 조립
        span_left.append(nickname, count_CommentNum)


        // 중간 묶음
        const div_middle = document.createElement('div');
        // <내용>
        const contents = document.createElement('p');
        contents.textContent = text;
        // 중간 묶음 조립
        div_middle.append(contents)


        // 오른쪽 묶음
        const span_right = document.createElement('span');
        span_right.className = "span_right";
        // <날짜>
        const timestamp = document.createElement('span');
        timestamp.textContent = getFormattedDate();
        // <삭제 버튼>
        const dlt_cmt = document.createElement('button');
        dlt_cmt.textContent = 'x';
        // 오른쪽 묶음 조립
        span_right.append(timestamp, dlt_cmt)

        // [삭제 버튼 이벤트]
        dlt_cmt.addEventListener('click', function (e) {
            e.stopPropagation(); // 삭제 버튼 클릭 시 답글창이 열리지 않게
            if (confirm("정말 삭제하시겠습니까?")) {
                row.remove();
            }
        });

        // 조립
        row.append(span_left, div_middle, span_right);

        // [중요] 답글 토글 이벤트 (무한 대댓글용)
        row.addEventListener('click', function (e) {
            e.stopPropagation();
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

            // 다른 창 끄기 로직
            document.querySelectorAll('.cmt_Space .cmt').forEach(el => {
                if (el.parentElement !== this) el.remove();
            });

            const existingInput = this.querySelector(':scope > .cmt');
            if (existingInput) {
                existingInput.remove();
            } else {
                const subInput = createInputComment(); // 위에서 만드신 공장 함수 호출
                this.append(subInput.cmt);

                subInput.add_txt.onclick = (event) => {
                    event.stopPropagation();
                    const val = subInput.txtarea.value.trim();
                    if (val) {
                        // ⭐ 대댓글을 달 때 자기 자신(createRow)을 다시 호출 (재귀)
                        createRow(row, val);
                        subInput.cmt.remove();
                    }
                };
            }
        });
        count++
        parent.append(row);
    }



} // bind


async function loadPost(postNo) {
    try {
        const postRes = await API.V1.SJ.Posts.get(postNo);
        console.log("게시글 정보:", postRes);

        renderPost(postRes);
    } catch (e) {
        console.log("게시글 조회 실패", e)
    }
}

function renderPost(postRes) {
    document.querySelector("#title").innerText = postRes.item.title;
    document.querySelector("#postInfo-left-userName").innerText = postRes.item.authorId;
    document.querySelector("#postInfo-left-postingTime").innerText = postRes.item.createdAt.split("T")[0];
    document.querySelector(".post-content").innerText = postRes.item.content;
    document.querySelector("#postInfo-right-views-cnt").innerText = postRes.item.viewCount;
}

function createInputComment() {
    const cmt = document.createElement('div')
    cmt.className = 'cmt'

    const txtarea = document.createElement('input')
    txtarea.type = 'text'
    txtarea.className = 'cmt_input'

    const add_txt = document.createElement('button')
    add_txt.className = 'add_txt'
    add_txt.textContent = '등록'

    cmt.append(txtarea, add_txt)
    return { cmt, txtarea, add_txt }
}