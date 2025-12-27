// 사주명리 학습 앱 서비스 워커
const CACHE_NAME = 'saju-learning-v1.0.0';
const STATIC_CACHE_NAME = 'saju-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'saju-dynamic-v1.0.0';

// 캐시할 정적 리소스
const STATIC_ASSETS = [
    '/learning/foundation/',
    '/learning/foundation/index.html',
    '/learning/foundation/foundation-styles-mobile.css',
    '/learning/foundation/foundation-script.js',
    '/learning/foundation/manifest.json',
    // Google Fonts
    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap',
    'https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.woff2'
];

// 캐시할 동적 리소스 패턴
const DYNAMIC_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
    /\.(?:css|js)$/i,
    /googleapis\.com/,
    /gstatic\.com/
];

// 오프라인 폴백 페이지
const OFFLINE_PAGE = '/learning/foundation/offline.html';

// 설치 이벤트 - 정적 리소스 캐시
self.addEventListener('install', event => {
    console.log('📱 서비스 워커 설치 중...');
    
    event.waitUntil(
        Promise.all([
            // 정적 리소스 캐시
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('📦 정적 리소스 캐싱 중...');
                return cache.addAll(STATIC_ASSETS);
            }),
            // 오프라인 페이지 생성 및 캐시
            createOfflinePage()
        ]).then(() => {
            console.log('✅ 서비스 워커 설치 완료');
            // 즉시 활성화
            return self.skipWaiting();
        }).catch(error => {
            console.error('❌ 서비스 워커 설치 실패:', error);
        })
    );
});

// 활성화 이벤트 - 오래된 캐시 정리
self.addEventListener('activate', event => {
    console.log('🔄 서비스 워커 활성화 중...');
    
    event.waitUntil(
        Promise.all([
            // 오래된 캐시 삭제
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE_NAME && 
                            cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('🗑️ 오래된 캐시 삭제:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // 모든 클라이언트 제어
            self.clients.claim()
        ]).then(() => {
            console.log('✅ 서비스 워커 활성화 완료');
        })
    );
});

// 네트워크 요청 인터셉트
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // GET 요청만 처리
    if (request.method !== 'GET') {
        return;
    }
    
    // 학습 앱 관련 요청 처리
    if (url.pathname.startsWith('/learning/foundation/')) {
        event.respondWith(handleAppRequest(request));
        return;
    }
    
    // 폰트 및 외부 리소스 처리
    if (DYNAMIC_PATTERNS.some(pattern => pattern.test(url.href))) {
        event.respondWith(handleAssetRequest(request));
        return;
    }
    
    // 기본 네트워크 요청
    event.respondWith(fetch(request));
});

// 앱 요청 처리 (Cache First)
async function handleAppRequest(request) {
    try {
        // 캐시에서 먼저 확인
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // 백그라운드에서 업데이트 확인
            updateCache(request);
            return cachedResponse;
        }
        
        // 네트워크에서 가져오기
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            // 캐시에 저장
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('📱 오프라인 모드: 캐시에서 응답');
        
        // HTML 요청이면 오프라인 페이지 반환
        if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match(OFFLINE_PAGE);
        }
        
        // 캐시된 응답이 있는지 확인
        return caches.match(request);
    }
}

// 에셋 요청 처리 (Network First with Fallback)
async function handleAssetRequest(request) {
    try {
        // 네트워크에서 먼저 시도
        const networkResponse = await Promise.race([
            fetch(request),
            // 3초 타임아웃
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('타임아웃')), 3000)
            )
        ]);
        
        if (networkResponse && networkResponse.status === 200) {
            // 동적 캐시에 저장
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        // 실패시 캐시에서 가져오기
        return await caches.match(request);
        
    } catch (error) {
        // 캐시에서 가져오기
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // 이미지 요청이면 플레이스홀더 반환
        if (request.url.match(/\.(png|jpg|jpeg|svg|gif|webp)$/i)) {
            return new Response(
                '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#6b7280">이미지 로딩 실패</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
            );
        }
        
        throw error;
    }
}

// 백그라운드 캐시 업데이트
async function updateCache(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            await cache.put(request, networkResponse);
        }
    } catch (error) {
        // 업데이트 실패해도 무시
    }
}

// 오프라인 페이지 생성
async function createOfflinePage() {
    const offlineHTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>오프라인 - 사주명리 학습</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8fafc;
            color: #1f2937;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
        }
        .offline-container {
            max-width: 400px;
            background: white;
            border-radius: 16px;
            padding: 40px 30px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .offline-icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 16px;
        }
        p {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 24px;
        }
        .retry-btn {
            background: #1e40af;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 24px;
            font-weight: 500;
            cursor: pointer;
            font-size: 0.875rem;
        }
        .retry-btn:hover {
            background: #1d4ed8;
        }
        .features {
            margin-top: 32px;
            text-align: left;
        }
        .features h3 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: #1f2937;
        }
        .feature-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .feature-list li {
            padding: 8px 0;
            color: #6b7280;
            font-size: 0.875rem;
        }
        .feature-list li:before {
            content: "✓ ";
            color: #059669;
            font-weight: 700;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <div class="offline-icon">📱</div>
        <h1>오프라인 상태</h1>
        <p>인터넷 연결을 확인해주세요. 연결이 복구되면 자동으로 동기화됩니다.</p>
        
        <button class="retry-btn" onclick="window.location.reload()">
            다시 시도
        </button>
        
        <div class="features">
            <h3>오프라인에서도 가능한 기능:</h3>
            <ul class="feature-list">
                <li>기본 학습 콘텐츠 열람</li>
                <li>학습 노트 작성 (로컬 저장)</li>
                <li>완료한 퀴즈 결과 확인</li>
                <li>캐시된 학습 자료 이용</li>
            </ul>
        </div>
    </div>
    
    <script>
        // 온라인 상태 감지
        window.addEventListener('online', () => {
            window.location.reload();
        });
        
        // 주기적 연결 확인
        setInterval(() => {
            if (navigator.onLine) {
                window.location.reload();
            }
        }, 30000);
    </script>
</body>
</html>
    `;
    
    const cache = await caches.open(STATIC_CACHE_NAME);
    await cache.put(OFFLINE_PAGE, new Response(offlineHTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }));
}

// 푸시 알림 처리 (향후 확장)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/learning/foundation/icons/icon-192x192.png',
        badge: '/learning/foundation/icons/badge-72x72.png',
        tag: 'saju-learning',
        renotify: true,
        actions: [
            {
                action: 'open',
                title: '학습하기',
                icon: '/learning/foundation/icons/action-study.png'
            },
            {
                action: 'dismiss',
                title: '닫기',
                icon: '/learning/foundation/icons/action-dismiss.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/learning/foundation/')
        );
    }
});

// 백그라운드 동기화 (향후 확장)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-learning-progress') {
        event.waitUntil(syncLearningProgress());
    }
});

async function syncLearningProgress() {
    try {
        // 로컬 저장소에서 진행 상황 읽기
        const clients = await self.clients.matchAll();
        
        for (const client of clients) {
            client.postMessage({
                type: 'SYNC_PROGRESS',
                timestamp: Date.now()
            });
        }
        
        console.log('📊 학습 진행 상황 동기화 완료');
    } catch (error) {
        console.error('❌ 동기화 실패:', error);
    }
}

// 에러 처리
self.addEventListener('error', event => {
    console.error('💥 서비스 워커 에러:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('💥 처리되지 않은 Promise 거부:', event.reason);
    event.preventDefault();
});

// 버전 정보 로깅
console.log(`🚀 사주명리 학습 앱 서비스 워커 ${CACHE_NAME} 로드됨`);