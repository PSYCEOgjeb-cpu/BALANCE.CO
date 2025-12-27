// 2단계 핵심 해석 도구 모듈 JavaScript

// 십신 데이터
const tenGodsData = {
    // 십신별 상세 정보
    gods: {
        bijeon: {
            name: '비견(比肩)',
            symbol: '比',
            group: 'self-group',
            relation: '같은 오행, 같은 음양',
            meaning: '자아, 독립심, 형제, 동업자',
            characteristics: [
                '강한 자아 의식과 독립심',
                '형제자매나 동업자와의 관계',
                '경쟁 의식이 강함',
                '자기 주장이 뚜렷함'
            ],
            career: ['독립사업', '프리랜서', '동업'],
            keywords: ['독립', '경쟁', '형제', '자존심']
        },
        geopjae: {
            name: '겁재(劫財)',
            symbol: '劫',
            group: 'self-group', 
            relation: '같은 오행, 다른 음양',
            meaning: '경쟁, 변화, 모험, 투쟁',
            characteristics: [
                '변화를 추구하는 성향',
                '모험적이고 도전적',
                '재물 손실 가능성',
                '급작스런 변화'
            ],
            career: ['투자', '투기', '모험사업'],
            keywords: ['변화', '모험', '손실', '도전']
        },
        siksin: {
            name: '식신(食神)',
            symbol: '食',
            group: 'expression-group',
            relation: '일간이 생, 같은 음양',
            meaning: '창의, 안정, 자녀, 여유',
            characteristics: [
                '창의적이고 예술적 감각',
                '평화롭고 안정적인 성격',
                '자녀와 인연이 깊음',
                '여유로운 생활 추구'
            ],
            career: ['예술가', '요리사', '교육자'],
            keywords: ['창의', '안정', '자녀', '여유']
        },
        sanggwan: {
            name: '상관(傷官)',
            symbol: '傷',
            group: 'expression-group',
            relation: '일간이 생, 다른 음양',
            meaning: '재능, 반항, 혁신, 표현',
            characteristics: [
                '뛰어난 재능과 표현력',
                '기존 질서에 반항적',
                '혁신적이고 창의적',
                '감정 표현이 풍부'
            ],
            career: ['작가', '연예인', '발명가'],
            keywords: ['재능', '반항', '혁신', '표현']
        },
        jeongjae: {
            name: '정재(正財)',
            symbol: '財',
            group: 'wealth-group',
            relation: '일간이 극, 다른 음양',
            meaning: '안정재물, 아내, 신중함',
            characteristics: [
                '안정적인 재물 관리',
                '신중하고 계획적',
                '아내와의 인연',
                '정직한 방법으로 재물 추구'
            ],
            career: ['회계사', '은행원', '공무원'],
            keywords: ['안정재물', '아내', '신중', '정직']
        },
        pyeonjae: {
            name: '편재(偏財)',
            symbol: '才',
            group: 'wealth-group',
            relation: '일간이 극, 같은 음양',
            meaning: '유동재물, 사교성, 활동력',
            characteristics: [
                '유동적인 재물 운용',
                '사교적이고 활동적',
                '사업 수완이 뛰어남',
                '여성과의 인연이 많음'
            ],
            career: ['사업가', '영업직', '무역업'],
            keywords: ['유동재물', '사교성', '활동력', '사업']
        },
        jeonggwan: {
            name: '정관(正官)',
            symbol: '官',
            group: 'authority-group',
            relation: '일간을 극, 다른 음양',
            meaning: '품위, 명예, 남편, 관직',
            characteristics: [
                '품위있고 명예로움',
                '책임감이 강함',
                '남편과의 인연',
                '관직이나 공직에 적합'
            ],
            career: ['공무원', '교사', '관리직'],
            keywords: ['품위', '명예', '남편', '책임']
        },
        pyeongwan: {
            name: '편관(偏官)',
            symbol: '殺',
            group: 'authority-group',
            relation: '일간을 극, 같은 음양',
            meaning: '권위, 도전, 압력, 칠살',
            characteristics: [
                '강한 권위 의식',
                '도전적이고 적극적',
                '압박감을 받기 쉬움',
                '무술이나 군직에 적합'
            ],
            career: ['군인', '경찰', '무술인'],
            keywords: ['권위', '도전', '압력', '칠살']
        },
        jeongin: {
            name: '정인(正印)',
            symbol: '印',
            group: 'support-group',
            relation: '일간을 생, 다른 음양',
            meaning: '학문, 어머니, 보호, 명예',
            characteristics: [
                '학문을 좋아함',
                '어머니와의 깊은 인연',
                '보호받는 환경',
                '명예와 지위 추구'
            ],
            career: ['학자', '연구원', '의사'],
            keywords: ['학문', '어머니', '보호', '명예']
        },
        pyeongin: {
            name: '편인(偏印)',
            symbol: '梟',
            group: 'support-group',
            relation: '일간을 생, 같은 음양',
            meaning: '직관, 신비, 특수학문, 효신',
            characteristics: [
                '뛰어난 직감력',
                '신비한 것에 관심',
                '특수 분야의 학문',
                '독특한 사고방식'
            ],
            career: ['점술가', '종교인', '예술가'],
            keywords: ['직관', '신비', '특수학문', '효신']
        }
    },

    // 천간별 십신 도출표
    derivationTable: {
        갑: {
            갑: 'bijeon', 을: 'geopjae', 병: 'siksin', 정: 'sanggwan', 무: 'pyeonjae', 
            기: 'jeongjae', 경: 'pyeongwan', 신: 'jeonggwan', 임: 'pyeongin', 계: 'jeongin'
        },
        을: {
            갑: 'geopjae', 을: 'bijeon', 병: 'sanggwan', 정: 'siksin', 무: 'jeongjae',
            기: 'pyeonjae', 경: 'jeonggwan', 신: 'pyeongwan', 임: 'jeongin', 계: 'pyeongin'
        },
        병: {
            갑: 'pyeongin', 을: 'jeongin', 병: 'bijeon', 정: 'geopjae', 무: 'siksin',
            기: 'sanggwan', 경: 'pyeonjae', 신: 'jeongjae', 임: 'pyeongwan', 계: 'jeonggwan'
        },
        정: {
            갑: 'jeongin', 을: 'pyeongin', 병: 'geopjae', 정: 'bijeon', 무: 'sanggwan',
            기: 'siksin', 경: 'jeongjae', 신: 'pyeonjae', 임: 'jeonggwan', 계: 'pyeongwan'
        },
        무: {
            갑: 'pyeongwan', 을: 'jeonggwan', 병: 'pyeongin', 정: 'jeongin', 무: 'bijeon',
            기: 'geopjae', 경: 'siksin', 신: 'sanggwan', 임: 'pyeonjae', 계: 'jeongjae'
        },
        기: {
            갑: 'jeonggwan', 을: 'pyeongwan', 병: 'jeongin', 정: 'pyeongin', 무: 'geopjae',
            기: 'bijeon', 경: 'sanggwan', 신: 'siksin', 임: 'jeongjae', 계: 'pyeonjae'
        },
        경: {
            갑: 'pyeonjae', 을: 'jeongjae', 병: 'pyeongwan', 정: 'jeonggwan', 무: 'pyeongin',
            기: 'jeongin', 경: 'bijeon', 신: 'geopjae', 임: 'siksin', 계: 'sanggwan'
        },
        신: {
            갑: 'jeongjae', 을: 'pyeonjae', 병: 'jeonggwan', 정: 'pyeongwan', 무: 'jeongin',
            기: 'pyeongin', 경: 'geopjae', 신: 'bijeon', 임: 'sanggwan', 계: 'siksin'
        },
        임: {
            갑: 'siksin', 을: 'sanggwan', 병: 'pyeonjae', 정: 'jeongjae', 무: 'pyeongwan',
            기: 'jeonggwan', 경: 'pyeongin', 신: 'jeongin', 임: 'bijeon', 계: 'geopjae'
        },
        계: {
            갑: 'sanggwan', 을: 'siksin', 병: 'jeongjae', 정: 'pyeonjae', 무: 'jeonggwan',
            기: 'pyeongwan', 경: 'jeongin', 신: 'pyeongin', 임: 'geopjae', 계: 'bijeon'
        }
    }
};

// 합충형파해 데이터
const interactionsData = {
    // 천간합
    cheonganHap: {
        갑기: { result: '토', name: '갑기합토', nature: '중정한 결합', effect: '신뢰와 협력' },
        을경: { result: '금', name: '을경합금', nature: '의로운 결합', effect: '정의로운 관계' },
        병신: { result: '수', name: '병신합수', nature: '위엄있는 결합', effect: '권위와 조화' },
        정임: { result: '목', name: '정임합목', nature: '음란한 결합', effect: '감정적 끌림' },
        무계: { result: '화', name: '무계합화', nature: '무정한 결합', effect: '차가운 관계' }
    },

    // 지지합
    samhap: {
        신자진: { result: '수국', element: 'water', meaning: '지혜와 유연함' },
        사유축: { result: '금국', element: 'metal', meaning: '정확함과 결단' },
        인오술: { result: '화국', element: 'fire', meaning: '열정과 활동' },
        해묘미: { result: '목국', element: 'wood', meaning: '성장과 발전' }
    },

    yukhap: ['자축', '인해', '묘술', '진유', '사신', '오미'],

    // 충
    chung: {
        자오: { elements: ['수', '화'], meaning: '물과 불의 대립', effect: '급변, 이동' },
        축미: { elements: ['토', '토'], meaning: '습토와 조토의 충돌', effect: '변화, 개방' },
        인신: { elements: ['목', '금'], meaning: '나무와 금속의 대결', effect: '충돌, 상극' },
        묘유: { elements: ['목', '금'], meaning: '동서 방향의 충돌', effect: '방향 전환' },
        진술: { elements: ['토', '토'], meaning: '저장고의 개방', effect: '숨겨진 것 드러남' },
        사해: { elements: ['화', '수'], meaning: '화수 미제', effect: '갈등, 분리' }
    }
};

// 퀴즈 데이터
const level2Quiz = [
    {
        question: "갑목 일간에게 병화는 어떤 십신인가요?",
        options: ["비견", "식신", "상관", "정재"],
        correct: 1,
        explanation: "갑목(양) + 병화(양): 목생화 + 같은 음양 = 식신입니다. 식신은 창의와 안정을 상징합니다."
    },
    {
        question: "'갑기합토'에서 갑목과 기토가 합쳐지면 어떤 성질로 변화하나요?",
        options: ["목의 성질", "토의 성질", "금의 성질", "원래 성질 유지"],
        correct: 1,
        explanation: "천간합에서는 두 글자가 합쳐져 새로운 오행으로 변화합니다. 갑기합토는 토의 성질로 변화합니다."
    },
    {
        question: "자오충(子午沖)의 현실적 의미로 가장 적절한 것은?",
        options: ["안정적인 발전", "급작스러운 변화", "점진적 성장", "평온한 일상"],
        correct: 1,
        explanation: "충(沖)은 갈등과 변화를 의미하며, 특히 자오충은 급작스러운 변화나 이동을 나타냅니다."
    },
    {
        question: "정관(正官)의 특성으로 가장 적절한 것은?",
        options: ["반항적이고 혁신적", "품위있고 책임감 강함", "창의적이고 자유로움", "모험적이고 도전적"],
        correct: 1,
        explanation: "정관은 품위, 명예, 책임감을 상징하며, 관직이나 공직에 적합한 성격을 나타냅니다."
    },
    {
        question: "삼합(三合) 중 '인오술'은 어떤 국(局)을 이루나요?",
        options: ["수국", "목국", "화국", "금국"],
        correct: 2,
        explanation: "인오술 삼합은 화국(火局)을 이루며, 열정과 활동력을 상징합니다."
    }
];

// 학습 상태
let learningState = {
    currentSection: 'ten-gods',
    completedSections: new Set(),
    currentStem: '갑',
    selectedGod: null,
    quizCurrentIndex: 0,
    quizScore: 0,
    notes: ''
};

// DOM 요소
const elements = {
    progressBar: document.getElementById('overallProgress'),
    progressText: document.getElementById('progressText'),
    navButtons: document.querySelectorAll('.nav-btn'),
    sections: document.querySelectorAll('.lesson-section'),
    centerSelf: document.getElementById('centerSelf'),
    stemButtons: document.querySelectorAll('.stem-btn'),
    godCards: document.querySelectorAll('.god-card'),
    godDetails: document.getElementById('godDetails'),
    selectedGodTitle: document.getElementById('selectedGodTitle'),
    detailsContent: document.getElementById('detailsContent'),
    completeButtons: document.querySelectorAll('.complete-btn'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    notesToggle: document.getElementById('notesToggle'),
    learningNotes: document.getElementById('learningNotes'),
    closeNotes: document.getElementById('closeNotes'),
    saveNotes: document.getElementById('saveNotes'),
    notesText: document.getElementById('notesText')
};

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeLevel2Module();
    loadUserProgress();
    setupEventListeners();
    updateProgressDisplay();
});

// 모듈 초기화
function initializeLevel2Module() {
    console.log('🎯 2단계 핵심 해석 도구 모듈 시작');
    
    // 십신 원형 설정
    setupTenGodsWheel();
    
    // 합충형파해 인터랙티브 설정
    setupInteractions();
    
    // 실습 모듈 설정
    setupPracticeModule();
    
    // 퀴즈 생성
    generateLevel2Quiz();
    
    // 초기 십신 업데이트
    updateTenGodsForStem('갑');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 네비게이션
    elements.navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => switchSection(e.target.dataset.section));
    });

    // 천간 버튼
    elements.stemButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const stem = e.target.dataset.stem;
            switchStem(stem);
        });
    });

    // 십신 카드
    elements.godCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const godKey = e.currentTarget.dataset.god;
            showGodDetails(godKey);
        });
    });

    // 완료 버튼
    elements.completeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.id.replace('Complete', '');
            completeSection(sectionId);
        });
    });

    // 탭 버튼
    elements.tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = e.target.dataset.tab;
            switchTab(tabId);
        });
    });

    // 학습 노트
    if (elements.notesToggle) {
        elements.notesToggle.addEventListener('click', toggleNotes);
    }
    if (elements.closeNotes) {
        elements.closeNotes.addEventListener('click', closeNotes);
    }
    if (elements.saveNotes) {
        elements.saveNotes.addEventListener('click', saveNotes);
    }
}

// 섹션 전환
function switchSection(sectionId) {
    // 네비게이션 업데이트
    elements.navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });

    // 섹션 표시
    elements.sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });

    learningState.currentSection = sectionId;
    
    // 특별한 초기화가 필요한 섹션
    if (sectionId === 'practice') {
        generatePracticeSaju();
    }
}

// 십신 원형 설정
function setupTenGodsWheel() {
    // 초기 중앙 표시
    updateCenterStem('甲');
}

// 천간 전환
function switchStem(stemKey) {
    // 버튼 상태 업데이트
    elements.stemButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.stem === stemKey) {
            btn.classList.add('active');
        }
    });

    // 십신 업데이트
    updateTenGodsForStem(stemKey);
    
    // 중앙 표시 업데이트
    const stemChar = getStemChar(stemKey);
    updateCenterStem(stemChar);
    
    learningState.currentStem = stemKey;
}

// 천간 한자 가져오기
function getStemChar(stemKey) {
    const stemMap = {
        갑: '甲', 을: '乙', 병: '丙', 정: '丁', 무: '戊',
        기: '己', 경: '庚', 신: '辛', 임: '壬', 계: '癸'
    };
    return stemMap[stemKey];
}

// 중앙 일간 업데이트
function updateCenterStem(stemChar) {
    const selfStem = elements.centerSelf.querySelector('.self-stem');
    if (selfStem) {
        selfStem.textContent = stemChar;
    }
}

// 특정 일간의 십신 업데이트
function updateTenGodsForStem(stemKey) {
    const derivations = tenGodsData.derivationTable[stemKey];
    
    elements.godCards.forEach(card => {
        const godKey = card.dataset.god;
        const godData = tenGodsData.gods[godKey];
        
        // 카드 내용 업데이트 (이미 HTML에 고정되어 있으므로 스킵)
        
        // 활성화 상태 리셋
        card.classList.remove('active');
    });
}

// 십신 상세 정보 표시
function showGodDetails(godKey) {
    const godData = tenGodsData.gods[godKey];
    if (!godData) return;

    // 카드 활성화
    elements.godCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.god === godKey) {
            card.classList.add('active');
        }
    });

    // 상세 정보 업데이트
    elements.selectedGodTitle.textContent = godData.name;
    
    const detailsHTML = `
        <div class="god-detail-content">
            <div class="god-relation">
                <h4>🔗 도출 관계</h4>
                <p>${godData.relation}</p>
            </div>
            
            <div class="god-meaning">
                <h4>💫 기본 의미</h4>
                <p>${godData.meaning}</p>
            </div>
            
            <div class="god-characteristics">
                <h4>🎭 성격 특성</h4>
                <ul>
                    ${godData.characteristics.map(char => `<li>${char}</li>`).join('')}
                </ul>
            </div>
            
            <div class="god-career">
                <h4>💼 적합한 직업</h4>
                <div class="career-tags">
                    ${godData.career.map(career => `<span class="career-tag">${career}</span>`).join('')}
                </div>
            </div>
            
            <div class="god-keywords">
                <h4>🔑 핵심 키워드</h4>
                <div class="keyword-tags">
                    ${godData.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    elements.detailsContent.innerHTML = detailsHTML;
    learningState.selectedGod = godKey;
}

// 합충형파해 인터랙티브 설정
function setupInteractions() {
    // 천간합 카드들에 이벤트 추가
    const combinationCards = document.querySelectorAll('.combination-card');
    combinationCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const combination = e.currentTarget.dataset.combination;
            showCombinationDetails(combination);
        });
    });

    // 충 카드들에 이벤트 추가
    const conflictPairs = document.querySelectorAll('.conflict-pair');
    conflictPairs.forEach(pair => {
        pair.addEventListener('click', (e) => {
            const conflictType = e.currentTarget.dataset.pair;
            showConflictDetails(conflictType);
        });
    });
}

// 탭 전환
function switchTab(tabId) {
    // 탭 버튼 업데이트
    elements.tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });

    // 탭 콘텐츠 업데이트
    elements.tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

// 천간합 상세 설명
function showCombinationDetails(combination) {
    const hapData = interactionsData.cheonganHap[combination];
    if (!hapData) return;

    alert(`${hapData.name}\n\n특성: ${hapData.nature}\n효과: ${hapData.effect}`);
}

// 충 상세 설명
function showConflictDetails(conflictType) {
    const chungData = interactionsData.chung[conflictType];
    if (!chungData) return;

    alert(`${conflictType}충\n\n의미: ${chungData.meaning}\n효과: ${chungData.effect}`);
}

// 실습 모듈 설정
function setupPracticeModule() {
    // 새로운 사주 생성 버튼
    const newPracticeBtn = document.getElementById('newPractice');
    if (newPracticeBtn) {
        newPracticeBtn.addEventListener('click', generatePracticeSaju);
    }

    // 정답 보기 버튼
    const showAnswersBtn = document.getElementById('showAnswers');
    if (showAnswersBtn) {
        showAnswersBtn.addEventListener('click', showPracticeAnswers);
    }

    // 옵션 버튼들
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            checkPracticeAnswer(e.target);
        });
    });
}

// 실습용 사주 생성
function generatePracticeSaju() {
    const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    // 랜덤 사주 생성
    const saju = {
        year: { stem: stems[Math.floor(Math.random() * 10)], branch: branches[Math.floor(Math.random() * 12)] },
        month: { stem: stems[Math.floor(Math.random() * 10)], branch: branches[Math.floor(Math.random() * 12)] },
        day: { stem: stems[Math.floor(Math.random() * 10)], branch: branches[Math.floor(Math.random() * 12)] },
        hour: { stem: stems[Math.floor(Math.random() * 10)], branch: branches[Math.floor(Math.random() * 12)] }
    };

    // DOM 업데이트
    document.getElementById('yearStem').textContent = saju.year.stem;
    document.getElementById('yearBranch').textContent = saju.year.branch;
    document.getElementById('monthStem').textContent = saju.month.stem;
    document.getElementById('monthBranch').textContent = saju.month.branch;
    document.getElementById('dayStem').textContent = saju.day.stem;
    document.getElementById('dayBranch').textContent = saju.day.branch;
    document.getElementById('hourStem').textContent = saju.hour.stem;
    document.getElementById('hourBranch').textContent = saju.hour.branch;

    // 질문 업데이트
    updatePracticeQuestion(saju);
    
    // 답안 초기화
    resetPracticeAnswers();
}

// 실습 질문 업데이트
function updatePracticeQuestion(saju) {
    const questionCard = document.querySelector('.question-card h4');
    if (questionCard) {
        questionCard.textContent = `월간 ${saju.month.stem}는 일간 ${saju.day.stem}에 대해 무엇인가요?`;
    }
}

// 실습 답안 체크
function checkPracticeAnswer(button) {
    const isCorrect = button.dataset.correct === 'true';
    const allButtons = document.querySelectorAll('.option-btn');
    
    // 모든 버튼 비활성화
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
        }
    });

    // 설명 표시
    const explanation = document.getElementById('explanation1');
    if (explanation) {
        explanation.classList.remove('hidden');
    }
}

// 실습 답안 초기화
function resetPracticeAnswers() {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
    });

    const explanation = document.getElementById('explanation1');
    if (explanation) {
        explanation.classList.add('hidden');
    }
}

// 실습 정답 보기
function showPracticeAnswers() {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        }
    });

    const explanation = document.getElementById('explanation1');
    if (explanation) {
        explanation.classList.remove('hidden');
    }
}

// 퀴즈 생성
function generateLevel2Quiz() {
    const quizContainer = document.getElementById('level2Quiz');
    if (!quizContainer) return;

    let quizHTML = `
        <div class="quiz-header">
            <h3>🧠 2단계 종합 퀴즈</h3>
            <div class="quiz-progress">
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" id="quizProgress"></div>
                </div>
                <span class="quiz-progress-text" id="quizProgressText">1/${level2Quiz.length}</span>
            </div>
        </div>
        
        <div class="quiz-content" id="quizContent">
            <!-- 퀴즈 문제들이 동적으로 생성됩니다 -->
        </div>
        
        <div class="quiz-controls">
            <button class="quiz-btn" id="prevQuiz" onclick="prevQuiz()">이전</button>
            <button class="quiz-btn primary" id="nextQuiz" onclick="nextQuiz()">다음</button>
            <button class="quiz-btn success hidden" id="finishQuiz" onclick="finishQuiz()">완료</button>
        </div>
        
        <div class="quiz-result hidden" id="quizResult">
            <!-- 결과 표시 -->
        </div>
    `;

    quizContainer.innerHTML = quizHTML;
    showQuizQuestion(0);
}

// 퀴즈 문제 표시
function showQuizQuestion(index) {
    if (index >= level2Quiz.length) {
        finishQuiz();
        return;
    }

    const quiz = level2Quiz[index];
    const quizContent = document.getElementById('quizContent');
    
    const questionHTML = `
        <div class="quiz-question">
            <h4>${quiz.question}</h4>
            <div class="quiz-options">
                ${quiz.options.map((option, i) => `
                    <button class="quiz-option" onclick="selectQuizOption(${i})" data-index="${i}">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-explanation hidden" id="quizExplanation">
                <p>${quiz.explanation}</p>
            </div>
        </div>
    `;

    quizContent.innerHTML = questionHTML;
    
    // 진도 업데이트
    updateQuizProgress(index + 1);
    
    // 컨트롤 버튼 상태
    updateQuizControls(index);
}

// 퀴즈 옵션 선택
function selectQuizOption(selectedIndex) {
    const quiz = level2Quiz[learningState.quizCurrentIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // 모든 옵션 비활성화
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === quiz.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== quiz.correct) {
            option.classList.add('incorrect');
        }
    });

    // 점수 업데이트
    if (selectedIndex === quiz.correct) {
        learningState.quizScore++;
    }

    // 설명 표시
    document.getElementById('quizExplanation').classList.remove('hidden');
}

// 다음 퀴즈
function nextQuiz() {
    learningState.quizCurrentIndex++;
    showQuizQuestion(learningState.quizCurrentIndex);
}

// 이전 퀴즈
function prevQuiz() {
    if (learningState.quizCurrentIndex > 0) {
        learningState.quizCurrentIndex--;
        showQuizQuestion(learningState.quizCurrentIndex);
    }
}

// 퀴즈 완료
function finishQuiz() {
    const percentage = Math.round((learningState.quizScore / level2Quiz.length) * 100);
    const quizContent = document.getElementById('quizContent');
    
    const resultHTML = `
        <div class="quiz-final-result">
            <h3>🎉 퀴즈 완료!</h3>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-number">${percentage}%</span>
                </div>
                <p>${learningState.quizScore}/${level2Quiz.length} 정답</p>
            </div>
            
            <div class="performance-feedback">
                ${getPerformanceFeedback(percentage)}
            </div>
            
            <button class="quiz-btn primary" onclick="retakeQuiz()">다시 풀기</button>
        </div>
    `;
    
    quizContent.innerHTML = resultHTML;
    document.querySelector('.quiz-controls').style.display = 'none';
    
    // 퀴즈 완료 처리
    completeSection('quiz');
}

// 성과 피드백
function getPerformanceFeedback(percentage) {
    if (percentage >= 90) {
        return '<div class="feedback excellent">🏆 훌륭합니다! 십신과 합충형파해를 완벽히 이해하셨네요.</div>';
    } else if (percentage >= 70) {
        return '<div class="feedback good">👍 잘하셨습니다! 핵심 개념을 잘 파악하고 계십니다.</div>';
    } else if (percentage >= 50) {
        return '<div class="feedback okay">📚 괜찮습니다. 복습을 통해 더 완벽하게 익혀보세요.</div>';
    } else {
        return '<div class="feedback needs-work">💪 더 학습이 필요합니다. 각 섹션을 다시 한번 살펴보세요.</div>';
    }
}

// 퀴즈 다시 풀기
function retakeQuiz() {
    learningState.quizCurrentIndex = 0;
    learningState.quizScore = 0;
    document.querySelector('.quiz-controls').style.display = 'block';
    showQuizQuestion(0);
}

// 퀴즈 진도 업데이트
function updateQuizProgress(current) {
    const progressFill = document.getElementById('quizProgress');
    const progressText = document.getElementById('quizProgressText');
    
    if (progressFill) {
        const percentage = (current / level2Quiz.length) * 100;
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${current}/${level2Quiz.length}`;
    }
}

// 퀴즈 컨트롤 업데이트
function updateQuizControls(index) {
    const prevBtn = document.getElementById('prevQuiz');
    const nextBtn = document.getElementById('nextQuiz');
    const finishBtn = document.getElementById('finishQuiz');
    
    if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    if (nextBtn) nextBtn.style.display = index === level2Quiz.length - 1 ? 'none' : 'inline-block';
    if (finishBtn) finishBtn.classList.toggle('hidden', index !== level2Quiz.length - 1);
}

// 섹션 완료
function completeSection(sectionName) {
    learningState.completedSections.add(sectionName);
    updateProgressDisplay();
    
    // 완료 시각적 피드백
    showCompletionFeedback(sectionName);
    
    // 진도 저장
    saveUserProgress();
}

// 완료 피드백 표시
function showCompletionFeedback(sectionName) {
    const sectionNames = {
        'tenGods': '십신',
        'interactions': '합충형파해',
        'practice': '실습',
        'quiz': '퀴즈'
    };
    
    const message = `🎉 ${sectionNames[sectionName]} 학습을 완료했습니다!`;
    
    // 간단한 토스트 메시지
    const toast = document.createElement('div');
    toast.className = 'completion-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 진도 표시 업데이트
function updateProgressDisplay() {
    const totalSections = 4;
    const completedCount = learningState.completedSections.size;
    const percentage = (completedCount / totalSections) * 100;
    
    elements.progressBar.style.width = percentage + '%';
    elements.progressText.textContent = `${Math.round(percentage)}% 완료`;
}

// 학습 노트 토글
function toggleNotes() {
    elements.learningNotes.classList.toggle('open');
}

// 노트 닫기
function closeNotes() {
    elements.learningNotes.classList.remove('open');
}

// 노트 저장
function saveNotes() {
    learningState.notes = elements.notesText.value;
    localStorage.setItem('level2-notes', learningState.notes);
    
    // 저장 피드백
    const saveBtn = elements.saveNotes;
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '저장됨 ✓';
    saveBtn.style.background = '#22c55e';
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
    }, 1500);
}

// 사용자 진도 로드
function loadUserProgress() {
    const saved = localStorage.getItem('level2-progress');
    if (saved) {
        const progress = JSON.parse(saved);
        learningState.completedSections = new Set(progress.completedSections);
    }
    
    const savedNotes = localStorage.getItem('level2-notes');
    if (savedNotes) {
        learningState.notes = savedNotes;
        elements.notesText.value = savedNotes;
    }
}

// 사용자 진도 저장
function saveUserProgress() {
    const progress = {
        completedSections: Array.from(learningState.completedSections),
        currentSection: learningState.currentSection
    };
    localStorage.setItem('level2-progress', JSON.stringify(progress));
}

// 페이지 언로드 시 진도 저장
window.addEventListener('beforeunload', saveUserProgress);

// CSS 스타일 추가
const additionalStyles = `
    .completion-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #22c55e;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .god-detail-content .career-tags,
    .god-detail-content .keyword-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .career-tag,
    .keyword-tag {
        background: #f3e8ff;
        color: #7c3aed;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .quiz-question {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        margin-bottom: 2rem;
    }
    
    .quiz-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .quiz-option {
        padding: 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quiz-option:hover {
        border-color: #7c3aed;
        background: #f3e8ff;
    }
    
    .quiz-option.correct {
        border-color: #22c55e;
        background: #dcfce7;
        color: #16a34a;
    }
    
    .quiz-option.incorrect {
        border-color: #ef4444;
        background: #fee2e2;
        color: #dc2626;
    }
    
    .quiz-explanation {
        background: #f0f9ff;
        border: 1px solid #0ea5e9;
        border-radius: 6px;
        padding: 1rem;
        margin-top: 1rem;
    }
    
    .quiz-controls {
        text-align: center;
        margin: 2rem 0;
    }
    
    .quiz-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        margin: 0 0.5rem;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .quiz-btn.primary {
        background: #7c3aed;
        color: white;
    }
    
    .quiz-btn.success {
        background: #22c55e;
        color: white;
    }
    
    .quiz-final-result {
        text-align: center;
        padding: 2rem;
        background: white;
        border-radius: 12px;
    }
    
    .score-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem auto;
    }
    
    .score-number {
        font-size: 2rem;
        font-weight: 700;
    }
`;

// 스타일 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);