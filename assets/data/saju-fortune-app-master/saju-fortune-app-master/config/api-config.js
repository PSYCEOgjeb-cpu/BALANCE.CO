// API 설정 파일
// 실제 API 키 발급 후 여기에 입력하세요

const API_CONFIG = {
    kasi: {
        // 공공데이터포털에서 발급받은 서비스 키 (테스트용)
        serviceKey: 'YOUR_KASI_SERVICE_KEY_HERE'
        // 예시: serviceKey: 'abcd1234efgh5678ijkl9012mnop3456qrst'
    },
    timezone: {
        // TimeZoneDB API 키 (정확한 시간대 보정을 위해 권장)
        // https://timezonedb.com/api 에서 무료 발급 가능
        apiKey: 'YOUR_TIMEZONE_API_KEY_HERE'
    },
    google: {
        // Google Maps API 키 (선택사항)
        apiKey: 'YOUR_GOOGLE_API_KEY_HERE'
    }
};

// 개발/운영 환경 분리
const ENV_CONFIG = {
    development: {
        useCache: true,
        cacheMaxAge: 1000 * 60 * 5, // 5분 (개발시 짧게)
        enableLogging: true
    },
    production: {
        useCache: true,
        cacheMaxAge: 1000 * 60 * 60 * 24, // 24시간
        enableLogging: false
    }
};

// 현재 환경 감지
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.port === '3000';

const CURRENT_ENV = isDevelopment ? ENV_CONFIG.development : ENV_CONFIG.production;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, CURRENT_ENV };
} else {
    window.API_CONFIG = API_CONFIG;
    window.CURRENT_ENV = CURRENT_ENV;
}