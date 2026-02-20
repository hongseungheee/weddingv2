// ==========================================
// ★ [지도 위치 설정 영역]
const VENUE_LAT = 37.559111; // 위도
const VENUE_LNG = 126.984459; // 경도
const VENUE_NAME = '명동라루체 웨딩홀';

// 카카오 디벨로퍼스 JavaScript 키
const KAKAO_APP_KEY = '1acd146a3e0de1cc11ff78640d3c7a21'; 
// ==========================================

Kakao.init(KAKAO_APP_KEY); 

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

    // 4. 관리자(신랑/신부) 전용 카카오톡 공유 버튼 보이기
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        const shareSection = document.querySelector('.share-section');
        if (shareSection) { shareSection.style.display = 'block'; }
    }

    // 5. 카카오맵 API 초기화 및 그리기 (설정 영역의 변수 사용)
    if (window.kakao && kakao.maps) {
        const mapContainer = document.getElementById('map'); 
        const mapOption = { 
            center: new kakao.maps.LatLng(VENUE_LAT, VENUE_LNG), 
            level: 4 
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        
        // 마커 올리기
        const markerPosition  = new kakao.maps.LatLng(VENUE_LAT, VENUE_LNG); 
        const marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
    }
});

// 6. 계좌번호 복사 기능
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(err => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("계좌번호가 복사되었습니다.");
    });
}

// 7. 내비게이션 연결 로직 3종 (설정 영역의 변수 사용)
function naviNaver() {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(VENUE_NAME)}`);
}

function naviKakao() {
    Kakao.Navi.start({
        name: VENUE_NAME,
        x: VENUE_LNG, // 카카오내비는 x가 경도입니다
        y: VENUE_LAT, // y가 위도입니다
        coordType: 'wgs84'
    });
}

function naviTmap() {
    window.open(`https://tmap.co.kr/tmap2/mobile/route.jsp?name=${encodeURIComponent(VENUE_NAME)}&lat=${VENUE_LAT}&lon=${VENUE_LNG}`);
}

// 8. 카카오톡 공유하기 기능
function shareKakao() {
    const shareUrl = 'https://hongseungheee.github.io/weddingv2/'; 
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '홍길동 ♥ 김미래 결혼식에 초대합니다',
            description: '2026년 5월 23일 토요일 오후 12시\n' + VENUE_NAME,
            imageUrl: 'https://hongseungheee.github.io/weddingv2/assets/1.jpeg',
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