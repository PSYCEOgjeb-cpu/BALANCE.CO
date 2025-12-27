# 명리학 & 주역 학습 앱 자료 연구

## 🎯 학습 목표
**세계 최고 수준의 명리학 및 주역 교육 플랫폼 구축**

- 전통 이론의 정확한 전수
- 현대적 해석과 응용 방법
- 실전 감정 및 상담 능력 배양
- 학문적 깊이와 실용성의 균형

---

## 📚 기초학습 자료 목록 (체계적 학습법 기반)

### 🎯 학습 철학과 마음가짐
- 장기적 관점: 최소 5-10년의 꾸준한 정진
- 학문적 탐구: 단순 점술이 아닌 삶의 패턴 분석 학문
- 균형잡힌 시각: 현실과 이론의 조화, 운명론이 아닌 자기이해와 선택의 지혜
- 목표: 스스로와 타인을 돕는 현명한 조언자 되기

### 🔥 명리학 기초 이론 (5단계 체계)

#### 1. 천간(天干) 10개 - 기본 속성과 특성
```javascript
const heavenlyStems = {
    "갑木(甲木)": {
        element: "양목",
        nature: "큰 나무, 기둥목",
        personality: ["정직", "원칙적", "리더십", "융통성 부족"],
        season: "봄",
        direction: "동쪽",
        color: "청색",
        body_parts: ["머리", "간", "담"],
        career: ["공무원", "교육자", "관리직", "목재업"],
        relationships: {
            helps: "정화(丁)", 
            helped_by: "임수(壬)",
            conflicts: "경금(庚)",
            combines: "기토(己)"
        }
    },
    "을木(乙木)": {
        element: "음목",
        nature: "작은 나무, 풀, 꽃",
        personality: ["유연함", "적응력", "예술적", "우유부단"],
        season: "봄",
        direction: "동쪽", 
        color: "녹색",
        body_parts: ["목", "간", "어깨"],
        career: ["예술가", "디자이너", "원예", "의료진"],
        relationships: {
            helps: "병화(丙)",
            helped_by: "계수(癸)", 
            conflicts: "신금(辛)",
            combines: "경금(庚)"
        }
    },
    "병火(丙火)": {
        element: "양화",
        nature: "태양, 큰 불",
        personality: ["적극적", "열정적", "외향적", "성급함"],
        season: "여름",
        direction: "남쪽",
        color: "적색",
        body_parts: ["눈", "심장", "소장"],
        career: ["연예인", "영업직", "요식업", "전기업"],
        relationships: {
            helps: "무토(戊)",
            helped_by: "갑목(甲)",
            conflicts: "임수(壬)", 
            combines: "신금(辛)"
        }
    },
    "정火(丁火)": {
        element: "음화", 
        nature: "촛불, 작은 불",
        personality: ["세밀함", "정교함", "내향적", "완벽주의"],
        season: "여름",
        direction: "남쪽",
        color: "주황색",
        body_parts: ["혀", "심장", "혈관"],
        career: ["기술자", "연구원", "의사", "정밀업"],
        relationships: {
            helps: "기토(己)",
            helped_by: "을목(乙)",
            conflicts: "계수(癸)",
            combines: "임수(壬)"
        }
    }
    // 무토, 기토, 경금, 신금, 임수, 계수 추가 필요
};
```

#### 2. 지지(地支) 12개 - 계절과 시간의 흐름
```javascript
const earthlyBranches = {
    "자水(子水)": {
        element: "양수",
        time: "23-01시",
        month: "11월(동지달)",
        season: "겨울",
        direction: "북쪽", 
        animal: "쥐",
        characteristics: ["시작", "지혜", "음험", "변화"],
        hidden_stems: ["계수"],
        conflicts: "오화(午)",
        combines: "축토(丑)",
        triple_combo: ["신(申)", "진(辰)"] // 신자진 삼합
    },
    "축土(丑土)": {
        element: "음토",
        time: "01-03시", 
        month: "12월(소한달)",
        season: "겨울말",
        direction: "북동",
        animal: "소",
        characteristics: ["저장", "인내", "근면", "고집"],
        hidden_stems: ["기토", "계수", "신금"],
        conflicts: "미토(未)",
        combines: "자수(子)",
        triple_combo: ["사(巳)", "유(酉)"] // 사유축 삼합
    }
    // 인목, 묘목, 진토, 사화, 오화, 미토, 신금, 유금, 술토, 해수 추가 필요
};
```

#### 3. 오행(五行) 상생상극 이론
```javascript
const fiveElementsTheory = {
    elements: {
        "목(木)": {
            generates: "화(火)", // 목생화
            generated_by: "수(水)", // 수생목
            controls: "토(土)", // 목극토
            controlled_by: "금(金)", // 금극목
            season: "봄",
            emotion: "노(怒)",
            virtue: "인(仁)",
            taste: "신맛",
            organ: "간(肝)"
        },
        "화(火)": {
            generates: "토(土)", // 화생토
            generated_by: "목(木)", // 목생화
            controls: "금(金)", // 화극금
            controlled_by: "수(Water)", // 수극화
            season: "여름",
            emotion: "희(喜)",
            virtue: "예(禮)",
            taste: "쓴맛",
            organ: "심(心)"
        }
        // 토, 금, 수 추가
    },
    
    cycleTypes: {
        "정생(正生)": "자연스러운 상생",
        "역생(逆生)": "역방향 상생", 
        "정극(正克)": "자연스러운 상극",
        "반극(反克)": "역방향 상극"
    },
    
    strengthLevels: {
        "왕(旺)": "가장 강한 상태",
        "상(相)": "도움받아 강한 상태", 
        "휴(休)": "쉬고 있는 상태",
        "수(囚)": "갇힌 상태",
        "사(死)": "죽은 상태"
    }
};
```

#### 4. 십신(十神) 체계 - 인간관계의 원형
```javascript
const tenGods = {
    self_group: {
        "비견(比肩)": {
            meaning: "같은 오행, 같은 음양",
            represents: ["형제", "동료", "라이벌", "자아"],
            personality: ["독립적", "자주적", "경쟁심", "고집"],
            career: "독립업, 자영업",
            relationship: "동성 형제자매",
            positive: ["자립심", "추진력", "의지력"],
            negative: ["이기심", "고집", "협조 부족"]
        },
        "겁재(劫財)": {
            meaning: "같은 오행, 다른 음양",
            represents: ["경쟁자", "손실", "투쟁", "변화"],
            personality: ["적극적", "도전적", "변화 추구", "위험 감수"],
            career: "모험적 사업, 투기업", 
            relationship: "이성 형제자매",
            positive: ["용기", "변화 적응", "추진력"],
            negative: ["손실", "분쟁", "무모함"]
        }
    },
    
    output_group: {
        "식신(食神)": {
            meaning: "일간이 생하는 오행, 같은 음양",
            represents: ["자식", "표현", "재능", "향유"],
            personality: ["온화함", "예술적", "표현력", "낙천적"],
            career: "예술, 요리, 교육, 서비스업",
            relationship: "동성 자녀",
            positive: ["창조력", "표현력", "인기"],
            negative: ["게으름", "향락", "현실 도피"]
        },
        "상관(傷官)": {
            meaning: "일간이 생하는 오행, 다른 음양",
            represents: ["반항", "혁신", "비판", "변화"],
            personality: ["창의적", "비판적", "자유분방", "변화 추구"],
            career: "예술가, 혁신가, 비평가, 기술자",
            relationship: "이성 자녀", 
            positive: ["창조력", "혁신", "자유로움"],
            negative: ["반항", "비판", "불안정"]
        }
    },
    
    wealth_group: {
        "편재(偏財)": {
            meaning: "일간이 극하는 오행, 다른 음양",
            represents: ["유동 재산", "아버지", "여자", "사교"],
            personality: ["사교적", "관대함", "활동적", "현실적"],
            career: "영업, 무역, 서비스업, 유통업",
            relationship: "아버지, 애인",
            positive: ["사교성", "활동력", "관대함"],
            negative: ["낭비", "바람기", "경솔함"]
        },
        "정재(正財)": {
            meaning: "일간이 극하는 오행, 같은 음양", 
            represents: ["고정 재산", "아내", "안정", "보수"],
            personality: ["신중함", "계획적", "안정 추구", "보수적"],
            career: "은행업, 부동산, 공무원, 회계",
            relationship: "배우자(남성의 아내)",
            positive: ["안정성", "계획성", "신중함"],
            negative: ["보수적", "융통성 부족", "인색"]
        }
    },
    
    authority_group: {
        "편관(偏官/七殺)": {
            meaning: "일간을 극하는 오행, 다른 음양",
            represents: ["압력", "도전", "권위", "변화"],
            personality: ["강인함", "도전적", "권위적", "엄격함"],
            career: "군인, 경찰, 운동선手, 정치인",
            relationship: "상사, 경쟁자",
            positive: ["추진력", "용기", "결단력"],
            negative: ["독선", "성급함", "압박감"]
        },
        "정관(正官)": {
            meaning: "일간을 극하는 오행, 같은 음양",
            represents: ["품위", "명예", "질서", "책임"],
            personality: ["품위있음", "책임감", "질서정연", "보수적"],
            career: "공무원, 관리직, 교수, 법조인",
            relationship: "남편(여성의), 상사",
            positive: ["품위", "책임감", "신뢰성"],
            negative: ["융통성 부족", "형식주의", "권위의존"]
        }
    },
    
    support_group: {
        "편인(偏印/梟神)": {
            meaning: "일간을 생하는 오행, 다른 음양",
            represents: ["계모", "특별한 학문", "종교", "신비"],
            personality: ["독특함", "신비적", "학구적", "예민함"],
            career: "연구원, 종교인, 의사, 예술가",
            relationship: "계모, 스승",
            positive: ["학습능력", "직감", "전문성"],
            negative: ["고독", "편향", "현실부적응"]
        },
        "정인(正印)": {
            meaning: "일간을 생하는 오행, 같은 음양",
            represents: ["어머니", "학문", "명예", "보호"],
            personality: ["인자함", "학구적", "보호적", "전통적"],
            career: "교육자, 학자, 종교인, 의료인",
            relationship: "어머니, 스승",
            positive: ["인자함", "학습력", "보호본능"],
            negative: ["의존적", "소극적", "이론편향"]
        }
    }
};
```

### 🔮 주역(周易) 기초 이론

#### 1. 팔괘(八卦) - 기본 우주 원리
```javascript
const eightTrigrams = {
    "건(乾)": {
        symbol: "☰",
        binary: "111",
        element: "금",
        nature: "천(天)",
        direction: "서북",
        season: "늦가을",
        family: "아버지",
        body: "머리",
        animal: "말",
        virtue: "건(健)",
        meaning: ["창조", "강건", "권위", "하늘"],
        hexagram_position: 1
    },
    "태(兌)": {
        symbol: "☱", 
        binary: "110",
        element: "금",
        nature: "택(澤)",
        direction: "서쪽", 
        season: "가을",
        family: "셋째딸",
        body: "입",
        animal: "양",
        virtue: "설(說)",
        meaning: ["기쁨", "화합", "소통", "연못"],
        hexagram_position: 58
    },
    "리(離)": {
        symbol: "☲",
        binary: "101", 
        element: "화",
        nature: "화(火)",
        direction: "남쪽",
        season: "여름",
        family: "둘째딸", 
        body: "눈",
        animal: "꿩",
        virtue: "명(明)",
        meaning: ["밝음", "문명", "아름다움", "불"],
        hexagram_position: 30
    },
    "진(震)": {
        symbol: "☳",
        binary: "100",
        element: "목", 
        nature: "뇌(雷)",
        direction: "동쪽",
        season: "봄",
        family: "장남",
        body: "발",
        animal: "용",
        virtue: "동(動)",
        meaning: ["움직임", "진동", "시작", "천둥"],
        hexagram_position: 51
    },
    "손(巽)": {
        symbol: "☴",
        binary: "011",
        element: "목",
        nature: "풍(風)", 
        direction: "동남",
        season: "늦봄",
        family: "장녀",
        body: "넓적다리",
        animal: "닭",
        virtue: "입(入)",
        meaning: ["순종", "침투", "부드러움", "바람"],
        hexagram_position: 57
    },
    "감(坎)": {
        symbol: "☵",
        binary: "010",
        element: "수",
        nature: "수(水)",
        direction: "북쪽", 
        season: "겨울",
        family: "둘째아들",
        body: "귀",
        animal: "돼지",
        virtue: "함(陷)",
        meaning: ["위험", "지혜", "유동", "물"],
        hexagram_position: 29
    },
    "간(艮)": {
        symbol: "☶",
        binary: "001",
        element: "토",
        nature: "산(山)",
        direction: "동북",
        season: "늦겨울",
        family: "셋째아들", 
        body: "손",
        animal: "개",
        virtue: "지(止)",
        meaning: ["정지", "산", "고요", "성찰"],
        hexagram_position: 52
    },
    "곤(坤)": {
        symbol: "☷",
        binary: "000", 
        element: "토",
        nature: "지(地)",
        direction: "서남",
        season: "늦여름",
        family: "어머니",
        body: "배",
        animal: "소",
        virtue: "순(順)",
        meaning: ["순종", "대지", "포용", "땅"],
        hexagram_position: 2
    }
};
```

#### 2. 64괘 체계 - 인생 상황의 모든 경우
```javascript
const sixtyFourHexagrams = {
    1: {
        name: "건위천(乾爲天)",
        structure: { upper: "건", lower: "건" },
        meaning: "강건함의 극치, 창조의 힘",
        judgment: "원형이정(元亨利貞) - 크게 형통하니 이로움이 바르다",
        image: "하늘이 연속하여 행하니, 군자가 스스로 강하여 쉬지 않는다",
        key_concepts: ["창조", "권위", "리더십", "시작"],
        life_guidance: "강인한 의지로 정도를 걸어가라",
        business: "대업 시작에 길함",
        relationships: "강한 남성적 에너지, 주도권",
        changing_lines: {
            1: "잠룡물용(潛龍勿用) - 숨어있는 용은 쓰지 말라",
            2: "견룡재전(見龍在田) - 용이 밭에 나타났다", 
            3: "군자종일건건(君子終日乾乾) - 군자는 하루종일 건실하다",
            4: "혹약재연(或躍在淵) - 혹은 연못에서 뛸 듯하다",
            5: "비룡재천(飛龍在天) - 날아오르는 용이 하늘에 있다",
            6: "항룡유회(亢龍有悔) - 높이 오른 용은 후회가 있다"
        }
    },
    2: {
        name: "곤위지(坤爲地)",
        structure: { upper: "곤", lower: "곤" },
        meaning: "순종과 포용의 덕",
        judgment: "원형 - 암말의 정조로써 이롭다",
        image: "땅의 형태는 곤이니, 군자가 후덕함으로써 물건을 실는다",
        key_concepts: ["순종", "포용", "인내", "협력"],
        life_guidance: "부드러움으로 큰 것을 이뤄라",
        business: "협력과 지지로 성공",
        relationships: "여성적 포용력, 지지역할"
    }
    // 나머지 62괘 추가 필요
};
```

---

## 🎓 고급학습 자료 목록

### 🔥 명리학 고급 이론

#### 1. 격국(格局) 이론 - 사주의 구조적 패턴
```javascript
const formationTheory = {
    regular_formations: {
        "정관격(正官格)": {
            condition: "월령에 정관이 있고 투간되어 있음",
            requirements: ["일간 적당한 강도", "정관 청순", "재성으로 생관"],
            characteristics: "품위, 명예, 안정적 성공",
            suitable_careers: ["공무원", "교사", "대기업 임직원", "법조인"],
            life_pattern: "꾸준한 상승, 사회적 인정",
            taboos: ["상관 투간", "겁재 혼잡", "정관 중복"],
            ideal_luck: ["재운", "인수운"]
        },
        "정재격(正財格)": {
            condition: "월령에 정재가 있고 투간되어 있음", 
            requirements: ["일간 건왕", "재성 청순", "관성으로 호재"],
            characteristics: "실무 능력, 경영 수완, 재물 축적",
            suitable_careers: ["사업가", "금융업", "부동산", "무역업"],
            life_pattern: "점진적 축적, 안정적 성장",
            taboos: ["비겁 투간", "상관 혼잡", "재성 중복"],
            ideal_luck: ["관운", "식상운"]
        },
        "편관격(偏官格)": {
            condition: "월령에 편관(칠살)이 있고 투간되어 있음",
            requirements: ["일간 강왕", "칠살 제어", "인수로 화살"],
            characteristics: "권위, 강인함, 도전 정신",
            suitable_careers: ["군인", "경찰", "운동선수", "정치인"],
            life_pattern: "급속한 성공, 큰 변화",
            taboos: ["칠살 무제어", "상관 투간", "재성 혼잡"],
            ideal_luck: ["인수운", "비겁운"]
        },
        "편재격(偏財格)": {
            condition: "월령에 편재가 있고 투간되어 있음",
            requirements: ["일간 건왕", "편재 청순", "식상으로 생재"],
            characteristics: "사교성, 활동력, 유동 재물",
            suitable_careers: ["영업", "서비스업", "유통업", "연예업"],
            life_pattern: "활발한 활동, 인맥을 통한 성공",
            taboos: ["비겁 혼잡", "정재 동시 투간"],
            ideal_luck: ["식상운", "관살운"]
        }
    },
    
    special_formations: {
        "건록격(建祿格)": {
            condition: "월지에 일간의 록신이 위치",
            meaning: "자립자강의 격",
            characteristics: "독립적, 자수성가, 강한 자아",
            success_condition: "재관 투간으로 용신 확립"
        },
        "양인격(羊刃格)": {
            condition: "월지에 일간의 양인이 위치", 
            meaning: "극단적 에너지의 격",
            characteristics: "극단적, 용맹, 변화 격렬",
            success_condition: "관살로 제어, 식상으로 설기"
        },
        "곡직격(曲直格)": {
            condition: "목 오행이 너무 많아 한쪽으로 치우침",
            meaning: "목의 곡직함을 따르는 격",
            characteristics: "유연함, 성장 지향, 동방 발전",
            success_condition: "수운에서 큰 발전"
        }
    },
    
    transformation_theory: {
        "화기격(化氣格)": {
            types: {
                "갑기화토": "갑목과 기토가 합하여 토로 화함",
                "을경화금": "을목과 경금이 합하여 금으로 화함", 
                "병신화수": "병화와 신금이 합하여 수로 화함",
                "정임화목": "정화와 임수가 합하여 목으로 화함",
                "무계화화": "무토와 계수가 합하여 화로 화함"
            },
            conditions: "월령의 기운을 따라 완전 변화",
            characteristics: "특별한 재능, 예술적 기질"
        }
    }
};
```

#### 2. 신살(神殺) 체계 - 특수한 길흉 요소
```javascript
const spiritualStars = {
    noble_stars: {
        "천을귀인(天乙貴人)": {
            calculation: {
                "갑무": "축미에 위치",
                "을기": "자신에 위치",
                "병정": "해유에 위치",
                "임계": "묘사에 위치",
                "경신": "인오에 위치"
            },
            meaning: "하늘의 도움, 귀인의 지원",
            effects: "위기 시 도움, 높은 사람의 발탁, 명예",
            activation: "대운이나 유년에 만날 때"
        },
        "태극귀인(太極貴人)": {
            calculation: "갑을은 자오, 병정은 묘유, 무기는 진술축미, 경신은 인신, 임계는 사해",
            meaning: "태극의 기운, 학문과 종교",
            effects: "학문 성취, 종교적 깨달음, 정신적 고양",
            characteristics: "철학적 사고, 진리 추구"
        },
        "문창귀인(文昌貴人)": {
            calculation: "년간 또는 일간으로 계산",
            meaning: "문학과 학문의 귀인",
            effects: "학업 성취, 시험 합격, 문서 관련 직업",
            suitable_fields: "교육, 출판, 문학, 연구"
        }
    },
    
    peach_blossom: {
        "도화살(桃花殺)": {
            calculation: {
                "인오술": "묘에 도화",
                "사유축": "오에 도화", 
                "신자진": "유에 도화",
                "해묘미": "자에 도화"
            },
            meaning: "이성운, 인기운",
            positive: "예술적 재능, 대인관계, 매력",
            negative: "색정 문제, 불륜, 방탕",
            management: "정신 수양으로 승화"
        },
        "홍염살(紅艶殺)": {
            calculation: "특정 간지 조합",
            meaning: "강한 이성 운과 매력",
            effects: "뛰어난 외모, 강한 매력, 예술 재능",
            caution: "감정 조절 필요"
        }
    },
    
    academic_stars: {
        "학당(學堂)": {
            calculation: "일간의 장생 위치",
            meaning: "학문과 지혜의 별", 
            effects: "학습 능력 우수, 학문적 성취",
            characteristics: "지적 호기심, 연구 능력"
        },
        "사상(詞館)": {
            calculation: "일간의 목욕 위치",
            meaning: "문학과 예술의 별",
            effects: "문학적 재능, 언어 능력, 창작력",
            suitable_careers: "작가, 기자, 방송인"
        }
    },
    
    wealth_stars: {
        "천재(天財)": {
            calculation: "월지로 계산하는 재물별",
            meaning: "하늘이 주는 재물", 
            effects: "뜻하지 않은 재물, 투자 운",
            activation_time: "특정 대운에서 크게 발복"
        },
        "금궤(金匱)": {
            calculation: "일간으로 계산",
            meaning: "금고의 열쇠",
            effects: "재물 관리 능력, 저축 운", 
            characteristics: "경제 관념 발달"
        }
    }
};
```

#### 3. 대운(大運) 분석법 - 인생 주기별 운세
```javascript
const majorLuckTheory = {
    calculation_method: {
        male_positive_female_negative: "양남음녀는 순행",
        male_negative_female_positive: "음남양녀는 역행",
        starting_age: "생일부터 절기까지의 일수 ÷ 3",
        duration: "10년마다 변화"
    },
    
    analysis_steps: [
        {
            step: 1,
            title: "대운 천간 분석",
            content: "대운 천간과 일간의 관계 (십신으로 판단)",
            importance: "주된 에너지의 방향성 결정"
        },
        {
            step: 2, 
            title: "대운 지지 분석",
            content: "대운 지지와 원국의 합충관계",
            importance: "구체적인 현실 변화 예측"
        },
        {
            step: 3,
            title: "희신-기신 판단",
            content: "대운이 원국의 용신을 돕는지 해치는지",
            importance: "길흉의 기본 판단"
        },
        {
            step: 4,
            title: "세운과의 조합",
            content: "매년 세운과 대운의 상호 작용",
            importance: "구체적인 발생 시기 예측"
        }
    ],
    
    life_stages: {
        "유년운(1-10세)": {
            themes: "가정환경, 기초 형성",
            key_factors: "부모운, 건강, 기초 교육",
            analysis_focus: "타고난 복과 가정 상황"
        },
        "청소년운(11-20세)": {
            themes: "학업, 성격 형성", 
            key_factors: "학업운, 교우관계, 진로",
            analysis_focus: "재능 발현과 방향성"
        },
        "청년운(21-30세)": {
            themes: "사회 진출, 결혼",
            key_factors: "직업운, 결혼운, 독립",
            analysis_focus: "사회적 성공 기반 구축"
        },
        "장년운(31-50세)": {
            themes: "사업 발전, 가정 완성",
            key_factors: "사업운, 재물운, 자녀운", 
            analysis_focus: "인생의 황금기 활용"
        },
        "중년운(51-70세)": {
            themes: "완숙, 지위 확립",
            key_factors: "지위운, 건강운, 명예",
            analysis_focus: "성취의 완성과 후계"
        }
    }
};
```

### 🔮 주역 고급 이론

#### 1. 변효(變爻) 해석법 - 변화의 동력학
```javascript
const changingLinesTheory = {
    basics: {
        "효(爻)": "괘를 이루는 6개의 선",
        "변효": "음에서 양으로, 양에서 음으로 변하는 효",
        "지효": "변하지 않는 효",
        "본괘": "처음 얻은 괘",
        "지괘": "변효가 변한 후의 괘"
    },
    
    interpretation_method: {
        "단일 변효": "해당 효사만 해석",
        "2개 변효": "상효를 중심으로 해석",
        "3개 변효": "지괘의 괘사로 해석", 
        "4개 변효": "지괘의 정효 2개로 해석",
        "5개 변효": "지괘의 지효로 해석",
        "6개 변효": "특수한 의미 - 완전한 변화"
    },
    
    line_positions: {
        "초효(初爻)": {
            position: "가장 아래",
            meaning: "시작, 기초, 준비",
            character: "아직 때가 이르다",
            advice: "신중히 기초를 다져라"
        },
        "이효(二爻)": {
            position: "아래서 둘째",
            meaning: "신하, 실무, 중간 관리자",
            character: "중요한 역할, 균형점",
            advice: "성실하게 본분을 다하라"
        },
        "삼효(三爻)": {
            position: "아래에서 셋째",
            meaning: "전환점, 위험, 도전",
            character: "가장 어려운 위치",
            advice: "신중하고 겸손하게 행하라"
        },
        "사효(四爻)": {
            position: "위에서 셋째",
            meaning: "근신, 보좌, 고문",
            character: "군주에 가까우나 조심스러운 위치",
            advice: "충성스럽게 보좌하라"
        },
        "오효(五爻)": {
            position: "위에서 둘째",
            meaning: "군주, 최고 권력자",
            character: "가장 이상적인 위치",
            advice: "덕으로 다스려라"
        },
        "상효(上爻)": {
            position: "가장 위",
            meaning: "끝, 완성, 은퇴",
            character: "극에 달한 상태",
            advice: "적당한 때에 물러나라"
        }
    }
};
```

#### 2. 괘상(卦象) 해석법 - 상징과 의미의 체계
```javascript
const hexagramImagery = {
    upper_lower_combination: {
        "천지비(天地否)": {
            structure: "乾上坤下",
            natural_image: "하늘이 위에 있고 땅이 아래 있다",
            abstract_meaning: "막힘, 소통 부족",
            human_affairs: "윗사람과 아랫사람이 소통하지 않음",
            advice: "때를 기다리며 내실을 기하라"
        },
        "지천태(地天泰)": {
            structure: "坤上乾下", 
            natural_image: "땅이 위에 있고 하늘이 아래 있다",
            abstract_meaning: "소통, 화합",
            human_affairs: "윗사람과 아랫사람이 잘 통함",
            advice: "화합하여 함께 발전하라"
        }
    },
    
    trigram_relationships: {
        "상하 상생": "위 괘가 아래 괘를 돕는 관계",
        "상하 상극": "위 괘가 아래 괘를 누르는 관계",
        "내외 호응": "내괘와 외괘가 서로 응하는 관계",
        "강유 배합": "강한 효와 부드러운 효의 조화"
    },
    
    seasonal_interpretation: {
        "춘(春)": {
            trigrams: ["진", "손"],
            meaning: "생장, 시작, 발전",
            advice: "새로운 시작을 준비하라"
        },
        "하(夏)": {
            trigrams: ["리"],
            meaning: "번영, 완성, 밝음",
            advice: "활발히 활동하라"
        },
        "추(秋)": {
            trigrams: ["태", "건"],
            meaning: "수확, 결실, 수렴",
            advice: "성과를 정리하라"
        },
        "동(冬)": {
            trigrams: ["감", "간", "곤"],
            meaning: "저장, 휴식, 반성",
            advice: "내실을 기하라"
        }
    }
};
```

#### 3. 납갑(納甲) 이론 - 주역과 명리학의 결합
```javascript
const najiaThoery = {
    concept: "각 괘에 천간지지를 배정하여 점술에 활용",
    
    trigram_assignment: {
        "건궁": {
            stems: ["갑", "임"],
            branches: ["자", "인", "진"],
            inner_palace: "갑자, 갑인, 갑진",
            outer_palace: "임오, 임신, 임술"
        },
        "태궁": {
            stems: ["정"],
            branches: ["사", "묘", "축"],
            inner_palace: "정사, 정묘, 정축"
        },
        "리궁": {
            stems: ["기"],
            branches: ["묘", "축", "해"],
            inner_palace: "기묘, 기축, 기해"
        }
        // 나머지 5궁 추가
    },
    
    divination_method: {
        "육친 배정": "각 효에 십신에 해당하는 육친 배정",
        "세응 관계": "세효(자신)와 응효(상대방) 판단", 
        "용신 선택": "점치는 내용에 따른 용신 설정",
        "생극 관계": "각 효간의 생극 관계로 길흉 판단"
    },
    
    practical_application: {
        "사업점": "재물 육친을 용신으로 설정",
        "결혼점": "배우자 육친을 용신으로 설정",
        "시험점": "관귀 육친을 용신으로 설정",
        "건강점": "자신 육친을 용신으로 설정"
    }
};
```

---

## 📱 학습 앱 구현 전략

### 🎯 개정 학습 커리큘럼과 개발 로드맵

#### 학습 5단계 커리큘럼
1) 기초: 음양, 오행, 천간, 지지의 원리와 동적 순환 이해
2) 핵심 이론: 십신 도출 원리, 각 십신의 의미, 합·충 기본 원리
3) 적용: 실제 사주 분석 실습(자기/지인)으로 십신과 합충 적용 훈련
4) 고급 체계: 신강신약(득령·득지·득세), 격국, 용신 이론(억부/조후)
5) 통합: 물상론과 신살을 더해 해석의 깊이 확장, 다각도 케이스 스터디

#### 제품 기능 매핑 (스프린트 로드맵)
- Sprint A (2주) — 기초 모듈
  - 음양·오행 인터랙티브 시각화, 간지 기본 카드, 상생·상극 시뮬레이터
  - 기초 퀴즈(개념 확인), 학습 노트, 용어 사전 V1
- Sprint B (3주) — 십신·합충 모듈
  - 십신 자동 도출 데모, 십신 관계 그래프, 합/충/형/파/해 애니메이션
  - 적용 퀴즈(사례형), 체크포인트 평가
- Sprint C (3주) — 적용 실습 모듈
  - 사주 입력→십신/합충 자동 표기, 실습 과제(자기/지인), AI 힌트
  - 피드백 루브릭, 학습 리플레이(오답노트)
- Sprint D (4주) — 고급 체계 모듈
  - 신강신약 계산기(득령·득지·득세 가중), 격국/용신 추천(억부/조후 병렬 제시)
  - 비교 모드: 억부 vs 조후 결과 차이와 적용 가이드
- Sprint E (4주) — 통합·확장 모듈
  - 물상론 이미지 매핑, 신살 라이브러리(현대적 해석), 케이스 라이브러리
  - 대운/세운 타임라인, 사건 마커, 리플로우 해석

#### 품질·검증
- 학술 검증: 고전(연해자평·자평진전·적천수) 근거 주석화
- 실무 검증: 현업 상담가 리뷰, 사용자 파일럿 학습 데이터 A/B
- 지속 개선: 오답/혼동 구간 기반 튜토리얼 자동 추천

#### Phase 1: 기초 이론 학습 (4주)
```javascript
const phase1Features = {
    "명리학 기초": [
        "천간지지 인터랙티브 학습",
        "오행 상생상극 시뮬레이션",
        "십신 관계도 시각화",
        "기초 개념 퀴즈 시스템"
    ],
    "주역 기초": [
        "팔괘 의미와 상징 학습",
        "괘 그리기 인터랙티브",
        "기본 64괘 소개",
        "점법 기초 이론"
    ],
    "통합 기능": [
        "학습 진도 관리",
        "개념 검색 기능",
        "용어 사전",
        "학습 노트"
    ]
};
```

#### Phase 2: 실전 응용 (6주)
```javascript
const phase2Features = {
    "명리학 실전": [
        "사주팔자 직접 계산",
        "격국 판단 연습",
        "신살 찾기 실습",
        "대운 해석 시뮬레이션"
    ],
    "주역 실전": [
        "괘 뽑기 시뮬레이션",
        "변효 해석 연습",
        "실제 점사 예제",
        "괘상 분석 도구"
    ],
    "고급 기능": [
        "AI 해석 도우미",
        "사례 분석 라이브러리",
        "전문가 해설 영상",
        "커뮤니티 토론"
    ]
};
```

#### Phase 3: 마스터 과정 (8주)
```javascript
const phase3Features = {
    "전문가 과정": [
        "복잡한 사례 분석",
        "상담 기법 학습",
        "윤리 및 책임 교육",
        "자격 인증 시스템"
    ],
    "고급 도구": [
        "전문 계산기",
        "데이터베이스 활용",
        "통계 분석 도구",
        "연구 지원 기능"
    ],
    "사회적 기능": [
        "멘토링 시스템",
        "스터디 그룹",
        "온라인 세미나",
        "실무 인턴십"
    ]
};
```

### 🎮 학습 방법론

#### 1. 적응형 학습 (Adaptive Learning)
```javascript
const adaptiveLearning = {
    difficulty_adjustment: {
        beginner: "기본 개념 중심, 많은 예제",
        intermediate: "응용 문제, 실전 연습",
        advanced: "복합 사례, 창의적 해석"
    },
    
    personal_path: {
        assessment: "입문 테스트로 수준 파악",
        customization: "개인별 약점 보강 과정",
        progress_tracking: "실시간 학습 성과 분석",
        recommendation: "AI 기반 다음 학습 추천"
    }
};
```

#### 2. 게이미피케이션 요소
```javascript
const gamification = {
    achievement_system: {
        "천간 마스터": "천간 10개 완벽 이해",
        "십신의 달인": "십신 관계 완전 정복",
        "괘상 해석가": "64괘 의미 숙지",
        "실전 고수": "실제 사례 100개 분석"
    },
    
    social_features: {
        leaderboard: "학습 성과 랭킹",
        study_groups: "소그룹 협동 학습",
        challenges: "주간 도전 과제",
        mentorship: "선후배 멘토링"
    }
};
```

---

## 🔍 자료 수집 및 검증 계획

### 📚 1차 자료 (Primary Sources)
- **고전 원문**: 사주정전, 적천수, 삼명통회, 주역정의, 주역절중
- **현대 연구서**: 한국 명리학회 논문, 동양철학 학술지
- **전문가 인터뷰**: 현직 명리학자, 주역 연구자

### 📖 2차 자료 (Secondary Sources)  
- **교육 서적**: 명리학 입문서, 주역 해설서
- **논문 및 연구**: 동양철학, 종교학 관련 학술 자료
- **실무 사례**: 상담 사례집, 실전 해석 모음

### ✅ 검증 프로세스
```javascript
const verificationProcess = {
    academic_review: "동양철학 박사급 전문가 검토",
    practical_validation: "현직 상담사 실무 검증", 
    user_testing: "학습자 피드백 수집 및 반영",
    continuous_update: "지속적인 내용 개선 시스템"
};
```

이렇게 체계적으로 자료를 정리하고 검증된 콘텐츠로 학습 앱을 구축하면, 세계적으로도 인정받는 수준 높은 명리학/주역 교육 플랫폼을 만들 수 있을 것입니다!