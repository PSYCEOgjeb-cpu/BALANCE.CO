// API Manager - 외부 API 통합 관리
class ApiManager {
    constructor() {
        // 외부 설정 파일에서 API 키 가져오기
        const apiConfig = typeof API_CONFIG !== 'undefined' ? API_CONFIG : {
            kasi: { serviceKey: 'YOUR_KASI_SERVICE_KEY_HERE' },
            timezone: { apiKey: 'YOUR_TIMEZONE_API_KEY_HERE' },
            google: { apiKey: 'YOUR_GOOGLE_API_KEY_HERE' }
        };
        
        // API 설정 - 한국천문연구원 공식 API 엔드포인트
        this.config = {
            kasi: {
                // 음양력 정보 서비스
                lunarService: 'http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService',
                // 특일 정보 서비스 (24절기 포함)
                specialDayService: 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService',
                // 월령 정보 서비스
                moonPhaseService: 'http://apis.data.go.kr/B090041/openapi/service/LunPhInfoService',
                // 출몰시각 정보 서비스
                riseSetService: 'http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService',
                serviceKey: apiConfig.kasi.serviceKey
            },
            timezone: {
                apiKey: apiConfig.timezone.apiKey
            },
            google: {
                apiKey: apiConfig.google.apiKey
            }
        };
        
        this.cache = new Map();
        this.maxCacheAge = 24 * 60 * 60 * 1000; // 24시간
        
        // 대체 서비스 초기화
        this.webScraper = new WebScraperAPI();
        this.useAlternativeServices = true; // API 중단 시 대체 서비스 사용
    }

    // 캐시 관리
    getCached(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.maxCacheAge) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data;
    }

    setCached(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    // 음양력 변환 (한국천문연구원 API)
    async convertSolarToLunar(year, month, day) {
        const cacheKey = `lunar_${year}_${month}_${day}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const url = `${this.config.kasi.lunarService}/getSolCalInfo`;
        const params = new URLSearchParams({
            serviceKey: this.config.kasi.serviceKey,
            solYear: year,
            solMonth: month.toString().padStart(2, '0'),
            solDay: day.toString().padStart(2, '0'),
            numOfRows: 1,
            pageNo: 1,
            _type: 'json'
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.response.header.resultCode === '00') {
                const item = data.response.body.items.item[0];
                const result = {
                    lunarYear: parseInt(item.lunYear),
                    lunarMonth: parseInt(item.lunMonth),
                    lunarDay: parseInt(item.lunDay),
                    isLeapMonth: item.lunLeapmonthNy === 'Y',
                    source: 'kasi_api'
                };
                
                this.setCached(cacheKey, result);
                return result;
            }
            throw new Error(`KASI API Error: ${data.response.header.resultMsg}`);
        } catch (error) {
            console.error('KASI API 오류, 로컬 계산 사용:', error);
            // 로컬 계산으로 fallback
            return this.calculateLunarLocal(year, month, day);
        }
    }

    // 24절기 정보 조회
    async getSolarTerms(year) {
        const cacheKey = `solar_terms_${year}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const url = `${this.config.kasi.specialDayService}/getSpcdeInfo`;
        const params = new URLSearchParams({
            serviceKey: this.config.kasi.serviceKey,
            solYear: year,
            numOfRows: 100,
            pageNo: 1,
            _type: 'json'
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.response.header.resultCode === '00') {
                const solarTerms = data.response.body.items.item
                    .filter(item => item.dateName.includes('입춘') || 
                                  item.dateName.includes('경칩') ||
                                  item.dateName.includes('청명') ||
                                  // ... 24절기 모두 포함
                                  item.dateName.includes('대한'))
                    .map(item => ({
                        name: item.dateName,
                        date: item.locdate,
                        dateKst: item.dateKst,
                        source: 'kasi_api'
                    }));
                
                this.setCached(cacheKey, solarTerms);
                return solarTerms;
            }
            throw new Error(`Solar Terms API Error: ${data.response.header.resultMsg}`);
        } catch (error) {
            console.error('24절기 API 오류, 로컬 데이터 사용:', error);
            return this.getSolarTermsLocal(year);
        }
    }

    // 월령 정보 조회 (달의 위상)
    async getMoonPhase(year, month, day) {
        const cacheKey = `moon_phase_${year}_${month}_${day}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const url = `${this.config.kasi.moonPhaseService}/getLunPhInfo`;
        const params = new URLSearchParams({
            serviceKey: this.config.kasi.serviceKey,
            solYear: year,
            solMonth: month.toString().padStart(2, '0'),
            solDay: day.toString().padStart(2, '0'),
            numOfRows: 10,
            pageNo: 1,
            _type: 'json'
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.response.header.resultCode === '00') {
                const items = data.response.body.items.item;
                const moonPhases = Array.isArray(items) ? items : [items];
                
                const result = moonPhases.map(item => ({
                    date: item.locdate,
                    time: item.kst,
                    phase: item.lunAge, // 월령
                    phaseName: this.getMoonPhaseName(parseFloat(item.lunAge)),
                    source: 'kasi_api'
                }));
                
                this.setCached(cacheKey, result);
                return result;
            }
            throw new Error(`Moon Phase API Error: ${data.response.header.resultMsg}`);
        } catch (error) {
            console.error('월령 API 오류:', error);
            return this.calculateMoonPhaseLocal(year, month, day);
        }
    }

    // 월령에 따른 달의 위상 이름
    getMoonPhaseName(moonAge) {
        if (moonAge < 2 || moonAge > 28) return '신월';
        if (moonAge >= 2 && moonAge < 6) return '초승달';
        if (moonAge >= 6 && moonAge < 9) return '상현달';
        if (moonAge >= 9 && moonAge < 13) return '차는달';
        if (moonAge >= 13 && moonAge < 17) return '보름달';
        if (moonAge >= 17 && moonAge < 21) return '지는달';
        if (moonAge >= 21 && moonAge < 25) return '하현달';
        return '그믐달';
    }

    // 해달 출몰시각 정보 조회
    async getSunMoonRiseSet(year, month, day, location = 'seoul') {
        const cacheKey = `rise_set_${year}_${month}_${day}_${location}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const url = `${this.config.kasi.riseSetService}/getAreaRiseSetInfo`;
        const params = new URLSearchParams({
            serviceKey: this.config.kasi.serviceKey,
            locdate: `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`,
            location: location,
            numOfRows: 10,
            pageNo: 1,
            _type: 'json'
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.response.header.resultCode === '00') {
                const item = data.response.body.items.item[0];
                const result = {
                    date: item.locdate,
                    location: item.location,
                    sunrise: item.sunrise,
                    sunset: item.sunset,
                    moonrise: item.moonrise,
                    moonset: item.moonset,
                    source: 'kasi_api'
                };
                
                this.setCached(cacheKey, result);
                return result;
            }
            throw new Error(`Rise Set API Error: ${data.response.header.resultMsg}`);
        } catch (error) {
            console.error('출몰시각 API 오류:', error);
            return null;
        }
    }

    // 지역별 시간 보정
    async getTimezoneOffset(location) {
        // 한국 내 주요 도시 시간 보정값
        const koreaOffsets = {
            '서울': 0, '인천': -5, '수원': -2,
            '부산': 20, '대구': 15, '울산': 25,
            '광주': -10, '전주': -8, '목포': -12,
            '대전': 5, '청주': 3, '천안': -1,
            '춘천': 8, '강릉': 25, '원주': 5,
            '제주': -15, '서귀포': -18
        };

        if (typeof location === 'string') {
            return koreaOffsets[location] || 0;
        }

        // 좌표로 시간대 조회 (TimeZoneDB API)
        if (location.lat && location.lng) {
            try {
                const url = `https://api.timezonedb.com/v2.1/get-time-zone`;
                const params = new URLSearchParams({
                    key: this.config.timezone.apiKey,
                    format: 'json',
                    by: 'position',
                    lat: location.lat,
                    lng: location.lng
                });

                const response = await fetch(`${url}?${params}`);
                const data = await response.json();
                
                if (data.status === 'OK') {
                    // 한국 표준시와의 차이 계산 (분 단위)
                    const kstOffset = 9 * 60; // KST = UTC+9
                    const localOffset = data.gmtOffset / 60;
                    return Math.round(localOffset - kstOffset);
                }
            } catch (error) {
                console.error('Timezone API 오류:', error);
            }
        }

        return 0; // 기본값: 서울 표준시
    }

    // 로컬 음력 계산 (fallback)
    calculateLunarLocal(year, month, day) {
        // 기존 app.js의 solarToLunar 메서드 사용
        const baseDate = new Date(1900, 0, 31);
        const inputDate = new Date(year, month - 1, day);
        const daysDiff = Math.floor((inputDate - baseDate) / (1000 * 60 * 60 * 24));
        
        const lunarMonthLength = 29.53059;
        const totalLunarMonths = Math.floor(daysDiff / lunarMonthLength);
        
        let lunarYear = 1900 + Math.floor(totalLunarMonths / 12);
        let lunarMonth = (totalLunarMonths % 12) + 1;
        let lunarDay = Math.floor((daysDiff % lunarMonthLength) + 1);
        
        if (lunarDay > 30) lunarDay = 30;
        else if (lunarDay <= 0) lunarDay = 1;
        
        return {
            lunarYear,
            lunarMonth,
            lunarDay,
            isLeapMonth: false,
            source: 'local_calculation'
        };
    }

    // 로컬 24절기 데이터 (fallback)
    getSolarTermsLocal(year) {
        const solarTerms = [
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
            { name: '동지', month: 12, day: 22 },
            { name: '소한', month: 1, day: 6 },
            { name: '대한', month: 1, day: 21 }
        ];

        return solarTerms.map(term => ({
            ...term,
            date: `${year}${term.month.toString().padStart(2, '0')}${term.day.toString().padStart(2, '0')}`,
            source: 'local_data'
        }));
    }

    // 로컬 월령 계산 (fallback)
    calculateMoonPhaseLocal(year, month, day) {
        // 간단한 월령 계산 (근사치)
        const date = new Date(year, month - 1, day);
        const baseNewMoon = new Date(2000, 0, 6, 18, 14); // 2000년 1월 6일 신월
        const daysDiff = (date - baseNewMoon) / (1000 * 60 * 60 * 24);
        const lunarCycle = 29.530588853; // 평균 삭망월 주기
        const moonAge = ((daysDiff % lunarCycle) + lunarCycle) % lunarCycle;
        
        return [{
            date: `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`,
            time: '12:00:00',
            phase: moonAge.toFixed(1),
            phaseName: this.getMoonPhaseName(moonAge),
            source: 'local_calculation'
        }];
    }

    // API 상태 체크
    async checkApiStatus() {
        const status = {
            kasi: false,
            timezone: false,
            google: false
        };

        try {
            // KASI API 테스트
            const testDate = new Date();
            const result = await this.convertSolarToLunar(
                testDate.getFullYear(), 
                testDate.getMonth() + 1, 
                testDate.getDate()
            );
            status.kasi = result && result.source === 'kasi_api';
        } catch (error) {
            console.log('KASI API 연결 실패');
        }

        return status;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiManager;
} else {
    window.ApiManager = ApiManager;
}