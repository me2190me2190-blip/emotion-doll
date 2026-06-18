# 🧸 AI 감정 인형

사건을 말하면 곰돌이가 Russell 감정 원형 모델(1980) 기반으로 감정을 수치화하고 기억해줘요.

## GitHub → Vercel 배포 순서

### 1. GitHub 레포 생성 후 push
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/본인/emotion-doll.git
git push -u origin main
```

### 2. Vercel 연결
- [vercel.com](https://vercel.com) → New Project → GitHub 레포 선택
- Framework: **Vite** 자동 감지됨

### 3. 환경변수 추가
Settings → Environment Variables:
```
Name:  GEMINI_API_KEY
Value: (Google AI Studio에서 발급한 키)
```

### 4. API 키 발급 (무료)
1. [aistudio.google.com](https://aistudio.google.com) 접속
2. 좌측 "Get API key" → Create API key
3. 키 복사 후 Vercel 환경변수에 붙여넣기

**무료 한도**: Gemini 2.5 Flash-Lite 기준 하루 1,000 요청 (신용카드 불필요)

### 5. Deploy 클릭

## 로컬 개발
```bash
npm install
# .env.local 파일 생성
echo "GEMINI_API_KEY=여기에_키_입력" > .env.local
npx vercel dev  # /api/analyze 포함 로컬 실행
```

## 기술 스택
- React + Vite
- Vercel Edge Functions (api/analyze.js)
- Gemini 2.5 Flash-Lite API (무료)
- localStorage 데이터 저장

## 감정 모델
Russell, J. A. (1980). A circumplex model of affect.
*Journal of Personality and Social Psychology, 39*(6), 1161–1178. (인용 15,213회)
