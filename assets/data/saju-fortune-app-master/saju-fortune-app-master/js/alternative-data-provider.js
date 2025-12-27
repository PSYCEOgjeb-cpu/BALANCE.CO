// Alternative Data Provider - 외부 라이브러리 기반 천문 데이터 제공
// 공공데이터포털 화재로 인한 API 중단 상황 대응

class AlternativeDataProvider {
    constructor() {
        // 브라우저 환경에서는 CDN으로 로드된 라이브러리 사용
        this.suncalc = typeof SunCalc !== 'undefined' ? SunCalc : null;
        this.moment = typeof moment !== 'undefined' ? moment : null;
        
        // TimeZoneDB API 클라이언트 초기화
        const timezoneApiKey = this.getTimezoneApiKey();
        this.timezoneClient = timezoneApiKey && typeof TimeZoneDBClient !== 'undefined' 
            ? new TimeZoneDBClient(timezoneApiKey) : null;
        
        // 한국 주요 도시 좌표
        this.koreaLocations = {
            '서울': { lat: 37.5665, lng: 126.9780, timezone: 9 },
            '부산': { lat: 35.1796, lng: 129.0756, timezone: 9 },
            '대구': { lat: 35.8714, lng: 128.6014, timezone: 9 },
            '인천': { lat: 37.4563, lng: 126.7052, timezone: 9 },
            '광주': { lat: 35.1595, lng: 126.8526, timezone: 9 },
            '대전': { lat: 36.3504, lng: 127.3845, timezone: 9 },
            '울산': { lat: 35.5384, lng: 129.3114, timezone: 9 },
            '제주': { lat: 33.4996, lng: 126.5312, timezone: 9 }
        };
        
        this.cache = new Map();
        this.cacheTimeout = 1000 * 60 * 60 * 24; // 24시간
    }

    // TimeZoneDB API 키 가져오기
    getTimezoneApiKey() {
        // 여러 방법으로 API 키 찾기
        if (typeof API_CONFIG !== 'undefined' && API_CONFIG.timezone && API_CONFIG.timezone.apiKey) {
            return API_CONFIG.timezone.apiKey !== 'YOUR_TIMEZONE_API_KEY_HERE' 
                ? API_CONFIG.timezone.apiKey : null;
        }
        
        // 환경변수에서 찾기
        if (typeof process !== 'undefined' && process.env && process.env.TIMEZONEDB_API_KEY) {
            return process.env.TIMEZONEDB_API_KEY;
        }
        
        // localStorage에서 찾기 (브라우저 환경)
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('timezonedb_api_key');
        }
        
        return null;
    }

    // 캐시 관리
    getCached(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.cacheTimeout) {
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

    // 음양력 변환 (향상된 알고리즘)
    convertSolarToLunar(year, month, day) {
        const cacheKey = `lunar_${year}_${month}_${day}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            // Lunar-JavaScript 라이브러리 사용 (Node.js 환경)
            if (typeof require !== 'undefined') {
                const { Solar } = require('lunar-javascript');
                const solar = Solar.fromYmd(year, month, day);
                const lunar = solar.getLunar();
                
                const result = {
                    lunarYear: lunar.getYear(),
                    lunarMonth: lunar.getMonth(),
                    lunarDay: lunar.getDay(),
                    isLeapMonth: lunar.isLeap(),
                    source: 'lunar-javascript',
                    accuracy: 'high'
                };
                
                this.setCached(cacheKey, result);
                return result;
            }
        } catch (error) {
            console.warn('lunar-javascript 라이브러리 사용 실패:', error);
        }

        // 브라우저 환경 또는 라이브러리 실패 시 자체 계산
        const result = this.calculateLunarAdvanced(year, month, day);
        this.setCached(cacheKey, result);
        return result;
    }

    // 향상된 음력 계산 알고리즘
    calculateLunarAdvanced(year, month, day) {
        // 1900년 1월 31일 (음력 1900년 1월 1일)을 기준점으로 설정
        const baseDate = new Date(1900, 0, 31);
        const targetDate = new Date(year, month - 1, day);
        const daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
        
        // 더 정확한 음력월 길이 계산 (윤달 고려)
        const avgLunarMonth = 29.530588853;
        const lunarYear = 1900 + Math.floor(daysDiff / 354.36707); // 평균 음력년
        
        // 해당 연도의 음력 정보 계산
        const lunarYearStart = this.getLunarYearStart(lunarYear);
        const daysFromYearStart = daysDiff - lunarYearStart;
        
        let lunarMonth = 1;
        let lunarDay = daysFromYearStart + 1;
        let currentDays = 0;
        
        // 월별 일수 계산하여 정확한 월/일 도출
        for (let m = 1; m <= 12; m++) {
            const monthDays = this.getLunarMonthDays(lunarYear, m);
            if (currentDays + monthDays >= daysFromYearStart) {
                lunarMonth = m;
                lunarDay = daysFromYearStart - currentDays + 1;
                break;
            }
            currentDays += monthDays;
        }

        return {
            lunarYear: lunarYear,
            lunarMonth: lunarMonth,
            lunarDay: Math.max(1, Math.min(30, Math.floor(lunarDay))),
            isLeapMonth: false,
            source: 'advanced_calculation',
            accuracy: 'medium'
        };
    }

    // 특정 음력년의 시작일 계산 (근사치)
    getLunarYearStart(lunarYear) {
        return (lunarYear - 1900) * 354.36707;
    }

    // 특정 음력월의 일수 계산 (29일 또는 30일)
    getLunarMonthDays(year, month) {
        // 간단한 규칙: 홀수 달은 30일, 짝수 달은 29일 (실제로는 더 복잡)
        const base = (month % 2 === 1) ? 30 : 29;
        // 연도와 월에 따른 미세 조정
        const adjustment = Math.floor(Math.sin((year * 12 + month) * 0.1) * 0.5);
        return Math.max(29, Math.min(30, base + adjustment));
    }

    // 24절기 계산 (천문학적 계산)
    calculate24SolarTerms(year) {
        const cacheKey = `solar_terms_${year}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const solarTerms = [
            { name: '소한', angle: 285 }, { name: '대한', angle: 300 },
            { name: '입춘', angle: 315 }, { name: '우수', angle: 330 },
            { name: '경칩', angle: 345 }, { name: '춘분', angle: 0 },
            { name: '청명', angle: 15 },  { name: '곡우', angle: 30 },
            { name: '입하', angle: 45 },  { name: '소만', angle: 60 },
            { name: '망종', angle: 75 },  { name: '하지', angle: 90 },
            { name: '소서', angle: 105 }, { name: '대서', angle: 120 },
            { name: '입추', angle: 135 }, { name: '처서', angle: 150 },
            { name: '백로', angle: 165 }, { name: '추분', angle: 180 },
            { name: '한로', angle: 195 }, { name: '상강', angle: 210 },
            { name: '입동', angle: 225 }, { name: '소설', angle: 240 },
            { name: '대설', angle: 255 }, { name: '동지', angle: 270 }
        ];

        const results = solarTerms.map(term => {
            const date = this.calculateSolarTermDate(year, term.angle);
            return {
                name: term.name,
                angle: term.angle,
                date: date.toISOString().split('T')[0],
                dateTime: date.toISOString(),
                source: 'astronomical_calculation'
            };
        });

        this.setCached(cacheKey, results);
        return results;
    }

    // 특정 태양 경도에서의 날짜 계산
    calculateSolarTermDate(year, longitude) {
        // 기본적인 천문학 계산 (근사치)
        const yearStart = new Date(year, 0, 1);
        const dayOfYear = (longitude / 360) * 365.25;
        
        // 지구 공전 궤도의 타원성과 계절 보정
        const eccentricityCorrection = Math.sin((longitude - 90) * Math.PI / 180) * 2;
        const adjustedDay = dayOfYear + eccentricityCorrection;
        
        const result = new Date(year, 0, 1);
        result.setDate(adjustedDay);
        
        return result;
    }

    // 해달 출몰시각 계산 (SunCalc.js + TimeZoneDB 사용)
    async calculateSunMoonTimes(year, month, day, location = '서울') {
        const cacheKey = `sun_moon_${year}_${month}_${day}_${location}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const coords = this.koreaLocations[location] || this.koreaLocations['서울'];
        const date = new Date(year, month - 1, day);

        let result;
        let timezoneCorrection = null;

        // TimeZoneDB로 정확한 시간대 보정 처리
        if (this.timezoneClient) {
            try {
                timezoneCorrection = await this.timezoneClient.calculateBirthTimeCorrection(
                    year, month, day, 12, 0, location
                );
            } catch (error) {
                console.warn('TimeZoneDB 시간대 보정 실패:', error);
            }
        }

        if (this.suncalc) {
            // SunCalc.js 라이브러리 사용
            const sunTimes = this.suncalc.getTimes(date, coords.lat, coords.lng);
            const moonTimes = this.suncalc.getMoonTimes(date, coords.lat, coords.lng);
            
            // TimeZoneDB 보정이 있으면 적용
            let sunriseTime = sunTimes.sunrise;
            let sunsetTime = sunTimes.sunset;
            let moonriseTime = moonTimes.rise;
            let moonsetTime = moonTimes.set;
            
            if (timezoneCorrection && timezoneCorrection.correction !== 0) {
                const correctionMs = timezoneCorrection.correction * 60 * 1000;
                sunriseTime = new Date(sunTimes.sunrise.getTime() + correctionMs);
                sunsetTime = new Date(sunTimes.sunset.getTime() + correctionMs);
                if (moonTimes.rise) moonriseTime = new Date(moonTimes.rise.getTime() + correctionMs);
                if (moonTimes.set) moonsetTime = new Date(moonTimes.set.getTime() + correctionMs);
            }

            result = {
                date: `${year}${month.toString().padStart(2,'0')}${day.toString().padStart(2,'0')}`,
                location: location,
                sunrise: this.formatTime(sunriseTime),
                sunset: this.formatTime(sunsetTime),
                moonrise: moonriseTime ? this.formatTime(moonriseTime) : null,
                moonset: moonsetTime ? this.formatTime(moonsetTime) : null,
                timezoneCorrection: timezoneCorrection ? timezoneCorrection.correction : 0,
                source: timezoneCorrection ? 'suncalc_timezonedb' : 'suncalc_library',
                accuracy: timezoneCorrection ? 'very_high' : 'high'
            };
        } else {
            // 자체 계산으로 fallback
            result = this.calculateSunTimesManual(date, coords);
        }

        this.setCached(cacheKey, result);
        return result;
    }

    // 수동 태양 시간 계산 (SunCalc 없을 때)
    calculateSunTimesManual(date, coords) {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        
        // 태양 적위 계산
        const declination = -23.45 * Math.cos(2 * Math.PI * (dayOfYear + 10) / 365.25);
        const latitude = coords.lat;
        
        // 일출/일몰 시간 계산
        const hourAngle = Math.acos(-Math.tan(latitude * Math.PI / 180) * Math.tan(declination * Math.PI / 180));
        const sunriseHour = 12 - hourAngle * 12 / Math.PI;
        const sunsetHour = 12 + hourAngle * 12 / Math.PI;
        
        // 경도 보정
        const longitudeCorrection = (coords.lng - 135) / 15; // 한국 표준시 기준
        
        return {
            date: date.toISOString().split('T')[0].replace(/-/g, ''),
            location: '위치정보',
            sunrise: this.formatHour(sunriseHour + longitudeCorrection),
            sunset: this.formatHour(sunsetHour + longitudeCorrection),
            moonrise: this.formatHour(sunriseHour + 12.5), // 대략적인 월출
            moonset: this.formatHour(sunsetHour - 12.5),   // 대략적인 월몰
            source: 'manual_calculation',
            accuracy: 'medium'
        };
    }

    // 달의 위상 계산
    calculateMoonPhase(year, month, day) {
        const cacheKey = `moon_phase_${year}_${month}_${day}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const date = new Date(year, month - 1, day);
        let result;

        if (this.suncalc) {
            // SunCalc.js 사용
            const illumination = this.suncalc.getMoonIllumination(date);
            const phase = illumination.phase;
            
            result = [{
                date: `${year}${month.toString().padStart(2,'0')}${day.toString().padStart(2,'0')}`,
                time: '12:00:00',
                phase: (phase * 29.53).toFixed(1), // 월령으로 변환
                phaseName: this.getMoonPhaseName(phase),
                fraction: (illumination.fraction * 100).toFixed(1) + '%',
                source: 'suncalc_library',
                accuracy: 'high'
            }];
        } else {
            // 수동 계산
            result = this.calculateMoonPhaseManual(date);
        }

        this.setCached(cacheKey, result);
        return result;
    }

    // 수동 월령 계산
    calculateMoonPhaseManual(date) {
        const baseNewMoon = new Date(2000, 0, 6, 18, 14); // 2000년 1월 6일 신월
        const daysDiff = (date - baseNewMoon) / (1000 * 60 * 60 * 24);
        const lunarCycle = 29.530588853;
        const moonAge = ((daysDiff % lunarCycle) + lunarCycle) % lunarCycle;
        
        return [{
            date: date.toISOString().split('T')[0].replace(/-/g, ''),
            time: '12:00:00',
            phase: moonAge.toFixed(1),
            phaseName: this.getMoonPhaseName(moonAge / 29.53),
            fraction: this.calculateMoonFraction(moonAge),
            source: 'manual_calculation',
            accuracy: 'medium'
        }];
    }

    // 달의 위상 이름 반환
    getMoonPhaseName(phase) {
        if (phase < 0.03 || phase > 0.97) return '신월';
        if (phase >= 0.03 && phase < 0.22) return '초승달';
        if (phase >= 0.22 && phase < 0.28) return '상현달';
        if (phase >= 0.28 && phase < 0.47) return '차는달';
        if (phase >= 0.47 && phase < 0.53) return '보름달';
        if (phase >= 0.53 && phase < 0.72) return '지는달';
        if (phase >= 0.72 && phase < 0.78) return '하현달';
        return '그믐달';
    }

    // 달의 조명 비율 계산
    calculateMoonFraction(moonAge) {
        const phase = moonAge / 29.53;
        const fraction = Math.abs(Math.cos((phase - 0.5) * Math.PI)) * 100;
        return fraction.toFixed(1) + '%';
    }

    // 시간 포맷팅
    formatTime(date) {
        if (!date || isNaN(date.getTime())) return null;
        return date.toTimeString().split(' ')[0];
    }

    formatHour(hourDecimal) {
        const hours = Math.floor(hourDecimal);
        const minutes = Math.floor((hourDecimal - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    }

    // 통합 데이터 제공
    async getAllAstronomicalData(year, month, day, location = '서울') {
        try {
            const [lunar, sunMoon, moonPhase, solarTerms] = await Promise.all([
                Promise.resolve(this.convertSolarToLunar(year, month, day)),
                this.calculateSunMoonTimes(year, month, day, location),
                Promise.resolve(this.calculateMoonPhase(year, month, day)),
                Promise.resolve(this.calculate24SolarTerms(year))
            ]);

            return {
                success: true,
                data: {
                    lunar: lunar,
                    sunMoon: sunMoon,
                    moonPhase: moonPhase[0],
                    solarTerms: solarTerms,
                    location: location,
                    coordinates: this.koreaLocations[location]
                },
                metadata: {
                    timestamp: new Date().toISOString(),
                    source: 'alternative_data_provider',
                    accuracy: 'medium_to_high'
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                fallback: '로컬 계산으로 전환합니다.'
            };
        }
    }

    // 서비스 상태 확인
    getServiceStatus() {
        return {
            suncalc: !!this.suncalc,
            moment: !!this.moment,
            timezonedb: !!this.timezoneClient,
            cache: this.cache.size,
            locations: Object.keys(this.koreaLocations).length,
            capabilities: {
                lunarConversion: true,
                solarTerms: true,
                sunMoonTimes: true,
                moonPhase: true,
                timezoneCorrection: !!this.timezoneClient,
                caching: true
            },
            apiKeys: {
                timezonedb: !!this.getTimezoneApiKey()
            }
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlternativeDataProvider;
} else {
    window.AlternativeDataProvider = AlternativeDataProvider;
}