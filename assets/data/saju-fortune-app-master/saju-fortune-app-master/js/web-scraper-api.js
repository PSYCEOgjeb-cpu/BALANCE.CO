// Web Scraper API - 한국천문연구원 웹사이트에서 데이터 추출
// API 서비스가 중단된 상황에서 대체 방법으로 사용

class WebScraperAPI {
    constructor() {
        // CORS 문제로 인해 직접 스크래핑은 제한적
        // 실제 운영 환경에서는 백엔드 프록시 서버 필요
        this.proxyUrl = 'https://api.allorigins.win/get?url='; // CORS 우회 서비스
        this.kasiUrls = {
            calendar: 'https://astro.kasi.re.kr/life/post/calendarData',
            sunrise: 'https://astro.kasi.re.kr/life/pageView/9',
            lunar: 'https://astro.kasi.re.kr/life/pageView/5',
            moon: 'https://astro.kasi.re.kr/life/post/almanac'
        };
    }

    // 24절기 정보를 웹에서 스크래핑
    async scrapeSolarTerms(year) {
        console.warn('웹 스크래핑은 CORS 정책으로 제한됩니다. 백엔드 프록시 서버가 필요합니다.');
        
        // 로컬 데이터로 대체
        return this.getLocalSolarTerms(year);
    }

    // 음양력 변환 (웹 스크래핑 시뮬레이션)
    async scrapeLunarConversion(year, month, day) {
        console.warn('실제 웹 스크래핑은 서버 사이드에서 구현해야 합니다.');
        
        // 간단한 음력 계산 알고리즘으로 대체
        return this.calculateLunarLocal(year, month, day);
    }

    // 출몰시각 정보 스크래핑
    async scrapeSunriseSunset(year, month, day, location = '서울') {
        console.warn('CORS 제한으로 웹 스크래핑을 직접 수행할 수 없습니다.');
        
        // 천문학적 계산으로 근사값 제공
        return this.calculateSunriseSunsetLocal(year, month, day, location);
    }

    // 월령 정보 스크래핑
    async scrapeMoonPhase(year, month, day) {
        console.warn('실제 월령 데이터는 웹에서 스크래핑해야 합니다.');
        
        // 로컬 계산으로 대체
        return this.calculateMoonPhaseLocal(year, month, day);
    }

    // 로컬 24절기 계산
    getLocalSolarTerms(year) {
        const solarTerms = [
            { name: '소한', month: 1, day: 6 },
            { name: '대한', month: 1, day: 21 },
            { name: '입춘', month: 2, day: 4 },
            { name: '우수', month: 2, day: 19 },
            { name: '경칩', month: 3, day: 6 },
            { name: '춘분', month: 3, day: 21 },
            { name: '청명', month: 4, day: 5 },
            { name: '곡우', month: 4, day: 20 },
            { name: '입하', month: 5, day: 6 },
            { name: '소만', month: 5, day: 21 },
            { name: '망종', month: 6, day: 6 },
            { name: '하지', month: 6, day: 21 },
            { name: '소서', month: 7, day: 7 },
            { name: '대서', month: 7, day: 23 },
            { name: '입추', month: 8, day: 8 },
            { name: '처서', month: 8, day: 23 },
            { name: '백로', month: 9, day: 8 },
            { name: '추분', month: 9, day: 23 },
            { name: '한로', month: 10, day: 8 },
            { name: '상강', month: 10, day: 23 },
            { name: '입동', month: 11, day: 8 },
            { name: '소설', month: 11, day: 22 },
            { name: '대설', month: 12, day: 7 },
            { name: '동지', month: 12, day: 22 }
        ];

        return solarTerms.map(term => ({
            ...term,
            date: `${year}${term.month.toString().padStart(2, '0')}${term.day.toString().padStart(2, '0')}`,
            dateTime: `${year}-${term.month.toString().padStart(2, '0')}-${term.day.toString().padStart(2, '0')} 12:00:00`,
            source: 'local_calculation'
        }));
    }

    // 로컬 음력 계산
    calculateLunarLocal(year, month, day) {
        // 음력 계산을 위한 기준점 (1900년 1월 31일 = 음력 1900년 1월 1일)
        const baseDate = new Date(1900, 0, 31);
        const inputDate = new Date(year, month - 1, day);
        const daysDiff = Math.floor((inputDate - baseDate) / (1000 * 60 * 60 * 24));
        
        // 평균 음력월 길이 (29.53059일)
        const lunarMonthLength = 29.53059;
        const totalLunarMonths = Math.floor(daysDiff / lunarMonthLength);
        
        let lunarYear = 1900 + Math.floor(totalLunarMonths / 12);
        let lunarMonth = (totalLunarMonths % 12) + 1;
        let lunarDay = Math.floor((daysDiff % lunarMonthLength) + 1);
        
        // 음력 달의 길이는 29일 또는 30일
        if (lunarDay > 30) {
            lunarDay = 30;
        } else if (lunarDay <= 0) {
            lunarDay = 1;
        }
        
        return {
            lunarYear,
            lunarMonth,
            lunarDay,
            isLeapMonth: false,
            source: 'local_calculation'
        };
    }

    // 로컬 출몰시각 계산 (천문학적 계산)
    calculateSunriseSunsetLocal(year, month, day, location) {
        // 한국 주요 도시 좌표
        const coordinates = {
            '서울': { lat: 37.5665, lng: 126.9780 },
            '부산': { lat: 35.1796, lng: 129.0756 },
            '대구': { lat: 35.8714, lng: 128.6014 },
            '인천': { lat: 37.4563, lng: 126.7052 },
            '광주': { lat: 35.1595, lng: 126.8526 },
            '대전': { lat: 36.3504, lng: 127.3845 }
        };

        const coords = coordinates[location] || coordinates['서울'];
        
        // 간단한 출몰시각 계산 (근사값)
        const date = new Date(year, month - 1, day);
        const dayOfYear = Math.floor((date - new Date(year, 0, 0)) / 86400000);
        
        // 계절에 따른 일출/일몰 시간 근사 계산
        const sunriseBase = 6.5; // 6시 30분
        const sunsetBase = 18.5; // 18시 30분
        
        // 위도에 따른 보정
        const latCorrection = (coords.lat - 37.5) * 0.02;
        
        // 계절에 따른 변화 (코사인 함수 사용)
        const seasonalVariation = Math.cos((dayOfYear - 172) * 2 * Math.PI / 365) * 1.5;
        
        const sunrise = sunriseBase - seasonalVariation + latCorrection;
        const sunset = sunsetBase + seasonalVariation + latCorrection;
        
        const formatTime = (timeDecimal) => {
            const hours = Math.floor(timeDecimal);
            const minutes = Math.floor((timeDecimal - hours) * 60);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
        };

        return {
            date: `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`,
            location: location,
            sunrise: formatTime(sunrise),
            sunset: formatTime(sunset),
            moonrise: formatTime(sunrise + 12.5), // 대략적인 달 뜨는 시간
            moonset: formatTime(sunset - 12.5),   // 대략적인 달 지는 시간
            source: 'astronomical_calculation'
        };
    }

    // 로컬 월령 계산
    calculateMoonPhaseLocal(year, month, day) {
        // 2000년 1월 6일 18:14 신월을 기준점으로 설정
        const baseNewMoon = new Date(2000, 0, 6, 18, 14);
        const date = new Date(year, month - 1, day);
        const daysDiff = (date - baseNewMoon) / (1000 * 60 * 60 * 24);
        
        // 평균 삭망월 주기 (29.530588853일)
        const lunarCycle = 29.530588853;
        const moonAge = ((daysDiff % lunarCycle) + lunarCycle) % lunarCycle;
        
        // 월령에 따른 달의 위상 이름
        const getPhaseName = (age) => {
            if (age < 2 || age > 28) return '신월';
            if (age >= 2 && age < 6) return '초승달';
            if (age >= 6 && age < 9) return '상현달';
            if (age >= 9 && age < 13) return '차는달';
            if (age >= 13 && age < 17) return '보름달';
            if (age >= 17 && age < 21) return '지는달';
            if (age >= 21 && age < 25) return '하현달';
            return '그믐달';
        };

        return [{
            date: `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`,
            time: '12:00:00',
            phase: moonAge.toFixed(1),
            phaseName: getPhaseName(moonAge),
            source: 'lunar_calculation'
        }];
    }

    // 사용 가능한 서비스 상태 확인
    getServiceStatus() {
        return {
            webScraping: {
                available: false,
                reason: 'CORS 정책으로 브라우저에서 직접 웹 스크래핑 불가',
                solution: '백엔드 프록시 서버 구현 필요'
            },
            localCalculation: {
                available: true,
                accuracy: '근사값',
                reliability: '보통'
            },
            recommendation: '정확한 데이터를 위해서는 API 서비스 정상화 대기 또는 백엔드 서버 구현 필요'
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebScraperAPI;
} else {
    window.WebScraperAPI = WebScraperAPI;
}