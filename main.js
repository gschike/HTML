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

    const manual = document.querySelector(".manual");

    const messageOverlay = document.querySelector("#message-overlay");
    const messageBox = document.querySelector("#messageBox");


    // 처음부터 시작 클릭 시 1stage 이동
    const btn_sFirst = document.querySelector("#btn-sFirst");

    btn_sFirst.addEventListener("click", () => {
        messageBox.innerHTML = "게임으로 이동 중...";
        messageOverlay.style.display = "flex";

        setTimeout(() => {
            messageOverlay.style.display = "none";
            ///////// 페이지 이동
            window.location.href = "./last.html";
        }, 1000)
    })


    // 게임 설명서 버튼 누르면 .manual 열리기
    const btn_manual = document.querySelector("#btn-manual");

    btn_manual.addEventListener("click", () => {
        manual.style.display = "flex";
    })

    // 닫기 버튼 누르면 .manual 닫히기
    const manual_close = document.querySelector("#manual-close");

    manual_close.addEventListener("click", () => {
        manual.style.display = "none";
    })

}
