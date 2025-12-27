// Saju Fortune Telling App - Main JavaScript Logic

// Traditional Korean elements and zodiac data
const heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
const zodiacAnimals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];
const elements = ['목', '화', '토', '금', '수']; // Wood, Fire, Earth, Metal, Water

// 천간의 오행 배속 (갑을-목, 병정-화, 무기-토, 경신-금, 임계-수)
const stemElements = ['목', '목', '화', '화', '토', '토', '금', '금', '수', '수'];

// 지지의 오행 배속
const branchElements = ['수', '토', '목', '목', '토', '화', '화', '토', '금', '금', '토', '수'];

// 24절기 데이터 (월별 절기 시작일 - 근사치)
const solarTerms = {
  1: { start: 6, name: '소한' },
  2: { start: 4, name: '입춘' },
  3: { start: 6, name: '경칩' },
  4: { start: 5, name: '청명' },
  5: { start: 6, name: '입하' },
  6: { start: 6, name: '망종' },
  7: { start: 7, name: '소서' },
  8: { start: 8, name: '입추' },
  9: { start: 8, name: '백로' },
  10: { start: 8, name: '한로' },
  11: { start: 8, name: '입동' },
  12: { start: 7, name: '대설' }
};

// Element colors for display
const elementColors = {
  '목': '#22c55e',
  '화': '#ef4444',
  '토': '#eab308',
  '금': '#64748b',
  '수': '#3b82f6'
};

// Zodiac animal characteristics in Korean
const animalCharacteristics = {
  '쥐': '영리하고 적응력이 뛰어나며 사업수완이 좋습니다.',
  '소': '성실하고 끈기가 있으며 신뢰할 수 있는 성격입니다.',
  '호랑이': '용감하고 리더십이 강하며 정의감이 넘칩니다.',
  '토끼': '온화하고 섬세하며 예술적 감각이 뛰어납니다.',
  '용': '기품이 있고 창조력이 뛰어나며 큰 뜻을 품고 있습니다.',
  '뱀': '지혜롭고 신중하며 직감력이 뛰어납니다.',
  '말': '활발하고 자유로우며 모험을 좋아합니다.',
  '양': '친절하고 평화를 사랑하며 예술적 재능이 있습니다.',
  '원숭이': '재치있고 유머감각이 뛰어나며 다재다능합니다.',
  '닭': '부지런하고 완벽주의 성향이 있으며 책임감이 강합니다.',
  '개': '충성심이 강하고 정직하며 도덕적입니다.',
  '돼지': '관대하고 솔직하며 복이 많은 성격입니다.'
};

// Element characteristics
const elementCharacteristics = {
  '목': '성장과 발전을 상징하며, 창조력과 유연성이 특징입니다.',
  '화': '열정과 에너지를 상징하며, 활동력과 표현력이 뛰어납니다.',
  '토': '안정과 중심을 상징하며, 신뢰감과 포용력이 있습니다.',
  '금': '정확함과 완성을 상징하며, 분석력과 결단력이 특징입니다.',
  '수': '지혜와 유연함을 상징하며, 직관력과 적응력이 뛰어납니다.'
};

class SajuCalculator {
  constructor() {
    this.form = document.getElementById('saju-form');
    this.resultSection = document.getElementById('result-section');
    this.resultDiv = document.getElementById('saju-result');
    
    // 대체 데이터 소스 초기화
    this.alternativeProvider = typeof AlternativeDataProvider !== 'undefined' 
      ? new AlternativeDataProvider() : null;
    
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.calculateSaju();
      });
    }
  }

  // 음력 변환
  solarToLunar(year, month, day) {
    if (this.alternativeProvider) {
      try {
        const result = this.alternativeProvider.convertSolarToLunar(year, month, day);
        return {
          year: result.lunarYear,
          month: result.lunarMonth,
          day: result.lunarDay,
          isLeap: result.isLeapMonth
        };
      } catch (error) {
        console.warn('대체 음력 변환 실패, 로컬 계산 사용:', error);
      }
    }
    
    // Fallback: 기존 로컬 계산
    const baseDate = new Date(1900, 0, 31);
    const inputDate = new Date(year, month - 1, day);
    const daysDiff = Math.floor((inputDate - baseDate) / (1000 * 60 * 60 * 24));
    
    const lunarMonthLength = 29.53059;
    const totalLunarMonths = Math.floor(daysDiff / lunarMonthLength);
    
    let lunarYear = 1900 + Math.floor(totalLunarMonths / 12);
    let lunarMonth = (totalLunarMonths % 12) + 1;
    let lunarDay = Math.floor((daysDiff % lunarMonthLength) + 1);
    
    if (lunarDay > 30) lunarDay = 30;
    else if (lunarDay <= 0) lunarDay = 1;
    
    return { year: lunarYear, month: lunarMonth, day: lunarDay, isLeap: false };
  }

  // 사주 팔자 계산
  calculateFourPillars(year, month, day, hour) {
    const lunar = this.solarToLunar(year, month, day);
    
    // 년주 계산
    const yearFrom1984 = lunar.year - 1984;
    const yearStemIndex = (yearFrom1984 % 10 + 10) % 10;
    const yearBranchIndex = (yearFrom1984 % 12 + 12) % 12;
    
    // 월주 계산
    let adjustedMonth = lunar.month;
    if (day < solarTerms[month].start) {
      adjustedMonth = month - 1;
      if (adjustedMonth <= 0) adjustedMonth = 12;
    } else {
      adjustedMonth = month;
    }
    
    const monthStemIndex = (yearStemIndex * 2 + adjustedMonth + 1) % 10;
    const monthBranchIndex = (adjustedMonth + 1) % 12;
    
    // 일주 계산
    const baseDate = new Date(1900, 0, 1);
    const currentDate = new Date(year, month - 1, day);
    const daysDiff = Math.floor((currentDate - baseDate) / (1000 * 60 * 60 * 24));
    
    const dayStemIndex = (daysDiff + 6) % 10;
    const dayBranchIndex = (daysDiff + 2) % 12;
    
    // 시주 계산
    const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
    const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;

    return {
      year: {
        stem: heavenlyStems[yearStemIndex],
        branch: earthlyBranches[yearBranchIndex],
        animal: zodiacAnimals[yearBranchIndex],
        element: stemElements[yearStemIndex]
      },
      month: {
        stem: heavenlyStems[monthStemIndex],
        branch: earthlyBranches[monthBranchIndex],
        animal: zodiacAnimals[monthBranchIndex],
        element: stemElements[monthStemIndex]
      },
      day: {
        stem: heavenlyStems[dayStemIndex],
        branch: earthlyBranches[dayBranchIndex],
        animal: zodiacAnimals[dayBranchIndex],
        element: stemElements[dayStemIndex]
      },
      hour: {
        stem: heavenlyStems[hourStemIndex],
        branch: earthlyBranches[hourBranchIndex],
        animal: zodiacAnimals[hourBranchIndex],
        element: stemElements[hourStemIndex]
      }
    };
  }

  // 해석 생성
  generateInterpretation(pillars, gender) {
    const yearAnimal = pillars.year.animal;
    const dayElement = pillars.day.element;
    
    let interpretation = `<div class="interpretation">`;
    interpretation += `<h3>🐯 띠별 성격</h3>`;
    interpretation += `<p><strong>${yearAnimal}띠</strong>: ${animalCharacteristics[yearAnimal]}</p>`;
    
    interpretation += `<h3>🌟 오행 특성</h3>`;
    interpretation += `<p><strong>일간의 오행 (${dayElement})</strong>: ${elementCharacteristics[dayElement]}</p>`;
    
    interpretation += `<h3>💫 종합 운세</h3>`;
    
    const elements = [pillars.year.element, pillars.month.element, pillars.day.element, pillars.hour.element];
    const elementCount = {};
    elements.forEach(el => {
      elementCount[el] = (elementCount[el] || 0) + 1;
    });
    
    const dominantElement = Object.keys(elementCount).reduce((a, b) => elementCount[a] > elementCount[b] ? a : b);
    
    interpretation += `<p>사주에서 <strong>${dominantElement}</strong> 기운이 강하게 나타나 ${elementCharacteristics[dominantElement]}</p>`;
    
    if (gender === 'male') {
      interpretation += `<p>남성으로서 강인함과 추진력을 바탕으로 목표를 달성할 수 있는 기운이 있습니다.</p>`;
    } else {
      interpretation += `<p>여성으로서 섬세함과 직감을 활용하여 조화로운 삶을 영위할 수 있는 기운이 있습니다.</p>`;
    }
    
    interpretation += `<em>※ 이 결과는 참고용이며, 실제 운명은 개인의 노력과 선택에 따라 달라집니다.</em>`;
    interpretation += `</div>`;
    
    return interpretation;
  }

  async calculateSaju() {
    const year = parseInt(document.getElementById('birth-year').value);
    const month = parseInt(document.getElementById('birth-month').value);
    const day = parseInt(document.getElementById('birth-day').value);
    const hour = parseInt(document.getElementById('birth-hour').value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (!year || !month || !day || hour === null || !gender) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    // 사주 팔자 계산
    const pillars = this.calculateFourPillars(year, month, day, hour);

    // 결과 표시
    this.displayResults(pillars, gender);
    
    // 결과 섹션 표시
    this.resultSection.style.display = 'block';
    this.resultSection.scrollIntoView({ behavior: 'smooth' });
  }

  displayResults(pillars, gender) {
    let html = `
      <div class="saju-pillars">
        <div class="pillar">
          <div class="pillar-title">년주 (年柱)</div>
          <div class="pillar-content" style="color: ${elementColors[pillars.year.element]}">
            ${pillars.year.stem}${pillars.year.branch}<br>
            <small>${pillars.year.animal} (${pillars.year.element})</small>
          </div>
        </div>
        <div class="pillar">
          <div class="pillar-title">월주 (月柱)</div>
          <div class="pillar-content" style="color: ${elementColors[pillars.month.element]}">
            ${pillars.month.stem}${pillars.month.branch}<br>
            <small>${pillars.month.animal} (${pillars.month.element})</small>
          </div>
        </div>
        <div class="pillar">
          <div class="pillar-title">일주 (日柱)</div>
          <div class="pillar-content" style="color: ${elementColors[pillars.day.element]}">
            ${pillars.day.stem}${pillars.day.branch}<br>
            <small>${pillars.day.animal} (${pillars.day.element})</small>
          </div>
        </div>
        <div class="pillar">
          <div class="pillar-title">시주 (時柱)</div>
          <div class="pillar-content" style="color: ${elementColors[pillars.hour.element]}">
            ${pillars.hour.stem}${pillars.hour.branch}<br>
            <small>${pillars.hour.animal} (${pillars.hour.element})</small>
          </div>
        </div>
      </div>
    `;

    html += this.generateInterpretation(pillars, gender);

    this.resultDiv.innerHTML = html;
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new SajuCalculator();
});

