/**
 * 방어기제 테스트
 * 8가지 주요 심리적 방어기제를 분석합니다
 */

(function () {
  'use strict';

  // 방어기제 질문 데이터 (각 유형당 3문항씩, 총 24문항)
  const questions = [
    // 억압 (Repression) - 고통스러운 기억이나 감정을 무의식으로 밀어냄
    {
      id: 1,
      text: '힘들었던 과거의 일들이 잘 기억나지 않는다.',
      mechanism: 'repression'
    },
    {
      id: 2,
      text: '불쾌한 일은 빨리 잊어버리려고 한다.',
      mechanism: 'repression'
    },
    {
      id: 3,
      text: '고통스러운 감정이 느껴지면 무시하거나 밀어내려 한다.',
      mechanism: 'repression'
    },

    // 합리화 (Rationalization) - 받아들이기 어려운 행동을 그럴듯한 이유로 정당화
    {
      id: 4,
      text: '실수를 했을 때 그럴 수밖에 없었던 이유를 찾는다.',
      mechanism: 'rationalization'
    },
    {
      id: 5,
      text: '원하는 것을 얻지 못했을 때 "사실 그게 별로 좋지 않았어"라고 생각한다.',
      mechanism: 'rationalization'
    },
    {
      id: 6,
      text: '내 행동이 잘못되었더라도 상황이 그렇게 만들었다고 생각한다.',
      mechanism: 'rationalization'
    },

    // 투사 (Projection) - 자신의 감정이나 생각을 타인에게 전가
    {
      id: 7,
      text: '내가 싫어하는 사람이 나를 먼저 싫어한다고 느낀다.',
      mechanism: 'projection'
    },
    {
      id: 8,
      text: '다른 사람들이 나를 부정적으로 본다고 자주 생각한다.',
      mechanism: 'projection'
    },
    {
      id: 9,
      text: '내가 불안할 때 주변 사람들도 불안해 보인다.',
      mechanism: 'projection'
    },

    // 승화 (Sublimation) - 부정적 충동을 사회적으로 인정받는 활동으로 전환
    {
      id: 10,
      text: '스트레스를 받으면 운동이나 창작 활동에 몰두한다.',
      mechanism: 'sublimation'
    },
    {
      id: 11,
      text: '부정적인 감정을 생산적인 일로 전환하는 편이다.',
      mechanism: 'sublimation'
    },
    {
      id: 12,
      text: '화가 나면 그 에너지를 일이나 취미에 쏟는다.',
      mechanism: 'sublimation'
    },

    // 부정 (Denial) - 현실의 고통스러운 측면을 인정하지 않음
    {
      id: 13,
      text: '심각한 문제가 있어도 "괜찮아, 별일 아니야"라고 생각한다.',
      mechanism: 'denial'
    },
    {
      id: 14,
      text: '건강이나 관계의 경고 신호를 무시하는 경향이 있다.',
      mechanism: 'denial'
    },
    {
      id: 15,
      text: '불편한 현실보다는 긍정적인 면만 보려고 한다.',
      mechanism: 'denial'
    },

    // 퇴행 (Regression) - 스트레스 시 어린 시절 행동으로 되돌아감
    {
      id: 16,
      text: '스트레스를 받으면 어린아이처럼 행동하고 싶어진다.',
      mechanism: 'regression'
    },
    {
      id: 17,
      text: '힘들 때 누군가에게 의존하고 싶어진다.',
      mechanism: 'regression'
    },
    {
      id: 18,
      text: '어려운 상황에서 떼를 쓰거나 투정부리고 싶은 충동이 든다.',
      mechanism: 'regression'
    },

    // 반동형성 (Reaction Formation) - 실제 감정과 반대로 행동
    {
      id: 19,
      text: '싫어하는 사람에게 오히려 더 친절하게 대한다.',
      mechanism: 'reactionFormation'
    },
    {
      id: 20,
      text: '불안할 때 일부러 더 태연한 척한다.',
      mechanism: 'reactionFormation'
    },
    {
      id: 21,
      text: '질투심이 느껴지면 오히려 그 사람을 칭찬한다.',
      mechanism: 'reactionFormation'
    },

    // 전치 (Displacement) - 감정을 원래 대상이 아닌 다른 대상에게 표출
    {
      id: 22,
      text: '직장에서 화가 나면 집에서 가족에게 짜증을 낸다.',
      mechanism: 'displacement'
    },
    {
      id: 23,
      text: '상사에게 받은 스트레스를 후배나 부하직원에게 푼다.',
      mechanism: 'displacement'
    },
    {
      id: 24,
      text: '특정 사람에게 화가 나면 엉뚱한 곳에 화풀이를 한다.',
      mechanism: 'displacement'
    }
  ];

  // 방어기제 유형별 설명
  const mechanismDescriptions = {
    'repression': {
      name: '억압',
      englishName: 'Repression',
      description: '고통스러운 기억이나 감정을 무의식 속으로 밀어내어 의식하지 못하게 하는 방어기제입니다.',
      detail: '억압은 가장 기본적인 방어기제로, 받아들이기 힘든 생각이나 충동을 의식에서 배제합니다. 단기적으로는 심리적 고통을 줄여주지만, 억압된 감정이 축적되면 불안이나 신체 증상으로 나타날 수 있습니다.',
      advice: '안전한 환경에서 자신의 감정을 탐색해보세요. 일기 쓰기나 상담을 통해 억압된 감정을 점진적으로 표현하는 연습이 도움됩니다.'
    },
    'rationalization': {
      name: '합리화',
      englishName: 'Rationalization',
      description: '받아들이기 어려운 행동이나 실패를 그럴듯한 이유로 정당화하는 방어기제입니다.',
      detail: '합리화는 자존감을 보호하기 위해 논리적인 설명을 만들어내는 것입니다. "신 포도" 심리가 대표적인 예로, 얻지 못한 것의 가치를 평가절하합니다.',
      advice: '자신의 진짜 감정과 동기를 솔직히 들여다보세요. 실패나 실수를 인정하고 배움의 기회로 삼는 것이 장기적으로 더 건강합니다.'
    },
    'projection': {
      name: '투사',
      englishName: 'Projection',
      description: '자신의 받아들이기 어려운 감정이나 생각을 타인에게 전가하는 방어기제입니다.',
      detail: '투사는 자신이 가진 부정적인 특성을 인정하지 않고 다른 사람에게 있는 것처럼 여깁니다. 예를 들어, 자신이 화가 났는데 상대방이 화난 것처럼 느끼는 것입니다.',
      advice: '다른 사람에게서 불편한 점을 발견할 때, 그것이 자신의 내면을 반영하는 것은 아닌지 성찰해보세요.'
    },
    'sublimation': {
      name: '승화',
      englishName: 'Sublimation',
      description: '부정적인 충동이나 에너지를 사회적으로 인정받는 활동으로 전환하는 방어기제입니다.',
      detail: '승화는 가장 성숙한 방어기제 중 하나로 여겨집니다. 공격성을 스포츠로, 성적 에너지를 예술로 전환하는 것이 대표적인 예입니다.',
      advice: '이것은 매우 건강한 대처 방식입니다! 자신에게 맞는 창조적 활동을 찾아 꾸준히 실천해보세요.'
    },
    'denial': {
      name: '부정',
      englishName: 'Denial',
      description: '현실의 고통스러운 측면을 인정하지 않거나 존재하지 않는 것처럼 행동하는 방어기제입니다.',
      detail: '부정은 받아들이기 힘든 현실을 마주하지 않으려는 무의식적 시도입니다. 심각한 질병 진단을 받고도 "잘못된 것"이라고 생각하는 것이 예입니다.',
      advice: '현실을 직시하는 것이 두렵더라도, 문제를 인정하는 것이 해결의 첫걸음입니다. 신뢰할 수 있는 사람과 함께 현실을 마주해보세요.'
    },
    'regression': {
      name: '퇴행',
      englishName: 'Regression',
      description: '스트레스 상황에서 이전 발달 단계의 행동으로 되돌아가는 방어기제입니다.',
      detail: '퇴행은 어려운 상황에서 어린 시절처럼 의존적이거나 미성숙한 행동을 보이는 것입니다. 울기, 떼쓰기, 과도한 의존 등이 나타날 수 있습니다.',
      advice: '스트레스 상황에서 자신을 달래는 건강한 방법을 개발하세요. 성인으로서의 대처 능력을 신뢰하고 발휘해보세요.'
    },
    'reactionFormation': {
      name: '반동형성',
      englishName: 'Reaction Formation',
      description: '실제 감정과 정반대되는 방식으로 행동하는 방어기제입니다.',
      detail: '반동형성은 받아들일 수 없는 감정을 억누르고 그 반대로 행동합니다. 미움을 과도한 친절로, 불안을 태연함으로 가리는 것입니다.',
      advice: '자신의 진짜 감정을 수용해보세요. 부정적인 감정을 느끼는 것도 인간으로서 자연스러운 일입니다.'
    },
    'displacement': {
      name: '전치',
      englishName: 'Displacement',
      description: '감정을 원래 대상이 아닌 덜 위협적인 대상에게 표출하는 방어기제입니다.',
      detail: '전치는 화를 낼 수 없는 대상(상사, 부모 등) 대신 안전한 대상(가족, 후배 등)에게 감정을 표출하는 것입니다. "화풀이"가 대표적인 예입니다.',
      advice: '감정의 원래 원인을 파악하고 적절한 방식으로 표현하세요. 엉뚱한 대상에게 화풀이하면 관계가 손상될 수 있습니다.'
    }
  };

  // DOM 요소
  const questionList = document.getElementById('defense-question-list');
  const form = document.getElementById('defense-form');
  const resultSection = document.getElementById('defense-result');
  const progressCount = document.getElementById('progress-count');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const typeDisplay = document.getElementById('defense-type');
  const summaryDisplay = document.getElementById('defense-summary');
  const dimensionsDisplay = document.getElementById('defense-dimensions');
  const descriptionDisplay = document.getElementById('defense-description');

  // 질문 렌더링
  function renderQuestions() {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    
    const html = shuffledQuestions.map((q, index) => {
      const mechanismDesc = mechanismDescriptions[q.mechanism];
      return `
      <li class="quiz-question" data-question="${q.id}">
        <div class="quiz-question__header">
          <h3 class="quiz-question__title">${index + 1}. ${q.text}</h3>
          <span class="quiz-question__badge">${mechanismDesc.name}</span>
        </div>
        <div class="quiz-scale">
          <div class="quiz-scale__labels">
            <span>전혀 아니다</span>
            <span>매우 그렇다</span>
          </div>
          <div class="quiz-scale__options">
            ${[1, 2, 3, 4, 5].map(val => `
              <label class="quiz-scale__option">
                <input type="radio" name="q${q.id}" value="${val}" data-mechanism="${q.mechanism}" aria-label="${val}점" />
                <span>${val}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </li>
    `;
    }).join('');
    
    questionList.innerHTML = html;
  }

  // 진행률 업데이트
  function updateProgress() {
    const answered = form.querySelectorAll('input[type="radio"]:checked').length;
    progressCount.textContent = answered;
    const percent = (answered / questions.length) * 100;
    progressBarFill.style.width = `${percent}%`;
  }

  // 방어기제 점수 계산
  function calculateScores() {
    const scores = {
      repression: 0,
      rationalization: 0,
      projection: 0,
      sublimation: 0,
      denial: 0,
      regression: 0,
      reactionFormation: 0,
      displacement: 0
    };

    const maxScorePerMechanism = 15; // 각 방어기제당 3문항 × 5점 = 15점

    questions.forEach(q => {
      const input = form.querySelector(`input[name="q${q.id}"]:checked`);
      if (input) {
        scores[q.mechanism] += parseInt(input.value);
      }
    });

    // 백분율로 변환
    const percentages = {};
    for (const key in scores) {
      percentages[key] = Math.round((scores[key] / maxScorePerMechanism) * 100);
    }

    return { scores, percentages };
  }

  // 결과 표시
  function showResult(result) {
    const { scores, percentages } = result;

    // 가장 높은 방어기제 찾기
    let primaryMechanism = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
    
    const primaryDesc = mechanismDescriptions[primaryMechanism];
    
    // 유형 표시
    typeDisplay.textContent = `${primaryDesc.name} (${primaryDesc.englishName})`;
    summaryDisplay.textContent = primaryDesc.description;

    // 방어기제별 그래프
    const sortedMechanisms = Object.keys(percentages).sort((a, b) => 
      percentages[b] - percentages[a]
    );

    const dimensionsHtml = sortedMechanisms.map(key => {
      const desc = mechanismDescriptions[key];
      const percent = percentages[key];
      return `
        <div class="defense-dimension">
          <div class="defense-dimension__header">
            <span class="defense-dimension__label">${desc.name} (${desc.englishName})</span>
            <span class="defense-dimension__score">${percent}%</span>
          </div>
          <div class="defense-dimension__bar">
            <div class="defense-dimension__fill" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
    }).join('');
    
    dimensionsDisplay.innerHTML = dimensionsHtml;

    // 상세 설명
    const descriptionHtml = `
      <h3 class="defense-description__title">주요 방어기제: ${primaryDesc.name}</h3>
      <p class="defense-description__text">${primaryDesc.detail}</p>
      <div class="defense-traits">
        <div class="defense-trait">
          <div class="defense-trait__label">특징</div>
          <div class="defense-trait__value">${primaryDesc.description}</div>
        </div>
        <div class="defense-trait">
          <div class="defense-trait__label">조언</div>
          <div class="defense-trait__value">${primaryDesc.advice}</div>
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

    const result = calculateScores();
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
  document.getElementById('defense-retake').addEventListener('click', function () {
    form.reset();
    renderQuestions(); // 질문 순서 다시 섞기
    form.hidden = false;
    resultSection.hidden = true;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // 링크 복사
  document.getElementById('defense-share').addEventListener('click', function () {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('링크가 복사되었습니다!');
    });
  });

  // 이미지 저장
  document.getElementById('defense-download').addEventListener('click', function () {
    if (typeof html2canvas !== 'undefined') {
      html2canvas(resultSection, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'defense-mechanism-result.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  });

  // 초기화
  renderQuestions();
})();

