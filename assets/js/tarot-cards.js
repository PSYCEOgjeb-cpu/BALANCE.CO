/**
 * 타로 심리검사 - 카드 선택 페이지 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
  // 사용자 정보 확인
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    alert('사용자 정보가 없습니다. 처음부터 시작해주세요.');
    window.location.href = 'tarot.html';
    return;
  }

  // 전역 변수
  let cards = [...TAROT_CARDS];
  let selectedCards = [];
  const maxSelection = userInfo.cardCount;
  let isShuffling = false;
  let isAnimating = false;

  // DOM 요소
  const cardsSpread = document.getElementById('cardsSpread');
  const selectedCountEl = document.getElementById('selectedCount');
  const maxCountEl = document.getElementById('maxCount');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const resultBtn = document.getElementById('resultBtn');

  // 초기화
  maxCountEl.textContent = maxSelection;
  
  // 카드 생성 및 배치
  createCards();
  
  // 셔플 버튼 이벤트
  shuffleBtn.addEventListener('click', shuffleCards);
  
  // 결과 보기 버튼 이벤트
  resultBtn.addEventListener('click', goToResult);

  /**
   * 카드 생성
   */
  function createCards() {
    const fragment = document.createDocumentFragment();
    
    cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'tarot-card';
      cardEl.dataset.id = card.id;
      cardEl.dataset.index = index;
      
      cardEl.innerHTML = `
        <div class="tarot-card__inner">
          <div class="tarot-card__face tarot-card__back"></div>
          <div class="tarot-card__face tarot-card__front">
            <img src="assets/images/taro/${card.fileName}" alt="${card.koreanName}" loading="lazy">
          </div>
        </div>
      `;
      
      cardEl.addEventListener('click', () => selectCard(cardEl, card));
      
      fragment.appendChild(cardEl);
    });
    
    cardsSpread.appendChild(fragment);
    
    // 초기 펼침 애니메이션
    setTimeout(() => {
      spreadCards(true);
    }, 100);
  }

  /**
   * 카드 부채꼴 배치
   */
  function spreadCards(animate = false) {
    const cardElements = cardsSpread.querySelectorAll('.tarot-card');
    const totalCards = cardElements.length;
    
    // 화면 크기에 따른 각도 조절
    const isMobile = window.innerWidth <= 768;
    const spreadAngle = isMobile ? 120 : 180;
    const anglePerCard = spreadAngle / (totalCards - 1);
    const startAngle = -spreadAngle / 2;
    
    cardElements.forEach((card, index) => {
      const angle = startAngle + (anglePerCard * index);
      const delay = animate ? index * 0.01 : 0;
      
      // 원래 각도를 데이터 속성에 저장 (선택된 카드 위치 유지용)
      card.dataset.originalAngle = angle;
      
      // 선택되지 않은 카드만 z-index 설정 (선택된 카드는 높은 z-index 유지)
      if (!card.classList.contains('is-selected')) {
        if (animate) {
          card.style.opacity = '0';
          card.style.transform = 'rotate(0deg) scale(0.5)';
          
          setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = `rotate(${angle}deg)`;
            card.style.zIndex = index;
          }, delay * 1000);
        } else {
          card.style.transition = 'all 0.3s ease-out';
          card.style.transform = `rotate(${angle}deg)`;
          card.style.zIndex = index;
        }
      }
    });
    
    isAnimating = false;
  }

  /**
   * 카드 선택
   */
  function selectCard(cardEl, cardData) {
    if (isShuffling || isAnimating) return;
    
    const cardId = cardData.id;
    const isSelected = selectedCards.some(c => c.id === cardId);
    
    if (isSelected) {
      // 선택 해제
      selectedCards = selectedCards.filter(c => c.id !== cardId);
      cardEl.classList.remove('is-selected');
      cardEl.classList.remove('is-flipping', 'is-upright', 'is-reversed');
      
      // 역방향/정방향 표시 제거
      const directionBadge = cardEl.querySelector('.card-direction-badge');
      if (directionBadge) {
        directionBadge.remove();
      }
      
      // 원래 각도로 복귀
      const originalAngle = cardEl.dataset.originalAngle || '0';
      const originalIndex = parseInt(cardEl.dataset.index) || 0;
      cardEl.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      cardEl.style.transform = `rotate(${originalAngle}deg)`;
      cardEl.style.zIndex = originalIndex; // 원래 z-index로 복귀
      cardEl.querySelector('.tarot-card__inner').style.transform = '';
    } else {
      // 새로운 선택
      if (selectedCards.length >= maxSelection) {
        showMessage(`최대 ${maxSelection}장까지만 선택할 수 있습니다.`);
        return;
      }
      
      // 역방향/정방향 무작위 결정
      const isReversed = Math.random() < 0.5;
      cardData.isReversed = isReversed;
      
      selectedCards.push(cardData);
      cardEl.classList.add('is-selected');
      cardEl.classList.add('is-flipping');
      
      // 원래 각도 가져오기
      const originalAngle = cardEl.dataset.originalAngle || '0';
      
      // 화면 크기에 따른 scale 값 결정
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
      let scaleValue = 1.15; // 데스크톱 기본값
      
      if (isMobile) {
        scaleValue = 1.1;
      } else if (isTablet) {
        scaleValue = 1.12;
      }
      
      // 선택된 카드가 다른 카드들 위에 표시되도록 높은 z-index 설정
      // 선택 순서에 따라 z-index 증가 (나중에 선택한 카드가 위에)
      const baseZIndex = 1000;
      cardEl.style.zIndex = baseZIndex + selectedCards.length;
      
      // 카드 위치 유지하면서 확대 (각도 유지)
      cardEl.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s';
      cardEl.style.transform = `rotate(${originalAngle}deg) scale(${scaleValue})`;
      
      // 고급스러운 카드 뒤집기 애니메이션
      setTimeout(() => {
        cardEl.querySelector('.tarot-card__inner').style.transform = 'rotateY(180deg)';
        
        // 역방향/정방향 표시 추가
        setTimeout(() => {
          addDirectionBadge(cardEl, isReversed);
          cardEl.classList.add(isReversed ? 'is-reversed' : 'is-upright');
          cardEl.classList.remove('is-flipping');
        }, 300);
      }, 100);
    }
    
    // 카운터 업데이트
    updateCounter();
    
    // 결과 버튼 상태 업데이트
    updateResultButton();
  }

  /**
   * 역방향/정방향 배지 추가
   */
  function addDirectionBadge(cardEl, isReversed) {
    // 기존 배지 제거
    const existingBadge = cardEl.querySelector('.card-direction-badge');
    if (existingBadge) {
      existingBadge.remove();
    }
    
    const badge = document.createElement('div');
    badge.className = 'card-direction-badge';
    badge.classList.add(isReversed ? 'is-reversed' : 'is-upright');
    
    const badgeText = document.createElement('span');
    badgeText.className = 'badge-text';
    badgeText.textContent = isReversed ? '역방향' : '정방향';
    
    const badgeIcon = document.createElement('span');
    badgeIcon.className = 'badge-icon';
    badgeIcon.textContent = isReversed ? '↻' : '↑';
    
    badge.appendChild(badgeIcon);
    badge.appendChild(badgeText);
    
    cardEl.querySelector('.tarot-card__front').appendChild(badge);
    
    // 애니메이션 효과
    setTimeout(() => {
      badge.classList.add('is-visible');
    }, 50);
  }

  /**
   * 카운터 업데이트
   */
  function updateCounter() {
    selectedCountEl.textContent = selectedCards.length;
  }

  /**
   * 결과 버튼 상태 업데이트
   */
  function updateResultButton() {
    if (selectedCards.length === maxSelection) {
      resultBtn.classList.add('is-active');
      resultBtn.disabled = false;
    } else {
      resultBtn.classList.remove('is-active');
      resultBtn.disabled = true;
    }
  }

  /**
   * 카드 셔플
   */
  function shuffleCards() {
    if (isShuffling || isAnimating) return;
    
    isShuffling = true;
    isAnimating = true;
    
      // 선택 초기화
      selectedCards = [];
      updateCounter();
      updateResultButton();
      
      const cardElements = cardsSpread.querySelectorAll('.tarot-card');
      
      // 1단계: 모든 카드를 중앙으로 모으기
      cardElements.forEach((card) => {
        card.classList.remove('is-selected', 'is-upright', 'is-reversed');
        card.querySelector('.tarot-card__inner').style.transform = '';
        
        // 역방향/정방향 배지 제거
        const directionBadge = card.querySelector('.card-direction-badge');
        if (directionBadge) {
          directionBadge.remove();
        }
        
        card.style.transition = 'all 0.8s ease-in-out';
        card.style.transform = 'rotate(0deg) scale(0.3)';
        card.style.opacity = '0.5';
      });
    
    // 2단계: Fisher-Yates 알고리즘으로 섞기
    setTimeout(() => {
      // 카드 배열 섞기
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      
      // DOM 요소 재배열
      const shuffledFragment = document.createDocumentFragment();
      cards.forEach((card, index) => {
        const cardEl = cardsSpread.querySelector(`[data-id="${card.id}"]`);
        cardEl.dataset.index = index;
        shuffledFragment.appendChild(cardEl);
      });
      cardsSpread.appendChild(shuffledFragment);
      
    }, 800);
    
    // 3단계: 다시 펼치기
    setTimeout(() => {
      const cardElements = cardsSpread.querySelectorAll('.tarot-card');
      const totalCards = cardElements.length;
      const isMobile = window.innerWidth <= 768;
      const spreadAngle = isMobile ? 120 : 180;
      const anglePerCard = spreadAngle / (totalCards - 1);
      const startAngle = -spreadAngle / 2;
      
      cardElements.forEach((card, index) => {
        const angle = startAngle + (anglePerCard * index);
        const delay = index * 0.01;
        
        // 원래 각도 저장
        card.dataset.originalAngle = angle;
        
        setTimeout(() => {
          // 선택되지 않은 카드만 위치 변경
          if (!card.classList.contains('is-selected')) {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = `rotate(${angle}deg)`;
            card.style.zIndex = index;
          }
        }, delay * 1000);
      });
      
      setTimeout(() => {
        isShuffling = false;
        isAnimating = false;
      }, 1000);
      
    }, 1800);
  }

  /**
   * 결과 페이지로 이동
   */
  function goToResult() {
    if (selectedCards.length !== maxSelection) return;
    
    // 선택 시 결정된 정방향/역방향 사용
    const readingCards = selectedCards.map((card, index) => {
      const isReversed = card.isReversed !== undefined ? card.isReversed : Math.random() < 0.5;
      
      // 포지션 결정
      let position = '';
      if (maxSelection === 1) {
        position = '현재의 메시지';
      } else if (maxSelection === 3) {
        const positions = ['과거', '현재', '미래'];
        position = positions[index];
      } else if (maxSelection === 5) {
        const positions = ['과거', '현재', '미래', '조언', '결과'];
        position = positions[index];
      }
      
      return {
        ...card,
        isReversed,
        position,
        interpretation: getInterpretation(card, isReversed, userInfo.categories)
      };
    });
    
    // 결과 저장
    const currentReading = {
      timestamp: new Date().toISOString(),
      userInfo,
      cards: readingCards
    };
    
    localStorage.setItem('currentReading', JSON.stringify(currentReading));
    
    // 페이지 전환 효과
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
      transition.classList.add('is-active');
    }, 10);
    
    setTimeout(() => {
      window.location.href = 'tarot-result.html';
    }, 500);
  }

  /**
   * 해석 텍스트 생성
   */
  function getInterpretation(card, isReversed, categories) {
    const baseInterpretation = isReversed ? card.reversed : card.upright;
    
    // 카테고리별 해석 수집
    const categoryInterpretations = [];
    const categoryMap = {
      love: { name: '연애운', key: 'love' },
      business: { name: '사업운', key: 'business' },
      career: { name: '이직/취업운', key: 'career' },
      investment: { name: '투자/재테크운', key: 'investment' },
      relationship: { name: '인간관계운', key: 'relationship' },
      health: { name: '건강운', key: 'health' },
      study: { name: '학업운', key: 'study' },
      family: { name: '가족운', key: 'family' }
    };
    
    categories.forEach(cat => {
      if (categoryMap[cat] && card[categoryMap[cat].key]) {
        categoryInterpretations.push({
          name: categoryMap[cat].name,
          text: card[categoryMap[cat].key]
        });
      }
    });
    
    return {
      base: baseInterpretation,
      categories: categoryInterpretations
    };
  }

  /**
   * 메시지 표시
   */
  function showMessage(text) {
    const guide = document.getElementById('cardsGuide');
    if (guide) {
      guide.querySelector('p').textContent = text;
      guide.classList.add('is-warning');
      setTimeout(() => {
        guide.querySelector('p').textContent = '마음을 가라앉히고 카드를 선택해주세요';
        guide.classList.remove('is-warning');
      }, 2000);
    }
  }

  // 윈도우 리사이즈 시 카드 재배치
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!isShuffling && !isAnimating) {
        spreadCards(false);
      }
    }, 250);
  });
});

