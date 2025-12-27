# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Korean traditional fortune-telling (Saju) web application that calculates Four Pillars of Destiny based on birth date and time. The app provides traditional Korean astrology calculations with modern web technologies. Additionally, it includes a comprehensive 5-level learning system for Korean astrology (명리학) education.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with live-server (opens browser)
- `npm run start` - Start live-server (manual browser navigation)
- `npm install` - Install dependencies

### Testing
- No automated test framework is currently configured
- Manual testing available via:
  - `test_saju.html` - Manual Saju calculation accuracy testing with known data
  - Test files in `test/` directory (if present)

### Development Notes
- This is a client-side application using vanilla JavaScript
- No build process is configured (static files served directly)
- Uses live-server for development with hot reload

## Architecture

### Core Components

**Main Application Flow:**
1. `index.html` - Main Saju calculator entry point with Korean UI form
2. `js/app.js` - Main application logic (`SajuCalculator` class)
3. `js/alternative-data-provider.js` - Fallback astronomical calculations with caching
4. `js/api-manager.js` & other API clients - External service integration
5. `learning/index.html` - Learning system entry point (5-level curriculum)

**Key Classes:**
- `SajuCalculator` - Main calculation engine for Four Pillars with traditional algorithms
- `AlternativeDataProvider` - Advanced astronomical calculations with multiple fallback sources
- `TimeZoneDBClient` - Timezone corrections for historical accuracy

### Data Flow Architecture

**Traditional Saju Calculation:**
1. Solar date input → Lunar calendar conversion
2. Four Pillars calculation (Year/Month/Day/Hour stems and branches)
3. Five Elements (오행) analysis and interpretation
4. Zodiac animal characteristics integration

**Fallback Strategy:**
- Primary: Korean Astronomy Research Institute APIs
- Secondary: TimeZoneDB for timezone corrections
- Tertiary: Local astronomical calculations using SunCalc.js
- Final fallback: Manual mathematical approximations

### File Structure Logic

```
js/
├── app.js                          # Main application & UI logic
├── api-manager.js                  # API orchestration layer
├── alternative-data-provider.js    # Offline calculation fallbacks
├── timezone-api-client.js          # Timezone handling
└── web-scraper-api.js             # Web scraping fallback

config/
├── api-config.js                   # API keys and environment settings
├── api-setup-guide.md             # Comprehensive API setup documentation
└── alternative-data-sources.md    # Alternative data source strategies

test/
├── api-test.html                   # Test API connections
├── alternative-api-test.html       # Test fallback systems
└── test_saju.html                 # Manual calculation verification
```

## API Integration Strategy

### Current Status
- Korean Astronomy Research Institute APIs are temporarily unavailable due to infrastructure issues
- Application uses multiple fallback layers for reliability

### API Hierarchy
1. **Public Data Portal** (data.go.kr) - Official Korean astronomical data
2. **TimeZoneDB** - Precise timezone corrections
3. **SunCalc.js** - Client-side astronomical calculations
4. **Manual calculations** - Mathematical approximations for all features

### Configuration
- API keys stored in `config/api-config.js`
- Environment detection (development vs production)
- Caching strategy implemented for performance

## Korean Localization Specifics

### Cultural Elements
- Traditional Korean time system (12 traditional hours: 자시, 축시, etc.)
- Korean lunar calendar integration
- Five Elements (오행) system: 목(wood), 화(fire), 토(earth), 금(metal), 수(water)
- 12 Zodiac animals with Korean characteristics
- 24 Solar Terms (24절기) calculations

### Text and Fonts
- Primary language: Korean (한글)
- Fallback English explanations
- Google Fonts: Noto Sans KR for proper Korean typography
- All UI text in Korean with cultural context

## Development Guidelines

### Code Patterns
- ES6+ JavaScript with class-based architecture
- Async/await for API calls with comprehensive error handling
- Graceful degradation when external services fail
- Extensive caching for astronomical calculations

### Error Handling Strategy
- Multiple fallback layers for each data source
- User-friendly Korean error messages
- Console logging for debugging with source identification
- Cache-first approach to minimize API dependency

### Performance Considerations
- 24-hour cache for astronomical data
- Lazy loading of external libraries
- CDN resources for common libraries (SunCalc, Moment.js)
- Minimal dependencies approach

## Key Calculations

### Four Pillars Algorithm
The app calculates traditional Korean astrology pillars:
- **년주 (Year Pillar)** - Based on birth year with 60-year cycle
- **월주 (Month Pillar)** - Considers 24 solar terms for accuracy
- **일주 (Day Pillar)** - Uses 1900 baseline (경인일) for calculations  
- **시주 (Hour Pillar)** - Traditional 12-hour Korean time system

### Astronomical Accuracy
- Lunar calendar conversion using multiple algorithms
- Solar term calculations for precise monthly boundaries
- Timezone corrections for historical accuracy
- Moon phase calculations for additional insights

## Dependencies

### Runtime Dependencies
- `axios` - HTTP client for API calls
- `lunar-javascript` - Accurate lunar calendar conversions (Node.js)
- `moment` - Date manipulation and formatting
- `suncalc` - Astronomical calculations
- `cheerio` - Web scraping fallback (Node.js)

### Development Dependencies  
- `live-server` - Development server with hot reload

### CDN Resources
- SunCalc.js - Solar/lunar calculations
- Moment.js - Date formatting
- Google Fonts (Noto Sans KR) - Korean typography

## Browser Compatibility

- Modern browsers with ES6+ support required
- Mobile-responsive design for Korean users
- Progressive enhancement strategy
- Fallback calculations work offline