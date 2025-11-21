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

    // 공유 기능 초기화 (안전 가드)
    if (typeof initShareButtons === 'function') {
        initShareButtons();
    }

    // 계좌번호 탭/확인하기 기능 (신랑측/신부측)
    initAccountButtons();

    // 갤러리 이미지 다운스케일 및 지연 로드
    initGalleryImageOptimization();
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

// 공유 기능 초기화 함수 (복원/안전)
// function initShareButtons() {
//     const copyLinkBtn = document.getElementById('copy-link-btn');
//     if (!copyLinkBtn) return;
//     copyLinkBtn.addEventListener('click', () => {
//         const url = window.location.href;
//         if (navigator.clipboard && navigator.clipboard.writeText) {
//             navigator.clipboard.writeText(url).then(() => {
//                 alert('청첩장 링크가 복사되었습니다!');
//             }).catch(() => {
//                 fallbackCopy(url);
//             });
//         } else {
//             fallbackCopy(url);
//         }
//     });

//     function fallbackCopy(text) {
//         const temp = document.createElement('textarea');
//         temp.value = text;
//         document.body.appendChild(temp);
//         temp.select();
//         try { document.execCommand('copy'); alert('청첩장 링크가 복사되었습니다!'); } catch {}
//         document.body.removeChild(temp);
//     }
// }

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
            { label: '신랑 이찬희', value: '신한 110-491-234884(이찬희)' },
            { label: '아버지 이상기', value: '우리 1002-841-114082(이상기)' },
            { label: '어머니 김영희', value: '농협 216027-52-085918(김영희)' },
        ],
        bride: [
            { label: '신부 이채연 (율리아나)', value: '토스 1000-4916-10987(이채연)' },
            { label: '아버지 이원규 (바오로)', value: '신한 110-145-805640(김숙희)' },
            { label: '어머니 김숙희 (빅토리아)', value: '신한 110-145-805640(김숙희)' },
        ]
    };

    function renderAccounts(tab) {
        accountList.innerHTML = '';
        accounts[tab].forEach(acc => {
            const div = document.createElement('div');
            div.className = 'account-item';
            div.innerHTML = `<span class="account-label">${acc.label}</span>
                             <span class="account-value" data-account="${acc.value}" role="button" tabindex="0">${acc.value}</span>`;

            // 은행 식별 및 폰트 클래스 적용
            const valueSpan = div.querySelector('.account-value');
            const bankName = (acc.value.split(' ')[0] || '').trim();
            const bankClassMap = {
                '국민': 'bank-kb',
                'KB': 'bank-kb',
                '신한': 'bank-shinhan',
                '농협': 'bank-nh',
                'NH': 'bank-nh',
                '우리': 'bank-woori',
                '토스': 'bank-toss',
            };
            const bankClass = bankClassMap[bankName];
            if (bankClass) {
                valueSpan.classList.add(bankClass);
            }

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
            accountList.style.display = 'flex';
            shown = true;
            confirmBtn.textContent = '닫기';
        }
    });

    // // 계좌번호 클릭/버튼 클릭 시 복사 기능
    // accountList.addEventListener('click', (e) => {
    //     const target = e.target.closest('.account-copy-btn, .account-value');
    //     if (!target) return;
    //     const accountText = target.getAttribute('data-account') || target.textContent.trim();
    //     if (!accountText) return;
    //     navigator.clipboard.writeText(accountText).then(() => {
    //         const btn = e.target.closest('.account-copy-btn');
    //         if (btn) {
    //             const original = btn.textContent;
    //             btn.classList.add('copied');
    //             btn.textContent = '복사됨';
    //             setTimeout(() => { btn.classList.remove('copied'); btn.textContent = original; }, 1200);
    //         } else {
    //             alert('계좌번호가 복사되었습니다.');
    //         }
    //     }).catch(() => {
    //         // 폴백: 임시 입력으로 복사
    //         const temp = document.createElement('textarea');
    //         temp.value = accountText;
    //         document.body.appendChild(temp);
    //         temp.select();
    //         try {
    //             document.execCommand('copy');
    //             const btn = e.target.closest('.account-copy-btn');
    //             if (btn) {
    //                 const original = btn.textContent;
    //                 btn.classList.add('copied');
    //                 btn.textContent = '복사됨';
    //                 setTimeout(() => { btn.classList.remove('copied'); btn.textContent = original; }, 1200);
    //             } else {
    //                 alert('계좌번호가 복사되었습니다.');
    //             }
    //         } catch {}
    //         document.body.removeChild(temp);
    //     });
    // });

    // 초기 상태
    setTab('groom');
} 

// 갤러리 이미지 다운스케일 및 지연 로드 (클라이언트 측)
function initGalleryImageOptimization() {
    const MAX_WIDTH = 1600; // px
    const MAX_HEIGHT = 1600; // px
    const QUALITY = 0.82; // webp 품질

    const images = document.querySelectorAll('.gallery-photo[data-src]');

    // 파일 프로토콜 또는 필수 API 미지원 시 즉시 원본 사용
    const isFileProtocol = window.location.protocol === 'file:';
    const canUseBitmap = typeof createImageBitmap === 'function';
    const canUseCanvas = !!document.createElement('canvas').getContext;

    if (isFileProtocol || !canUseBitmap || !canUseCanvas) {
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
        return;
    }

    const loadAndDownscale = async (img) => {
        const src = img.getAttribute('data-src') || img.getAttribute('src');
        try {
            const bitmap = await fetch(src)
                .then(r => r.blob())
                .then(createImageBitmap);

            const { width, height } = bitmap;
            let targetW = width;
            let targetH = height;

            const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);
            targetW = Math.round(width * scale);
            targetH = Math.round(height * scale);

            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(bitmap, 0, 0, targetW, targetH);

            if (canvas.toDataURL) {
                img.src = canvas.toDataURL('image/webp', QUALITY);
            } else {
                img.src = src; // fallback
            }
            img.removeAttribute('data-src');
        } catch (e) {
            console.error('이미지 최적화 실패:', e);
            img.src = src; // 실패 시 원본 사용
            img.removeAttribute('data-src');
        }
    };

    const observer = new IntersectionObserver((entries, ob) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                ob.unobserve(img);
                loadAndDownscale(img);
            }
        });
    }, { rootMargin: '200px 0px', threshold: 0.01 });

    images.forEach(img => observer.observe(img));

    // 안전장치: 1.5초 후에도 남아있으면 원본으로 세팅
    setTimeout(() => {
        document.querySelectorAll('.gallery-photo[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }, 1500);
}