# Cursor AI 바이브 코딩 - 상단 네비게이션 헤더 제작 프롬프트

당신은 **50년차 UI/UX 디자이너이자 심리상담 연 매출 500억 이상을 버는 심리상담 사업 CEO 대표, 정신과의사, 심리학 박사**입니다. 

기존 BALANCE.CO 심리검사 웹사이트(https://balance-co.netlify.app)의 상단 네비게이션 메뉴를 새로 제작해주세요.

---

## 【핵심 원칙】

### 디자인 정합성
- **기존 사이트의 디자인 톤앤매너 100% 유지**
- 기존 색상 팔레트 그대로 사용:
  - 배경색: `#f5f1e8` (--color-body)
  - 브라운: `#8c683b` (--color-medium), `#402c1a` (--color-dark)
  - 라이트 브라운: `#bfb79f` (--color-light)
  - 텍스트: `#2a1a0f` (--color-text)
  - 화이트: `#ffffff`
- 기존 폰트 패밀리 유지:
  - 본문: `"Nanum Gothic", "Malgun Gothic", sans-serif`
  - 헤딩: `"Playfair Display", "Nanum Gothic", serif`
- 전문 심리검사 기관의 신뢰감 있는 고급스러운 분위기 유지
- 기존 사이트와 완전히 일체감 있게 제작 (이질감 제로)

### 디자인 레퍼런스
- 삼성전자 글로벌 사이트의 메가 메뉴 구조
- 카카오 기업 사이트의 미니멀 네비게이션
- 토스(Toss) 앱의 깔끔한 UI 패턴
- Apple 공식 사이트의 드롭다운 메뉴 애니메이션

---

## 【로고 영역】

### 위치 및 레이아웃
- **왼쪽 상단 고정 배치**
- 클릭 시 `index.html` (홈페이지)로 이동
- 삼성, 카카오 같은 대기업 수준의 미니멀하고 세련된 느낌

### 디자인 상세
- **메인 텍스트**: "BALANCE.CO" 
  - 폰트: `Nanum Gothic`, `font-weight: 800`, `font-size: 1.3rem`
  - 색상: `#402c1a` (--color-dark)
  - 자간: `letter-spacing: 0.04em`
- **서브 텍스트**: "Psychological Test Lab"
  - 폰트: `Nanum Gothic`, `font-weight: 600`, `font-size: 0.85rem`
  - 색상: `#8c683b` (--color-medium)
  - 자간: `letter-spacing: 0.08em`
- **아이콘**: 원형 배경에 "B" 문자
  - 크기: `width: 42px`, `height: 42px`
  - 배경: `#8c683b` (--color-medium) 또는 그라디언트
  - 텍스트: 화이트, `font-size: 1.4rem`, `font-weight: 800`
  - 그림자: `box-shadow: 0 4px 12px rgba(64, 44, 26, 0.2)`

### 기존 CSS 변수 활용
- 로고 스타일은 `assets/css/style.css`의 `.logo`, `.logo__icon`, `.logo__text` 클래스를 참고하여 확장

---

## 【메뉴 구조】

### 좌측 기본 메뉴 (순서대로)
1. **소개** → `index.html#hero`
2. **테스트** → `index.html#tests`
3. **특징** → `index.html#features`
4. **FAQ** → `index.html#faq`
5. **문의** → `index.html#contact`

### 우측 카테고리 메뉴 (드롭다운)

#### ■ 대인관계 (드롭다운)
- **ECR 성인애착유형 테스트**
  - 영문명: "Endless Character Review"
  - 설명: "관계 패턴과 애착 스타일을 다각도로 분석합니다"
  - 링크: `ecr.html`
  
- **러브 트라이앵글 테스트**
  - 영문명: "Love Triangle Test"
  - 설명: "사랑의 삼각이론 기반 친밀감·열정·헌신 관계 점검"
  - 링크: `love.html`

#### ■ 성격검사 (드롭다운)
- **나르시시스트 성향 테스트**
  - 설명: "건강한 자존감과 과도한 자기애를 구분합니다"
  - 링크: `narcissist.html`
  
- **리더십 유형 진단 테스트**
  - 설명: "나의 리더십 스타일과 강점을 파악합니다"
  - 링크: `leadership.html`
  
- **Simpl & Chill 테스트**
  - 설명: "일과 삶의 균형, 여가 활용 패턴을 점검합니다"
  - 링크: `simple.html`
  
- **에겐-테토 유형 테스트**
  - 설명: "감정 에너지 방향성과 상호작용 패턴을 분석합니다"
  - 링크: `egen.html`

### 메뉴 확장성
- 추후 새로운 테스트 상세페이지를 쉽게 추가할 수 있도록 메뉴 데이터를 구조화
- 각 카테고리의 하위 항목을 배열/객체로 분리하여 관리 용이하게 구성

---

## 【드롭다운 메뉴 디자인】

### 트리거 및 애니메이션
- **트리거**: 마우스 호버 시 자동으로 부드럽게 나타남
- **등장 애니메이션**: 
  - `opacity: 0 → 1` (200ms)
  - `translateY(-10px → 0)` 슬라이드업
  - `ease-out` 타이밍
- **퇴장 애니메이션**: 
  - 마우스 이탈 후 150ms 딜레이
  - `opacity: 1 → 0` (150ms)
  - 부드러운 페이드아웃

### 컨테이너 스타일
- **배경**: `#ffffff` (화이트)
- **그림자**: `0 10px 40px rgba(0, 0, 0, 0.1)` - 고급스러운 깊이감
- **모서리**: `border-radius: 12px` (--radius-sm)
- **너비**: 최소 320px, 최대 420px
- **패딩**: 상단 12px, 하단 12px
- **z-index**: 50 (상단 고정)

### 각 하위 메뉴 아이템 (카드 형태)

#### 레이아웃
- **좌측**: 컬러 원형 번호 배지 (10px × 10px)
  - 배경: `linear-gradient(to bottom right, #8c683b, #6b5230)`
  - 텍스트: 화이트, `font-weight: 800`, `font-size: 0.875rem`
  - 그림자: `box-shadow: 0 2px 8px rgba(64, 44, 26, 0.25)`
  
- **우측**: 텍스트 영역
  - 제목: `font-size: 1rem`, `font-weight: 600`, 색상 `#402c1a`
  - 영문명/부제: `font-size: 0.75rem`, `font-weight: 500`, 색상 `#8c683b`
  - 설명: `font-size: 0.8125rem`, 색상 `#6b5230`, 1줄 말줄임 (`text-overflow: ellipsis`)

#### 호버 효과
- 배경색: `#f5f1e8` (--color-body)로 변경
- 좌측 액센트 바: `width: 3px`, `background: #8c683b`, `opacity: 0 → 1`
- 그림자: 약간 강화 (`box-shadow: 0 4px 12px rgba(64, 44, 26, 0.12)`)

#### 간격 및 구분
- 패딩: `16px 20px`
- 아이템 간 구분선: `1px solid rgba(240, 240, 240, 0.8)` (마지막 아이템 제외)
- 아이템 간 간격: `8px`

### 드롭다운 하단 링크
- **"전체 보기 →"** 링크 추가
- 해당 카테고리 전체 목록 페이지로 이동 (`index.html#tests`)
- 스타일: 
  - 상단 보더: `border-top: 1px solid #F0F0F0`
  - 패딩: `12px 20px`
  - 텍스트: `#8c683b`, `font-weight: 600`, `font-size: 0.875rem`
  - 화살표 아이콘 포함

---

## 【인터랙션 & 애니메이션】

### 기본 메뉴 항목
- **호버 효과**: 
  - 텍스트 색상: `#402c1a` → `#8c683b` (200ms transition)
  - 하단 언더라인 애니메이션: `width: 0 → 100%` (200ms)
  - 배경색: 약간의 베이지 톤 (`rgba(191, 183, 159, 0.1)`)
  
- **클릭 피드백**: 
  - `scale(0.98)` 후 즉시 복귀 (100ms)
  
- **현재 페이지 표시**: 
  - 텍스트 색상: `#8c683b`
  - 하단 2px 액센트 바로 활성화 표시

### 드롭다운 메뉴
- **등장**: 
  - `opacity: 0 → 1` (200ms)
  - `translateY(-10px → 0)` (200ms ease-out)
  
- **퇴장**: 
  - 150ms 딜레이 후
  - `opacity: 1 → 0` (150ms)
  - `translateY(0 → -10px)` (150ms)

### 접근성
- `aria-label`, `aria-expanded`, `aria-haspopup` 속성 포함
- 키보드 네비게이션 지원 (Tab, Enter, Escape)
- 포커스 표시 명확하게

---

## 【반응형 디자인】

### Desktop (1024px 이상)
- 전체 메뉴 가로 배치
- 드롭다운 호버로 작동
- 로고 + 기본 메뉴 + 카테고리 메뉴 일렬 배치

### Tablet (768px ~ 1023px)
- 메뉴 간격 축소 (gap: 1rem)
- 드롭다운 유지
- 폰트 크기 약간 축소

### Mobile (767px 이하)
- **햄버거 메뉴 아이콘** (우측 상단)
  - 3개 바 형태
  - 색상: `#402c1a`
  - 크기: 24px × 24px
- **전체화면 또는 슬라이드 메뉴**
  - 우측에서 슬라이드 인
  - 배경: 화이트
  - 그림자: 강한 그림자
  - 너비: 최대 85vw, 최대 320px
- **아코디언 형태의 카테고리**
  - 대인관계/성격검사는 클릭 시 펼침
  - 하위 메뉴는 슬라이드 다운 애니메이션
- **부드러운 슬라이드 애니메이션** (300ms ease-in-out)

---

## 【기술 스택 및 구현 방식】

### 사용 기술
- **HTML5** 시맨틱 마크업
- **CSS3** (기존 `assets/css/style.css`에 추가)
  - CSS 변수 활용 (기존 `:root` 변수 사용)
  - Flexbox/Grid 레이아웃
  - CSS transitions/animations
- **Vanilla JavaScript** (기존 `assets/js/main.js`에 추가 또는 별도 파일)
  - 드롭다운 열림/닫힘 상태 관리
  - 모바일 메뉴 토글
  - 현재 페이지 하이라이트

### 파일 구조
```
assets/
├── css/
│   └── style.css (헤더 스타일 추가)
└── js/
    └── main.js (헤더 스크립트 추가 또는 header.js 생성)
```

### 클래스 네이밍 규칙
- 기존 BEM 스타일 유지 (`.site-header`, `.header__logo` 등)
- 또는 현대적인 네이밍 (`.nav`, `.nav-item`, `.dropdown` 등)

---

## 【구현 요구사항】

### HTML 구조 예시
```html
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="index.html">
      <span class="logo__icon">B</span>
      <div class="logo__text-group">
        <span class="logo__text-main">BALANCE.CO</span>
        <span class="logo__text-sub">Psychological Test Lab</span>
      </div>
    </a>
    
    <nav class="main-nav" aria-label="주요 메뉴">
      <ul class="main-nav__list">
        <!-- 기본 메뉴 항목들 -->
      </ul>
      
      <!-- 드롭다운 카테고리 메뉴들 -->
    </nav>
    
    <!-- 모바일 햄버거 버튼 -->
    <button class="mobile-menu-toggle" aria-label="메뉴 열기">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>
```

### JavaScript 기능
1. 드롭다운 열림/닫힘 (마우스 이벤트)
2. 모바일 메뉴 토글 (클릭 이벤트)
3. 현재 페이지 하이라이트 (URL 기반)
4. 스크롤 시 헤더 배경 변경 (선택사항)
5. 키보드 네비게이션 지원

### CSS 우선순위
- 기존 스타일과 충돌하지 않도록 주의
- 기존 변수와 클래스를 최대한 활용
- 새로운 스타일은 기존 디자인과 자연스럽게 통합

---

## 【체크리스트】

### 디자인
- [ ] 기존 색상 팔레트 100% 유지
- [ ] 기존 폰트 패밀리 유지
- [ ] 기존 그림자 스타일 유지
- [ ] 대기업 수준의 미니멀하고 고급스러운 디자인
- [ ] 신뢰감 있는 전문가적 분위기

### 기능
- [ ] 모든 메뉴 링크 정상 작동
- [ ] 드롭다운 호버/클릭 정상 작동
- [ ] 모바일 햄버거 메뉴 정상 작동
- [ ] 현재 페이지 하이라이트
- [ ] 키보드 접근성 지원

### 반응형
- [ ] Desktop (1024px+) 레이아웃
- [ ] Tablet (768px~1023px) 레이아웃
- [ ] Mobile (767px 이하) 레이아웃
- [ ] 모든 디바이스에서 부드러운 애니메이션

### 성능
- [ ] 빠른 로딩
- [ ] 부드러운 애니메이션 (60fps)
- [ ] 메모리 누수 없음

---

## 【특별 지시사항】

1. **기존 코드와의 통합**
   - `index.html`의 `<body>` 태그 바로 다음에 헤더 추가
   - 다른 HTML 파일들에도 동일하게 적용
   - 기존 `assets/css/style.css`에 스타일 추가
   - 기존 `assets/js/main.js`에 스크립트 추가하거나 `assets/js/header.js` 생성

2. **메뉴 데이터 구조화**
   - 메뉴 구조를 JavaScript 객체/배열로 관리
   - 추후 새로운 테스트 추가 시 쉽게 확장 가능하도록 구성

3. **접근성**
   - ARIA 속성 적절히 사용
   - 키보드 네비게이션 완벽 지원
   - 스크린 리더 친화적

4. **브라우저 호환성**
   - 최신 브라우저 (Chrome, Firefox, Safari, Edge) 지원
   - 모바일 브라우저 (iOS Safari, Chrome Mobile) 지원

5. **코드 품질**
   - 깔끔하고 주석이 잘 달린 코드
   - 의미 있는 클래스명
   - 재사용 가능한 컴포넌트 구조

---

**위의 모든 요구사항을 만족하는 완벽한 상단 네비게이션 헤더를 제작해주세요. 기존 사이트와 완전히 어울리면서도 사용자 경험을 향상시키는 세련된 디자인을 만들어주시길 바랍니다.**

