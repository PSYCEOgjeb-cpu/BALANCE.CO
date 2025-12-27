# 사주팔자 학습 서비스 기획서

## 🎯 서비스 컨셉

**"사주팔자를 배우며 이해하는 교육형 분석 서비스"**

- 단순한 결과 제공이 아닌 **학습 과정**을 통한 이해
- 사용자가 **직접 해석할 수 있는 능력** 배양
- **전통 문화 교육**과 **개인 분석**의 결합

## 📖 학습 단계 설계

### 🟢 1단계: 기초 개념 (초심자)

#### 1.1 사주팔자란?
```javascript
const basicConcepts = {
    "사주팔자": {
        definition: "출생 연월일시를 천간지지로 표현한 8글자",
        components: ["년주", "월주", "일주", "시주"],
        purpose: "개인의 타고난 성격과 운명 파악"
    },
    "천간": {
        definition: "하늘의 기운을 나타내는 10가지",
        list: ["갑을병정무기경신임계"],
        meaning: "양의 기운, 드러나는 성향"
    },
    "지지": {
        definition: "땅의 기운을 나타내는 12가지", 
        list: ["자축인묘진사오미신유술해"],
        meaning: "음의 기운, 숨겨진 본성"
    }
};
```

#### 1.2 오행 이해하기
```html
<div class="five-elements-learning">
    <h3>오행(五行) 배우기</h3>
    <div class="element-grid">
        <div class="element-card wood">
            <h4>목(木) - 나무</h4>
            <p>성장, 발전, 창조력</p>
            <div class="characteristics">
                <span>봄</span><span>동쪽</span><span>청색</span>
            </div>
            <div class="interactive-quiz">
                <p>다음 중 목의 성격은?</p>
                <button class="quiz-option correct">유연하고 성장지향적</button>
                <button class="quiz-option">단단하고 변화 없음</button>
            </div>
        </div>
        <!-- 화토금수 카드들 -->
    </div>
</div>
```

### 🟡 2단계: 실전 해석 (중급자)

#### 2.1 사주 읽는 법
```javascript
const interpretationSteps = [
    {
        step: 1,
        title: "일간(日干) 찾기",
        description: "자신의 핵심 성격을 나타내는 일간을 파악",
        practice: "생년월일을 입력해 일간을 확인해보세요",
        example: "1990년 5월 15일 → 정화(丁火) 일간"
    },
    {
        step: 2, 
        title: "월령(月令) 보기",
        description: "태어난 계절의 영향력 파악",
        practice: "월령에 따른 일간의 강약 판단",
        example: "5월생 정화 → 건왕(强旺), 기운이 강함"
    },
    {
        step: 3,
        title: "용신(用神) 찾기", 
        description: "사주의 균형을 맞춰주는 핵심 오행",
        practice: "강한 일간에게 필요한 것은?",
        example: "강한 정화 → 토(土)로 설기, 수(水)로 제화"
    }
];
```

#### 2.2 십신(十神) 체계
```html
<div class="ten-gods-learning">
    <h3>십신으로 인간관계 읽기</h3>
    <div class="ten-gods-wheel">
        <div class="god-section self">
            <h4>나를 나타내는 십신</h4>
            <div class="god-card">
                <h5>비견(比肩)</h5>
                <p>형제, 동료, 라이벌</p>
                <div class="real-example">
                    <strong>실생활 예:</strong>
                    <p>비견이 많으면 → 독립적, 경쟁 의식 강함</p>
                </div>
            </div>
            <div class="god-card">
                <h5>겁재(劫財)</h5>
                <p>경쟁자, 손실, 투쟁</p>
            </div>
        </div>
        <!-- 다른 십신들 -->
    </div>
    
    <div class="practice-section">
        <h4>🧩 십신 실습하기</h4>
        <p>당신의 사주에서 십신을 직접 찾아보세요!</p>
        <div class="saju-practice-board">
            <!-- 사용자 사주 표시 -->
            <div class="pillar-practice">
                <div class="stem">정</div>
                <div class="branch">사</div>
                <div class="ten-god-input">
                    <input type="text" placeholder="십신 입력">
                    <button onclick="checkAnswer('편인')">확인</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 🔴 3단계: 고급 분석 (상급자)

#### 3.1 격국(格局) 판단
```javascript
const formationLearning = {
    concept: "사주의 전체적인 구조와 패턴",
    types: {
        "정관격": {
            condition: "월령에 정관이 있고 투간된 경우",
            characteristics: "안정적, 책임감, 관직운",
            careerPath: ["공무원", "관리직", "교육자"],
            lifePattern: "꾸준한 상승, 사회적 인정"
        },
        "정재격": {
            condition: "월령에 정재가 있고 투간된 경우", 
            characteristics: "실무적, 경영능력, 재물운",
            careerPath: ["사업가", "금융업", "부동산"],
            lifePattern: "점진적 축적, 실속 추구"
        }
    },
    practiceMethod: "자신의 사주로 격국 찾기 실습"
};
```

#### 3.2 신살(神殺) 해석
```html
<div class="spiritual-stars-learning">
    <h3>신살로 특별한 운세 보기</h3>
    <div class="star-categories">
        <div class="lucky-stars">
            <h4>🌟 길신(吉神)</h4>
            <div class="star-card">
                <h5>천을귀인(天乙貴人)</h5>
                <p><strong>의미:</strong> 귀인의 도움, 위기 탈출</p>
                <p><strong>계산법:</strong> 일간에 따라 특정 지지에 위치</p>
                <div class="calculation-demo">
                    <p>갑일간 → 축, 미에 천을귀인</p>
                    <button onclick="showCalculation('천을귀인')">계산해보기</button>
                </div>
            </div>
        </div>
        
        <div class="challenging-stars">
            <h4>⚠️ 흉신(凶神)</h4>
            <div class="star-card">
                <h5>공망(空亡)</h5>
                <p><strong>의미:</strong> 허무, 변화, 정신적 추구</p>
                <p><strong>해석:</strong> 무조건 나쁜 것이 아님</p>
            </div>
        </div>
    </div>
</div>
```

## 🎮 인터랙티브 학습 기능

### 📝 퀴즈 시스템
```html
<div class="saju-quiz">
    <h3>🧠 사주 실력 테스트</h3>
    <div class="quiz-progress">
        <div class="progress-bar" style="width: 60%"></div>
        <span>6/10 문제</span>
    </div>
    
    <div class="quiz-question">
        <h4>다음 사주의 일간은?</h4>
        <div class="saju-example">
            <div class="pillar">戊<br>申</div>
            <div class="pillar">甲<br>寅</div>
            <div class="pillar">?<br>?</div>
            <div class="pillar">丙<br>午</div>
        </div>
        <div class="quiz-options">
            <button class="option">갑목</button>
            <button class="option correct">일간 찾는 방법 모르겠어요</button>
            <button class="option">정화</button>
        </div>
    </div>
    
    <div class="explanation hidden">
        <h5>💡 해설</h5>
        <p>일간은 일주의 천간입니다. 세 번째 기둥의 위쪽이 일간이에요.</p>
        <a href="#day-stem-lesson">일간 찾는 법 다시 배우기</a>
    </div>
</div>
```

### 🔍 단계적 분석 도구
```javascript
const stepByStepAnalysis = {
    userSaju: "무신 갑인 정미 신해",
    analysisSteps: [
        {
            step: 1,
            title: "1단계: 일간 확인",
            content: "당신의 일간은 '정화(丁火)'입니다",
            userAction: "정화의 특성을 확인해보세요",
            completed: false
        },
        {
            step: 2, 
            title: "2단계: 계절 확인",
            content: "인월(寅月) 태생으로 봄 기운입니다",
            userAction: "봄에 태어난 정화의 특성은?",
            completed: false
        },
        {
            step: 3,
            title: "3단계: 오행 분석",
            content: "목화토금수 비율을 확인해보세요",
            userAction: "어떤 오행이 부족한가요?",
            completed: false
        }
    ]
};
```

## 📱 UI/UX 설계

### 🎨 학습 친화적 디자인
```css
:root {
    /* 학습용 색상 팔레트 */
    --primary-blue: #1e40af;    /* 신뢰감, 학습 */
    --success-green: #059669;   /* 정답, 진전 */
    --warning-orange: #d97706;  /* 주의, 복습 */
    --info-purple: #7c3aed;     /* 팁, 보너스 */
    
    /* 오행 교육용 색상 */
    --wood-learn: #16a34a;
    --fire-learn: #dc2626; 
    --earth-learn: #ca8a04;
    --metal-learn: #6b7280;
    --water-learn: #2563eb;
}

.learning-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-left: 4px solid var(--primary-blue);
    margin-bottom: 20px;
}

.progress-indicator {
    background: linear-gradient(90deg, var(--success-green) var(--progress, 0%), #e5e7eb 0%);
    height: 8px;
    border-radius: 4px;
}
```

### 📚 학습 경로 내비게이션
```html
<div class="learning-path">
    <div class="path-header">
        <h2>🎓 사주 마스터 되기</h2>
        <div class="overall-progress">
            <span>전체 진도: 45% (9/20 단원)</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 45%"></div>
            </div>
        </div>
    </div>
    
    <div class="learning-chapters">
        <div class="chapter completed">
            <div class="chapter-icon">✅</div>
            <div class="chapter-info">
                <h3>1장. 사주의 기본 개념</h3>
                <p>천간지지, 오행, 음양</p>
                <span class="duration">30분 소요</span>
            </div>
        </div>
        
        <div class="chapter current">
            <div class="chapter-icon">📖</div>
            <div class="chapter-info">
                <h3>2장. 십신 체계 이해</h3>
                <p>10개 십신의 의미와 활용</p>
                <span class="duration">45분 소요</span>
            </div>
            <div class="chapter-progress">60% 완료</div>
        </div>
        
        <div class="chapter locked">
            <div class="chapter-icon">🔒</div>
            <div class="chapter-info">
                <h3>3장. 격국 판단법</h3>
                <p>사주의 전체 구조 파악</p>
                <span class="unlock-condition">2장 완료 후 해금</span>
            </div>
        </div>
    </div>
</div>
```

## 🎯 구현 우선순위

### 🥇 1단계 (MVP - 2주)
1. **기초 개념 학습 모듈**
   - 천간지지 설명
   - 오행 기본 개념
   - 간단한 퀴즈

2. **자신의 사주 확인**
   - 생년월일시 입력
   - 사주팔자 출력
   - 기본 해석 제공

3. **학습 진도 관리**
   - 단계별 학습 체크
   - 진도율 표시

### 🥈 2단계 (확장 - 4주)
1. **십신 학습 시스템**
2. **실전 해석 연습**
3. **퀴즈 및 테스트**

### 🥉 3단계 (고도화 - 6주)
1. **격국 분석**
2. **신살 해석** 
3. **커뮤니티 기능**

## 💡 혁신적 기능 아이디어

### 🎮 게이미피케이션
```javascript
const achievements = {
    "사주 입문자": {
        condition: "기초 과정 완료",
        reward: "입문자 배지",
        points: 100
    },
    "십신 마스터": {
        condition: "십신 퀴즈 90점 이상", 
        reward: "십신 마스터 타이틀",
        points: 500
    },
    "연속 학습": {
        condition: "7일 연속 학습",
        reward: "학습왕 배지",
        points: 300
    }
};
```

### 📊 개인 맞춤 학습
```javascript
const personalizedLearning = {
    weakPoints: ["십신 구분", "오행 상생상극"],
    recommendedPath: [
        "십신 기초 복습",
        "실전 십신 연습", 
        "오행 관계 집중 학습"
    ],
    studyTime: "하루 15분 권장",
    nextGoal: "이번 주 목표: 격국 기초 이해"
};
```

## 🎯 기대 효과

### 📈 사용자 측면
- **깊은 이해**: 단순 결과 → 원리 파악
- **실용성**: 스스로 해석 가능
- **흥미**: 게임처럼 재미있는 학습

### 🏆 서비스 차별화
- **교육 플랫폼 포지셔닝**: 단순 사주앱과 차별화
- **전문성**: 제대로 된 사주학 교육
- **참여도**: 능동적 학습으로 재방문율 증가

### 💰 수익화 방향
- **프리미엄 학습 콘텐츠**: 고급 과정 유료화
- **개인 맞춤 코칭**: 1:1 학습 지도
- **자격증 연계**: 사주 상담사 과정

이 방향이 정말 좋다고 생각합니다! 사용자가 이해하고 배우면서 자연스럽게 우리 서비스의 가치를 느끼게 될 것 같아요.