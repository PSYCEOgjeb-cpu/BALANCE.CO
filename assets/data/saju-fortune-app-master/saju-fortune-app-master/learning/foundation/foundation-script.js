// 명리학 기초 학습 모듈 JavaScript

// 학습 데이터
const foundationData = {
    // 오행 데이터
    elements: {
        wood: {
            name: '목(木)',
            symbol: '木',
            season: '봄',
            direction: '동쪽',
            virtue: '인(仁)',
            emotion: '노(怒)',
            nature: '생장발전',
            color: '#16a34a'
        },
        fire: {
            name: '화(火)',
            symbol: '火',
            season: '여름',
            direction: '남쪽',
            virtue: '예(禮)',
            emotion: '희(喜)',
            nature: '번영완성',
            color: '#dc2626'
        },
        earth: {
            name: '토(土)',
            symbol: '土',
            season: '환절기',
            direction: '중앙',
            virtue: '신(信)',
            emotion: '사(思)',
            nature: '포용저장',
            color: '#ca8a04'
        },
        metal: {
            name: '금(金)',
            symbol: '金',
            season: '가을',
            direction: '서쪽',
            virtue: '의(義)',
            emotion: '우(憂)',
            nature: '수렴정리',
            color: '#6b7280'
        },
        water: {
            name: '수(水)',
            symbol: '水',
            season: '겨울',
            direction: '북쪽',
            virtue: '지(智)',
            emotion: '공(恐)',
            nature: '휴식반성',
            color: '#2563eb'
        }
    },

    // 상생상극 관계
    cycles: {
        generation: ['wood', 'fire', 'earth', 'metal', 'water'],
        control: ['wood', 'earth', 'water', 'fire', 'metal']
    },

    // 천간 데이터
    heavenlyStems: [
        { char: '甲', name: '갑', element: 'wood', polarity: 'yang', nature: '큰나무', traits: '정직, 원칙적' },
        { char: '乙', name: '을', element: 'wood', polarity: 'yin', nature: '작은나무', traits: '유연, 적응적' },
        { char: '丙', name: '병', element: 'fire', polarity: 'yang', nature: '태양', traits: '적극적, 열정적' },
        { char: '丁', name: '정', element: 'fire', polarity: 'yin', nature: '촛불', traits: '세밀, 정교' },
        { char: '戊', name: '무', element: 'earth', polarity: 'yang', nature: '산', traits: '안정적, 포용력' },
        { char: '己', name: '기', element: 'earth', polarity: 'yin', nature: '밭', traits: '실용적, 협조적' },
        { char: '庚', name: '경', element: 'metal', polarity: 'yang', nature: '쇠', traits: '강직, 결단력' },
        { char: '辛', name: '신', element: 'metal', polarity: 'yin', nature: '보석', traits: '세련, 예리' },
        { char: '壬', name: '임', element: 'water', polarity: 'yang', nature: '바다', traits: '포용적, 지혜' },
        { char: '癸', name: '계', element: 'water', polarity: 'yin', nature: '이슬', traits: '섬세, 직관적' }
    ],

    // 지지 데이터 (12개만 샘플)
    earthlyBranches: [
        { char: '子', name: '자', time: '23-01시', season: '겨울', animal: '쥐', meaning: '시작, 지혜' },
        { char: '丑', name: '축', time: '01-03시', season: '겨울말', animal: '소', meaning: '저장, 인내' },
        { char: '寅', name: '인', time: '03-05시', season: '봄시작', animal: '호랑이', meaning: '생동, 발전' },
        { char: '卯', name: '묘', time: '05-07시', season: '봄', animal: '토끼', meaning: '성장, 번영' },
        { char: '辰', name: '진', time: '07-09시', season: '봄말', animal: '용', meaning: '변화, 역동' },
        { char: '巳', name: '사', time: '09-11시', season: '여름시작', animal: '뱀', meaning: '완성, 지혜' },
        { char: '午', name: '오', time: '11-13시', season: '여름', animal: '말', meaning: '번영, 명예' },
        { char: '未', name: '미', time: '13-15시', season: '여름말', animal: '양', meaning: '성숙, 배려' },
        { char: '申', name: '신', time: '15-17시', season: '가을시작', animal: '원숭이', meaning: '수확, 질서' },
        { char: '酉', name: '유', time: '17-19시', season: '가을', animal: '닭', meaning: '결실, 완성' },
        { char: '戌', name: '술', time: '19-21시', season: '가을말', animal: '개', meaning: '저장, 신중' },
        { char: '亥', name: '해', time: '21-23시', season: '겨울시작', animal: '돼지', meaning: '휴식, 준비' }
    ],

    // 퀴즈 데이터
    quizzes: [
        {
            question: "음양의 기본 원리에서 '음이 차면 양이 태동한다'는 것은 무엇을 의미하나요?",
            options: [
                "음과 양은 서로 대립하는 관계이다",
                "극에 달하면 반대로 전환되는 역동적 순환이다",
                "음이 양보다 우월하다는 뜻이다",
                "음과 양은 독립적으로 존재한다"
            ],
            correct: 1,
            explanation: "음양의 핵심은 극에 달하면 반대로 전환되는 끊임없는 순환입니다. 동지(음 극점)에 양기가 태동하는 것처럼 말이죠."
        },
        {
            question: "오행 상생에서 '목생화(木生火)'의 의미는?",
            options: [
                "나무가 불을 이긴다",
                "나무가 불을 만든다/돕는다",
                "나무와 불이 충돌한다",
                "나무가 불에 의해 파괴된다"
            ],
            correct: 1,
            explanation: "상생은 한 오행이 다른 오행을 돕고 키우는 관계입니다. 나무가 연료가 되어 불을 피우듯이 말이에요."
        },
        {
            question: "천간 '甲(갑)'의 특성으로 올바른 것은?",
            options: [
                "음목, 작은 나무, 유연함",
                "양목, 큰 나무, 정직함",
                "양화, 태양, 열정적",
                "음수, 이슬, 섬세함"
            ],
            correct: 1,
            explanation: "甲(갑)은 양목으로 큰 나무를 상징하며, 정직하고 원칙적인 성격을 나타냅니다."
        },
        {
            question: "상극(相克)의 역할에 대한 올바른 이해는?",
            options: [
                "단순히 나쁜 작용이다",
                "피해야 할 부정적 관계다",
                "시련을 통한 성숙과 균형의 필수 작용이다",
                "상생보다 약한 작용이다"
            ],
            correct: 2,
            explanation: "상극은 '거친 들판'으로 비유되며, 시련을 통해 존재를 더욱 성숙하게 만드는 필수적인 작용입니다."
        }
    ]
};

// 학습 상태 관리
let learningState = {
    currentSection: 'yinyang',
    completedSections: new Set(),
    quizCurrentIndex: 0,
    quizScore: 0,
    rotationActive: false,
    currentCycle: 'generation',
    notes: ''
};

// DOM 요소 참조
const elements = {
    progressBar: document.getElementById('overallProgress'),
    progressText: document.getElementById('progressText'),
    navButtons: document.querySelectorAll('.nav-btn'),
    sections: document.querySelectorAll('.lesson-section'),
    taijiSymbol: document.getElementById('taijiSymbol'),
    rotateBtn: document.getElementById('rotateBtn'),
    seasonBtn: document.getElementById('seasonBtn'),
    wuxingCircle: document.getElementById('wuxingCircle'),
    cycleButtons: document.querySelectorAll('.cycle-btn'),
    cycleExplanation: document.getElementById('cycleExplanation'),
    quizContainer: document.getElementById('quizContainer'),
    completeButtons: document.querySelectorAll('.complete-btn'),
    notesToggle: document.getElementById('notesToggle'),
    learningNotes: document.getElementById('learningNotes'),
    saveNotesBtn: document.getElementById('saveNotes')
};

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeLearningModule();
    loadUserProgress();
    setupEventListeners();
    generateEarthlyBranches();
    updateProgressDisplay();
});

// 학습 모듈 초기화
function initializeLearningModule() {
    console.log('🎯 명리학 기초 학습 모듈이 시작되었습니다');
    
    // 인터랙티브 요소 초기 설정
    setupTaijiSymbol();
    setupWuxingCircle();
    generateQuizzes();
    
    // 애니메이션 클래스 추가
    document.querySelector('.lesson-section.active').classList.add('fade-in');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 네비게이션
    elements.navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => switchSection(e.target.dataset.section));
    });

    // 태극 인터랙티브
    elements.rotateBtn?.addEventListener('click', toggleTaijiRotation);
    elements.seasonBtn?.addEventListener('click', showSeasonalChange);
    elements.taijiSymbol?.addEventListener('click', toggleTaijiRotation);

    // 오행 순환 버튼
    elements.cycleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cycleType = e.target.id.replace('Cycle', '').replace('Flow', 'season');
            showCycle(cycleType);
        });
    });

    // 완료 버튼
    elements.completeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.id.replace('Complete', '');
            markSectionComplete(sectionId);
        });
    });

    // 학습 노트
    elements.notesToggle?.addEventListener('click', toggleNotes);
    elements.saveNotesBtn?.addEventListener('click', saveNotes);

    // 천간지지 카드 호버 효과
    setupStemsBranchesInteraction();

    // 오행 카드 클릭 효과
    setupElementCardsInteraction();
}

// 섹션 전환
function switchSection(sectionId) {
    // 이전 섹션 숨기기
    elements.sections.forEach(section => section.classList.remove('active'));
    elements.navButtons.forEach(btn => btn.classList.remove('active'));

    // 새 섹션 표시
    const targetSection = document.getElementById(sectionId);
    const targetButton = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (targetSection && targetButton) {
        targetSection.classList.add('active', 'fade-in');
        targetButton.classList.add('active');
        learningState.currentSection = sectionId;
        
        // 퀴즈 섹션일 경우 퀴즈 시작
        if (sectionId === 'quiz') {
            startQuiz();
        }
    }

    // 진행률 업데이트
    updateProgressDisplay();
}

// 태극 심볼 설정
function setupTaijiSymbol() {
    if (!elements.taijiSymbol) return;
    
    // 호버 효과 강화
    elements.taijiSymbol.addEventListener('mouseenter', () => {
        elements.taijiSymbol.style.transform = 'scale(1.05)';
    });
    
    elements.taijiSymbol.addEventListener('mouseleave', () => {
        if (!learningState.rotationActive) {
            elements.taijiSymbol.style.transform = 'scale(1)';
        }
    });
}

// 태극 회전 토글
function toggleTaijiRotation() {
    if (!elements.taijiSymbol) return;

    if (learningState.rotationActive) {
        elements.taijiSymbol.classList.remove('rotating');
        elements.rotateBtn.textContent = '🔄 순환 보기';
        learningState.rotationActive = false;
    } else {
        elements.taijiSymbol.classList.add('rotating');
        elements.rotateBtn.textContent = '⏸️ 정지';
        learningState.rotationActive = true;
        
        // 3초 후 자동 정지
        setTimeout(() => {
            if (learningState.rotationActive) {
                toggleTaijiRotation();
            }
        }, 6000);
    }
}

// 계절 변화 보기
function showSeasonalChange() {
    if (!elements.taijiSymbol) return;

    const seasons = [
        { name: '동지 → 양기 태동', yinOpacity: 0.9, yangOpacity: 0.3 },
        { name: '춘분 → 음양 균형', yinOpacity: 0.5, yangOpacity: 0.5 },
        { name: '하지 → 음기 태동', yinOpacity: 0.3, yangOpacity: 0.9 },
        { name: '추분 → 음양 균형', yinOpacity: 0.5, yangOpacity: 0.5 }
    ];

    let currentSeason = 0;
    
    function showNextSeason() {
        const season = seasons[currentSeason];
        const yinPart = elements.taijiSymbol.querySelector('.yin-part');
        const yangPart = elements.taijiSymbol.querySelector('.yang-part');
        
        if (yinPart && yangPart) {
            yinPart.style.opacity = season.yinOpacity;
            yangPart.style.opacity = season.yangOpacity;
        }
        
        // 계절 설명 표시
        showTooltip(elements.seasonBtn, season.name);
        
        currentSeason = (currentSeason + 1) % seasons.length;
        
        if (currentSeason === 0) {
            // 원래 상태로 복원
            setTimeout(() => {
                if (yinPart && yangPart) {
                    yinPart.style.opacity = 1;
                    yangPart.style.opacity = 1;
                }
            }, 1500);
        } else {
            setTimeout(showNextSeason, 1500);
        }
    }
    
    showNextSeason();
}

// 오행 서클 설정
function setupWuxingCircle() {
    if (!elements.wuxingCircle) return;

    const elementNodes = elements.wuxingCircle.querySelectorAll('.element');
    
    elementNodes.forEach(element => {
        element.addEventListener('click', () => {
            const elementType = element.dataset.element;
            showElementDetails(elementType);
        });
        
        element.addEventListener('mouseenter', () => {
            highlightElement(element, true);
        });
        
        element.addEventListener('mouseleave', () => {
            highlightElement(element, false);
        });
    });
}

// 오행 순환 표시
function showCycle(cycleType) {
    // 버튼 상태 업데이트
    elements.cycleButtons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(cycleType + 'Cycle') || 
                     document.getElementById(cycleType.replace('season', 'seasonFlow'));
    if (activeBtn) activeBtn.classList.add('active');

    // 설명 패널 업데이트
    const cycleInfos = document.querySelectorAll('.cycle-info');
    cycleInfos.forEach(info => info.classList.remove('active'));
    
    const targetInfo = document.querySelector(`.cycle-info.${cycleType}`);
    if (targetInfo) targetInfo.classList.add('active');

    // 시각적 효과
    if (cycleType === 'generation') {
        animateGenerationCycle();
    } else if (cycleType === 'control') {
        animateControlCycle();
    } else if (cycleType === 'season') {
        animateSeasonFlow();
    }

    learningState.currentCycle = cycleType;
}

// 상생 순환 애니메이션
function animateGenerationCycle() {
    const elements = document.querySelectorAll('.element');
    const cycle = foundationData.cycles.generation;
    
    elements.forEach(el => el.style.boxShadow = 'none');
    
    cycle.forEach((elementType, index) => {
        setTimeout(() => {
            const element = document.querySelector(`.element.${elementType}`);
            if (element) {
                element.style.boxShadow = '0 0 20px #16a34a';
                element.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    element.style.boxShadow = 'none';
                    element.style.transform = 'scale(1)';
                }, 800);
            }
        }, index * 600);
    });
}

// 상극 순환 애니메이션
function animateControlCycle() {
    const elements = document.querySelectorAll('.element');
    const cycle = foundationData.cycles.control;
    
    elements.forEach(el => el.style.boxShadow = 'none');
    
    cycle.forEach((elementType, index) => {
        setTimeout(() => {
            const element = document.querySelector(`.element.${elementType}`);
            if (element) {
                element.style.boxShadow = '0 0 20px #dc2626';
                element.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    element.style.boxShadow = 'none';
                    element.style.transform = 'scale(1)';
                }, 800);
            }
        }, index * 600);
    });
}

// 계절 흐름 애니메이션
function animateSeasonFlow() {
    const seasonElements = [
        { element: '.element.wood', season: '🌸 봄' },
        { element: '.element.fire', season: '☀️ 여름' },
        { element: '.element.earth', season: '🍂 환절기' },
        { element: '.element.metal', season: '🍁 가을' },
        { element: '.element.water', season: '❄️ 겨울' }
    ];
    
    seasonElements.forEach((item, index) => {
        setTimeout(() => {
            const element = document.querySelector(item.element);
            if (element) {
                element.style.boxShadow = `0 0 25px ${foundationData.elements[item.element.split('.')[2]].color}`;
                element.style.transform = 'scale(1.15)';
                
                showTooltip(element, item.season);
                
                setTimeout(() => {
                    element.style.boxShadow = 'none';
                    element.style.transform = 'scale(1)';
                }, 1000);
            }
        }, index * 700);
    });
}

// 천간지지 인터랙션 설정
function setupStemsBranchesInteraction() {
    // 천간 카드
    const stemCards = document.querySelectorAll('.stem-card');
    stemCards.forEach(card => {
        card.addEventListener('click', () => {
            const stemName = card.dataset.stem;
            const stemData = foundationData.heavenlyStems.find(s => s.name === stemName);
            if (stemData) {
                showStemDetails(stemData);
            }
        });
    });
}

// 지지 원형 생성
function generateEarthlyBranches() {
    const branchesCircle = document.getElementById('earthlyBranches');
    if (!branchesCircle) return;

    // 기존 내용 지우기
    branchesCircle.innerHTML = '';
    
    foundationData.earthlyBranches.forEach((branch, index) => {
        const angle = (index * 30) - 90; // 12개를 360도로 배치, 12시 방향부터 시작
        const radian = (angle * Math.PI) / 180;
        const radius = 160;
        
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;
        
        const branchCard = document.createElement('div');
        branchCard.className = 'branch-card';
        branchCard.dataset.branch = branch.name;
        branchCard.style.left = `calc(50% + ${x}px - 40px)`;
        branchCard.style.top = `calc(50% + ${y}px - 40px)`;
        
        branchCard.innerHTML = `
            <div class="branch-character">${branch.char}</div>
            <div class="branch-info">
                <div class="branch-name">${branch.name}(${branch.char})</div>
                <div class="branch-time">${branch.time}</div>
                <div class="branch-season">${branch.season}</div>
                <div class="branch-animal">${branch.animal}</div>
            </div>
        `;
        
        branchCard.addEventListener('click', () => {
            showBranchDetails(branch);
        });
        
        branchesCircle.appendChild(branchCard);
    });
}

// 오행 카드 인터랙션
function setupElementCardsInteraction() {
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('click', () => {
            const element = card.dataset.element;
            showElementFullDetails(element);
        });
    });
}

// 퀴즈 생성
function generateQuizzes() {
    if (!elements.quizContainer) return;

    // 퀴즈 초기 상태 설정
    learningState.quizCurrentIndex = 0;
    learningState.quizScore = 0;
}

// 퀴즈 시작
function startQuiz() {
    if (!elements.quizContainer) return;
    
    learningState.quizCurrentIndex = 0;
    learningState.quizScore = 0;
    showQuizQuestion();
}

// 퀴즈 문제 표시
function showQuizQuestion() {
    const quiz = foundationData.quizzes[learningState.quizCurrentIndex];
    if (!quiz) return;

    elements.quizContainer.innerHTML = `
        <div class="quiz-card fade-in">
            <div class="quiz-header">
                <h3>문제 ${learningState.quizCurrentIndex + 1} / ${foundationData.quizzes.length}</h3>
                <div class="quiz-score">점수: ${learningState.quizScore}점</div>
            </div>
            <div class="quiz-question">
                <h4>${quiz.question}</h4>
            </div>
            <div class="quiz-options">
                ${quiz.options.map((option, index) => `
                    <button class="quiz-option" data-index="${index}">
                        ${index + 1}. ${option}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-explanation" style="display: none;">
                <h5>💡 해설</h5>
                <p></p>
            </div>
        </div>
    `;

    // 옵션 클릭 이벤트
    const options = elements.quizContainer.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            handleQuizAnswer(parseInt(e.target.dataset.index));
        });
    });
}

// 퀴즈 답안 처리
function handleQuizAnswer(selectedIndex) {
    const quiz = foundationData.quizzes[learningState.quizCurrentIndex];
    const options = elements.quizContainer.querySelectorAll('.quiz-option');
    const explanation = elements.quizContainer.querySelector('.quiz-explanation');
    const explanationText = explanation.querySelector('p');

    // 버튼 비활성화
    options.forEach(option => option.disabled = true);

    // 정답/오답 표시
    options.forEach((option, index) => {
        if (index === quiz.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== quiz.correct) {
            option.classList.add('incorrect');
        }
    });

    // 점수 계산
    if (selectedIndex === quiz.correct) {
        learningState.quizScore += 25;
    }

    // 해설 표시
    explanationText.textContent = quiz.explanation;
    explanation.style.display = 'block';

    // 다음 문제 버튼
    setTimeout(() => {
        const nextButton = document.createElement('button');
        nextButton.className = 'next-quiz-btn';
        nextButton.textContent = learningState.quizCurrentIndex < foundationData.quizzes.length - 1 ? '다음 문제' : '결과 보기';
        nextButton.addEventListener('click', () => {
            if (learningState.quizCurrentIndex < foundationData.quizzes.length - 1) {
                learningState.quizCurrentIndex++;
                showQuizQuestion();
            } else {
                showQuizResult();
            }
        });
        elements.quizContainer.appendChild(nextButton);
    }, 1000);
}

// 퀴즈 결과 표시
function showQuizResult() {
    const percentage = (learningState.quizScore / (foundationData.quizzes.length * 25)) * 100;
    let level, message;

    if (percentage >= 90) {
        level = '우수';
        message = '완벽합니다! 명리학 기초를 잘 이해하고 있어요 🎉';
    } else if (percentage >= 70) {
        level = '양호';
        message = '잘했어요! 조금만 더 복습하면 완벽해질 거예요 👍';
    } else if (percentage >= 50) {
        level = '보통';
        message = '기본은 이해했네요. 다시 한번 복습해보세요 📚';
    } else {
        level = '부족';
        message = '기초부터 다시 학습하는 것을 추천해요 💪';
    }

    elements.quizContainer.innerHTML = `
        <div class="quiz-result fade-in">
            <h3>🎯 학습 완료!</h3>
            <div class="result-score">
                <div class="score-circle">
                    <span class="score-text">${learningState.quizScore}점</span>
                    <span class="score-percentage">${percentage.toFixed(0)}%</span>
                </div>
            </div>
            <div class="result-level ${level.toLowerCase()}">
                <h4>평가: ${level}</h4>
                <p>${message}</p>
            </div>
            <div class="result-actions">
                <button class="retry-btn" onclick="startQuiz()">다시 도전</button>
                <button class="continue-btn" onclick="proceedToNextStage()">2단계로 진행</button>
            </div>
        </div>
    `;

    // 80% 이상이면 퀴즈 섹션 완료로 표시
    if (percentage >= 80) {
        markSectionComplete('quiz');
    }
}

// 섹션 완료 표시
function markSectionComplete(sectionId) {
    learningState.completedSections.add(sectionId);
    
    const button = document.getElementById(sectionId + 'Complete');
    if (button) {
        button.textContent = button.textContent.replace('완료', '완료 ✅');
        button.disabled = true;
        button.style.background = '#059669';
    }

    updateProgressDisplay();
    saveUserProgress();

    // 완료 애니메이션
    showTooltip(button, '섹션 완료! 🎉');
}

// 진행률 업데이트
function updateProgressDisplay() {
    const totalSections = 4; // yinyang, wuxing, stems-branches, quiz
    const completedCount = learningState.completedSections.size;
    const percentage = (completedCount / totalSections) * 100;

    if (elements.progressBar) {
        elements.progressBar.style.width = percentage + '%';
    }
    
    if (elements.progressText) {
        elements.progressText.textContent = `${percentage.toFixed(0)}% 완료`;
    }
}

// 사용자 진행 상황 저장
function saveUserProgress() {
    const progress = {
        completedSections: Array.from(learningState.completedSections),
        currentSection: learningState.currentSection,
        quizScore: learningState.quizScore,
        notes: learningState.notes,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('sajuLearning_foundation', JSON.stringify(progress));
}

// 사용자 진행 상황 로드
function loadUserProgress() {
    const saved = localStorage.getItem('sajuLearning_foundation');
    if (saved) {
        const progress = JSON.parse(saved);
        learningState.completedSections = new Set(progress.completedSections || []);
        learningState.quizScore = progress.quizScore || 0;
        learningState.notes = progress.notes || '';
        
        if (elements.learningNotes) {
            elements.learningNotes.value = learningState.notes;
        }

        // 완료된 섹션 표시 업데이트
        progress.completedSections?.forEach(sectionId => {
            const button = document.getElementById(sectionId + 'Complete');
            if (button) {
                button.textContent = button.textContent.replace('완료', '완료 ✅');
                button.disabled = true;
                button.style.background = '#059669';
            }
        });
    }
}

// 학습 노트 토글
function toggleNotes() {
    const notesSection = document.querySelector('.learning-notes');
    if (notesSection) {
        notesSection.classList.toggle('open');
    }
}

// 노트 저장
function saveNotes() {
    if (elements.learningNotes) {
        learningState.notes = elements.learningNotes.value;
        saveUserProgress();
        showTooltip(elements.saveNotesBtn, '저장 완료! 📝');
    }
}

// 툴팁 표시
function showTooltip(element, message, duration = 2000) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.2s ease;
    `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.bottom + 10 + 'px';

    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
        setTimeout(() => tooltip.remove(), 200);
    }, duration);
}

// 다음 단계로 진행
function proceedToNextStage() {
    // 2단계(십신 체계)로 이동하는 로직
    alert('축하합니다! 2단계 십신 체계 모듈로 진행할 준비가 되었습니다. 🎉');
    // window.location.href = '/learning/ten-gods/index.html';
}

// 요소 세부 정보 표시 (팝업 또는 모달)
function showElementDetails(elementType) {
    const elementData = foundationData.elements[elementType];
    if (!elementData) return;

    showTooltip(
        document.querySelector(`.element.${elementType}`),
        `${elementData.name}: ${elementData.nature} (${elementData.season})`,
        3000
    );
}

function showStemDetails(stemData) {
    showTooltip(
        document.querySelector(`[data-stem="${stemData.name}"]`),
        `${stemData.char}(${stemData.name}): ${stemData.nature}, ${stemData.traits}`,
        3000
    );
}

function showBranchDetails(branchData) {
    showTooltip(
        document.querySelector(`[data-branch="${branchData.name}"]`),
        `${branchData.char}(${branchData.name}): ${branchData.time}, ${branchData.meaning}`,
        3000
    );
}

// 오행 요소 강조
function highlightElement(element, highlight) {
    if (highlight) {
        element.style.transform = 'scale(1.1)';
        element.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    } else {
        element.style.transform = 'scale(1)';
        element.style.boxShadow = 'none';
    }
}

// CSS 클래스 추가
const additionalStyles = `
.quiz-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.quiz-score {
    font-weight: 600;
    color: #059669;
}

.quiz-options {
    display: grid;
    gap: 0.75rem;
    margin: 1.5rem 0;
}

.quiz-option {
    padding: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
}

.quiz-option:hover {
    border-color: #1e40af;
    background: #eff6ff;
}

.quiz-option.correct {
    border-color: #059669;
    background: #d1fae5;
    color: #065f46;
}

.quiz-option.incorrect {
    border-color: #dc2626;
    background: #fee2e2;
    color: #991b1b;
}

.quiz-option:disabled {
    cursor: not-allowed;
}

.next-quiz-btn {
    background: #1e40af;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    margin-top: 1rem;
}

.quiz-result {
    text-align: center;
    background: white;
    border-radius: 1rem;
    padding: 3rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(45deg, #1e40af, #059669);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem auto;
    color: white;
}

.score-text {
    font-size: 1.5rem;
    font-weight: 700;
}

.score-percentage {
    font-size: 0.875rem;
    opacity: 0.9;
}

.result-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.retry-btn, .continue-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
}

.retry-btn {
    background: #6b7280;
    color: white;
}

.continue-btn {
    background: #059669;
    color: white;
}
`;

// 동적으로 스타일 추가
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);

console.log('🎯 명리학 기초 학습 모듈 로드 완료');