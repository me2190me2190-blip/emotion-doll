import React from 'react'

function getMood(totals, netScore) {
  const anger = totals.anger || 0
  const anxiety = totals.anxiety || 0
  if (netScore > 80)  return 'ecstatic'
  if (netScore > 20)  return 'happy'
  if (netScore > -20) return 'neutral'
  if (netScore > -80) return 'tired'
  if (anger > 80)     return 'angry'
  if (anxiety > 70)   return 'worried'
  return 'exhausted'
}

const MOOD_CFG = {
  ecstatic:  { c1: '#FFD54F', c2: '#FFA000', cheek: 0.65, cls: 'float' },
  happy:     { c1: '#F0C060', c2: '#E8A829', cheek: 0.4,  cls: 'float' },
  neutral:   { c1: '#E8B840', c2: '#D09820', cheek: 0.25, cls: 'float' },
  tired:     { c1: '#D4A840', c2: '#B88020', cheek: 0.2,  cls: 'float' },
  worried:   { c1: '#C09830', c2: '#A07810', cheek: 0.15, cls: 'float' },
  angry:     { c1: '#C86030', c2: '#A84010', cheek: 0.7,  cls: 'shake' },
  exhausted: { c1: '#B07020', c2: '#905010', cheek: 0.1,  cls: 'float' },
}

const MOOD_STATUS = {
  ecstatic:  '너무 행복해요 ✨',
  happy:     '기분 좋아요 😊',
  neutral:   '그럭저럭이에요 😐',
  tired:     '좀 힘들어요 😔',
  worried:   '불안해요 😨',
  angry:     '화가 나요 😤',
  exhausted: '지쳤어요 😵',
}

export function Bear({ totals, netScore }) {
  const mood = getMood(totals, netScore)
  const cfg = MOOD_CFG[mood]

  const isAngry    = mood === 'angry'
  const isWorried  = mood === 'worried'
  const isEcstatic = mood === 'ecstatic'
  const isHappy    = mood === 'happy' || mood === 'ecstatic'

  const eyeOY   = isAngry ? -3 : isWorried ? 2 : 0
  const lAngle  = isAngry ? 14 : isWorried ? -10 : 0
  const rAngle  = isAngry ? -14 : isWorried ? 10 : 0

  const mouthD = isEcstatic ? 'M 72 126 Q 100 148 128 126'
    : isHappy    ? 'M 75 126 Q 100 143 125 126'
    : isAngry    ? 'M 76 133 Q 100 120 124 133'
    : isWorried  ? 'M 78 130 Q 100 118 122 130'
    : mood === 'exhausted' ? 'M 78 128 Q 100 136 122 128'
    : 'M 78 128 Q 100 128 122 128'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div className={cfg.cls}>
        <svg width="180" height="200" viewBox="0 0 200 220" role="img" aria-label={`곰돌이 감정 상태: ${MOOD_STATUS[mood]}`}>
          <defs>
            <radialGradient id="rg-body" cx="38%" cy="32%" r="62%">
              <stop offset="0%" stopColor={cfg.c1} />
              <stop offset="100%" stopColor={cfg.c2} />
            </radialGradient>
            <radialGradient id="rg-belly" cx="50%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#FDE8B0" />
              <stop offset="100%" stopColor="#F5D080" />
            </radialGradient>
            <radialGradient id="rg-ear" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4A0A0" />
              <stop offset="100%" stopColor="#D97070" />
            </radialGradient>
          </defs>

          {/* 귀 */}
          <ellipse cx="53"  cy="58" rx="22" ry="20" fill={cfg.c2} />
          <ellipse cx="53"  cy="60" rx="13" ry="11" fill="url(#rg-ear)" />
          <ellipse cx="147" cy="58" rx="22" ry="20" fill={cfg.c2} />
          <ellipse cx="147" cy="60" rx="13" ry="11" fill="url(#rg-ear)" />

          {/* 몸통 */}
          <ellipse cx="100" cy="170" rx="58" ry="50" fill="url(#rg-body)" />
          <ellipse cx="100" cy="172" rx="36" ry="30" fill="url(#rg-belly)" />

          {/* 머리 */}
          <ellipse cx="100" cy="104" rx="62" ry="57" fill="url(#rg-body)" />
          <ellipse cx="100" cy="111" rx="42" ry="35" fill="#FDE8A0" opacity=".4" />

          {/* 주둥이 */}
          <ellipse cx="100" cy="127" rx="26" ry="17" fill="#FDE8A0" />
          <ellipse cx="100" cy="126" rx="22" ry="13" fill="#FAE090" />

          {/* 코 */}
          <ellipse cx="100" cy="115" rx="8" ry="5.5" fill="#2A1400" />

          {/* 눈 왼쪽 */}
          <g transform={`rotate(${lAngle},75,${104 + eyeOY})`}>
            <ellipse cx="75"  cy={104 + eyeOY} rx="9"   ry="9.5" fill="#1A0E00" />
            <ellipse cx="78"  cy={102 + eyeOY} rx="3"   ry="3"   fill="white" />
            <ellipse cx="80"  cy={101 + eyeOY} rx="1.4" ry="1.4" fill="white" opacity=".8" />
          </g>

          {/* 눈 오른쪽 */}
          <g transform={`rotate(${rAngle},125,${104 + eyeOY})`}>
            <ellipse cx="125" cy={104 + eyeOY} rx="9"   ry="9.5" fill="#1A0E00" />
            <ellipse cx="128" cy={102 + eyeOY} rx="3"   ry="3"   fill="white" />
            <ellipse cx="130" cy={101 + eyeOY} rx="1.4" ry="1.4" fill="white" opacity=".8" />
          </g>

          {/* 눈썹 */}
          {isAngry && (
            <>
              <path d="M62 92 Q75 85 85 91"  stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M115 91 Q125 85 138 92" stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          )}
          {isWorried && (
            <>
              <path d="M63 91 Q75 96 84 92"   stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M116 92 Q125 96 137 91" stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}
          {isEcstatic && (
            <>
              <path d="M63 90 Q75 83 84 88"   stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M116 88 Q125 83 137 90" stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* 입 */}
          <path d={mouthD} stroke="#2A1400" strokeWidth="2.2" fill="none" strokeLinecap="round" />

          {/* 볼터치 */}
          <ellipse cx="62"  cy="120" rx="12" ry="7" fill="#F4A0A0" opacity={cfg.cheek} />
          <ellipse cx="138" cy="120" rx="12" ry="7" fill="#F4A0A0" opacity={cfg.cheek} />

          {/* 팔 */}
          <ellipse cx="47"  cy="163" rx="15" ry="27" fill={cfg.c2} transform="rotate(-15,47,163)" />
          <ellipse cx="153" cy="163" rx="15" ry="27" fill={cfg.c2} transform="rotate(15,153,163)" />

          {/* 이펙트 */}
          {isAngry   && <><text x="158" y="74" fontSize="17" opacity=".85">💢</text><text x="22" y="78" fontSize="13" opacity=".7">💢</text></>}
          {isEcstatic && <><text x="154" y="70" fontSize="14">✨</text><text x="24" y="74" fontSize="12">✨</text><text x="90" y="48" fontSize="11">⭐</text></>}
          {isWorried && <ellipse cx="149" cy="88" rx="4" ry="6" fill="#90BFDF" opacity=".8" />}
        </svg>
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 13, fontWeight: 500, padding: '5px 14px',
        borderRadius: 999, border: '0.5px solid var(--border-md)',
        background: 'var(--bg-card)', color: 'var(--text-primary)',
      }}>
        {MOOD_STATUS[mood]}
      </div>
    </div>
  )
}

export { MOOD_STATUS }
