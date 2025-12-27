/**
 * AI 오은영 박사님의 심리상담소
 * Gemini API를 사용한 AI 심리 상담 기능
 */

(function() {
  'use strict';

  // API Key - 실제 사용 시 설정 필요
  const API_KEY = ""; // Gemini API 키를 여기에 입력하세요
  
  // 상태 관리
  const state = {
    profile: {
      name: '',
      birthdate: '',
      gender: 'female',
      mbti: '',
      familyDynamic: ''
    },
    balanceValue: 50,
    inputText: '',
    isLoading: false,
    response: null,
    analysisData: null,
    generatedImageUrl: null,
    imageQuote: null,
    isImageLoading: false
  };

  // DOM 요소
  const elements = {
    profileName: document.getElementById('profile-name'),
    profileBirthdate: document.getElementById('profile-birthdate'),
    profileGender: document.getElementById('profile-gender'),
    profileMbti: document.getElementById('profile-mbti'),
    profileFamily: document.getElementById('profile-family'),
    familyPlaceholder: document.getElementById('family-placeholder'),
    balanceSlider: document.getElementById('balance-slider'),
    balanceLabel: document.getElementById('balance-label'),
    balanceDesc: document.getElementById('balance-desc'),
    worryInput: document.getElementById('worry-input'),
    textareaPlaceholder: document.getElementById('textarea-placeholder'),
    submitBtn: document.getElementById('submit-btn'),
    submitText: document.getElementById('submit-text'),
    submitIcon: document.getElementById('submit-icon'),
    submitLoader: document.getElementById('submit-loader'),
    responseSection: document.getElementById('response-section'),
    analysisCard: document.getElementById('analysis-card'),
    responseContent: document.getElementById('response-content'),
    shareBtn: document.getElementById('share-btn'),
    downloadBtn: document.getElementById('download-btn'),
    resetBtn: document.getElementById('reset-btn'),
    imageContainer: document.getElementById('image-container'),
    imageLoading: document.getElementById('image-loading'),
    imageWrapper: document.getElementById('image-wrapper'),
    generatedImage: document.getElementById('generated-image'),
    imageOverlay: document.getElementById('image-overlay'),
    saveImageBtn: document.getElementById('save-image-btn')
  };

  // 나이 계산
  function calculateAge(birthdate) {
    if (!birthdate) return null;
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // 밸런스 레이블 업데이트
  function updateBalanceLabel(value) {
    const fPercent = 100 - value;
    const tPercent = value;
    
    let title, desc;
    if (value < 20) {
      title = "따뜻한 위로 중심";
      desc = `공감 ${fPercent}% | 조언 ${tPercent}% - 마음을 깊이 어루만져 드릴게요.`;
    } else if (value > 80) {
      title = "현실적 해결 중심";
      desc = `공감 ${fPercent}% | 조언 ${tPercent}% - 객관적인 분석과 해결책을 드려요.`;
    } else {
      title = "황금 밸런스";
      desc = `공감 ${fPercent}% | 조언 ${tPercent}% - 따뜻한 공감과 현실적 조언을 균형있게 드려요.`;
    }
    
    elements.balanceLabel.textContent = title;
    elements.balanceDesc.textContent = desc;
    state.balanceValue = value;
  }

  // 이벤트 리스너 설정
  function setupEventListeners() {
    // 프로필 입력
    elements.profileName.addEventListener('input', (e) => {
      state.profile.name = e.target.value;
    });

    elements.profileBirthdate.addEventListener('change', (e) => {
      state.profile.birthdate = e.target.value;
    });

    elements.profileGender.addEventListener('change', (e) => {
      state.profile.gender = e.target.value;
    });

    elements.profileMbti.addEventListener('input', (e) => {
      state.profile.mbti = e.target.value;
    });

    elements.profileFamily.addEventListener('input', (e) => {
      state.profile.familyDynamic = e.target.value;
      
      // 플레이스홀더 표시/숨김
      if (elements.familyPlaceholder) {
        if (e.target.value.length > 0) {
          elements.familyPlaceholder.classList.add('hidden');
        } else {
          elements.familyPlaceholder.classList.remove('hidden');
        }
      }
    });

    // 밸런스 슬라이더
    elements.balanceSlider.addEventListener('input', (e) => {
      updateBalanceLabel(parseInt(e.target.value));
    });

    // 고민 입력
    elements.worryInput.addEventListener('input', (e) => {
      state.inputText = e.target.value;
      
      // 플레이스홀더 표시/숨김
      if (e.target.value.length > 0) {
        elements.textareaPlaceholder.classList.add('hidden');
      } else {
        elements.textareaPlaceholder.classList.remove('hidden');
      }
      
      // 자동 높이 조절
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
      
      // 제출 버튼 활성화/비활성화
      elements.submitBtn.disabled = !e.target.value.trim();
    });

    // 제출 버튼
    elements.submitBtn.addEventListener('click', handleConsultation);

    // 공유 버튼
    elements.shareBtn.addEventListener('click', handleShare);

    // 다운로드 버튼
    elements.downloadBtn.addEventListener('click', handleDownload);

    // 리셋 버튼
    elements.resetBtn.addEventListener('click', handleReset);

    // 이미지 저장 버튼
    if (elements.saveImageBtn) {
      elements.saveImageBtn.addEventListener('click', handleSaveImage);
    }
  }

  // 상담 시작
  async function handleConsultation() {
    if (!state.inputText.trim()) return;
    
    if (!API_KEY) {
      alert('API 키가 설정되지 않았습니다. 관리자에게 문의하세요.');
      return;
    }

    elements.submitBtn.disabled = true;
    elements.submitText.textContent = '오은영 박사님이 분석중입니다...';
    elements.submitIcon.style.display = 'none';
    elements.submitLoader.style.display = 'inline-block';
    
    state.isLoading = true;
    state.response = null;
    state.analysisData = null;
    state.generatedImageUrl = null;
    state.imageQuote = null;
    state.isImageLoading = true;

    const age = calculateAge(state.profile.birthdate);
    const ageString = age ? `만 ${age}세` : '연령 미상';
    
    const tPercent = state.balanceValue;
    const fPercent = 100 - state.balanceValue;

    try {
      const systemPrompt = `
        당신은 대한민국 최고의 정신건강의학과 전문의 '오은영 박사'의 페르소나를 가진 AI 심리상담사입니다.
        내담자의 프로필(나이 포함)과 가족 관계, 그리고 현재의 고민을 종합적으로 통합 분석하여 심층 상담을 진행해주세요.
        
        **중요: 내담자가 요청한 상담 스타일 비율은 [감성적 공감(F): ${fPercent}% / 현실적 조언(T): ${tPercent}%] 입니다. 이 비율에 맞춰 답변의 톤과 내용 구성을 반드시 조절해주세요.**

        [내담자 프로필]
        - 이름: ${state.profile.name}
        - 나이: ${ageString} (생년월일: ${state.profile.birthdate})
        - 성별: ${state.profile.gender === 'male' ? '남성' : '여성'}
        - MBTI: ${state.profile.mbti}
        - 가족 관계 및 성장 배경: ${state.profile.familyDynamic}

        [필수 지침]
        1. **형식 금지**: 답변에 '**', '##', '###', '---', '*', '-', '<h3>' 같은 마크다운 문법이나 HTML 태그를 절대 사용하지 마세요. 제목이 필요하다면 기호 없이 텍스트로만 쓰고 줄바꿈으로 구분하세요.
        2. **분량**: 답변은 아주 길고 풍성하게(최소 3000자 이상) 작성하세요.
        3. **통합 분석**: 내담자의 고민, 애착 유형, 생애 주기 과업을 연결하여 분석하세요.
        4. **전문성**: 전문 용어를 사용하되 쉽게 설명하세요.
        5. **F & T 모먼트 조화**: 설정된 비율(${fPercent}:${tPercent})을 철저히 따르세요.
        6. **맞춤 도서 추천**: 상담 마지막에 한국어 책 1권을 추천하세요.

        [추가 분석 항목 - 반드시 포함할 것]
        다음 항목들을 일반인도 쉽게 이해할 수 있도록 아주 상세하고 친절하게 풀어서 설명해주세요. 각 항목은 제목 기호(#) 없이 텍스트로 구분하세요.
        
        1. **내 마음의 방패 분석 (방어기제)**: 내담자가 현재 무의식적으로 주로 사용하는 방어기제 패턴을 분석해주고, 이를 더 성숙하고 건강하게(예: 유머, 이타주의, 승화 등) 풀 수 있는 '건강한 방어기제 패턴'을 제시해주세요.
        2. **대인관계 처방전**: 내담자의 성향과 잘 맞는 사람(Good Match)과 갈등이 생기기 쉬운 안 맞는 사람(Bad Match)의 특징을 알려주세요.
        3. **나에게 맞는 환경 분석**: 내 성격의 장점과 약점을 분석하고, 내 능력이 가장 잘 발휘될 수 있는 환경과 스트레스를 받는 최악의 환경을 현실적으로 조언해주세요.
        4. **현실 행동 솔루션**: 내 문제점을 개선하기 위해 당장 오늘부터 적용할 수 있는 아주 구체적이고 현실적인 행동 방안 3가지를 제시해주세요.

        [데이터 출력 포맷 - 매우 중요]
        답변의 맨 마지막에 반드시 아래와 같은 형식으로 데이터를 추가로 출력해주세요. 이 데이터는 UI 카드 생성 및 이미지 생성에 사용됩니다.
        
        [[DATA_START]]
        KEYWORD: (내담자의 현재 상태를 나타내는 짧고 감성적인 키워드, 예: #유리멘탈_극복중, #새벽감성_치유)
        BATTERY: (내담자의 마음 에너지 예상 잔량을 0~100 사이 숫자로만 표기)
        COLOR: (내담자에게 필요한 힐링 컬러 Hex Code, 예: #FFD700)
        MISSION: (오늘 당장 할 수 있는 아주 쉽고 귀여운 미션 1가지, 예: 퇴근길에 하늘 사진 찍기)
        SHORT_QUOTE: (카드에 들어갈 20자 이내의 짧고 강력한 위로의 한 문장)
        IMAGE_PROMPT: (이미지 생성 모델을 위한 상세한 프롬프트. 내담자의 나이대와 성별을 고려한 모습, 그리고 고민의 내용이 반영된 분위기를 묘사. 예: A comforting photograph of a young woman in her 20s sitting by a window, looking pensive but hopeful, with warm light. She is holding a cup of tea. The overall mood is peaceful and healing.)
        IMAGE_QUOTE: (이미지 위에 오버레이 될, 내담자에게 가장 필요한 짧고 임팩트 있는 위로의 글귀. 15자 이내. 예: 당신은 혼자가 아니에요.)
        [[DATA_END]]
      `;

      const userQuery = `내담자의 고민 내용: ${state.inputText}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!aiText) {
        throw new Error('AI 응답을 받을 수 없습니다.');
      }
      
      // 데이터 파싱
      let parsedResponse = aiText;
      let metaData = {
        keyword: "#마음치유",
        battery: 50,
        color: "#8C6D58",
        mission: "따뜻한 차 한 잔 마시기",
        quote: "당신은 충분히 잘하고 있어요.",
        imagePrompt: null,
        imageQuote: null
      };

      if (aiText.includes('[[DATA_START]]')) {
        const parts = aiText.split('[[DATA_START]]');
        parsedResponse = parts[0].trim();
        const dataPart = parts[1].replace('[[DATA_END]]', '').trim();
        
        // 데이터 추출
        const extract = (key) => {
          const regex = new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z_]+:|$)`, 'is');
          const match = dataPart.match(regex);
          return match ? match[1].trim() : null;
        };

        metaData = {
          keyword: extract('KEYWORD') || metaData.keyword,
          battery: parseInt(extract('BATTERY')) || 50,
          color: extract('COLOR') || metaData.color,
          mission: extract('MISSION') || metaData.mission,
          quote: extract('SHORT_QUOTE') || metaData.quote,
          imagePrompt: extract('IMAGE_PROMPT'),
          imageQuote: extract('IMAGE_QUOTE')
        };
      }
      
      // 마크다운 제거 (향상된 버전)
      parsedResponse = parsedResponse
        .replace(/\*\*/g, '')
        .replace(/###/g, '')
        .replace(/##/g, '')
        .replace(/---/g, '')
        .replace(/\*/g, '•')
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/^#+\s*/gm, '');

      state.response = parsedResponse;
      state.analysisData = metaData;
      state.imageQuote = metaData.imageQuote;

      displayResults();

      // 결과로 스크롤
      setTimeout(() => {
        elements.responseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      // 이미지 생성 요청 (metaData.imagePrompt가 있을 경우에만)
      if (metaData.imagePrompt && API_KEY && elements.imageContainer) {
        // 이미지 로딩 표시
        if (elements.imageLoading) {
          elements.imageContainer.style.display = 'block';
          elements.imageLoading.style.display = 'flex';
          if (elements.imageWrapper) {
            elements.imageWrapper.style.display = 'none';
          }
        }

        try {
          const imageResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                instances: [{ prompt: metaData.imagePrompt }],
                parameters: { sampleCount: 1 },
              }),
            }
          );

          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            if (imageData.predictions && imageData.predictions.length > 0) {
              const base64Image = imageData.predictions[0].bytesBase64Encoded;
              state.generatedImageUrl = `data:image/png;base64,${base64Image}`;
              displayImage();
            }
          } else {
            console.error("Image generation failed");
            // 이미지 생성 실패 시 컨테이너 숨김
            if (elements.imageContainer) {
              elements.imageContainer.style.display = 'none';
            }
          }
        } catch (imageError) {
          console.error("Image generation error:", imageError);
          // 이미지 생성 오류 시 컨테이너 숨김
          if (elements.imageContainer) {
            elements.imageContainer.style.display = 'none';
          }
        } finally {
          state.isImageLoading = false;
          if (elements.imageLoading) {
            elements.imageLoading.style.display = 'none';
          }
        }
      } else {
        state.isImageLoading = false;
        // 이미지 프롬프트가 없으면 컨테이너 숨김
        if (elements.imageContainer) {
          elements.imageContainer.style.display = 'none';
        }
      }

    } catch (error) {
      console.error("Error:", error);
      state.response = "죄송합니다. 잠시 연결이 원활하지 않습니다. 잠시 후 다시 마음을 들려주세요.";
      state.analysisData = {
        keyword: "#연결_실패",
        battery: 30,
        color: "#FF6B6B",
        mission: "잠시 후 다시 시도해보세요",
        quote: "연결이 끊겼지만 당신은 혼자가 아니에요.",
        imagePrompt: null,
        imageQuote: null
      };
      state.isImageLoading = false;
      displayResults();
    } finally {
      elements.submitBtn.disabled = false;
      elements.submitText.textContent = '심층 심리상담 시작하기';
      elements.submitIcon.style.display = 'inline-block';
      elements.submitLoader.style.display = 'none';
      state.isLoading = false;
    }
  }

  // 결과 표시
  function displayResults() {
    if (!state.response) return;

    // 상담 내용 표시
    elements.responseContent.textContent = state.response;
    
    // 분석 데이터 표시
    if (state.analysisData) {
      const data = state.analysisData;
      
      // 날짜
      document.getElementById('analysis-date').textContent = 
        new Date().toLocaleDateString('ko-KR') + ' | ' + (state.profile.name || '내담자') + '님';
      
      // 배터리
      const batteryPercent = data.battery;
      const batteryBar = document.getElementById('battery-bar');
      const batteryPercentEl = document.getElementById('battery-percent');
      const batteryIcon = document.getElementById('battery-icon');
      
      batteryBar.style.width = batteryPercent + '%';
      batteryPercentEl.textContent = batteryPercent + '%';
      
      if (batteryPercent < 30) {
        batteryBar.classList.add('low');
        batteryBar.classList.remove('high');
        batteryIcon.setAttribute('stroke', '#FF6B6B');
      } else {
        batteryBar.classList.remove('low');
        batteryBar.classList.add('high');
        batteryIcon.setAttribute('stroke', '#6BCB77');
      }
      
      // 키워드
      document.getElementById('keyword-text').textContent = data.keyword;
      
      // 컬러
      const colorEl = document.getElementById('color-text');
      colorEl.textContent = '● 행운 컬러';
      colorEl.style.color = data.color;
      
      // 미션
      document.getElementById('mission-text').textContent = data.mission;
      
      // 명언
      document.getElementById('quote-text').textContent = '"' + data.quote + '"';
    }
    
    // 결과 섹션 표시
    elements.responseSection.style.display = 'block';
  }

  // 이미지 표시
  function displayImage() {
    if (!state.generatedImageUrl || !elements.imageContainer) return;

    if (elements.imageLoading) {
      elements.imageLoading.style.display = 'none';
    }

    if (elements.imageWrapper && elements.generatedImage) {
      elements.generatedImage.src = state.generatedImageUrl;
      
      // 이미지 오버레이에 quote 표시
      if (elements.imageOverlay && state.imageQuote) {
        elements.imageOverlay.textContent = state.imageQuote;
      }

      elements.imageWrapper.style.display = 'block';
      elements.imageContainer.style.display = 'block';
    }
  }

  // 이미지 저장 기능
  function handleSaveImage() {
    if (!state.generatedImageUrl) return;

    const link = document.createElement('a');
    link.href = state.generatedImageUrl;
    link.download = '마음처방전_이미지_' + Date.now() + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 공유 기능
  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'AI 오은영 박사님의 심리상담소',
        text: '나의 마음 처방전을 확인해보세요',
        url: url
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  }

  // 클립보드 복사
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('상담소 주소가 복사되었습니다. 소중한 지인에게 공유해보세요!');
    }).catch(() => {
      alert('공유 기능을 사용할 수 없습니다. 주소를 수동으로 복사해주세요.');
    });
  }

  // 다운로드 기능
  async function handleDownload() {
    if (typeof html2canvas === 'undefined') {
      alert('다운로드 기능을 사용할 수 없습니다.');
      return;
    }

    try {
      const resultCard = document.querySelector('.counseling-result-card');
      const canvas = await html2canvas(resultCard, {
        backgroundColor: '#FEFCF9',
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'mind-prescription-' + Date.now() + '.png';
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    }
  }

  // 리셋 기능
  function handleReset() {
    // 상태 초기화
    state.profile = {
      name: '',
      birthdate: '',
      gender: 'female',
      mbti: '',
      familyDynamic: ''
    };
    state.balanceValue = 50;
    state.inputText = '';
    state.response = null;
    state.analysisData = null;
    
    // 폼 초기화
    elements.profileName.value = '';
    elements.profileBirthdate.value = '';
    elements.profileGender.value = 'female';
    elements.profileMbti.value = '';
    elements.profileFamily.value = '';
    elements.balanceSlider.value = 50;
    elements.worryInput.value = '';
    elements.worryInput.style.height = 'auto';
    
    // 이미지 관련 초기화
    state.generatedImageUrl = null;
    state.imageQuote = null;
    state.isImageLoading = false;
    if (elements.imageContainer) {
      elements.imageContainer.style.display = 'none';
    }
    if (elements.imageLoading) {
      elements.imageLoading.style.display = 'none';
    }
    if (elements.imageWrapper) {
      elements.imageWrapper.style.display = 'none';
    }
    
    // UI 업데이트
    updateBalanceLabel(50);
    elements.textareaPlaceholder.classList.remove('hidden');
    if (elements.familyPlaceholder) {
      elements.familyPlaceholder.classList.remove('hidden');
    }
    elements.responseSection.style.display = 'none';
    elements.submitBtn.disabled = true;
    
    // 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 초기화
  function init() {
    setupEventListeners();
    updateBalanceLabel(50);
    
    // 현재 연도 설정
    const yearEl = document.getElementById('this-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // DOM 로드 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

