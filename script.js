// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // Swiper 초기화
    const swiper = new Swiper('.swiper', {
        spaceBetween: 16,
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                spaceBetween: 20,
            }
        }
    });

    // 카카오맵 초기화
    initKakaoMap();

    // 스크롤 애니메이션 초기화
    initScrollReveal();

    // D-Day 카운터 초기화
    initDDayCounter();

    // 공유 기능 초기화
    initShareButtons();

    // 계좌번호 탭/확인하기 기능 (신랑측/신부측)
    initAccountButtons();
});

// 카카오맵 초기화 함수
function initKakaoMap() {
    // 카카오맵 API가 로드되었는지 확인
    if (typeof kakao !== 'undefined' && kakao.maps) {
        createMap();
    } else {
        // API 로드 대기
        const checkKakaoMap = setInterval(() => {
            if (typeof kakao !== 'undefined' && kakao.maps) {
                clearInterval(checkKakaoMap);
                createMap();
            }
        }, 100);
    }
}

// 지도 생성 함수
function createMap() {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.517643, 126.900084),
        level: 3,
    };
    
    const map = new kakao.maps.Map(container, options);

    // 마커 추가
    const markerPosition = new kakao.maps.LatLng(37.517643, 126.900084);
    const marker = new kakao.maps.Marker({
        position: markerPosition,
    });
    marker.setMap(map);

    // 인포윈도우 추가
    const iwContent = `
        <div style="padding: 10px; text-align: center;">
            <strong>JK아트컨벤션</strong><br>
            <a href="https://map.kakao.com/link/map/JK아트컨벤션,37.517643,126.900084" 
               target="_blank" style="color: #007bff; text-decoration: none;">
               큰지도보기
            </a>
        </div>
    `;
    
    const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
    });
    
    infowindow.open(map, marker);
}

// D-Day 카운터 초기화 함수
function initDDayCounter() {
    const dDayCounter = document.getElementById('d-day-counter');
    if (!dDayCounter) return;

    const weddingDate = new Date('2025-11-29T00:00:00');
    const today = new Date();
    
    // 시간, 분, 초는 무시하고 날짜만 비교
    today.setHours(0, 0, 0, 0);

    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        dDayCounter.textContent = diffDays;
    } else if (diffDays === 0) {
        dDayCounter.parentElement.innerHTML = '오늘은 <span style="color:var(--color-primary); font-weight:700;">결혼식 당일</span>입니다!';
    } else {
        dDayCounter.parentElement.textContent = '결혼식이 종료되었습니다.';
    }
}

// 공유 기능 초기화 함수
function initShareButtons() {
    const copyLinkBtn = document.getElementById('copy-link-btn');

    // 1. 링크 복사 기능
    copyLinkBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('청첩장 링크가 복사되었습니다!');
        }).catch(err => {
            console.error('링크 복사에 실패했습니다.', err);
            alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
        });
    });
}

// 스크롤 애니메이션 초기화 함수
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 계좌번호 탭/확인하기 기능 (신랑측/신부측)
function initAccountButtons() {
    const groomTab = document.getElementById('groom-tab');
    const brideTab = document.getElementById('bride-tab');
    const confirmBtn = document.getElementById('account-confirm-btn');
    const accountList = document.getElementById('account-list');
    let currentTab = 'groom';
    let shown = false;

    // 계좌 정보
    const accounts = {
        groom: [
            { label: '신랑', value: '국민 123456-78-91011' },
            { label: '아버지', value: '국민 111111-11-11111' },
            { label: '어머니', value: '신한 222222-22-22222' },
        ],
        bride: [
            { label: '신부', value: '신한 987654-32-10987' },
            { label: '아버지', value: '농협 333333-33-33333' },
            { label: '어머니', value: '우리 444444-44-44444' },
        ]
    };

    function renderAccounts(tab) {
        accountList.innerHTML = '';
        accounts[tab].forEach(acc => {
            const div = document.createElement('div');
            div.className = 'account-item';
            div.innerHTML = `<span class="account-label">${acc.label}</span><span class="account-value">${acc.value}</span>`;
            accountList.appendChild(div);
        });
    }

    function setTab(tab) {
        currentTab = tab;
        groomTab.classList.toggle('active', tab === 'groom');
        brideTab.classList.toggle('active', tab === 'bride');
        accountList.style.display = 'none';
        shown = false;
        confirmBtn.textContent = '확인하기';
    }

    groomTab.addEventListener('click', () => setTab('groom'));
    brideTab.addEventListener('click', () => setTab('bride'));

    confirmBtn.addEventListener('click', function() {
        if (shown) {
            accountList.style.display = 'none';
            shown = false;
            confirmBtn.textContent = '확인하기';
        } else {
            renderAccounts(currentTab);
            accountList.style.display = 'block';
            shown = true;
            confirmBtn.textContent = '닫기';
        }
    });

    // 초기 상태
    setTab('groom');
} 