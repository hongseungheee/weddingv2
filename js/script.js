document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 갤러리 스와이퍼(슬라이드) 초기화
    const swiper = new Swiper('.gallery-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: -20,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true // 무한 롤링
    });

    // 2. 라이트박스 (이미지 확대 팝업) 로직
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryContainer = document.querySelector('.gallery-swiper');

    // 스와이퍼 내부의 이미지를 클릭했을 때 라이트박스 열기 (이벤트 위임)
    galleryContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            lightboxImg.src = e.target.src;
            lightbox.classList.add('show');
        }
    });

    // 라이트박스 배경이나 닫기 버튼을 클릭했을 때 닫기
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) { // 이미지 자체를 클릭한 게 아닐 때만 닫음
            lightbox.classList.remove('show');
        }
    });

    // 3. 스크롤 애니메이션 (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// 4. 계좌번호 복사 기능
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(err => {
        console.error('복사 실패:', err);
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("계좌번호가 복사되었습니다.");
    });
}