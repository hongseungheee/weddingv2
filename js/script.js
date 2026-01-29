document.addEventListener('DOMContentLoaded', () => {
    // 1. 필기체 타이핑 애니메이션 실행
    const typingElement = document.getElementById('typing-text');
    const text = "Wedding Day";
    typingElement.innerText = ""; // 초기화
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            // 글자 써지는 속도 (ms 단위, 숫자가 작을수록 빠름)
            setTimeout(typeWriter, 150); 
        }
    }
    
    // 페이지 로드 후 약간의 지연 뒤 시작
    setTimeout(typeWriter, 800);

    // 2. 스크롤 애니메이션 (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// 3. 계좌번호 복사 기능
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}