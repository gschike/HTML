let quill;

window.addEventListener("load", () => {
    init();
})

let nowUserId = "";
let loginUser = null;

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
    bind();
}

function bind() {
    bindGNB();
    bindLNB();

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

    function modal() { // 모달
        const upload_Popup = document.querySelector('#upload-Popup');
        const popup = document.querySelector('#write-complete');

        upload_Popup.style.display = 'flex'

        // 등록 버튼 클릭
        document.querySelector('.btn-confirm').onclick = () => {
            upload_Popup.style.display = 'none'
            // 메인 페이지로 !!!!!

        }

        // // 취소 버튼 클릭

        document.querySelector('.btn-cancel').onclick = () => {
            upload_Popup.style.display = 'none'
        }
    }

}

/* =========================
   GNB
========================= */

function bindGNB() {

    const beforeLogin = document.querySelector(".beforeLogin");
    const afterLogin = document.querySelector(".afterLogin");

    const btn_myPage = document.querySelector("#btn-myPage");
    const btn_login = document.querySelector("#btn-login");
    const btn_join = document.querySelector("#btn-join");
    const btn_logout = document.querySelector("#btn-logout");

    let isLogin = localStorage.getItem("loginPossible");

    if (isLogin === "true") {
        try {
            loginUser = JSON.parse(localStorage.getItem("loginUser"));

            if (!loginUser) throw new Error("유저 없음");

            nowUserId = loginUser.userId;

            changeLogin();

        } catch (e) {
            changeLogout();
        }
    } else {
        changeLogout();
    }

    btn_myPage.addEventListener("click", () => {
        window.location.href = "./myPage.html";
    });

    btn_login.addEventListener("click", () => {
        sessionStorage.setItem("prevPage", location.href);
        window.location.href = "./login.html";
    });

    btn_join.addEventListener("click", () => {
        window.location.href = "./join.html";
    });

    btn_logout.addEventListener("click", () => {

        localStorage.removeItem("loginUser");
        localStorage.setItem("loginPossible", "false");

        changeLogout();
    });

    function changeLogin() {
        beforeLogin.style.display = "none";
        afterLogin.style.display = "flex";
    }

    function changeLogout() {
        nowUserId = "";
        loginUser = null;

        beforeLogin.style.display = "flex";
        afterLogin.style.display = "none";
    }
}


/* =========================
   LNB
========================= */

function bindLNB() {

    const LNBmyPage = document.getElementById("LNBmyPage");
    const LNBnotice = document.getElementById("LNBnotice");
    const LNBcomm = document.getElementById("LNBcomm");

    const LNBadminPage = document.getElementById("LNBadminPage");
    if (nowUserId == "admin") {
        LNBadminPage.style.display = "inline-block";
    }

    LNBmyPage.addEventListener("click", () => {

        if (localStorage.getItem("loginPossible") !== "true") {
            alert("마이페이지는 로그인 후 이용 가능합니다.");
            sessionStorage.setItem("prevPage", "./myPage.html");
            window.location.href = "./login.html";
            return;
        }

        window.location.href = "./myPage.html";
    });

    LNBnotice.addEventListener("click", () => {

        localStorage.setItem("postType", "notice");
        window.location.href = "./community.html";
    });

    LNBcomm.addEventListener("click", () => {

        localStorage.setItem("postType", "comm");
        window.location.href = "./community.html";
    });
}