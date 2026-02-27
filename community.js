window.addEventListener('load', init)

function init() {
    bind()
}

function bind() {
    community()
}

// 커뮤니티 메인 페이지
function community() {
    const write = document.querySelector('#write')

    const name = 'open 연습'
    let option = 'width=800,height=600'
    const url = 'stage01_00.html'
    
    // 글쓰기 클릭 시 게시판 열기
    write.addEventListener('click', function () {
        window.open(url, name, option)
    })
}

// 글쓰기 페이지
// 전략 : textarea.value = 

// 작성 페이지


function todo1() {
    const tdInput = document.querySelector('#Todo_input') // todo 내용
    const btnAdd = document.querySelector('#btnAdd') // 추가 버튼
    const dltAll = document.querySelector('#dltAll') // 선택 삭제 버튼
    const sltAll = document.querySelector('#sltAll') // 전체 체크박스
    const table = document.querySelector('#board6') // 전체 테이블


    btnAdd.addEventListener('click', function () {

        // 열
        const row = document.createElement('tr')
        row.setAttribute('class', 'rowIdx')

        // 체크박스
        const chk = document.createElement('input')
        chk.type = 'checkbox'
        chk.classList.add('chkbx')

        // 내용
        const span = document.createElement('span')
        span.innerText = tdInput.value

        // 개별 삭제 버튼
        const del = document.createElement('button')
        del.innerText = '삭제'

        // 테이블>열>객체
        row.append(chk, span, del)
        table.append(row)

        // 6-2 삭제 버튼 클릭 시 행 삭제
        del.addEventListener('click', function () {
            row.remove()
        })

        // 6-3 전체선택 [인풋 -> 바뀌면] 모든 체크박스 선택/해제
        sltAll.addEventListener('change', function () {
            // 모든 체크박스 = sltAll
            // 개별 체크박스 = chk
            if (sltAll.checked) {
                chk.checked = true;
            }
            else {
                chk.checked = false;
            }
        })

        // 6-4 전체 선택 후 하나라도 해제되면 전체 선택도 해제/ 전체면 체크

        // 전략: selectAll, 배열 개별 검사 -> 해제
        // flag 통과 -> 전체선택

        chk.addEventListener('change', function () {
            const chkbx = document.querySelectorAll('.chkbx') // 배열 길이 상시 체크
            let flag = true; // 깃발 세우고
            for (const item of chkbx) { // 깃발 내리면 체크(전체)해제.
                if (!(item.checked)) {
                    flag = false
                    sltAll.checked = false
                    break;
                }
            } // 깃발 생존 = 전체 체크
            if (flag) sltAll.checked = true
        })

        // 6-5 선택 삭제
        // 전략: 선택 삭제 버튼 클릭 시 - 반복문으로 체크된 것 검사 -> if(chkbx.checked)row.remove

        dltAll.addEventListener('click', function () {

            const rowIdx = table.querySelectorAll('.rowIdx') // 행 번호
            const chkbx = document.querySelectorAll('.chkbx') // 체크박스 번호
            // 참고: 체크박스 인덱스 == row 인덱스 / 순서대로 만들어져서 동일함

            chkbx.forEach((val, idx) => { // forEach 돌면서 번호 반환
                // forEach idx === 체크박스 인덱스 === 행 인덱스
                // 나중에 언젠가 종속관계 여행(parentNode) 떠나서 삭제하는 것도 해보자.
                if (val.checked) rowIdx[idx].remove()
            })
        })


    })
}