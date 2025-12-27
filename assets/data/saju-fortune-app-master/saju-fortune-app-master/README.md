# 사주 팔자 앱 (Saju Fortune Telling App)

## 📋 프로젝트 소개 (Project Description)

**한국어:**
전통적인 한국의 사주 팔자를 웹 브라우저에서 간편하게 볼 수 있는 애플리케이션입니다. 생년월일시를 입력하면 사주 팔자의 네 기둥(년주, 월주, 일주, 시주)을 계산하고, 각 기둥의 천간과 지지, 그리고 오행 속성을 보여줍니다.

**English:**
A web application for Korean traditional fortune-telling (Saju) that allows users to easily calculate their Four Pillars of Destiny in a web browser. Users input their birth date and time to get their four pillars (Year, Month, Day, Hour) with corresponding heavenly stems, earthly branches, and five elements.

## ✨ 주요 기능 (Features)

- 🗺️ 생년월일시 입력을 통한 사주 계산
- 🐉 십이지신(12 zodiac animals) 표시
- 🌟 오행(五行) 분석 및 색상 구분
- 📱 반응형 웹 디자인 (모바일 최적화)
- 🎨 한국어 폰트 지원 (Noto Sans Korean)
- 💫 개인 운세 해석 제공
- 🌌 한국천문연구원 API 연동 (정확한 음양력 변환)
- 🌸 24절기 정보 제공
- 🌙 월령(달의 위상) 정보
- 🌅 해달 출몰시각 정보

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Design:** 반응형 웹 디자인, CSS Grid/Flexbox
- **API:** 한국천문연구원 공공데이터 API
- **Fonts:** Google Fonts (Noto Sans KR)
- **Version Control:** Git

## 📁 프로젝트 구조 (Project Structure)

```
saju-fortune-app/
├── index.html          # 메인 HTML 파일
├── css/
│   └── styles.css      # 스타일시트
├── js/
│   └── app.js          # JavaScript 로직
├── assets/             # 이미지 및 기타 자산
├── src/                # 추가 소스 파일
├── package.json        # Node.js 패키지 정보
└── README.md          # 프로젝트 문서
```

## 🚀 설치 및 실행 (Installation & Usage)

### 로컬 개발 환경

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd saju-fortune-app
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **API 키 설정** (선택사항)
   - `config/api-config.js` 파일에서 API 키 설정
   - 공공데이터포털(data.go.kr)에서 한국천문연구원 서비스 신청
   - 자세한 설정 방법: `config/api-setup-guide.md` 참조

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   또는 간단히 `index.html` 파일을 웹 브라우저에서 열기

### 브라우저에서 직접 실행

`index.html` 파일을 더블클릭하거나 웹 브라우저에 드래그하여 바로 실행할 수 있습니다.

### API 테스트

`test/api-test.html`을 열어서 한국천문연구원 API 연동을 테스트할 수 있습니다.

## 📖 사용 방법 (How to Use)

1. **생년월일 입력**: 태어난 해, 월, 일을 입력합니다
2. **생시 선택**: 전통적인 12시간 체계(자시~해시)에서 태어난 시간을 선택합니다
3. **성별 선택**: 남성 또는 여성을 선택합니다
4. **사주 보기 버튼 클릭**: 결과가 화면에 표시됩니다

## 🔮 사주 구성 요소 (Saju Components)

### 사주 팔자 (Four Pillars)
- **년주 (年柱)**: 출생 연도 기반
- **월주 (月柱)**: 출생 월 기반  
- **일주 (日柱)**: 출생 일 기반
- **시주 (時柱)**: 출생 시간 기반

### 오행 (Five Elements)
- **목 (木)**: 나무 - 성장, 창조력
- **화 (火)**: 불 - 열정, 에너지
- **토 (土)**: 흙 - 안정, 포용력
- **금 (金)**: 금속 - 정확함, 결단력
- **수 (水)**: 물 - 지혜, 유연함

### 십이지 (12 Zodiac Animals)
쥐, 소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지

## ⚠️ 주의사항 (Important Notes)

- 이 앱은 **교육 및 오락 목적**으로 제작되었습니다
- 실제 사주 해석은 복잡한 이론과 경험이 필요합니다
- 결과는 **참고용**으로만 사용하시기 바랍니다
- 실제 운명은 개인의 노력과 선택에 따라 달라집니다

## 🛠️ 개발 정보 (Development Info)

### NPM Scripts
```bash
npm run start    # Live server 실행
npm run dev      # 개발 모드 실행
npm run build    # 빌드 (현재 미구현)
npm run test     # 테스트 (현재 미구현)
```

### 브라우저 지원
- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 🤝 기여하기 (Contributing)

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스 (License)

MIT License - 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 참고 자료 (References)

- 한국 전통 사주학 이론
- 십간십이지 체계
- 오행상생상극 이론
- 한국천문연구원 음양력 변환 자료

---

**개발자**: Your Name  
**이메일**: your.email@example.com  
**개발 시작일**: 2024년

> 💡 **팁**: 더 정확한 사주 해석을 원하시면 전문 사주학자에게 상담받으시기를 권합니다.