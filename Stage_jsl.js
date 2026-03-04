window.onload = () => {

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

    //기믹 생성    

    //클리어 조건
    //goal을 더블 클릭
    document.querySelector('.goal').addEventListener('dblclick', evt => {
        alert('클리어')    //클리어 메시지 출력
        window.location.href = "stage2_jsl.html" // 다음 스테이지로 전환
    })
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
    document.querySelector('.goal').classList.add('small')
    goalJump()
    document.querySelector('body').addEventListener('dblclick', evt => {
        print('느려')
    })
}
//명령어를 직접 다 입력했을시에도 다음 기믹을 실행
function goalSmall2() {
    document.querySelector('body').addEventListener('mouseover', evt => {
        if (document.querySelector('.goal').style.zIndex >= 0) {
            goalSmall()
        }
    })
}

//object 움직임        
function objectMove(evt) {
    const obj = getComputedStyle(document.querySelector('#object'))
    //obj가 움직일 거리
    let up = 20
    let down = 20
    let right = 20
    let left = 20

    //object의 움직임 범위를 화면 범위로 제한
    if (parseInt(obj.top) > (window.innerHeight - (document.querySelector('#object').clientHeight)-20)) {
        down = 0
    }
    if (parseInt(obj.top) < 0.5 * (document.querySelector('#object').clientHeight)) {
        up = 0
    }
    if (parseInt(obj.left) > (window.innerWidth - (document.querySelector('#object').clientWidth)-20)) {
        right = 0
    }
    if (parseInt(obj.left) < 0.5 * (document.querySelector('#object').clientWidth)+3) {
        left = 0
    }

    //화살표를 누르면 obj가 움직임
    if (evt.key === 'ArrowRight') {
        document.querySelector('#object').style.left = parseInt(obj.left) + right + 'px'
    }
    if (evt.key === 'ArrowLeft') {
        document.querySelector('#object').style.left = parseInt(obj.left) - left + 'px'
    }
    if (evt.key === 'ArrowUp') {
        document.querySelector('#object').style.top = parseInt(obj.top) - up + 'px'
    }
    if (evt.key === 'ArrowDown') {
        document.querySelector('#object').style.top = parseInt(obj.top) + down + 'px'
    }

    revealHint()    
}

function revealHint(){
    //오브젝트가 힌트 근처로 접근하면 보이는 힌트들
    const hinta = getComputedStyle(document.querySelector('#hinta'))
    revealhinta()

    const hintb = getComputedStyle(document.querySelector('#hintb'))
    revealhintb()

    const hintb1 = getComputedStyle(document.querySelector('#hintb1'))
    revealhintb1()

    const hinte1 = getComputedStyle(document.querySelector('#hinte1'))
    revealhinte1()    
}
//입력창에 입력하고 엔터 치면 콘솔에서 실행 & 내용 지우기
let count = 0
function consoleInput(evt) {
    //사용자가 쓰기 편하게 짧은 키워드 만들어두기            
    const style = document.querySelector('.goal').style
    //출력할 힌트들
    const hint1 = 'hint1: 입력창에 입력하는 내용은 콘솔창에 입력됩니다'
    const hint2 = 'hint2: '
    const hint3 = 'hint3: '
    const hint4 = 'hint4: '

    if (evt.key === 'Enter') {
        // 입력창 중간에 엔터 쳐도 입력되게 방어
        const inputRaw = document.querySelector('#input').value
        let input = inputRaw.split('\n')[0]
        if (inputRaw.split('\n').length == 2) {
            input += inputRaw.split('\n')[1]
        }
        try {
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
            else if (input.trim().substr(0, 5) == 'hint1' || input.trim().substr(0, 3) == '힌트1' || input.trim() == 1) {
                print(hint1)
            } else if (input.trim().substr(0, 5) == 'hint2' || input.trim().substr(0, 3) == '힌트2' || input.trim() == 2) {
                print(hint2)
            } else if (input.trim().substr(0, 5) == 'hint3' || input.trim().substr(0, 3) == '힌트3' || input.trim() == 3) {
                print(hint3)
            } else if (input.trim().substr(0, 5) == 'hint4' || input.trim().substr(0, 3) == '힌트4' || input.trim() == 4) {
                print(hint4)
            } 

            //hintb2 'style'입력
            else if (input.trim() == 'style') {
                print("const style = document.querySelector('.goal').style")
            }
            // style.top 입력하면 현재 위치 알려줌
            else if (input.trim() == 'style.top') {
                print('styel.top = -5000px')
            }

            //hintc "STOP"입력하기
            else if (input.trim() == 'stop') {
                print('작습니다')
            }
            else if (input.trim() == 'STOP') {
                print('S = 83')
            }
            //STOP의 아스키 코드를 입력하면 goal이 멈춤                                    
            else if (input == 83847980) {
                const stop = document.querySelector('.goal').removeEventListener('mouseover', goalJump)
                console.log(eval(stop))
                print('')
            }

            //hint4 style.zIndex로 안 된다는 힌트를 줌
            else if (input.trim().substr(0, 12) == 'style.zIndex') {
                print('일어날까요?')
            }
            //일어나 입력시 js조작하게 함
            else if (input.trim() == '일어나') {
                print("document.querySelector('.goal').addEventListener('click', goalZ)가 실행중입니다")
            }
            //직접 명령어로 js를 조작해 클릭 이벤트를 제거했다면 다음 기믹 실행
            else if (input.split(',')[0] == "document.querySelector('.goal').removeEventListener('click'"
                && input.split(',')[1].trim() == 'goalZ)') {
                goalSmall2()
            }

            // 기상 입력시 zindex 조정 및 글자 작아지는 기믹 실행
            else if (input.trim() == '기상') {
                document.querySelector('.goal').removeEventListener('click', goalZ)
                style.zIndex = 1
                goalSmall()
            }

            //hinte 폰트 사이즈 조정으로 안 됨을 알려줌
            else if (input.trim().substr(0, 10) == 'style.font') {
                print('transform')
            }
            //transform을 사용하면 힌트5a찾을수 있게 함   
            else if (input.trim().substr(0, 15) == 'style.transform') {
                document.querySelector('#hinte1').style.zIndex = -2
            }

            
            else {
                //입력창에 입력한 명령어를 콘솔창에서 실행
                console.log(eval(input))
                //엔터치면 출력창 내용 지워짐
                print('')
            }
        } finally {
            //입력창 내용 지움
            document.querySelector('#input').value = ''
        }
    }
}

//출력창
function print(msg) {
    const output = document.querySelector('#output')
    output.innerHTML = ''
    output.innerHTML += msg
    output.scrollTop = output.scrollHeight
}

//힌트1 오브젝트가 힌트 근처로 접근
function revealhinta() {
    const obj = getComputedStyle(document.querySelector('#object'))
    if (parseInt(obj.left) >= hinta.offsetLeft - 20
        && parseInt(obj.left) <= hinta.offsetLeft + 400
        && parseInt(obj.top) <= hinta.offsetTop + 40
        && parseInt(obj.top) >= hinta.offsetTop - 40) {
        hinta.style.zIndex = 1
    }
}

//힌트2 오브젝트가 힌트 근처로 접근
function revealhintb() {
    const obj = getComputedStyle(document.querySelector('#object'))
    if (parseInt(obj.left) >= 0.7 * window.innerWidth - 20
        && parseInt(obj.left) <= 0.7 * window.innerWidth + 300
        && parseInt(obj.top) <= 0.2 * window.innerHeight + 60
        && parseInt(obj.top) >= 0.2 * window.innerHeight - 60) {
        hintb.style.zIndex = 0
    }
}

//힌트2a hintb가 공개 &오브젝트가 힌트 근처로 접근
function revealhintb1() {
    const obj = getComputedStyle(document.querySelector('#object'))
    if (hintb.style.zIndex >= 1) {
        if (parseInt(obj.left) >= 0.7 * window.innerWidth - 20
            && parseInt(obj.left) <= 0.7 * window.innerWidth + 300
            && parseInt(obj.top) <= 0.8 * window.innerHeight + 60
            && parseInt(obj.top) >= 0.8 * window.innerHeight - 60) {
            hintb1.style.zIndex = 0
        }
    }
}

//hinte1 hinte가 공개 &오브젝트가 힌트 근처로 접근
function revealhinte1() {
    const obj = getComputedStyle(document.querySelector('#object'))
    if (hinte1.style.zIndex == -2) {
        if (parseInt(obj.left) >= 0.3 * window.innerWidth - 20
            && parseInt(obj.left) <= 0.3 * window.innerWidth + 300
            && parseInt(obj.top) <= 0.1 * window.innerHeight + 60
            && parseInt(obj.top) >= 0.1 * window.innerHeight - 60) {
            hinte1.style.zIndex = 0
        }
    }
}