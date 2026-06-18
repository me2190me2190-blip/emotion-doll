export const config = { runtime: 'edge' }

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

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }), { status: 500 })
  }

  try {
    const { text } = await req.json()
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'text is required' }), { status: 400 })
    }

    // Gemini 2.5 Flash-Lite: 무료 티어 하루 1,000 req
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`

    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [{
          parts: [{ text: text.trim() }]
        }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 256,
          responseMimeType: 'application/json',  // JSON 모드: 백틱 없이 순수 JSON 반환
        },
      }),
    })

    if (!upstream.ok) {
      const errBody = await upstream.text()
      console.error('Gemini API error:', upstream.status, errBody)
      return new Response(JSON.stringify({ error: `Gemini API error: ${upstream.status}` }), {
        status: 502,
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
    }

    const json = await upstream.json()
    const raw = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}'
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    console.error('Handler error:', err)
    return new Response(JSON.stringify({ error: 'Analysis failed', detail: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
