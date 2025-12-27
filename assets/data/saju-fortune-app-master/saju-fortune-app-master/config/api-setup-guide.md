# API 설정 가이드

## ⚠️ 중요 공지 - 현재 API 상태

2024년 현재 한국천문연구원의 일부 Open API 서비스가 **임시재개** 상태입니다.

### 📋 서비스 상태
- **특일 정보**: 임시재개 (대체: 웹사이트 직접 조회)
- **출몰시각 정보**: 임시재개 (대체: 웹사이트 계산기)
- **음양력 정보**: 임시재개 (대체: 웹사이트 월별 조회)
- **월령 정보**: 임시재개 (대체: 웹사이트 달력자료)

### 🔗 대체 서비스 URL
- 특일/24절기: https://astro.kasi.re.kr/life/post/calendarData
- 출몰시각: https://astro.kasi.re.kr/life/pageView/9
- 음양력: https://astro.kasi.re.kr/life/pageView/5
- 월령: https://astro.kasi.re.kr/life/post/almanac

## 🔑 API 키 발급 단계별 가이드

### 1. 한국천문연구원 API (공공데이터포털)

#### 📋 신청 과정
1. **공공데이터포털 접속**
   - URL: https://www.data.go.kr
   - 회원가입 (실명인증 필수)

2. **API 검색**
   ```
   검색어: "한국천문연구원 특일 정보"
   또는: "음양력변환"
   ```

3. **서비스 선택**
   - **음양력변환**: `한국천문연구원_특일 정보`
   - **24절기**: `한국천문연구원_24절기 정보서비스`

4. **활용신청**
   - 서비스명: 사주 운세 애플리케이션
   - 이용목적: 교육/연구/상업적 이용 선택
   - 일일 호출 한도: 1,000~10,000 (용도에 따라)
   - 승인 시간: 1-3일

#### 💻 신청서 작성 예시
```
서비스명: 사주팔자 웹 애플리케이션
이용목적: 전통 한국 사주학을 활용한 개인 운세 서비스 제공
예상 트래픽: 일 1,000건 내외
활용분야: 문화/교육 콘텐츠
```

### 2. TimeZoneDB API (시간대)

#### 📋 신청 과정
1. **TimeZoneDB 접속**
   - URL: https://timezonedb.com/register
   - 이메일로 간단 가입

2. **무료 플랜 선택**
   - Free Plan: 월 1,000 requests
   - Premium Plan: 월 10,000+ requests ($4.99~)

3. **API 키 확인**
   - 대시보드에서 즉시 확인 가능

#### 💡 대안 서비스
- **OpenWeatherMap Timezone**: https://openweathermap.org/api/timezone
- **Google Maps Timezone**: https://developers.google.com/maps/documentation/timezone

### 3. Google Maps API (고급 시간대 서비스)

#### 📋 신청 과정
1. **Google Cloud Console 접속**
   - URL: https://console.cloud.google.com

2. **프로젝트 생성**
   - "새 프로젝트" 클릭
   - 프로젝트명: "saju-fortune-app"

3. **API 활성화**
   - "API 및 서비스" > "라이브러리"
   - "Maps Time Zone API" 검색 후 활성화

4. **API 키 생성**
   - "사용자 인증 정보" > "사용자 인증 정보 만들기"
   - "API 키" 선택

5. **API 키 제한 설정** (보안)
   - HTTP 리퍼러 제한
   - API 제한 설정

## 🔐 API 키 보안 관리

### 환경변수 설정 파일 생성

#### 1. .env 파일 생성 (Node.js 환경)
```bash
# .env
KASI_SERVICE_KEY=발급받은_한국천문연구원_서비스키
TIMEZONE_API_KEY=발급받은_TimeZoneDB_API키
GOOGLE_API_KEY=발급받은_구글_API키
```

#### 2. config.js 파일 (브라우저 환경)
```javascript
// config/api-config.js
const API_CONFIG = {
    // 개발환경용 - 실제 배포 시에는 서버에서 프록시 처리
    kasi: {
        serviceKey: 'YOUR_KASI_SERVICE_KEY_HERE'
    },
    timezone: {
        apiKey: 'YOUR_TIMEZONE_API_KEY_HERE'  
    },
    google: {
        apiKey: 'YOUR_GOOGLE_API_KEY_HERE'
    }
};

// 환경에 따른 설정
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
} else {
    window.API_CONFIG = API_CONFIG;
}
```

### 보안 주의사항

#### ⚠️ 클라이언트 사이드 보안
- **절대 금지**: API 키를 클라이언트 코드에 직접 노출
- **권장사항**: 서버 프록시를 통한 API 호출

#### 🛡️ 서버 사이드 프록시 (권장)
```javascript
// server/api-proxy.js (Express.js 예시)
const express = require('express');
const router = express.Router();

// 음양력 변환 프록시
router.get('/lunar-conversion', async (req, res) => {
    try {
        const { year, month, day } = req.query;
        const result = await kasiApi.convertSolarToLunar(year, month, day);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'API 호출 실패' });
    }
});
```

## 🚀 API 키 적용 방법

### 1. API Manager에 키 설정
```javascript
// api-manager.js 수정
class ApiManager {
    constructor() {
        this.config = {
            kasi: {
                baseUrl: 'http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService',
                serviceKey: API_CONFIG.kasi.serviceKey || 'YOUR_KASI_SERVICE_KEY_HERE'
            },
            timezone: {
                apiKey: API_CONFIG.timezone.apiKey || 'YOUR_TIMEZONE_API_KEY_HERE'
            },
            google: {
                apiKey: API_CONFIG.google.apiKey || 'YOUR_GOOGLE_API_KEY_HERE'
            }
        };
    }
}
```

### 2. HTML에 설정 파일 포함
```html
<!-- index.html -->
<script src="config/api-config.js"></script>
<script src="js/api-manager.js"></script>
<script src="js/app.js"></script>
```

### 3. 동적 키 로드 (고급)
```javascript
class ApiManager {
    async loadConfig() {
        try {
            // 서버에서 설정 로드
            const response = await fetch('/api/config');
            const config = await response.json();
            this.config = config;
        } catch (error) {
            console.warn('설정 로드 실패, 기본값 사용');
        }
    }
}
```

## 🧪 API 테스트 방법

### API 연결 테스트
```javascript
async function testApis() {
    const apiManager = new ApiManager();
    
    // 1. 음양력 변환 테스트
    try {
        const lunarResult = await apiManager.convertSolarToLunar(2024, 10, 17);
        console.log('음양력 변환:', lunarResult);
    } catch (error) {
        console.error('음양력 API 오류:', error);
    }
    
    // 2. 24절기 테스트
    try {
        const solarTerms = await apiManager.getSolarTerms(2024);
        console.log('24절기:', solarTerms);
    } catch (error) {
        console.error('24절기 API 오류:', error);
    }
    
    // 3. 시간대 테스트
    try {
        const offset = await apiManager.getTimezoneOffset('부산');
        console.log('시간대 보정:', offset);
    } catch (error) {
        console.error('시간대 API 오류:', error);
    }
}

// 페이지 로드 시 테스트
testApis();
```

## 💰 비용 및 제한사항

### 한국천문연구원 API (공공데이터)
- **비용**: 무료
- **제한**: 일 10,000건 (신청 시 선택)
- **속도**: 초당 10 requests

### TimeZoneDB
- **Free**: 월 1,000 requests
- **Paid**: $4.99/월 (10,000 requests)

### Google Maps Timezone
- **Free**: 월 $200 크레딧 (약 40,000 requests)
- **Paid**: $0.005 per request

## 🔧 문제해결

### 자주 발생하는 오류

#### 1. CORS 오류
```javascript
// 해결: 서버 프록시 사용 또는 JSONP
fetch(`/api/proxy/lunar?year=${year}&month=${month}&day=${day}`)
```

#### 2. API 키 인증 실패
```javascript
// 확인사항:
// - API 키 정확성
// - 서비스 활성화 상태
// - 일일 호출 제한
```

#### 3. Rate Limit 초과
```javascript
// 해결: 캐싱 및 요청 제한
const rateLimiter = {
    requests: 0,
    resetTime: Date.now() + 3600000, // 1시간
    
    canRequest() {
        if (Date.now() > this.resetTime) {
            this.requests = 0;
            this.resetTime = Date.now() + 3600000;
        }
        return this.requests < 1000;
    }
};
```

이 가이드를 따라 API를 설정하면 정확하고 신뢰할 수 있는 사주 분석 서비스를 구축할 수 있습니다.