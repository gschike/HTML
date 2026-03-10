function init() {
    //game화면 크기설정
    document.querySelector('#gameArea').clientHeight = window.innerHeight
    document.querySelector('#gameArea').clientWidth = window.innerWidth
    //우클릭, 드래그 막기
    document.querySelector('#gameArea').onselectstart = () => false
    document.querySelector('#gameArea').oncontextmenu = () => false
    //출력창에서만 드래그 가능
    document.querySelector('#output').addEventListener('selectstart', e => {
        e.stopPropagation();
    })

    //키보드 입력시 이벤트
    //object움직임           
    document.addEventListener('keydown', objectMove)
    //입력창에 입력            
    document.addEventListener('keyup', consoleInput)

    //html 보여줌
    const rawHTML = document.querySelector('#show').innerHTML
    prettier.format(rawHTML, {
        parser: "html",
        plugins: [prettierPlugins.html]
    }).then(formatted => {
        document.querySelector('#html').textContent = formatted
    })

    //메인화면으로
    document.querySelector('#home').addEventListener('click', evt => {
        window.location.href = "home.html"
    })    
}

//출력창
function print(msg) {
    const output = document.querySelector('#output')
    output.innerHTML = ''
    output.innerHTML += msg
    output.scrollTop = output.scrollHeight
}

//타이머
const startTime = performance.now()

function update() {

    const timer = document.getElementById("timer")

    const now = performance.now()
    const elapsed = now - startTime

    const hours = Math.floor(elapsed / 3600000)
    const minutes = Math.floor((elapsed % 3600000) / 60000)
    const seconds = Math.floor((elapsed % 60000) / 1000)

    timer.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0")

    requestAnimationFrame(update)
}

//기믹
//goal에 마우스 올리면 위치 랜덤하게 변경
function goalJump(evt) {
    document.querySelector('.goal').style.position = 'absolute'
    document.querySelector('.goal').style.top = Math.random() * (window.innerHeight - (document.querySelector('.goal').clientHeight)) + 'px'
    document.querySelector('.goal').style.left = Math.random() * (window.innerWidth - (document.querySelector('.goal').clientWidth)) + 'px'
}

//goal을 클릭했을때 z인덱스를 사용하여 화면 뒤로 보낼예정
function goalZ() {
    document.querySelector('.goal').style.position = "absolute"
    document.querySelector('.goal').style.zIndex = -20
}

//마지막에 goal의 글씨를 줄임      
function goalSmall() {
    document.querySelector('body').addEventListener('mouseover', evt => {
        //앞의 기믹들 해제 했을때
        if (parseInt(document.querySelector('.goal').style.zIndex) >= 0) {            
            document.querySelector('.goal').classList.add('small')            
            document.querySelector('body').addEventListener('dblclick', evt => {
                print('느려')
            })
        }
    })
}

//힌트a 오브젝트가 힌트 근처로 접근
function revealhinta() {
    const obj = getComputedStyle(document.querySelector('#object'))
    if (parseInt(obj.left) >= hinta.offsetLeft - 20
        && parseInt(obj.left) <= hinta.offsetLeft + 400
        && parseInt(obj.top) <= hinta.offsetTop + 40
        && parseInt(obj.top) >= hinta.offsetTop - 40) {
        hinta.style.zIndex = 1
    }
}

//힌트b 오브젝트가 힌트 근처로 접근
function revealhintb() {
    const obj = getComputedStyle(document.querySelector('#object'))
    if (parseInt(obj.left) >= hintb.offsetLeft - 20
        && parseInt(obj.left) <= hintb.offsetLeft + 400
        && parseInt(obj.top) <= hintb.offsetTop + 40
        && parseInt(obj.top) >= hintb.offsetTop - 40) {
        hintb.style.zIndex = 0
    }
}

//출력창으로 힌트 보여줌
function hintOutput(input) {
    //입력창에 힌트/hint입력하면 힌트들 주기
    if (input.trim() == 'hint' || input.trim() == '힌트') {
        if (count == 0) {
            print(hint1)
            count++
        } else if (count == 1) {
            print(hint2)
            count++
        } else if (count == 2) {
            print(hint3)
            count++
        } else if (count == 3) {
            print(hint4)
            count++
        } else {
            const mm = '너는 지금 ' + count + '번이나 힌트를 입력했어\n 다시 힌트를 보고 싶으면 힌트번호를 적어'
            print(mm)
            count++
        }
    }
    //힌트+번호 또는 번호 입력하면 힌트 보여주기
    if (input.trim().substr(0, 5) == 'hint0' || input.trim().substr(0, 3) == '힌트0' || input.trim() == 0) {
        print('hint0: 방향키를 사용해 보라색 원을 움직여 보세요')
    }
    if (input.trim().substr(0, 5) == 'hint1' || input.trim().substr(0, 3) == '힌트1' || input.trim() == 1) {
        print(hint1)
    }
    if (input.trim().substr(0, 5) == 'hint2' || input.trim().substr(0, 3) == '힌트2' || input.trim() == 2) {
        print(hint2)
    }
    if (input.trim().substr(0, 5) == 'hint3' || input.trim().substr(0, 3) == '힌트3' || input.trim() == 3) {
        print(hint3)
    }
    if (input.trim().substr(0, 5) == 'hint4' || input.trim().substr(0, 3) == '힌트4' || input.trim() == 4) {
        print(hint4)
    }
}

//리셋버튼
function resetGame() {

    // object 위치 초기화
    const obj = document.querySelector('.obj')
    if (obj) {
        obj.style.top = ''
        obj.style.left = ''
    }

    // goal 상태 초기화
    const goal = document.querySelector('.goal')
    goal.style.position = ''
    goal.style.top = ''
    goal.style.left = ''
    goal.style.zIndex = ''
    goal.style.transform = ''
    goal.style.opacity = ''
    goal.classList.remove('disappear')
    goal.classList.remove('small')

    // 힌트 숨기기
    document.querySelector('#hinta').style.zIndex = -1
    document.querySelector('#hintb').style.zIndex = -1
    document.querySelector('#hintc').style.zIndex = -1

    // 출력창 초기화
    print(hint0)

    // 입력창 초기화
    document.querySelector('#input').value = ''

    // 힌트 카운트 초기화
    count = 0

    addEvent()
}

