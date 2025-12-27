/**
 * MBTI ML 성격유형 테스트
 * 16가지 성격유형을 분석합니다
 */

(function () {
  'use strict';

  // MBTI 질문 데이터 (E/I, S/N, T/F, J/P 각 5문항씩)
  const questions = [
    // E/I 질문 (1-5)
    {
      id: 1,
      text: '새로운 사람들을 만나면 에너지가 충전되는 편이다.',
      dimension: 'EI',
      positive: 'E'
    },
    {
      id: 2,
      text: '혼자만의 시간이 있어야 에너지가 회복된다.',
      dimension: 'EI',
      positive: 'I'
    },
    {
      id: 3,
      text: '모임에서 먼저 다가가서 대화를 시작하는 편이다.',
      dimension: 'EI',
      positive: 'E'
    },
    {
      id: 4,
      text: '깊은 대화를 나눌 수 있는 소수의 친구가 좋다.',
      dimension: 'EI',
      positive: 'I'
    },
    {
      id: 5,
      text: '생각을 말로 표현하면서 정리하는 편이다.',
      dimension: 'EI',
      positive: 'E'
    },

    // S/N 질문 (6-10)
    {
      id: 6,
      text: '구체적이고 사실적인 정보를 신뢰한다.',
      dimension: 'SN',
      positive: 'S'
    },
    {
      id: 7,
      text: '가능성과 잠재력을 보는 것을 좋아한다.',
      dimension: 'SN',
      positive: 'N'
    },
    {
      id: 8,
      text: '현실적이고 실용적인 해결책을 선호한다.',
      dimension: 'SN',
      positive: 'S'
    },
    {
      id: 9,
      text: '상상력과 창의적인 아이디어가 풍부하다.',
      dimension: 'SN',
      positive: 'N'
    },
    {
      id: 10,
      text: '경험을 통해 배우는 것을 좋아한다.',
      dimension: 'SN',
      positive: 'S'
    },

    // T/F 질문 (11-15)
    {
      id: 11,
      text: '결정을 내릴 때 논리와 객관적 분석을 중시한다.',
      dimension: 'TF',
      positive: 'T'
    },
    {
      id: 12,
      text: '다른 사람의 감정과 상황을 먼저 고려한다.',
      dimension: 'TF',
      positive: 'F'
    },
    {
      id: 13,
      text: '솔직하게 진실을 말하는 것이 중요하다.',
      dimension: 'TF',
      positive: 'T'
    },
    {
      id: 14,
      text: '조화롭고 따뜻한 분위기를 만드는 것이 중요하다.',
      dimension: 'TF',
      positive: 'F'
    },
    {
      id: 15,
      text: '문제 해결 시 원인과 결과를 분석한다.',
      dimension: 'TF',
      positive: 'T'
    },

    // J/P 질문 (16-20)
    {
      id: 16,
      text: '계획을 세우고 체계적으로 진행하는 것을 좋아한다.',
      dimension: 'JP',
      positive: 'J'
    },
    {
      id: 17,
      text: '상황에 따라 유연하게 대처하는 것을 선호한다.',
      dimension: 'JP',
      positive: 'P'
    },
    {
      id: 18,
      text: '마감 기한을 잘 지키고 미리 준비한다.',
      dimension: 'JP',
      positive: 'J'
    },
    {
      id: 19,
      text: '여러 가지 선택지를 열어두는 것을 좋아한다.',
      dimension: 'JP',
      positive: 'P'
    },
    {
      id: 20,
      text: '일을 빨리 끝내고 정리하는 것을 선호한다.',
      dimension: 'JP',
      positive: 'J'
    }
  ];

  // MBTI 유형별 설명
  const typeDescriptions = {
    'ISTJ': {
      name: '청렴결백한 논리주의자',
      description: '책임감이 강하고 신뢰할 수 있는 성격입니다. 전통과 질서를 중시하며, 맡은 일은 끝까지 완수합니다.',
      strengths: ['책임감', '신뢰성', '체계적'],
      weaknesses: ['융통성 부족', '변화 저항']
    },
    'ISFJ': {
      name: '용감한 수호자',
      description: '따뜻하고 헌신적인 성격입니다. 타인을 돌보는 것을 좋아하며, 안정적인 환경을 만들어갑니다.',
      strengths: ['헌신적', '인내심', '세심함'],
      weaknesses: ['과도한 겸손', '거절 어려움']
    },
    'INFJ': {
      name: '선의의 옹호자',
      description: '이상주의적이고 통찰력이 뛰어납니다. 깊은 신념을 가지고 있으며, 타인을 돕고자 하는 열망이 강합니다.',
      strengths: ['통찰력', '이상주의', '결단력'],
      weaknesses: ['완벽주의', '번아웃 위험']
    },
    'INTJ': {
      name: '용의주도한 전략가',
      description: '독립적이고 전략적인 사고를 합니다. 높은 기준을 가지고 있으며, 효율성을 중시합니다.',
      strengths: ['전략적 사고', '독립성', '결단력'],
      weaknesses: ['과도한 분석', '감정 표현 서툼']
    },
    'ISTP': {
      name: '만능 재주꾼',
      description: '실용적이고 분석적입니다. 도구나 기계를 다루는 것을 좋아하며, 문제 해결에 뛰어납니다.',
      strengths: ['실용적', '적응력', '문제해결'],
      weaknesses: ['감정 표현 어려움', '장기 계획 회피']
    },
    'ISFP': {
      name: '호기심 많은 예술가',
      description: '온화하고 감성적입니다. 현재를 즐기며, 예술적 감각이 뛰어납니다.',
      strengths: ['감수성', '유연성', '친절함'],
      weaknesses: ['갈등 회피', '낮은 자존감']
    },
    'INFP': {
      name: '열정적인 중재자',
      description: '이상주의적이고 창의적입니다. 진정한 자아를 추구하며, 깊은 가치관을 가지고 있습니다.',
      strengths: ['창의성', '공감능력', '진정성'],
      weaknesses: ['현실과 이상 괴리', '과도한 이상화']
    },
    'INTP': {
      name: '논리적인 사색가',
      description: '분석적이고 객관적입니다. 지식 탐구를 좋아하며, 독창적인 아이디어를 만들어냅니다.',
      strengths: ['논리적 사고', '객관성', '독창성'],
      weaknesses: ['실행력 부족', '감정 이해 어려움']
    },
    'ESTP': {
      name: '모험을 즐기는 사업가',
      description: '활동적이고 현실적입니다. 즉흥적으로 행동하며, 도전을 즐깁니다.',
      strengths: ['행동력', '적응력', '현실감각'],
      weaknesses: ['인내심 부족', '규칙 무시']
    },
    'ESFP': {
      name: '자유로운 영혼의 연예인',
      description: '사교적이고 낙천적입니다. 즐거움을 추구하며, 주변 사람들에게 활력을 줍니다.',
      strengths: ['사교성', '낙천적', '적응력'],
      weaknesses: ['집중력 부족', '장기 계획 어려움']
    },
    'ENFP': {
      name: '재기발랄한 활동가',
      description: '열정적이고 창의적입니다. 새로운 가능성을 탐색하며, 사람들과 교류하는 것을 좋아합니다.',
      strengths: ['창의성', '열정', '적응력'],
      weaknesses: ['집중력 부족', '과도한 이상화']
    },
    'ENTP': {
      name: '뜨거운 논쟁을 즐기는 변론가',
      description: '창의적이고 도전적입니다. 지적인 토론을 즐기며, 새로운 아이디어를 탐구합니다.',
      strengths: ['창의성', '지적 호기심', '적응력'],
      weaknesses: ['논쟁 과다', '집중력 부족']
    },
    'ESTJ': {
      name: '엄격한 관리자',
      description: '체계적이고 실용적입니다. 조직을 이끄는 것을 좋아하며, 질서를 중시합니다.',
      strengths: ['리더십', '조직력', '책임감'],
      weaknesses: ['융통성 부족', '감정 무시']
    },
    'ESFJ': {
      name: '사교적인 외교관',
      description: '친절하고 협조적입니다. 타인을 돌보는 것을 좋아하며, 조화를 중시합니다.',
      strengths: ['사교성', '배려심', '협조성'],
      weaknesses: ['과도한 걱정', '거절 어려움']
    },
    'ENFJ': {
      name: '정의로운 사회운동가',
      description: '카리스마 있고 영감을 주는 성격입니다. 타인의 성장을 돕고, 긍정적인 변화를 이끕니다.',
      strengths: ['리더십', '공감능력', '영감'],
      weaknesses: ['과도한 이타심', '자기 희생']
    },
    'ENTJ': {
      name: '대담한 통솔자',
      description: '결단력 있고 전략적입니다. 목표를 향해 효율적으로 나아가며, 팀을 이끄는 것을 좋아합니다.',
      strengths: ['리더십', '전략적 사고', '결단력'],
      weaknesses: ['권위적', '감정 무시']
    }
  };

  // DOM 요소
  const questionList = document.getElementById('mbti-question-list');
  const form = document.getElementById('mbti-form');
  const resultSection = document.getElementById('mbti-result');
  const progressCount = document.getElementById('progress-count');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const typeDisplay = document.getElementById('mbti-type');
  const summaryDisplay = document.getElementById('mbti-summary');
  const dimensionsDisplay = document.getElementById('mbti-dimensions');
  const descriptionDisplay = document.getElementById('mbti-description');

  // 질문 렌더링
  function renderQuestions() {
    const html = questions.map((q, index) => `
      <li class="quiz-question" data-question="${q.id}">
        <div class="quiz-question__header">
          <h3 class="quiz-question__title">${index + 1}. ${q.text}</h3>
          <span class="quiz-question__badge">${q.dimension}</span>
        </div>
        <div class="quiz-scale">
          <div class="quiz-scale__labels">
            <span>전혀 아니다</span>
            <span>매우 그렇다</span>
          </div>
          <div class="quiz-scale__options">
            ${[1, 2, 3, 4, 5].map(val => `
              <label class="quiz-scale__option">
                <input type="radio" name="q${q.id}" value="${val}" aria-label="${val}점" />
                <span>${val}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </li>
    `).join('');
    
    questionList.innerHTML = html;
  }

  // 진행률 업데이트
  function updateProgress() {
    const answered = form.querySelectorAll('input[type="radio"]:checked').length;
    progressCount.textContent = answered;
    const percent = (answered / questions.length) * 100;
    progressBarFill.style.width = `${percent}%`;
  }

  // MBTI 유형 계산
  function calculateMBTI() {
    const scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    questions.forEach(q => {
      const input = form.querySelector(`input[name="q${q.id}"]:checked`);
      if (!input) return;
      
      const value = parseInt(input.value);
      const dimension = q.dimension;
      const positive = q.positive;
      
      // 점수 계산 (1-5점을 0-4점으로 변환)
      const score = value - 1;
      
      if (dimension === 'EI') {
        if (positive === 'E') {
          scores.E += score;
          scores.I += (4 - score);
        } else {
          scores.I += score;
          scores.E += (4 - score);
        }
      } else if (dimension === 'SN') {
        if (positive === 'S') {
          scores.S += score;
          scores.N += (4 - score);
        } else {
          scores.N += score;
          scores.S += (4 - score);
        }
      } else if (dimension === 'TF') {
        if (positive === 'T') {
          scores.T += score;
          scores.F += (4 - score);
        } else {
          scores.F += score;
          scores.T += (4 - score);
        }
      } else if (dimension === 'JP') {
        if (positive === 'J') {
          scores.J += score;
          scores.P += (4 - score);
        } else {
          scores.P += score;
          scores.J += (4 - score);
        }
      }
    });

    // 유형 결정
    const type = 
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P');

    // 백분율 계산
    const percentages = {
      EI: { 
        E: Math.round((scores.E / (scores.E + scores.I)) * 100), 
        I: Math.round((scores.I / (scores.E + scores.I)) * 100) 
      },
      SN: { 
        S: Math.round((scores.S / (scores.S + scores.N)) * 100), 
        N: Math.round((scores.N / (scores.S + scores.N)) * 100) 
      },
      TF: { 
        T: Math.round((scores.T / (scores.T + scores.F)) * 100), 
        F: Math.round((scores.F / (scores.T + scores.F)) * 100) 
      },
      JP: { 
        J: Math.round((scores.J / (scores.J + scores.P)) * 100), 
        P: Math.round((scores.P / (scores.J + scores.P)) * 100) 
      }
    };

    return { type, percentages };
  }

  // 결과 표시
  function showResult(result) {
    const { type, percentages } = result;
    const description = typeDescriptions[type];

    // 유형 표시
    typeDisplay.textContent = type;
    summaryDisplay.textContent = description.name;

    // 차원별 그래프
    const dimensionsHtml = `
      <div class="mbti-dimension">
        <div class="mbti-dimension__header">
          <span class="mbti-dimension__label ${percentages.EI.E >= 50 ? 'mbti-dimension__label--active' : ''}">외향 (E)</span>
          <span class="mbti-dimension__label ${percentages.EI.I > 50 ? 'mbti-dimension__label--active' : ''}">내향 (I)</span>
        </div>
        <div class="mbti-dimension__bar">
          <div class="mbti-dimension__fill mbti-dimension__fill--left" style="width: ${percentages.EI.E}%"></div>
        </div>
        <div class="mbti-dimension__percent">${percentages.EI.E}% : ${percentages.EI.I}%</div>
      </div>
      
      <div class="mbti-dimension">
        <div class="mbti-dimension__header">
          <span class="mbti-dimension__label ${percentages.SN.S >= 50 ? 'mbti-dimension__label--active' : ''}">감각 (S)</span>
          <span class="mbti-dimension__label ${percentages.SN.N > 50 ? 'mbti-dimension__label--active' : ''}">직관 (N)</span>
        </div>
        <div class="mbti-dimension__bar">
          <div class="mbti-dimension__fill mbti-dimension__fill--left" style="width: ${percentages.SN.S}%"></div>
        </div>
        <div class="mbti-dimension__percent">${percentages.SN.S}% : ${percentages.SN.N}%</div>
      </div>
      
      <div class="mbti-dimension">
        <div class="mbti-dimension__header">
          <span class="mbti-dimension__label ${percentages.TF.T >= 50 ? 'mbti-dimension__label--active' : ''}">사고 (T)</span>
          <span class="mbti-dimension__label ${percentages.TF.F > 50 ? 'mbti-dimension__label--active' : ''}">감정 (F)</span>
        </div>
        <div class="mbti-dimension__bar">
          <div class="mbti-dimension__fill mbti-dimension__fill--left" style="width: ${percentages.TF.T}%"></div>
        </div>
        <div class="mbti-dimension__percent">${percentages.TF.T}% : ${percentages.TF.F}%</div>
      </div>
      
      <div class="mbti-dimension">
        <div class="mbti-dimension__header">
          <span class="mbti-dimension__label ${percentages.JP.J >= 50 ? 'mbti-dimension__label--active' : ''}">판단 (J)</span>
          <span class="mbti-dimension__label ${percentages.JP.P > 50 ? 'mbti-dimension__label--active' : ''}">인식 (P)</span>
        </div>
        <div class="mbti-dimension__bar">
          <div class="mbti-dimension__fill mbti-dimension__fill--left" style="width: ${percentages.JP.J}%"></div>
        </div>
        <div class="mbti-dimension__percent">${percentages.JP.J}% : ${percentages.JP.P}%</div>
      </div>
    `;
    dimensionsDisplay.innerHTML = dimensionsHtml;

    // 유형 설명
    const descriptionHtml = `
      <h3 class="mbti-description__title">${type} - ${description.name}</h3>
      <p class="mbti-description__text">${description.description}</p>
      <div class="mbti-traits">
        <div class="mbti-trait">
          <div class="mbti-trait__label">강점</div>
          <div class="mbti-trait__value">${description.strengths.join(', ')}</div>
        </div>
        <div class="mbti-trait">
          <div class="mbti-trait__label">개선점</div>
          <div class="mbti-trait__value">${description.weaknesses.join(', ')}</div>
        </div>
      </div>
    `;
    descriptionDisplay.innerHTML = descriptionHtml;

    // 결과 섹션 표시
    form.hidden = true;
    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // 이벤트 리스너
  form.addEventListener('change', updateProgress);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const unanswered = questions.filter(q => !form.querySelector(`input[name="q${q.id}"]:checked`));
    
    if (unanswered.length > 0) {
      const feedback = form.querySelector('.quiz__feedback');
      feedback.textContent = `${unanswered.length}개의 문항에 답변하지 않았습니다.`;
      feedback.classList.add('quiz__feedback--error');
      return;
    }

    const result = calculateMBTI();
    showResult(result);
  });

  form.addEventListener('reset', function () {
    setTimeout(() => {
      updateProgress();
      const feedback = form.querySelector('.quiz__feedback');
      feedback.textContent = '';
      feedback.classList.remove('quiz__feedback--error');
    }, 0);
  });

  // 다시 측정하기
  document.getElementById('mbti-retake').addEventListener('click', function () {
    form.reset();
    form.hidden = false;
    resultSection.hidden = true;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // 링크 복사
  document.getElementById('mbti-share').addEventListener('click', function () {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('링크가 복사되었습니다!');
    });
  });

  // 이미지 저장
  document.getElementById('mbti-download').addEventListener('click', function () {
    if (typeof html2canvas !== 'undefined') {
      html2canvas(resultSection, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'mbti-result.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  });

  // 초기화
  renderQuestions();
})();

