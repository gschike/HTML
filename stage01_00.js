window.addEventListener('load', init)
function init() {
    bind();
}

function bind() {

    let x = 0;
    let y = 0;

    // 캐릭터
    const character = document.querySelector('#character');
    // 골 인
    const goal = document.querySelector('#goal');
    const readme = document.querySelector('#readMe');

    
    readme.innerHTML = "README <br> r을 입력하시면 게임이 초기화됩니다 <br>";


    document.addEventListener("keydown", function (e) {

        // r 누르면 리셋 ㅋ
        if(e.key === "r") location.reload();

        // 방향키 움직일 때
        if (e.key === "w") y -= 10;
        if (e.key === "s") y += 10;
        if (e.key === "a") x -= 10;
        if (e.key === "d") x += 10;

        character.style.left = x + "px";
        character.style.top = y + "px";



        // 게임 중간 관문 [조건문에 추가 예정]
        if (true) {
            goal.style.display = "inline-block";
            goalIn();
        }

    })

    // 골 인 메소드
    function goalIn() {

        // character 좌표
        const charLeft = character.offsetLeft;
        const charTop = character.offsetTop;
        const charRight = charLeft + character.offsetWidth;
        const charBottom = charTop + character.offsetHeight;

        // goal 좌표
        const goalLeft = goal.offsetLeft;
        const goalTop = goal.offsetTop;
        const goalRight = goalLeft + goal.offsetWidth;
        const goalBottom = goalTop + goal.offsetHeight;


        if ( // goal 안에 character가 속해있다면
            charRight > goalLeft &&
            charLeft < goalRight &&
            charBottom > goalTop &&
            charTop < goalBottom
        ) { // 다음 스테이지 이동
            console.log("골인 하셨습니다")
        }
    }
}