// 카카오 디벨로퍼스 JavaScript 키 연동
Kakao.init('1acd146a3e0de1cc11ff78640d3c7a21'); 

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 갤러리 스와이퍼(슬라이드) 초기화
    const swiper = new Swiper('.gallery-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: { rotate: 0, stretch: -20, depth: 100, modifier: 1, slideShadows: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        loop: true
    });

    // 2. 라이트박스 로직
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryContainer = document.querySelector('.gallery-swiper');

    galleryContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            lightboxImg.src = e.target.src;
            lightbox.classList.add('show');
        }
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) { lightbox.classList.remove('show'); }
    });

    // 3. 스크롤 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('active'); }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // [추가된 기능] 관리자(신랑/신부) 전용 카카오톡 공유 버튼 보이기
    // 주소 끝에 ?admin=true 가 붙어있을 때만 숨겨진 공유 버튼을 나타나게 함
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        const shareSection = document.querySelector('.share-section');
        if (shareSection) {
            shareSection.style.display = 'block';
        }
    }
});

// 4. 계좌번호 복사 기능
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(err => {
        console.error('복사 실패:', err);
        // 모바일 사파리 등 복사 권한 우회용 폴백(Fallback)
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("계좌번호가 복사되었습니다.");
    });
}

// 5. 카카오톡 공유하기 기능
function shareKakao() {
    // 하객들에게 공유될 실제 주소 (admin 파라미터가 없으므로 하객들은 공유 버튼을 못 봄)
    const shareUrl = 'https://hongseungheee.github.io/weddingv2/'; 
    
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '홍길동 ♥ 김미래 결혼식에 초대합니다',
            description: '2026년 5월 23일 토요일 오후 12시\n그랜드 하얏트 서울, 그랜드 볼룸',
            imageUrl: 'https://hongseungheee.github.io/weddingv2/assets/1.jpeg', // 카톡 썸네일용 사진
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
            },
        },
        buttons: [
            {
                title: '청첩장 열어보기',
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl,
                },
            },
        ],
    });
}