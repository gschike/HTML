let quill;

window.addEventListener("load", () => {
    init();
})

const loginUser = JSON.parse(localStorage.getItem("loginUser"))

function init() {
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'header': [1, 2, false] }],
                ['image', 'link']
            ]
        }
    });

    if (sessionStorage.getItem("updatePost")) {
        bind();
        getPost();

        return;
    }

    loadInfo();
    bindGNB();
    bindLNB();
    bind();
}

function bind() {
    // 1. display 요소를 미리 찾아둡니다.
    const display = document.querySelector('#display');
    updatePreview()

    function updatePreview() {
        const radio = document.querySelector('input[name="text_Type"]:checked');
        if (!radio) return;

        if (radio.value === "1") {
            // Text 모드: 태그를 무시하고 텍스트만
            // display.textContent = quill.getText();
        } else if (radio.value === "2") {
            // html 모드: 태그를 해석해서 렌더링
            display.innerHTML = quill.root.innerHTML;
        }
    }

    // 2. 에디터 내용 변경 감지
    quill.on('text-change', function () {
        updatePreview();
    });

    // 3. 라디오 버튼 변경 감지 (updatePreview 뒤에 ()를 꼭 빼야 합니다!)
    document.querySelectorAll('input[name="text_Type"]').forEach(radio => {
        radio.addEventListener('change', updatePreview);
    });

    // 작성 완료
    const popup = document.querySelector('#write-complete');
    popup.addEventListener('click', function () {
        modal()
        submitPost();
    });

    document.querySelector('#image-input').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                const range = quill.getSelection();
                quill.insertEmbed(range ? range.index : 0, 'image', imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    function submitPost() {
        const radio = document.querySelector('input[name="text_Type"]:checked');
        let content = (radio.value === "1") ? quill.getText() : quill.root.innerHTML;

        console.log("전송될 내용:", content);
        // fetch('/api/post', { method: 'POST', body: content });
    }

    function modal() {
        const upload_Popup = document.querySelector('#upload-Popup');

        upload_Popup.style.display = 'flex'

        document.querySelector('.btn-confirm').onclick = () => {

            const title = document.querySelector("#title");

            if (title.value == "") {
                alert("제목을 입력해주세요.");
                return;
            }

            upload_Popup.style.display = 'none';

            if (sessionStorage.getItem("updatePost")) {
                updatePost();
            } else {
                createPost();
            }
        }

        document.querySelector('.btn-cancel').onclick = () => {
            upload_Popup.style.display = 'none'
        }
    }



}


///////////////////////////////////////////////////////
// GNB
///////////////////////////////////////////////////////

function bindGNB() {

    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    const btn_myPage = document.querySelector("#btn-myPage");

    btn_myPage.addEventListener("click", () => {
        const result = confirm("페이지를 떠나면 지금까지 작성된 내용은 저장되지 않습니다. 이동 하시겠습니까?");

        if (!result) {
            return;
        }

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
        const result = confirm("페이지를 떠나면 지금까지 작성된 내용은 저장되지 않습니다. 이동 하시겠습니까?");

        if (!result) {
            return;
        }

        sessionStorage.setItem("prevPage", location.href);
        window.location.href = "./login.html";
    })


    const btn_join = document.querySelector("#btn-join");

    btn_join.addEventListener("click", () => {
        const result = confirm("페이지를 떠나면 지금까지 작성된 내용은 저장되지 않습니다. 이동 하시겠습니까?");

        if (!result) {
            return;
        }

        window.location.href = "./join.html";
    })


    const btn_logout = document.querySelector("#btn-logout");

    btn_logout.addEventListener("click", () => {
        const result = confirm("로그아웃 시 커뮤니티 페이지로 이동하고, 지금까지 작성된 내용은 저장되지 않습니다. 로그아웃 하시겠습니까?");

        if (!result) {
            return;
        }

        localStorage.removeItem("loginUser");
        localStorage.setItem("loginPossible", "false");

        isLogin = localStorage.getItem("loginPossible");

        // changeLogout();

        window.location.href = "./community.html";
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

        const result = confirm("페이지를 떠나면 지금까지 작성된 내용은 저장되지 않습니다. 이동 하시겠습니까?");

        if (!result) {
            return;
        }

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

        const result = confirm("페이지를 떠나면 지금까지 작성된 내용은 저장되지 않습니다. 이동 하시겠습니까?");

        if (!result) {
            return;
        }

        localStorage.setItem("postType", "notice");
        window.location.href = "./community.html";

    })


    const LNBcomm = document.getElementById("LNBcomm");

    LNBcomm.addEventListener("click", () => {
        const result = confirm("페이지를 떠나면 지금까지 작성된 내용은 저장되지 않습니다. 이동 하시겠습니까?");

        if (!result) {
            return;
        }

        localStorage.setItem("postType", "comm");
        window.location.href = "./community.html";

    })

}

function loadInfo() {
    const nickname = document.querySelector("#nickname");

    // console.log(JSON.parse(localStorage.getItem("loginUser")));
    nickname.innerText = (JSON.parse(localStorage.getItem("loginUser"))).nickname;
}

async function createPost() {

    const title = document.querySelector('#title');
    const editor = document.querySelector("#editor");

    const res = await API.V1.SJ.Posts.create({
        authorNo: loginUser.userNo,
        title: title.value,
        content: quill.root.innerHTML,
        tags: ["게시글"]
    });

    const postNo = res.item.postId;   // 서버가 반환한 게시글 번호

    window.location.href = `./post.html?postNo=${postNo}`;

}

// async function createPost() {

//     const title = document.querySelector('#title');

//     const res = await API.V1.SJ.Posts.create({
//         authorNo: loginUser.userNo,
//         title: title.value,
//         content: quill.root.innerHTML,
//         tags: ["게시글"]
//     });

//     console.log("API 응답:", res);

// }

function getPost() {
    const title = document.querySelector('#title');
    const upload_Popup = document.querySelector('#upload-Popup');

    const post = JSON.parse(sessionStorage.getItem("updatePost"));

    title.value = post.title;
    quill.root.innerHTML = post.content;

    document.querySelector('.btn-confirm').onclick = () => {

        if (title.value == "") {
            alert("제목을 입력해주세요.");
            return;
        }

        if (quill.getText().trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        upload_Popup.style.display = 'none';

        updatePost();
    }
}

async function updatePost() {
    const title = document.querySelector('#title');
    const editor = document.querySelector("#editor");

    const postNo = JSON.parse(sessionStorage.getItem("updatePost")).postNo;
    API.V1.SJ.Posts.update(postNo, {
        title: title.value,
        content: quill.root.innerHTML
    })

    sessionStorage.removeItem("updatePost");
    window.location.href = `./post.html?postNo=${postNo}`;
};