# 🧸 AI 감정 인형

> 하루의 일을 털어놓으면 AI가 감정을 분석하고, 곰돌이가 내 마음 상태를 표정으로 보여줘요.

<br>

## 📱 화면 미리보기

<table>
  <tr>
    <td align="center"><b>감정 입력 & 곰돌이</b></td>
    <td align="center"><b>감정 현황 대시보드</b></td>
    <td align="center"><b>기록 & 온도계</b></td>
    <td align="center"><b>감정 목표</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshot-main.svg" width="180"/></td>
    <td><img src="docs/screenshot-gauge.svg" width="180"/></td>
    <td><img src="docs/screenshot-log.svg" width="180"/></td>
    <td><img src="docs/screenshot-goals.svg" width="180"/></td>
  </tr>
</table>

<br>

## ✨ 주요 기능

### 1. AI 감정 분석
오늘 있었던 일을 자유롭게 입력하면 AI가 **10개 감정 축**으로 0~40점 수치화합니다.

- **부정** — 분노 / 짜증 / 불안 / 스트레스 / 억울함
- **긍정** — 기쁨 / 신남 / 만족 / 평온 / 감사
- `Ctrl+Enter` 단축키 지원

### 2. 곰돌이 캐릭터
감정 점수에 따라 곰돌이 표정이 **7단계**로 자동 변화합니다.

| 상태 | 표정 | 애니메이션 |
|---|---|---|
| 행복 MAX | 활짝 뜬 눈, 큰 웃음 | 바운스 |
| 기분 좋음 | 반달 눈, 미소 | 둥실둥실 |
| 그럭저럭 | 평범한 눈, 일자 입 | 둥실둥실 |
| 힘들어요 | 반쯤 감긴 눈 💤 | 축 처짐 |
| 불안해요 | 八자 눈썹, 눈물 방울 | 떨림 |
| 화가 나요 | 역V 눈썹, 💢 | 흔들림 |
| 지쳤어요 | 거의 감긴 눈 💤 | 축 처짐 |

- **표정 모아보기** — 7단계 미리보기 칩, 클릭하면 고정 표시
- 감정별 SVG 배경 장면 자동 전환 (해/구름/빗방울/불꽃/ZZZ 등)

### 3. 감정 기록
- 날짜별 필터링 (기본값: 오늘)
- 기록 개별 삭제 — 2단계 확인, 삭제 시 누적 점수 자동 차감
- **오늘의 감정 온도** — 오늘 기록만 집계해 -100° ~ +100°로 표시

### 4. 감정 현황 대시보드
- 10개 감정 게이지 (최대 150pt 기준)
- 긍정 − 부정 순지수 실시간 계산

### 5. 감정 목표 (자기보상)
감정이 쌓이면 나에게 선물하는 10가지 미션.

| 목표 | 조건 |
|---|---|
| 🍗 치킨 먹기 | 짜증 100pt |
| ☕ 카페 혼자 가기 | 스트레스 80pt |
| 🎮 게임 1시간 | 분노 120pt |
| 🛁 반신욕 | 불안 90pt |
| ✈️ 여행 계획 | 부정 합산 300pt |
| 🌸 산책 나가기 | 평온 60pt |
| 외 4개 | … |

기준 도달 시 완료 버튼 활성화 → 클릭하면 완료 처리.

<br>

## 🚀 시작하기

### 로컬 실행

```bash
git clone https://github.com/me2190me2190-blip/emotion-doll.git
cd emotion-doll
npm install
```

`.env.local` 파일 생성:
```
GEMINI_API_KEY=your_api_key_here
```

```bash
npm run dev
```

### Vercel 배포

```bash
git add .
git commit -m "deploy"
git push origin main
```

Vercel에 레포 연결 후 **Environment Variables**에 `GEMINI_API_KEY` 추가.

<br>

## 🔧 기술 스택

| | |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | CSS Modules |
| AI | Gemini 2.5 Flash-Lite |
| Backend | Vercel Edge Functions |
| 데이터 저장 | localStorage (서버 저장 없음) |

<br>

## 🔒 데이터 & 개인정보

- 모든 데이터는 **본인 브라우저 localStorage에만 저장** — 서버에 전송되지 않습니다
- 같은 URL을 다른 사람이 접속해도 **데이터가 절대 공유되지 않습니다**
- 앱을 껐다 켜도 기록이 그대로 유지됩니다

<br>

## 📚 감정 모델 출처

> Russell, J. A. (1980). A circumplex model of affect.
> *Journal of Personality and Social Psychology, 39*(6), 1161–1178.
