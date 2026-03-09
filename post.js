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

    bindGNB();
    bindLNB();
    bindPostActions();
    bindComments();

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

            loginUser = loginUser.userId;

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
        sessionStorage.setItem("prevPage", location.href);
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

    const LNBmyPage = document.getElementById("LNBmyPage");

    LNBmyPage.addEventListener("click", () => {

        if (localStorage.getItem("loginPossible") != "true") {
            alert("마이페이지는 로그인 후 이용 가능합니다.");
            sessionStorage.setItem("prevPage", "./myPage.html");
            window.location.href = "./login.html";
            return;
        }

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
// 게시글 액션 (추천 / 삭제 / 수정)
///////////////////////////////////////////////////////

function bindPostActions() {

    // 목록 누르면 커뮤니티로 이동
    document.querySelector("#btn-comm").addEventListener("click", () => {
        window.location.href = "./community.html";
    });


    const like = document.querySelector("#like");
    const unlike = document.querySelector("#unlike");

    let likeCount = 1;
    let unlikeCount = 1;

    // 중복방지(추가)
    let liked = false;
    let unliked = false;
    //

    // like.onclick = () => {

    //     like.onselectstart = function () { return false; }

    //     like, addEventListener('dblclick', function () { return false; })

    //     document.querySelector("#like>span").textContent = likeCount;

    //     document.querySelector("#postInfo-right-likes>span").textContent = likeCount;

    //     likeCount++;

    // }

    like.onclick = () => {
        // 비로그인 시 막는 기능
        if (localStorage.getItem("loginPossible") != "true") {
            alert("추천 기능을 이용하려면 로그인을 해주세요.");

            return;
        }

        if (liked) return;

        liked = true;

        document.querySelector("#like>span").textContent = likeCount;
        document.querySelector("#postInfo-right-likes>span").textContent = likeCount;

        likeCount++;

    }


    // unlike.onclick = () => {

    //     unlike.onselectstart = function () { return false; }

    //     unlike, addEventListener('dblclick', function () { return false; })

    //     document.querySelector("#unlike>span").textContent = unlikeCount;

    //     unlikeCount++;

    // }


    unlike.onclick = () => {
        // 비로그인 시 막는 기능
        if (localStorage.getItem("loginPossible") != "true") {
            alert("추천 기능을 이용하려면 로그인을 해주세요.");

            return;
        }

        if (unliked) return;

        unliked = true;

        document.querySelector("#unlike>span").textContent = unlikeCount;

        unlikeCount++;

    }


    // 삭제 수정

    // document.querySelector('#post-btn-dlt')
    //     .addEventListener('click', function () {
    //         modal()
    //     })

    document.querySelector('#post-btn-dlt')
        .addEventListener('click', function () {

            const params = new URLSearchParams(window.location.search);
            const postNo = params.get("postNo");

            modal({
                deletePost: true,
                postNo: postNo
            })

        })


    document.querySelector('#post-btn-edit').addEventListener('click', function () {
        postJson = {

        }

        sessionStorage.setItem("updatePost", JSON.stringify(postJson));

        window.location.href = './post_Writer.html';
    })

}



///////////////////////////////////////////////////////
// 댓글 시스템
///////////////////////////////////////////////////////

function bindComments() {

    let count = 1

    const inputCmtarea = document.querySelector('.inputCmt')

    const mainInput = createInputComment()

    inputCmtarea.append(mainInput.cmt)


    mainInput.add_txt.addEventListener('click', function () {

        let isLogin = localStorage.getItem("loginPossible");

        if (isLogin == "true") {

            const val = mainInput.txtarea.value.trim()

            if (!val) return

            createRow(document.querySelector('.cmt_Space'), val)

            mainInput.txtarea.value = ""

            cntComment();

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

        // 행 / 아이디 / 닉네임 / 내용 / 수정 / 삭제 / 버튼 -> 생성 
        const row = document.createElement('div');
        row.className = 'commentRow';

        let loginUser = JSON.parse(localStorage.getItem("loginUser"));

        const row_top = document.createElement("div");
        row_top.className = "commentRow-top";

        const span_left = document.createElement('span');

        const commentId = document.createElement("span");
        commentId.innerHTML = `${loginUser.nickname} (${loginUser.userId})`;

        // const count_CommentNum = document.createElement('span');
        // count_CommentNum.textContent = "(댓글 번호: " + count + ")";

        span_left.append(commentId);

        const div_middle = document.createElement('div');

        const contents = document.createElement('p');
        contents.textContent = text;

        div_middle.append(contents)

        const span_right = document.createElement('span');
        span_right.className = "span_right";

        const timestamp = document.createElement('span');
        timestamp.textContent = getFormattedDate();

        const edit = document.createElement('div');
        edit.className = "edit";

        const edit_text = document.createElement('span');
        edit_text.textContent = '수정';

        edit.append(edit_text);

        const dlt_cmt = document.createElement('button');
        dlt_cmt.textContent = 'x';

        // span_right.append(timestamp, edit, dlt_cmt);
        const commentAuthor = loginUser.userId;

        span_right.append(timestamp)

        const loginUserNow = JSON.parse(localStorage.getItem("loginUser"));

        if (loginUserNow && loginUserNow.userId === commentAuthor) {
            // 본인 글이면 수정 / 삭제 버튼
            span_right.append(edit, dlt_cmt);

        }


        // 클릭 시 댓글 삭제 모달 생성
        dlt_cmt.addEventListener('click', function (e) {
            e.stopPropagation();
            modal(row);
        });


        edit.onclick = (e) => {
            // 댓글 수정
            e.stopPropagation();

            if (row.querySelector('.cmt')) return;

            const Ptxt = div_middle.querySelector('p');

            const editInput = createInputComment();

            editInput.txtarea.value = Ptxt.textContent;

            row.append(editInput.cmt);

            editInput.add_txt.onclick = () => {

                Ptxt.textContent = editInput.txtarea.value;

                editInput.cmt.remove();

            }

        }

        // 댓글 생성
        row.append(span_left, div_middle, span_right);


        row.addEventListener('click', function (e) {

            e.stopPropagation();

            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return;

            document.querySelectorAll('.cmt_Space .cmt').forEach(el => {

                if (el.parentElement !== this) el.remove();

            });

            const existingInput = this.querySelector(':scope > .cmt');

            if (existingInput) {

                existingInput.remove();

                cntComment()

            } else {

                const subInput = createInputComment();

                this.append(subInput.cmt);

                subInput.add_txt.onclick = (event) => {

                    event.stopPropagation();

                    const val = subInput.txtarea.value.trim();

                    if (val) {

                        createRow(row, val)

                        subInput.cmt.remove()

                        cntComment()

                    }

                };

            }

        });

        count++

        parent.append(row);

    }

}



///////////////////////////////////////////////////////
// 게시글 로딩
///////////////////////////////////////////////////////

async function loadPost(postNo) {

    try {

        const postRes = await API.V1.SJ.Posts.get(postNo);

        console.log("게시글 정보:", postRes);

        renderPost(postRes);

        await API.V1.SJ.Posts.addView(postNo);

    } catch (e) {

        console.log("게시글 조회 실패", e)

    }

}



function renderPost(postRes) {

    document.querySelector("#title").innerText = postRes.item.title;
    document.querySelector("#postInfo-left-userName").innerHTML = `<strong>${postRes.item.authorNick}</strong> (${postRes.item.authorId})`;
    document.querySelector("#postInfo-left-postingTime").innerText = postRes.item.createdAt.split("T")[0];
    document.querySelector(".post-content").innerHTML = postRes.item.content;
    document.querySelector("#postInfo-right-views-cnt").innerText = postRes.item.viewCount + 1;

    const btnEdit = document.querySelector("#post-btn-edit");
    const btnDelete = document.querySelector("#post-btn-dlt");

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser || loginUser.userId !== postRes.item.authorId) {

        btnEdit.style.display = "none";
        btnDelete.style.display = "none";

    }

}



///////////////////////////////////////////////////////
// 댓글 입력 창 생성
///////////////////////////////////////////////////////

function createInputComment() {

    const cmt = document.createElement('div')

    cmt.className = 'cmt'

    const input_wrap = document.createElement('div')

    input_wrap.className = 'input_wrap'

    const txtarea = document.createElement('input')

    txtarea.type = 'text'

    txtarea.className = 'cmt_input'

    txtarea.placeholder = "댓글을 입력하세요...";

    const add_txt = document.createElement('button')

    add_txt.className = 'add_txt'

    add_txt.textContent = '등록'

    input_wrap.append(txtarea, add_txt)

    cmt.append(input_wrap)

    return { cmt, txtarea, add_txt }

}



///////////////////////////////////////////////////////
// 댓글 수 카운트
///////////////////////////////////////////////////////

function cntComment() {

    const currentCount = document.querySelectorAll('.commentRow').length;

    const targets = document.querySelectorAll('#btn-comment > span, #cmt_commentCount');

    targets.forEach(el => el.textContent = currentCount);

}



///////////////////////////////////////////////////////
// 삭제 모달
///////////////////////////////////////////////////////

// function modal(evtTarget) {

//     const popup = document.querySelector('#Delete-Popup')

//     popup.style.display = 'flex'

//     popup.querySelector('.btn-confirm').onclick = (evt) => {

//         evtTarget.remove()

//         cntComment()

//         popup.style.display = 'none'

//     }

//     popup.querySelector('.btn-cancel').onclick = () => {

//         popup.style.display = 'none'

//     }

// }

function modal(evtTarget) { 

    const popup = document.querySelector('#Delete-Popup')
    popup.style.display = 'flex'

    popup.querySelector('.btn-confirm').onclick = async () => {

        if (evtTarget.deletePost) { // 게시글 삭제

            console.log("삭제 postNo:", evtTarget.postNo);

            await API.V1.SJ.Posts.remove(evtTarget.postNo);

            window.location.href = "./community.html";

        } else { // 댓글 삭제

            evtTarget.remove()
            cntComment()

        }

        popup.style.display = 'none'

    }

    popup.querySelector('.btn-cancel').onclick = () => {
        popup.style.display = 'none'
    }

}