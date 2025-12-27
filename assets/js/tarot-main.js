/**
 * 타로 심리검사 - 메인 페이지 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
  // 파티클 배경 생성
  createParticles();
  
  // 생년월일 드롭다운 초기화
  initBirthDateSelects();
  
  // 폼 제출 처리
  initFormSubmit();
});

/**
 * 파티클 배경 생성
 */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/**
 * 생년월일 드롭다운 초기화
 */
function initBirthDateSelects() {
  const yearSelect = document.getElementById('birthYear');
  const monthSelect = document.getElementById('birthMonth');
  const daySelect = document.getElementById('birthDay');
  
  if (!yearSelect || !monthSelect || !daySelect) return;
  
  // 년도 옵션 생성 (1950 ~ 현재)
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year + '년';
    yearSelect.appendChild(option);
  }
  
  // 월 옵션 생성
  for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month + '월';
    monthSelect.appendChild(option);
  }
  
  // 일 옵션 생성
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day + '일';
    daySelect.appendChild(option);
  }
  
  // 월 변경 시 일 수 조정
  yearSelect.addEventListener('change', updateDays);
  monthSelect.addEventListener('change', updateDays);
  
  function updateDays() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    
    if (!year || !month) return;
    
    const daysInMonth = new Date(year, month, 0).getDate();
    const currentDay = parseInt(daySelect.value);
    
    // 일 옵션 업데이트
    daySelect.innerHTML = '<option value="">일</option>';
    for (let day = 1; day <= daysInMonth; day++) {
      const option = document.createElement('option');
      option.value = day;
      option.textContent = day + '일';
      if (day === currentDay && currentDay <= daysInMonth) {
        option.selected = true;
      }
      daySelect.appendChild(option);
    }
  }
}

/**
 * 폼 제출 처리
 */
function initFormSubmit() {
  const form = document.getElementById('tarotForm');
  const categoryError = document.getElementById('categoryError');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 유효성 검사
    const isValid = validateForm();
    
    if (isValid) {
      // 데이터 수집 및 저장
      saveUserInfo();
      
      // 카드 선택 페이지로 이동
      navigateToCards();
    }
  });
  
  /**
   * 폼 유효성 검사
   */
  function validateForm() {
    let isValid = true;
    
    // 생년월일 검사
    const year = document.getElementById('birthYear').value;
    const month = document.getElementById('birthMonth').value;
    const day = document.getElementById('birthDay').value;
    
    if (!year || !month || !day) {
      alert('생년월일을 선택해주세요.');
      return false;
    }
    
    // 기간 검사
    const period = document.getElementById('period').value;
    if (!period) {
      alert('검사 기간을 선택해주세요.');
      return false;
    }
    
    // 카테고리 검사 (최소 1개)
    const categories = document.querySelectorAll('input[name="category"]:checked');
    if (categories.length === 0) {
      categoryError.classList.add('is-visible');
      return false;
    } else {
      categoryError.classList.remove('is-visible');
    }
    
    return isValid;
  }
  
  /**
   * 사용자 정보 저장
   */
  function saveUserInfo() {
    const userInfo = {
      birthdate: {
        year: document.getElementById('birthYear').value,
        month: document.getElementById('birthMonth').value,
        day: document.getElementById('birthDay').value
      },
      gender: document.querySelector('input[name="gender"]:checked').value,
      period: document.getElementById('period').value,
      categories: Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value),
      cardCount: parseInt(document.querySelector('input[name="cardCount"]:checked').value)
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  
  /**
   * 카드 선택 페이지로 이동
   */
  function navigateToCards() {
    // 페이지 전환 효과
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
      transition.classList.add('is-active');
    }, 10);
    
    setTimeout(() => {
      window.location.href = 'tarot-cards.html';
    }, 500);
  }
}

// 카테고리 체크박스 클릭 시 에러 메시지 숨기기
document.querySelectorAll('input[name="category"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const categoryError = document.getElementById('categoryError');
    const checkedCount = document.querySelectorAll('input[name="category"]:checked').length;
    
    if (checkedCount > 0) {
      categoryError.classList.remove('is-visible');
    }
  });
});

