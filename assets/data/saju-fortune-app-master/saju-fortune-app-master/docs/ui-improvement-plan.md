# UI/UX 개선 우선순위 계획

## 🎯 현재 UI 상태 분석

### ✅ 잘 구현된 부분
1. **깔끔한 디자인**: 보라-파랑 그라데이션 테마
2. **반응형 레이아웃**: 모바일/태블릿/데스크톱 대응
3. **직관적인 입력 폼**: 생년월일시, 성별 선택
4. **사주 결과 표시**: 4주 컬러 코딩
5. **상태 알림**: 공공데이터 중단 안내 배너

### ⚠️ 개선 필요 부분
1. **입력 편의성 부족**: 출생지, 시분 입력 없음
2. **결과 가독성**: 전통 사주판 형태 부재
3. **정보 부족**: 용어 설명, 신뢰도 표시 없음
4. **상호작용성**: 정적 결과, 드릴다운 기능 없음

## 🥇 1단계 개선 (즉시 실행)

### 1. 출생지 입력 기능 추가
```html
<div class="form-group">
    <label for="birth-place">출생지 (시간대 보정용):</label>
    <select id="birth-place" required>
        <option value="">지역 선택</option>
        <option value="서울">서울특별시</option>
        <option value="부산">부산광역시</option>
        <option value="대구">대구광역시</option>
        <!-- ... 17개 시도 전체 -->
    </select>
</div>
```

### 2. 시간 입력 개선
```html
<div class="form-group">
    <label for="birth-time-detail">정확한 출생시간 (선택):</label>
    <div class="time-input-group">
        <select id="birth-hour-detail">
            <option value="">시간 선택</option>
            <!-- 24시간 형식 -->
        </select>
        <select id="birth-minute">
            <option value="0">00분</option>
            <option value="15">15분</option>
            <option value="30">30분</option>
            <option value="45">45분</option>
        </select>
    </div>
</div>
```

### 3. 데이터 신뢰도 표시
```html
<div class="reliability-indicator">
    <div class="reliability-bar">
        <div class="reliability-fill" style="width: 85%"></div>
    </div>
    <small>데이터 신뢰도: 85% (TimeZoneDB API 연동됨)</small>
</div>
```

## 🥈 2단계 개선 (1주 내)

### 1. 전통 사주판 형태 결과 표시
```css
.saju-board {
    display: grid;
    grid-template-areas: 
        "hour-stem  day-stem   month-stem year-stem"
        "hour-branch day-branch month-branch year-branch"
        "info       info       info        info";
    grid-template-columns: repeat(4, 1fr);
    border: 3px solid #667eea;
    background: #f8f9fa;
}
```

### 2. 오행 상생상극 다이어그램
```html
<div class="five-elements-diagram">
    <div class="element-wheel">
        <div class="element wood">목</div>
        <div class="element fire">화</div>
        <div class="element earth">토</div>
        <div class="element metal">금</div>
        <div class="element water">수</div>
    </div>
</div>
```

### 3. 용어 설명 툴팁
```html
<span class="term-tooltip" data-tooltip="천간과 지지의 조합으로 만들어지는 60가지 주기">
    갑자<i class="tooltip-icon">?</i>
</span>
```

## 🥉 3단계 개선 (2주 내)

### 1. 월령 시각화
```html
<div class="moon-phase-visual">
    <div class="moon-circle" data-phase="14.2">
        <div class="moon-shadow"></div>
    </div>
    <p>보름달 (월령 14.2일)</p>
</div>
```

### 2. 대운/세운 타임라인
```html
<div class="fortune-timeline">
    <div class="timeline-header">
        <h3>대운 흐름</h3>
    </div>
    <div class="timeline-track">
        <div class="decade-period active" data-age="20-29">
            <span class="decade-stem">병인</span>
            <span class="decade-age">20-29세</span>
        </div>
        <!-- 더 많은 대운들 -->
    </div>
</div>
```

### 3. 결과 저장/공유 기능
```html
<div class="result-actions">
    <button class="action-btn" onclick="saveResult()">
        💾 결과 저장
    </button>
    <button class="action-btn" onclick="shareResult()">
        📤 공유하기
    </button>
    <button class="action-btn" onclick="printResult()">
        🖨️ 인쇄용
    </button>
</div>
```

## 📊 우선순위 매트릭스

| 개선 항목 | 중요도 | 난이도 | 우선순위 |
|-----------|--------|--------|----------|
| 출생지 입력 | 높음 | 낮음 | 🥇 |
| 시간 정밀 입력 | 높음 | 낮음 | 🥇 |
| 데이터 신뢰도 표시 | 중간 | 낮음 | 🥇 |
| 전통 사주판 UI | 높음 | 중간 | 🥈 |
| 오행 다이어그램 | 중간 | 중간 | 🥈 |
| 용어 설명 | 중간 | 낮음 | 🥈 |
| 월령 시각화 | 낮음 | 높음 | 🥉 |
| 타임라인 | 높음 | 높음 | 🥉 |
| 공유 기능 | 낮음 | 중간 | 🥉 |

## 🎨 색상 시스템 개선

### 현재 색상 문제점
- 오행 색상이 일관되지 않음
- 접근성 고려 부족 (색맹 사용자)
- 한국 전통색 반영 미흡

### 개선된 오행 색상
```css
:root {
    /* 오행 색상 - 한국 전통색 기반 */
    --wood-color: #2d7d32;    /* 청록 */
    --fire-color: #c62828;    /* 주홍 */
    --earth-color: #f57f17;   /* 황토 */
    --metal-color: #424242;   /* 백금 */
    --water-color: #1565c0;   /* 감청 */
    
    /* 명도 대비 확보 */
    --wood-light: #66bb6a;
    --fire-light: #ef5350;
    --earth-light: #ffee58;
    --metal-light: #78909c;
    --water-light: #42a5f5;
}
```

## 📱 모바일 최적화

### 터치 인터페이스 개선
```css
/* 터치 타겟 크기 최소 44px */
.form-group select,
.form-group input {
    min-height: 44px;
    font-size: 16px; /* iOS 줌 방지 */
}

/* 스와이프 제스처 지원 */
.saju-pillars {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
}
```

### 오프라인 지원
```javascript
// 서비스 워커 등록
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
```

## ⚡ 성능 최적화

### 이미지 최적화
- WebP 포맷 사용
- Lazy loading 구현
- 압축 최적화

### JavaScript 최적화
```javascript
// 코드 스플리팅
const loadAdvancedFeatures = () => {
    return import('./advanced-features.js');
};

// 계산 결과 메모이제이션
const memoizedCalculation = memoize(calculateFourPillars);
```

## 🔍 접근성 개선

### ARIA 레이블
```html
<div class="pillar" role="region" aria-label="연주 정보">
    <h3 id="year-pillar-title">년주 (年柱)</h3>
    <div aria-labelledby="year-pillar-title">
        갑자 (목)
    </div>
</div>
```

### 키보드 네비게이션
```css
.focusable:focus {
    outline: 3px solid #667eea;
    outline-offset: 2px;
}
```

## 📊 사용성 테스트 계획

### A/B 테스트 항목
1. 입력 폼 레이아웃 (세로 vs 가로)
2. 결과 표시 형태 (카드 vs 테이블)
3. 색상 조합 (전통색 vs 현대색)

### 사용자 피드백 수집
```html
<div class="feedback-widget">
    <h4>이 결과가 도움이 되셨나요?</h4>
    <div class="rating-buttons">
        <button data-rating="1">😞</button>
        <button data-rating="3">😐</button>
        <button data-rating="5">😊</button>
    </div>
</div>
```

## 🎯 완성 목표

### 단기 목표 (2주)
- [x] 출생지 입력 기능
- [x] 시간 정밀 입력
- [x] 데이터 신뢰도 표시
- [x] 기본 UI 개선

### 중기 목표 (1개월)
- [ ] 전통 사주판 UI
- [ ] 오행 시각화
- [ ] 상세 해석 추가
- [ ] 모바일 최적화

### 장기 목표 (2개월)
- [ ] PWA 전환
- [ ] 오프라인 지원
- [ ] 공유/저장 기능
- [ ] 다국어 지원

이 계획을 따라 단계적으로 구현하면 사용자 친화적이고 전문적인 사주 분석 앱을 완성할 수 있습니다.