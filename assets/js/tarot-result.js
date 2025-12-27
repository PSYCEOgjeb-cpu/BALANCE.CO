/**
 * 타로 심리검사 - 결과 페이지 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
  // 결과 데이터 확인
  const currentReading = JSON.parse(localStorage.getItem('currentReading'));
  if (!currentReading) {
    alert('결과 데이터가 없습니다. 처음부터 시작해주세요.');
    window.location.href = 'tarot.html';
    return;
  }

  const { userInfo, cards, timestamp } = currentReading;

  // 결과 표시
  displayCards(cards);
  displayOverallInterpretation(cards, userInfo);
  updateSubtitle(userInfo);
  createCharts(cards, userInfo);

  // 버튼 이벤트
  document.getElementById('saveBtn').addEventListener('click', saveResult);
  document.getElementById('historyBtn').addEventListener('click', showHistory);

  /**
   * 카드 표시
   */
  function displayCards(cards) {
    const container = document.getElementById('resultCards');
    
    cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'result-card';
      cardEl.style.animationDelay = `${index * 0.2}s`;
      
      const badgeClass = card.isReversed ? 'result-card__badge--reversed' : 'result-card__badge--upright';
      const badgeText = card.isReversed ? '역방향' : '정방향';
      const imageClass = card.isReversed ? 'is-reversed' : '';
      
      let categoryHtml = '';
      if (card.interpretation && card.interpretation.categories) {
        categoryHtml = card.interpretation.categories.map(cat => `
          <div class="result-card__category">
            <strong>${cat.name}:</strong> ${cat.text}
          </div>
        `).join('');
      }
      
      cardEl.innerHTML = `
        <div class="result-card__position">${card.position}</div>
        <div class="result-card__image ${imageClass}">
          <img src="assets/images/taro/${card.fileName}" alt="${card.koreanName}">
        </div>
        <span class="result-card__badge ${badgeClass}">${badgeText}</span>
        <h3 class="result-card__name">${card.koreanName}</h3>
        <p class="result-card__name-en">${card.name}</p>
        <div class="result-card__meaning">
          <p><strong>키워드:</strong> ${card.interpretation.base}</p>
          ${categoryHtml}
        </div>
      `;
      
      container.appendChild(cardEl);
    });
  }

  /**
   * 종합 해석 표시
   */
  function displayOverallInterpretation(cards, userInfo) {
    const container = document.getElementById('overallInterpretation');
    
    // 생년월일 포맷
    const birthDate = `${userInfo.birthdate.year}년 ${userInfo.birthdate.month}월 ${userInfo.birthdate.day}일`;
    
    // 기간 텍스트
    const periodMap = {
      today: '오늘',
      week: '이번 주',
      month: '이번 달',
      '3months': '향후 3개월',
      '6months': '향후 6개월',
      year: '향후 1년'
    };
    const periodText = periodMap[userInfo.period] || userInfo.period;
    
    // 카테고리 텍스트
    const categoryMap = {
      love: '연애운',
      business: '사업운',
      career: '이직/취업운',
      investment: '투자/재테크운',
      relationship: '인간관계운',
      health: '건강운',
      study: '학업운',
      family: '가족운'
    };
    const categoriesText = userInfo.categories.map(c => categoryMap[c]).join(', ');
    
    // 카드별 메시지 생성
    let cardMessages = [];
    
    cards.forEach(card => {
      const direction = card.isReversed ? '역방향으로' : '정방향으로';
      let message = '';
      
      if (card.position === '과거') {
        message = `과거에는 <strong>${card.koreanName}</strong> 카드가 ${direction} 나타났습니다. ${card.interpretation.base}의 에너지가 당신의 과거에 영향을 미쳤습니다.`;
      } else if (card.position === '현재') {
        message = `현재 <strong>${card.koreanName}</strong> 카드가 ${direction} 나타나 ${card.interpretation.base}의 기운이 감지됩니다. 지금 이 순간에 집중하세요.`;
      } else if (card.position === '미래') {
        message = `미래에는 <strong>${card.koreanName}</strong> 카드가 ${direction} 나타날 것입니다. ${card.interpretation.base}의 가능성이 열려 있습니다.`;
      } else if (card.position === '조언') {
        message = `<strong>${card.koreanName}</strong> 카드가 ${direction} 나타나 ${card.interpretation.base}을 조언합니다.`;
      } else if (card.position === '결과') {
        message = `최종 결과로 <strong>${card.koreanName}</strong> 카드가 ${direction} 나타났습니다. ${card.interpretation.base}의 결과를 기대하세요.`;
      } else {
        message = `<strong>${card.koreanName}</strong> 카드가 ${direction} 나타나 ${card.interpretation.base}의 메시지를 전합니다.`;
      }
      
      cardMessages.push(`<p>${message}</p>`);
    });
    
    // 전체 해석 조합
    const interpretation = `
      <p><strong>${birthDate}</strong> 출생하신 분의 <strong>${periodText}</strong> 운세입니다.</p>
      <p>선택하신 카테고리: <strong>${categoriesText}</strong></p>
      <br>
      ${cardMessages.join('')}
      <br>
      <p>전반적으로 ${getOverallAdvice(cards)}. 선택하신 분야에서 좋은 결과가 있기를 바랍니다.</p>
    `;
    
    container.innerHTML = interpretation;
  }

  /**
   * 전체적인 조언 생성
   */
  function getOverallAdvice(cards) {
    const positiveCards = cards.filter(c => !c.isReversed).length;
    const totalCards = cards.length;
    const ratio = positiveCards / totalCards;
    
    if (ratio >= 0.7) {
      return '매우 긍정적인 에너지가 감지됩니다. 자신감을 가지고 앞으로 나아가세요';
    } else if (ratio >= 0.5) {
      return '균형 잡힌 에너지가 보입니다. 신중하게 결정하면 좋은 결과가 있을 것입니다';
    } else if (ratio >= 0.3) {
      return '도전적인 에너지가 감지됩니다. 인내심을 가지고 상황을 관찰하세요';
    } else {
      return '변화의 에너지가 강하게 느껴집니다. 새로운 시각으로 상황을 바라보세요';
    }
  }

  /**
   * 부제목 업데이트
   */
  function updateSubtitle(userInfo) {
    const subtitle = document.getElementById('resultSubtitle');
    const periodMap = {
      today: '오늘',
      week: '이번 주',
      month: '이번 달',
      '3months': '3개월',
      '6months': '6개월',
      year: '1년'
    };
    subtitle.textContent = `${periodMap[userInfo.period]} 운세 리딩 결과`;
  }

  /**
   * 차트 생성
   */
  function createCharts(cards, userInfo) {
    // 레이더 차트 - 카테고리별 점수
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    
    // 카테고리별 점수 계산 (선택된 카드들의 특성에 따라)
    const categories = ['연애운', '사업운', '이직/취업', '투자', '인간관계', '건강운', '학업운', '가족운'];
    const scores = generateCategoryScores(cards, userInfo.categories);
    
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: categories,
        datasets: [{
          label: '운세 점수',
          data: scores,
          backgroundColor: 'rgba(107, 70, 193, 0.3)',
          borderColor: 'rgba(107, 70, 193, 1)',
          borderWidth: 2,
          pointBackgroundColor: '#D4AF37',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: 'rgba(255, 255, 255, 0.7)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            pointLabels: {
              color: 'rgba(255, 255, 255, 0.9)',
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    // 막대 차트 - 기간별 운세 흐름
    const barCtx = document.getElementById('barChart').getContext('2d');
    const { labels, data } = generateTimelineData(userInfo.period, cards);
    
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '운세 흐름',
          data: data,
          backgroundColor: createGradient(barCtx),
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.9)'
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  /**
   * 카테고리별 점수 생성
   */
  function generateCategoryScores(cards, selectedCategories) {
    const baseScores = [60, 60, 60, 60, 60, 60, 60, 60];
    const categoryKeys = ['love', 'business', 'career', 'investment', 'relationship', 'health', 'study', 'family'];
    
    // 카드에 따른 점수 조정
    cards.forEach(card => {
      const modifier = card.isReversed ? -10 : 15;
      
      categoryKeys.forEach((key, index) => {
        // 선택된 카테고리에 더 큰 영향
        const isSelected = selectedCategories.includes(key);
        const adjustment = modifier * (isSelected ? 1.5 : 0.8);
        baseScores[index] += adjustment + (Math.random() * 10 - 5);
      });
    });
    
    // 점수 범위 제한 (30-95)
    return baseScores.map(score => Math.min(95, Math.max(30, Math.round(score))));
  }

  /**
   * 기간별 데이터 생성
   */
  function generateTimelineData(period, cards) {
    let labels = [];
    let dataPoints = [];
    
    const baseScore = cards.reduce((acc, card) => {
      return acc + (card.isReversed ? 55 : 75);
    }, 0) / cards.length;
    
    switch (period) {
      case 'today':
        labels = ['아침', '점심', '저녁', '밤'];
        break;
      case 'week':
        labels = ['월', '화', '수', '목', '금', '토', '일'];
        break;
      case 'month':
        labels = ['1주차', '2주차', '3주차', '4주차'];
        break;
      case '3months':
        labels = ['1개월', '2개월', '3개월'];
        break;
      case '6months':
        labels = ['1개월', '2개월', '3개월', '4개월', '5개월', '6개월'];
        break;
      case 'year':
        labels = ['1분기', '2분기', '3분기', '4분기'];
        break;
      default:
        labels = ['현재'];
    }
    
    // 데이터 생성 (자연스러운 변동)
    dataPoints = labels.map((_, index) => {
      const variation = Math.sin(index * 0.8) * 15 + (Math.random() * 20 - 10);
      return Math.min(95, Math.max(35, Math.round(baseScore + variation)));
    });
    
    return { labels, data: dataPoints };
  }

  /**
   * 그라데이션 생성
   */
  function createGradient(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.8)');
    gradient.addColorStop(1, 'rgba(107, 70, 193, 0.8)');
    return gradient;
  }

  /**
   * 결과 저장
   */
  function saveResult() {
    let history = JSON.parse(localStorage.getItem('readingHistory')) || [];
    
    // 중복 방지 (같은 timestamp 확인)
    const exists = history.some(r => r.timestamp === currentReading.timestamp);
    if (exists) {
      alert('이미 저장된 결과입니다.');
      return;
    }
    
    history.push(currentReading);
    localStorage.setItem('readingHistory', JSON.stringify(history));
    
    alert('결과가 저장되었습니다!');
  }

  /**
   * 기록 보기
   */
  function showHistory() {
    const history = JSON.parse(localStorage.getItem('readingHistory')) || [];
    
    if (history.length === 0) {
      alert('저장된 기록이 없습니다.');
      return;
    }
    
    let historyText = '📋 저장된 기록 목록\n\n';
    history.forEach((reading, index) => {
      const date = new Date(reading.timestamp);
      const dateStr = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      const cardNames = reading.cards.map(c => c.koreanName).join(', ');
      historyText += `${index + 1}. ${dateStr}\n   카드: ${cardNames}\n\n`;
    });
    
    alert(historyText);
  }
});

