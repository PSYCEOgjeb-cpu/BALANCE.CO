# 공공데이터포털 대체 데이터 소스 가이드

## 🔥 현 상황
- 공공데이터포털(data.go.kr) 화재로 인한 서비스 중단
- API 키 발급 불가능
- 대부분의 한국천문연구원 API 서비스 **임시재개** 상태

## 🔄 사주 분석을 위한 대체 데이터 소스

### 1. 📅 음양력 변환

#### ✅ 직접 사용 가능한 소스
```javascript
// 1. 한국천문연구원 웹사이트 직접 조회
const lunarUrl = 'https://astro.kasi.re.kr/life/pageView/5';
// 월별 음양력 변환표 제공

// 2. 중국 음력 계산 라이브러리 활용
const lunarJs = 'https://github.com/jjonline/calendar.js';
// JavaScript로 구현된 음양력 변환
```

#### 📚 로컬 데이터베이스 구축
```javascript
// 음력 변환 룩업 테이블 생성
const lunarLookupTable = {
    "20240101": { lunar: "20231119", isLeap: false },
    "20240102": { lunar: "20231120", isLeap: false },
    // ... 필요한 날짜 범위에 대해 미리 계산된 데이터
};
```

### 2. 🌸 24절기 정보

#### ✅ 사용 가능한 소스
```javascript
// 1. 한국천문연구원 달력자료
const solarTermsUrl = 'https://astro.kasi.re.kr/life/post/calendarData';

// 2. 천문학적 계산 공식 사용
class SolarTermCalculator {
    calculate24Terms(year) {
        // 천문학적 공식으로 24절기 계산
        const terms = [];
        for (let i = 0; i < 24; i++) {
            const jd = this.calculateSolarLongitude(year, i * 15);
            terms.push(this.julianToDate(jd));
        }
        return terms;
    }
}
```

### 3. 🌙 월령(달의 위상) 정보

#### ✅ 천문학 계산 라이브러리
```javascript
// 1. SunCalc.js 라이브러리 활용
import SunCalc from 'suncalc';

const moonPhase = SunCalc.getMoonIllumination(new Date());
// phase: 0-1 (0=신월, 0.5=보름달, 1=다음 신월)

// 2. Astronomical Algorithms 구현
class MoonPhaseCalculator {
    calculateMoonAge(date) {
        // Meeus의 천문 알고리즘 사용
        const jd = this.dateToJulian(date);
        return this.moonAgeFromJulian(jd);
    }
}
```

### 4. 🌅 출몰시각 정보

#### ✅ 천문학 계산 라이브러리
```javascript
// 1. SunCalc.js 사용 (추천)
import SunCalc from 'suncalc';

const times = SunCalc.getTimes(new Date(), latitude, longitude);
console.log('일출:', times.sunrise);
console.log('일몰:', times.sunset);

// 2. 한국천문연구원 계산기
const sunriseUrl = 'https://astro.kasi.re.kr/life/pageView/9';
// 위치별 출몰시각 직접 계산 가능
```

## 🛠️ 구현 방법

### 방법 1: 외부 JavaScript 라이브러리 활용

#### SunCalc.js + Lunar.js 조합
```bash
npm install suncalc
npm install lunar-javascript
```

```javascript
import SunCalc from 'suncalc';
import { Lunar } from 'lunar-javascript';

class AlternativeDataProvider {
    // 음양력 변환
    getSolarToLunar(year, month, day) {
        const solar = Solar.fromYmd(year, month, day);
        const lunar = solar.getLunar();
        return {
            lunarYear: lunar.getYear(),
            lunarMonth: lunar.getMonth(),
            lunarDay: lunar.getDay(),
            isLeapMonth: lunar.isLeap()
        };
    }
    
    // 출몰시각
    getSunMoonTimes(date, latitude, longitude) {
        const times = SunCalc.getTimes(date, latitude, longitude);
        const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
        
        return {
            sunrise: times.sunrise,
            sunset: times.sunset,
            moonrise: moonTimes.rise,
            moonset: moonTimes.set
        };
    }
    
    // 월령
    getMoonPhase(date) {
        const illumination = SunCalc.getMoonIllumination(date);
        return {
            phase: illumination.phase,
            fraction: illumination.fraction,
            phaseName: this.getPhaseName(illumination.phase)
        };
    }
}
```

### 방법 2: 웹 스크래핑 (서버 사이드)

#### Node.js + Puppeteer
```javascript
const puppeteer = require('puppeteer');

class KasiWebScraper {
    async scrapeLunarCalendar(year, month) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.goto('https://astro.kasi.re.kr/life/pageView/5');
        
        // 연도, 월 입력
        await page.select('#year', year.toString());
        await page.select('#month', month.toString());
        await page.click('#search-btn');
        
        // 결과 추출
        const results = await page.evaluate(() => {
            const rows = document.querySelectorAll('.calendar-table tr');
            const data = [];
            // 테이블 데이터 파싱
            return data;
        });
        
        await browser.close();
        return results;
    }
}
```

### 방법 3: 사전 계산된 데이터셋 구축

#### CSV/JSON 데이터 파일
```javascript
// lunar-data-2024.json
{
    "2024": {
        "01": {
            "01": {"lunar": "2023-11-19", "leap": false},
            "02": {"lunar": "2023-11-20", "leap": false},
            // ... 전체 연도 데이터
        }
    }
}

// 사용법
class PreCalculatedData {
    constructor() {
        this.lunarData = require('./data/lunar-data-2024.json');
        this.solarTermsData = require('./data/solar-terms-2024.json');
    }
    
    getLunarDate(year, month, day) {
        const key = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
        return this.lunarData[year][month.toString().padStart(2,'0')][day.toString().padStart(2,'0')];
    }
}
```

### 방법 4: 제3자 API 서비스

#### 대체 API 서비스들
```javascript
// 1. 중국 만년력 API
const chineseCalendarApi = 'http://api.goseek.cn/Tools/holiday';

// 2. 해외 천문학 API
const astronomyApi = 'https://api.sunrise-sunset.org/json';

// 3. 사설 한국 음력 API
const koreanLunarApi = 'https://korean-lunar-api.com/convert';
```

## 📋 즉시 구현 가능한 솔루션

### 1단계: 기본 라이브러리 설치
```bash
npm install suncalc lunar-javascript moment
```

### 2단계: 통합 데이터 프로바이더 구현
```javascript
class IntegratedDataProvider {
    constructor() {
        this.suncalc = require('suncalc');
        this.lunar = require('lunar-javascript');
    }
    
    async getAllData(year, month, day, location) {
        const date = new Date(year, month - 1, day);
        const coords = this.getLocationCoords(location);
        
        return {
            lunar: this.getLunarData(year, month, day),
            sunMoon: this.getSunMoonData(date, coords),
            moonPhase: this.getMoonPhaseData(date),
            solarTerms: this.getSolarTermsData(year)
        };
    }
}
```

### 3단계: 점진적 업그레이드
1. 라이브러리 기반 구현 (즉시 가능)
2. 웹 스크래핑 추가 (정확도 향상)
3. 자체 데이터베이스 구축 (장기적)

## 🎯 권장 접근법

1. **즉시 구현**: SunCalc.js + lunar-javascript 조합
2. **정확도 개선**: 한국천문연구원 웹사이트 스크래핑 (서버 사이드)
3. **장기 계획**: 자체 천문학 계산 엔진 구축

이 방법들로 공공데이터포털 복구를 기다리지 않고도 사주 분석에 필요한 모든 데이터를 확보할 수 있습니다.