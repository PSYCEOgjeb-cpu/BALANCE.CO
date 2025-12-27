// 3단계 실전 적용 모듈 JavaScript - 간소화 버전

// 학습 상태 관리
let learningState = {
    currentSection: 'saju-structure',
    completedSections: new Set(),
    notes: ''
};

// 기본 사주 데이터
const sajuData = {
    stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    branches: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
    animals: ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'],
    elements: {
        '甲': '목', '乙': '목', '丙': '화', '丁': '화', '戊': '토', 
        '己': '토', '庚': '금', '辛': '금', '壬': '수', '癸': '수',
        '子': '수', '丑': '토', '寅': '목', '卯': '목', '辰': '토', '巳': '화',
        '午': '화', '未': '토', '申': '금', '酉': '금', '戌': '토', '亥': '수'
    }
};

// 퀴즈 데이터
const level3Quiz = [
    {
        question: "사주팔자에서 일주(日柱)가 나타내는 의미는 무엇인가요?",
        options: ["조상과 부모", "본인과 배우자", "자녀와 미래", "형제와 동료"],
        correct: 1,
        explanation: "일주는 본인의 핵심 성격과 배우자와의 관계, 그리고 인생의 주요 방향성을 나타냅니다."
    },
    {
        question: "강한 일간에게 필요한 용신의 작용은?",
        options: ["생조(도움)", "설기(기운 빼기)", "부조(보완)", "통관(조화)"],
        correct: 1,
        explanation: "강한 일간은 과도한 기운을 설기(누기)하여 균형을 맞춰주는 것이 필요합니다."
    },
    {
        question: "정관격(正官格)의 주요 특징은?",
        options: ["예술적 재능", "사업 수완", "품위와 책임감", "변화와 모험"],
        correct: 2,
        explanation: "정관격은 품위 있고 책임감이 강하며, 공직이나 관리직에 적합한 격국입니다."
    },
    {
        question: "해석의 5단계 중 첫 번째 단계는?",
        options: ["월령 보기", "일간 파악", "용신 찾기", "십신 분석"],
        correct: 1,
        explanation: "사주 해석의 첫 번째 단계는 자신의 핵심 성격을 나타내는 일간을 파악하는 것입니다."
    }
];

// DOM 요소
const elements = {
    progressBar: document.getElementById('overallProgress'),
    progressText: document.getElementById('progressText'),
    navButtons: document.querySelectorAll('.nav-btn'),
    sections: document.querySelectorAll('.lesson-section'),
    analyzeSaju: document.getElementById('analyzeSaju'),
    sajuDisplay: document.getElementById('sajuDisplay'),
    completeButtons: document.querySelectorAll('.complete-btn'),
    formationTabs: document.querySelectorAll('.formation-tab'),
    formationContents: document.querySelectorAll('.formation-content'),
    caseTabs: document.querySelectorAll('.case-tab'),
    caseContents: document.querySelectorAll('.case-content'),
    notesToggle: document.getElementById('notesToggle'),
    learningNotes: document.getElementById('learningNotes'),
    closeNotes: document.getElementById('closeNotes'),
    saveNotes: document.getElementById('saveNotes'),
    notesText: document.getElementById('notesText')
};

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeLevel3Module();
    setupEventListeners();
    updateProgressDisplay();
    generateLevel3Quiz();
});

// 모듈 초기화
function initializeLevel3Module() {
    console.log('🎯 3단계 실전 적용 모듈 시작');
    loadUserProgress();
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 네비게이션 버튼
    elements.navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchSection(e.target.dataset.section);
        });
    });

    // 사주 분석 버튼
    if (elements.analyzeSaju) {
        elements.analyzeSaju.addEventListener('click', analyzeSajuInput);
    }

    // 완료 버튼들
    elements.completeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.id.replace('Complete', '');
            completeSection(sectionId);
        });
    });

    // 격국 탭
    elements.formationTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchFormationTab(e.target.dataset.formation);
        });
    });

    // 사례 탭
    elements.caseTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchCaseTab(e.target.dataset.case);
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
    elements.navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });

    elements.sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });

    learningState.currentSection = sectionId;
    saveUserProgress();
}

// 사주 분석
function analyzeSajuInput() {
    const year = document.getElementById('birthYear')?.value;
    const month = document.getElementById('birthMonth')?.value;
    const day = document.getElementById('birthDay')?.value;
    const hour = document.getElementById('birthHour')?.value;

    if (!year || !month || !day || !hour) {
        alert('모든 출생 정보를 입력해주세요.');
        return;
    }

    // 간단한 사주 생성 (실제로는 복잡한 계산이 필요)
    const saju = generateSaju(parseInt(year), parseInt(month), parseInt(day), parseInt(hour));
    displaySaju(saju);
}

// 사주 생성 (간소화된 버전)
function generateSaju(year, month, day, hour) {
    // 실제로는 천문학적 계산이 필요하지만, 여기서는 간단한 매핑 사용
    const yearStemIndex = (year - 1984) % 10;
    const yearBranchIndex = (year - 1984) % 12;
    
    const monthStemIndex = (month + yearStemIndex * 2) % 10;
    const monthBranchIndex = (month + 1) % 12;
    
    const dayStemIndex = Math.floor(Math.random() * 10);
    const dayBranchIndex = Math.floor(Math.random() * 12);
    
    const hourBranchIndex = Math.floor(hour / 2) % 12;
    const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;

    return {
        year: {
            stem: sajuData.stems[yearStemIndex],
            branch: sajuData.branches[yearBranchIndex]
        },
        month: {
            stem: sajuData.stems[monthStemIndex],
            branch: sajuData.branches[monthBranchIndex]
        },
        day: {
            stem: sajuData.stems[dayStemIndex],
            branch: sajuData.branches[dayBranchIndex]
        },
        hour: {
            stem: sajuData.stems[hourStemIndex],
            branch: sajuData.branches[hourBranchIndex]
        }
    };
}

// 사주 표시
function displaySaju(saju) {
    // 사주 데이터 표시
    document.getElementById('yearStem').textContent = saju.year.stem;
    document.getElementById('yearBranch').textContent = saju.year.branch;
    document.getElementById('monthStem').textContent = saju.month.stem;
    document.getElementById('monthBranch').textContent = saju.month.branch;
    document.getElementById('dayStem').textContent = saju.day.stem;
    document.getElementById('dayBranch').textContent = saju.day.branch;
    document.getElementById('hourStem').textContent = saju.hour.stem;
    document.getElementById('hourBranch').textContent = saju.hour.branch;

    // 오행과 동물 표시
    document.getElementById('yearElement').textContent = sajuData.elements[saju.year.stem];
    document.getElementById('monthElement').textContent = sajuData.elements[saju.month.stem];
    document.getElementById('dayElement').textContent = sajuData.elements[saju.day.stem];
    document.getElementById('hourElement').textContent = sajuData.elements[saju.hour.stem];

    const yearBranchIndex = sajuData.branches.indexOf(saju.year.branch);
    const monthBranchIndex = sajuData.branches.indexOf(saju.month.branch);
    const dayBranchIndex = sajuData.branches.indexOf(saju.day.branch);
    const hourBranchIndex = sajuData.branches.indexOf(saju.hour.branch);

    document.getElementById('yearAnimal').textContent = sajuData.animals[yearBranchIndex];
    document.getElementById('monthAnimal').textContent = sajuData.animals[monthBranchIndex];
    document.getElementById('dayAnimal').textContent = sajuData.animals[dayBranchIndex];
    document.getElementById('hourAnimal').textContent = sajuData.animals[hourBranchIndex];

    // 사주 디스플레이 보이기
    elements.sajuDisplay.style.display = 'block';
}

// 격국 탭 전환
function switchFormationTab(formation) {
    elements.formationTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.formation === formation) {
            tab.classList.add('active');
        }
    });

    elements.formationContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === formation) {
            content.classList.add('active');
        }
    });
}

// 사례 탭 전환
function switchCaseTab(caseId) {
    elements.caseTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.case === caseId) {
            tab.classList.add('active');
        }
    });

    elements.caseContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === caseId) {
            content.classList.add('active');
        }
    });
}

// 퀴즈 생성
function generateLevel3Quiz() {
    const quizContainer = document.getElementById('level3Quiz');
    if (!quizContainer) return;

    let quizHTML = `
        <div class="quiz-header">
            <h3>🧠 3단계 종합 퀴즈</h3>
        </div>
        <div class="quiz-content" id="quizContent"></div>
        <div class="quiz-controls">
            <button class="quiz-btn" id="prevQuiz">이전</button>
            <button class="quiz-btn primary" id="nextQuiz">다음</button>
        </div>
    `;

    quizContainer.innerHTML = quizHTML;
    showQuizQuestion(0);

    // 퀴즈 버튼 이벤트
    document.getElementById('prevQuiz')?.addEventListener('click', () => {
        const current = parseInt(quizContainer.dataset.current || '0');
        if (current > 0) showQuizQuestion(current - 1);
    });

    document.getElementById('nextQuiz')?.addEventListener('click', () => {
        const current = parseInt(quizContainer.dataset.current || '0');
        if (current < level3Quiz.length - 1) {
            showQuizQuestion(current + 1);
        } else {
            completeQuiz();
        }
    });
}

// 퀴즈 문제 표시
function showQuizQuestion(index) {
    const quiz = level3Quiz[index];
    const quizContent = document.getElementById('quizContent');
    const quizContainer = document.getElementById('level3Quiz');
    
    quizContainer.dataset.current = index;

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

    // 버튼 상태 업데이트
    const prevBtn = document.getElementById('prevQuiz');
    const nextBtn = document.getElementById('nextQuiz');
    
    if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    if (nextBtn) nextBtn.textContent = index === level3Quiz.length - 1 ? '완료' : '다음';
}

// 퀴즈 선택
function selectQuizOption(selectedIndex) {
    const quizContainer = document.getElementById('level3Quiz');
    const currentIndex = parseInt(quizContainer.dataset.current || '0');
    const quiz = level3Quiz[currentIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === quiz.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== quiz.correct) {
            option.classList.add('incorrect');
        }
    });

    document.getElementById('quizExplanation')?.classList.remove('hidden');
}

// 퀴즈 완료
function completeQuiz() {
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <div class="quiz-complete">
            <h3>🎉 퀴즈 완료!</h3>
            <p>3단계 실전 적용 학습을 완료했습니다.</p>
            <button class="complete-btn" onclick="completeSection('quiz')">학습 완료</button>
        </div>
    `;
    document.querySelector('.quiz-controls').style.display = 'none';
}

// 섹션 완료
function completeSection(sectionName) {
    learningState.completedSections.add(sectionName);
    updateProgressDisplay();
    showCompletionFeedback(sectionName);
    saveUserProgress();
}

// 완료 피드백
function showCompletionFeedback(sectionName) {
    const sectionNames = {
        'sajuStructure': '사주 구성',
        'interpretation': '해석 방법',
        'formations': '격국',
        'caseStudy': '사례 연구',
        'quiz': '종합 퀴즈'
    };
    
    const message = `🎉 ${sectionNames[sectionName]} 학습을 완료했습니다!`;
    
    const toast = document.createElement('div');
    toast.className = 'completion-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; 
        background: #10b981; color: white; 
        padding: 1rem 1.5rem; border-radius: 8px; 
        z-index: 1000; animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// 진도 업데이트
function updateProgressDisplay() {
    const totalSections = 5;
    const completedCount = learningState.completedSections.size;
    const percentage = (completedCount / totalSections) * 100;
    
    elements.progressBar.style.width = percentage + '%';
    elements.progressText.textContent = `${Math.round(percentage)}% 완료`;
}

// 학습 노트 기능
function toggleNotes() {
    elements.learningNotes.classList.toggle('open');
}

function closeNotes() {
    elements.learningNotes.classList.remove('open');
}

function saveNotes() {
    learningState.notes = elements.notesText.value;
    localStorage.setItem('level3-notes', learningState.notes);
    
    const saveBtn = elements.saveNotes;
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '저장됨 ✓';
    saveBtn.style.background = '#10b981';
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
    }, 1500);
}

// 사용자 진도 관리
function loadUserProgress() {
    const saved = localStorage.getItem('level3-progress');
    if (saved) {
        const progress = JSON.parse(saved);
        learningState.completedSections = new Set(progress.completedSections);
    }
    
    const savedNotes = localStorage.getItem('level3-notes');
    if (savedNotes && elements.notesText) {
        learningState.notes = savedNotes;
        elements.notesText.value = savedNotes;
    }
}

function saveUserProgress() {
    const progress = {
        completedSections: Array.from(learningState.completedSections),
        currentSection: learningState.currentSection
    };
    localStorage.setItem('level3-progress', JSON.stringify(progress));
}

// 페이지 언로드 시 저장
window.addEventListener('beforeunload', saveUserProgress);

// 추가 CSS 스타일
const additionalStyles = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
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
        border-color: #059669;
        background: #f0fdf4;
    }
    
    .quiz-option.correct {
        border-color: #10b981;
        background: #dcfce7;
        color: #16a34a;
    }
    
    .quiz-option.incorrect {
        border-color: #ef4444;
        background: #fee2e2;
        color: #dc2626;
    }
    
    .quiz-explanation {
        background: #f0fdf4;
        border: 1px solid #10b981;
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
        background: #059669;
        color: white;
    }
    
    .quiz-complete {
        text-align: center;
        padding: 2rem;
        background: white;
        border-radius: 12px;
    }
    
    .hidden {
        display: none;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);