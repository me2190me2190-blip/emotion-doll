# 🧸 AI 감정 인형 (Emotion Doll)

하루의 사건을 텍스트로 입력하면 AI가 10개 감정 축으로 분석하고, 곰돌이 캐릭터가 감정 상태를 시각적으로 표현하는 감정 기록 웹앱.

**[Live Demo →](https://emotion-doll.vercel.app)**

---

## 기술 스택

| 구분 | 내용 |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | CSS Modules |
| Backend | Vercel Edge Functions |
| AI | Gemini 2.5 Flash-Lite API |
| 배포 | Vercel |
| 저장 | localStorage (브라우저 로컬, 서버 저장 없음) |

---

## 주요 기능

### AI 감정 분석
- 사건을 자유 텍스트로 입력하면 Gemini 2.5 Flash-Lite가 **Russell 감정 원형 모델(1980)** 기반 10개 감정 차원을 0~40점으로 수치화
- 부정 감정 5개 (분노·짜증·불안·스트레스·억울함) / 긍정 감정 5개 (기쁨·신남·만족·평온·감사)
- Vercel Edge Function에서 처리 → 콜드스타트 없음, 전세계 엣지 배포

### 곰돌이 캐릭터
- 감정 점수 합산 기반 7단계 표정 자동 변환 (행복 MAX / 기분 좋음 / 그럭저럭 / 힘들어요 / 불안해요 / 화가 나요 / 지쳤어요)
- 표정별 SVG 배경 장면 + 캐릭터 애니메이션 (bounce / float / shake / tremble / droop) 연동
- 표정 모아보기에서 7단계 미리보기 가능, 클릭하면 고정 표시

### 감정 기록 & 분석
- 날짜별 필터링, 기록 개별 삭제 (점수 차감 반영)
- 오늘의 감정 온도 (-100° ~ +100°) 실시간 계산
- 감정 현황 대시보드 (부정/긍정 게이지, 순지수)

### 감정 목표
- 감정 누적 점수 기반 10개 자기보상 목표 (치킨 먹기, 산책 나가기 등)
- 달성 시 완료 처리

---

## 성능 설계

### Edge Function
```
api/analyze.js → Vercel Edge Runtime
```
- Node.js 서버리스가 아닌 **Edge Runtime** 사용 → 응답 지연 최소화
- `responseMimeType: 'application/json'` 설정으로 Gemini가 JSON만 반환 → 파싱 오버헤드 제거
- `maxOutputTokens: 256` 제한 → 불필요한 토큰 소비 차단

### 프론트엔드
- Vite 번들링 → 코드 스플리팅 자동 처리
- CSS Modules → 스타일 충돌 없음, 미사용 CSS 트리셰이킹
- `localStorage` 전용 저장 → 서버 요청 없이 즉시 읽기/쓰기
- SVG 캐릭터 전부 인라인 → 이미지 네트워크 요청 0건

### 데이터 격리
- 저장소가 `localStorage`이므로 **사용자별 완전 분리** — 같은 URL 접속해도 데이터 공유 없음
- 서버에 개인정보 저장하지 않음

---

## 로컬 실행

```bash
git clone https://github.com/me2190me2190-blip/emotion-doll.git
cd emotion-doll
npm install
```

`.env.local` 생성:
```
GEMINI_API_KEY=your_api_key_here
```

```bash
npm run dev
```

---

## 배포 (Vercel)

```bash
vercel deploy
```

Vercel 대시보드 → Settings → Environment Variables에 `GEMINI_API_KEY` 추가 필요.

---

## 프로젝트 구조

```
src/
├── components/
│   ├── Bear.jsx              # 곰돌이 캐릭터 + 배경 SVG
│   ├── MoodStrip.jsx         # 표정 모아보기
│   ├── MoodThermometer.jsx   # 오늘 감정 온도
│   ├── TabInput.jsx          # 감정 입력
│   ├── TabGauge.jsx          # 현황 대시보드
│   ├── TabLog.jsx            # 기록 목록 + 삭제
│   └── TabGoals.jsx          # 감정 목표
├── hooks/
│   ├── useEmotionStore.js    # localStorage 상태 관리
│   └── useAnalyze.js         # Gemini API 호출
├── constants.js              # 감정 정의 + Russell 모델 출처
└── App.jsx
api/
└── analyze.js                # Vercel Edge Function
```

---

## 감정 모델 근거

> Russell, J. A. (1980). A circumplex model of affect.
> *Journal of Personality and Social Psychology, 39*(6), 1161–1178.
> 인용 15,213회
