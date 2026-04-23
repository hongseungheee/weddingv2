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
    
    // 2. 라이트박스 로직
    const lightbox = document.getElementById('lightbox');
    const lightboxWrapper = document.getElementById('lightbox-wrapper');
    const galleryItems = document.querySelectorAll('.grid-item img');
    let lightboxSwiper = null;

    // 라이트박스 스와이퍼 초기화 함수
    function initLightboxSwiper() {
        if (!lightboxSwiper) {
            lightboxSwiper = new Swiper('.lightbox-swiper', {
                loop: true,
                speed: 400,
                spaceBetween: 20,
                keyboard: { enabled: true },
            });
        }
    }

    // 갤러리 클릭 시 라이트박스 열기
    document.querySelector('.grid-gallery').addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const allImages = Array.from(galleryItems).map(img => img.src);
            const clickedIdx = Array.from(galleryItems).indexOf(e.target);

            // 슬라이드 동적 생성
            lightboxWrapper.innerHTML = allImages.map(src => `
                <div class="swiper-slide">
                    <img src="${src}" alt="갤러리 사진">
                </div>
            `).join('');

            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // 스크롤 방지

            initLightboxSwiper();
            lightboxSwiper.update();
            lightboxSwiper.slideToLoop(clickedIdx, 0);
        }
    });

    // 라이트박스 닫기
    const closeBtn = document.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('swiper-slide')) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
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
                title: '이민희 ♥ 홍승희 결혼식에 초대합니다',
                description: '2026년 6월 6일 토요일 오후 1시 30분\n' + VENUE_NAME,
                imageUrl: 'https://hongseungheee.github.io/weddingv2/assets/main.jpg',
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
