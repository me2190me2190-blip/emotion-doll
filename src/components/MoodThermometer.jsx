import React from 'react'

// 오늘 기록만 필터
function getTodayNet(logs) {
  const today = new Date().toISOString().slice(0, 10)
  const todayLogs = logs.filter(l => l.date.startsWith(today))
  if (!todayLogs.length) return null

  const NEG = ['anger', 'irritation', 'anxiety', 'stress', 'resentment']
  const POS = ['joy', 'excitement', 'contentment', 'serenity', 'gratitude']
  let neg = 0, pos = 0
  todayLogs.forEach(l => {
    NEG.forEach(k => { neg += (l.scores?.[k] || 0) })
    POS.forEach(k => { pos += (l.scores?.[k] || 0) })
  })
  return Math.max(-100, Math.min(100, pos - neg))
}

export function MoodThermometer({ logs }) {
  const net = getTodayNet(logs)
  if (net === null) return null

  const pct = (net + 100) / 200  // 0~1 (0.5 = 중립)
  const deg = Math.round(net)
  const label =
    net >= 60  ? '오늘 너무 좋은 날 🌟' :
    net >= 20  ? '기분 좋은 하루 😊' :
    net >= -20 ? '평범한 하루 😐' :
    net >= -60 ? '조금 힘든 하루 😔' :
                 '많이 힘든 하루 😵'

  // 색상: 부정(-) 빨강 → 중립 노랑 → 긍정(+) 초록
  const r = net < 0 ? 226 : Math.round(226 * (1 - pct * 2))
  const g = net > 0 ? 80  : Math.round(80  * (pct * 2))
  const fillColor = net >= 20 ? '#3B6D11' : net >= -20 ? '#BA7517' : '#E24B4A'
  const bgColor   = net >= 20 ? '#EAF3DE' : net >= -20 ? '#FAEEDA' : '#FCEBEB'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: bgColor,
      borderRadius: 12, padding: '8px 14px',
      border: `0.5px solid ${fillColor}33`,
      marginBottom: '.625rem',
    }}>
      {/* 온도계 아이콘 */}
      <svg width="20" height="44" viewBox="0 0 20 44">
        {/* 관 */}
        <rect x="7" y="3" width="6" height="26" rx="3" fill="var(--bg-secondary)" stroke={fillColor} strokeWidth="1"/>
        {/* 채움 */}
        <rect
          x="9" y={3 + 26 * (1 - pct)} width="2"
          height={26 * pct}
          rx="1" fill={fillColor}
          style={{ transition: 'all .6s ease' }}
        />
        {/* 구근 */}
        <circle cx="10" cy="36" r="7" fill={fillColor}/>
        <circle cx="10" cy="36" r="4" fill="white" opacity=".3"/>
      </svg>

      {/* 텍스트 */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: fillColor, fontWeight: 500, marginBottom: 2 }}>
          오늘의 감정 온도
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, color: fillColor }}>
          {deg > 0 ? '+' : ''}{deg}°
          <span style={{ fontSize: 11, fontWeight: 400, marginLeft: 6, color: 'var(--text-secondary)' }}>
            {label}
          </span>
        </div>
      </div>

      {/* 기록 수 */}
      <div style={{
        fontSize: 9, color: 'var(--text-tertiary)',
        textAlign: 'center', lineHeight: 1.4,
      }}>
        오늘<br/>
        {logs.filter(l => l.date.startsWith(new Date().toISOString().slice(0,10))).length}건
      </div>
    </div>
  )
}
