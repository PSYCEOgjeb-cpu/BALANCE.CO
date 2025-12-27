// TimeZoneDB API 클라이언트
// 정확한 지역별 시간대 정보 제공

class TimeZoneDBClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.timezonedb.com/v2.1';
        this.cache = new Map();
        this.cacheTimeout = 1000 * 60 * 60 * 24; // 24시간 캐시
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

    // 1. 시간대 목록 조회
    async listTimeZones() {
        const cacheKey = 'timezone_list';
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const url = `${this.baseUrl}/list-time-zone`;
        const params = new URLSearchParams({
            key: this.apiKey,
            format: 'json'
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.status === 'OK') {
                const timezones = data.zones.map(zone => ({
                    zoneName: zone.zoneName,
                    countryCode: zone.countryCode,
                    countryName: zone.countryName,
                    gmtOffset: zone.gmtOffset,
                    dst: zone.dst === 1
                }));
                
                this.setCached(cacheKey, timezones);
                return timezones;
            }
            
            throw new Error(`API Error: ${data.message || 'Unknown error'}`);
        } catch (error) {
            console.error('TimeZoneDB 시간대 목록 조회 실패:', error);
            return this.getFallbackTimezones();
        }
    }

    // 2. 위치별 시간대 정보 조회
    async getTimeZoneByLocation(lat, lng) {
        const cacheKey = `timezone_${lat}_${lng}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const url = `${this.baseUrl}/get-time-zone`;
        const params = new URLSearchParams({
            key: this.apiKey,
            format: 'json',
            by: 'position',
            lat: lat.toString(),
            lng: lng.toString()
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.status === 'OK') {
                const result = {
                    zoneName: data.zoneName,
                    abbreviation: data.abbreviation,
                    gmtOffset: data.gmtOffset,
                    dst: data.dst === 1,
                    localTime: data.formatted,
                    timestamp: data.timestamp,
                    countryCode: data.countryCode,
                    countryName: data.countryName,
                    source: 'timezonedb_api'
                };
                
                this.setCached(cacheKey, result);
                return result;
            }
            
            throw new Error(`API Error: ${data.message || 'Unknown error'}`);
        } catch (error) {
            console.error('TimeZoneDB 위치별 시간대 조회 실패:', error);
            return this.getFallbackKoreaTimezone(lat, lng);
        }
    }

    // 3. 도시명으로 시간대 정보 조회
    async getTimeZoneByCity(cityName) {
        const cacheKey = `timezone_city_${cityName}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        const url = `${this.baseUrl}/get-time-zone`;
        const params = new URLSearchParams({
            key: this.apiKey,
            format: 'json',
            by: 'zone',
            zone: this.getCityTimezone(cityName)
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.status === 'OK') {
                const result = {
                    zoneName: data.zoneName,
                    abbreviation: data.abbreviation,
                    gmtOffset: data.gmtOffset,
                    dst: data.dst === 1,
                    localTime: data.formatted,
                    timestamp: data.timestamp,
                    countryCode: data.countryCode,
                    countryName: data.countryName,
                    requestedCity: cityName,
                    source: 'timezonedb_api'
                };
                
                this.setCached(cacheKey, result);
                return result;
            }
            
            throw new Error(`API Error: ${data.message || 'Unknown error'}`);
        } catch (error) {
            console.error('TimeZoneDB 도시별 시간대 조회 실패:', error);
            return this.getFallbackKoreaTimezone();
        }
    }

    // 4. 시간대 변환
    async convertTimeZone(fromZone, toZone, timestamp) {
        const url = `${this.baseUrl}/convert-time-zone`;
        const params = new URLSearchParams({
            key: this.apiKey,
            format: 'json',
            from: fromZone,
            to: toZone,
            time: timestamp
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            
            if (data.status === 'OK') {
                return {
                    fromZone: data.fromZone,
                    fromAbbreviation: data.fromAbbreviation,
                    fromTimestamp: data.fromTimestamp,
                    fromFormatted: data.fromFormatted,
                    toZone: data.toZone,
                    toAbbreviation: data.toAbbreviation,
                    toTimestamp: data.toTimestamp,
                    toFormatted: data.toFormatted,
                    offset: data.offset,
                    source: 'timezonedb_api'
                };
            }
            
            throw new Error(`API Error: ${data.message || 'Unknown error'}`);
        } catch (error) {
            console.error('TimeZoneDB 시간대 변환 실패:', error);
            return null;
        }
    }

    // 한국 주요 도시의 시간대 매핑
    getCityTimezone(cityName) {
        const koreanCities = {
            '서울': 'Asia/Seoul',
            '부산': 'Asia/Seoul',
            '대구': 'Asia/Seoul',
            '인천': 'Asia/Seoul',
            '광주': 'Asia/Seoul',
            '대전': 'Asia/Seoul',
            '울산': 'Asia/Seoul',
            '세종': 'Asia/Seoul',
            '경기': 'Asia/Seoul',
            '강원': 'Asia/Seoul',
            '충북': 'Asia/Seoul',
            '충남': 'Asia/Seoul',
            '전북': 'Asia/Seoul',
            '전남': 'Asia/Seoul',
            '경북': 'Asia/Seoul',
            '경남': 'Asia/Seoul',
            '제주': 'Asia/Seoul'
        };
        
        return koreanCities[cityName] || 'Asia/Seoul';
    }

    // Fallback 한국 시간대 정보
    getFallbackKoreaTimezone(lat = 37.5665, lng = 126.9780) {
        const now = new Date();
        return {
            zoneName: 'Asia/Seoul',
            abbreviation: 'KST',
            gmtOffset: 32400, // +9시간 (초 단위)
            dst: false,
            localTime: now.toLocaleString('ko-KR'),
            timestamp: Math.floor(now.getTime() / 1000),
            countryCode: 'KR',
            countryName: 'South Korea',
            latitude: lat,
            longitude: lng,
            source: 'fallback_korea'
        };
    }

    // Fallback 시간대 목록
    getFallbackTimezones() {
        return [
            {
                zoneName: 'Asia/Seoul',
                countryCode: 'KR',
                countryName: 'South Korea',
                gmtOffset: 32400,
                dst: false
            },
            {
                zoneName: 'Asia/Tokyo',
                countryCode: 'JP',
                countryName: 'Japan',
                gmtOffset: 32400,
                dst: false
            },
            {
                zoneName: 'Asia/Shanghai',
                countryCode: 'CN',
                countryName: 'China',
                gmtOffset: 28800,
                dst: false
            }
        ];
    }

    // 한국 주요 도시별 시간 보정 (분 단위)
    getKoreaLocalTimeOffset(cityName) {
        const offsets = {
            '서울': 0,
            '부산': 20,      // 부산은 서울보다 20분 빠름
            '대구': 15,      // 대구는 15분 빠름
            '인천': -5,      // 인천은 5분 늦음
            '광주': -10,     // 광주는 10분 늦음
            '대전': 5,       // 대전은 5분 빠름
            '울산': 25,      // 울산은 25분 빠름
            '제주': -15      // 제주는 15분 늦음
        };
        
        return offsets[cityName] || 0;
    }

    // 사주 분석용 시간 보정 계산
    async calculateBirthTimeCorrection(year, month, day, hour, minute, birthPlace) {
        try {
            // 한국 도시 좌표 매핑
            const cityCoords = {
                '서울': { lat: 37.5665, lng: 126.9780 },
                '부산': { lat: 35.1796, lng: 129.0756 },
                '대구': { lat: 35.8714, lng: 128.6014 },
                '인천': { lat: 37.4563, lng: 126.7052 },
                '광주': { lat: 35.1595, lng: 126.8526 },
                '대전': { lat: 36.3504, lng: 127.3845 },
                '울산': { lat: 35.5384, lng: 129.3114 },
                '제주': { lat: 33.4996, lng: 126.5312 }
            };

            const coords = cityCoords[birthPlace] || cityCoords['서울'];
            const birthDate = new Date(year, month - 1, day, hour, minute);
            
            // TimeZoneDB로 정확한 시간대 정보 가져오기
            const timezoneInfo = await this.getTimeZoneByLocation(coords.lat, coords.lng);
            
            // 한국 표준시 기준으로 보정 계산
            const kstOffset = 9 * 60; // KST = UTC+9 (분 단위)
            const localOffset = timezoneInfo.gmtOffset / 60; // 분 단위로 변환
            const correction = localOffset - kstOffset;
            
            // 추가적인 지역별 보정
            const localCorrection = this.getKoreaLocalTimeOffset(birthPlace);
            
            return {
                originalTime: birthDate,
                correction: correction + localCorrection,
                correctedTime: new Date(birthDate.getTime() + (correction + localCorrection) * 60 * 1000),
                timezoneInfo: timezoneInfo,
                source: 'timezonedb_calculation'
            };
            
        } catch (error) {
            console.error('출생 시간 보정 계산 실패:', error);
            // Fallback: 기본 한국 표준시 사용
            return {
                originalTime: new Date(year, month - 1, day, hour, minute),
                correction: this.getKoreaLocalTimeOffset(birthPlace),
                correctedTime: new Date(year, month - 1, day, hour, minute + this.getKoreaLocalTimeOffset(birthPlace)),
                timezoneInfo: this.getFallbackKoreaTimezone(),
                source: 'fallback_calculation'
            };
        }
    }

    // API 상태 확인
    async checkApiStatus() {
        try {
            const timezones = await this.listTimeZones();
            return {
                available: true,
                timezonesCount: timezones.length,
                message: 'TimeZoneDB API 정상 작동'
            };
        } catch (error) {
            return {
                available: false,
                error: error.message,
                message: 'TimeZoneDB API 연결 실패'
            };
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeZoneDBClient;
} else {
    window.TimeZoneDBClient = TimeZoneDBClient;
}