import { useState } from 'react'

const SYSTEM_PROMPT = `당신은 Russell 감정 원형 모델(Circumplex Model of Affect, 1980) 전문가입니다.
사용자의 사건/감정 서술을 읽고, 아래 10개 감정 차원 각각에 0~40점으로 수치를 매기세요.

부정 감정 (Q2~Q3: 불쾌 valence):
- anger: 분노 (고각성+부정)
- irritation: 짜증 (중각성+부정)
- anxiety: 불안 (미래 불확실성, 공포)
- stress: 스트레스 (지속적 부담)
- resentment: 억울함 (부당함 인식)

긍정 감정 (Q1~Q4: 쾌 valence):
- joy: 기쁨 (고각성+긍정)
- excitement: 신남 (흥분, 설렘)
- contentment: 만족 (성취감, 흡족함)
- serenity: 평온 (저각성+긍정, 안정)
- gratitude: 감사 (고마움, 따뜻함)

반드시 JSON만 응답하세요. 백틱이나 설명 텍스트는 절대 포함하지 마세요:
{"anger":0,"irritation":0,"anxiety":0,"stress":0,"resentment":0,"joy":0,"excitement":0,"contentment":0,"serenity":0,"gratitude":0,"summary":"20자이내 한줄요약"}`

export function useAnalyze() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function analyze(text) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/analyze', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ text }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      return await res.json()
    } catch (e) {
      setError(`분석 중 오류가 났어요 — ${e.message}`)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { analyze, loading, error }
}
