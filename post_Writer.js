let quill;

window.addEventListener("load", () => {
    init();
})

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