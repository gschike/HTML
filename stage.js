sessionStorage.setItem("flag2_1", "flag2_1");

flag2_2 = {
    "flag" : "flag2_2"
}

sessionStorage.setItem("flag2_2", JSON.stringify({flag2_2}));

sessionStorage.setItem("flag2_3", "RkxBR3tiYXNlNjRfaGlkZGVufQ==");

flag2_4 = {
    "flag" : "flag2_4"
}
sessionStorage.setItem("flag2_4",
    btoa(JSON.stringify(flag2_4))
)

sessionStorage.setItem("stage4", false);


/////////////////////////////////////////////////////


window.addEventListener("load", () => {
    init();
})


function init() {
    bind();
}

function bind() {
    // const flag3_1_input = document.querySelector("#flag3_1_input");
    const flag3_1 = document.querySelector("#flag3_1");
    const flag3_1_replay = document.querySelector("#flag3_1_replay");
    const flag3_1_check = document.querySelector("#flag3_1_check");

    // submit
    flag3_1.addEventListener("click", () => {

        const input = document.querySelector("#flag3_1_input").value;
        console.log(input);
        checkFlag3_1(input);
        console.log(checkFlag3_1(input));

        if(checkFlag3_1(input)) {
            flag3_1_check.innerHTML = "정답!"
        } else {
            flag3_1_check.innerHTML = "오답! 다시 입력해주세요!"
        }

    })
    // replay
    flag3_1_replay.addEventListener("click", () => {
        replayFlag3_1();
    })

} // bind

function checkFlag3_1 (input) {
    if (input == "flag3_1") {
        return true;
    } else {
        return false;
    }
}

const beats = {
    "a": 10,
    "b": 15,
    "c": 20,
    "d": 25
}