import React from 'react'
import styles from './MoodStrip.module.css'

const MOODS = [
  { id: 'ecstatic',  lbl: '행복 MAX',  c1: '#FFD54F', c2: '#FFA000', ck: 0.65, mouth: 'M72 126 Q100 148 128 126', brow: 'up',    fx: 'star'  },
  { id: 'happy',     lbl: '기분 좋음',  c1: '#F0C060', c2: '#E8A829', ck: 0.4,  mouth: 'M75 126 Q100 143 125 126', brow: '',      fx: ''      },
  { id: 'neutral',   lbl: '그럭저럭',   c1: '#E8B840', c2: '#D09820', ck: 0.25, mouth: 'M78 128 Q100 128 122 128', brow: '',      fx: ''      },
  { id: 'tired',     lbl: '힘들어요',   c1: '#D4A840', c2: '#B88020', ck: 0.2,  mouth: 'M78 128 Q100 132 122 128', brow: '',      fx: ''      },
  { id: 'worried',   lbl: '불안해요',   c1: '#C09830', c2: '#A07810', ck: 0.15, mouth: 'M78 130 Q100 118 122 130', brow: 'worry', fx: 'sweat' },
  { id: 'angry',     lbl: '화가 나요',  c1: '#C86030', c2: '#A84010', ck: 0.7,  mouth: 'M76 133 Q100 120 124 133', brow: 'angry', fx: 'anger' },
  { id: 'exhausted', lbl: '지쳤어요',   c1: '#B07020', c2: '#905010', ck: 0.1,  mouth: 'M78 128 Q100 136 122 128', brow: '',      fx: ''      },
]

export { MOODS }

function MiniBear({ m }) {
  const brow =
    m.brow === 'angry' ? (
      <>
        <path d="M62 92 Q75 85 85 91"   stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M115 91 Q125 85 138 92" stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </>
    ) : m.brow === 'worry' ? (
      <>
        <path d="M63 91 Q75 96 84 92"   stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M116 92 Q125 96 137 91" stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </>
    ) : m.brow === 'up' ? (
      <>
        <path d="M63 90 Q75 83 84 88"   stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M116 88 Q125 83 137 90" stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </>
    ) : null

  const fx =
    m.fx === 'anger' ? <text x="155" y="76" fontSize="15" opacity=".8">💢</text>
    : m.fx === 'sweat' ? <ellipse cx="149" cy="90" rx="4" ry="6" fill="#90BFDF" opacity=".8"/>
    : m.fx === 'star'  ? <text x="152" y="72" fontSize="13">✨</text>
    : null

  const gId = `mg-${m.id}`
  const bId = `mb-${m.id}`
  const eId = `me-${m.id}`

  return (
    <svg width="44" height="44" viewBox="0 0 200 220" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={gId} cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor={m.c1}/>
          <stop offset="100%" stopColor={m.c2}/>
        </radialGradient>
        <radialGradient id={bId} cx="50%" cy="38%" r="58%">
          <stop offset="0%"   stopColor="#FDE8B0"/>
          <stop offset="100%" stopColor="#F5D080"/>
        </radialGradient>
        <radialGradient id={eId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#F4A0A0"/>
          <stop offset="100%" stopColor="#D97070"/>
        </radialGradient>
      </defs>
      <ellipse cx="53"  cy="58"  rx="22" ry="20" fill={m.c2}/>
      <ellipse cx="53"  cy="60"  rx="13" ry="11" fill={`url(#${eId})`}/>
      <ellipse cx="147" cy="58"  rx="22" ry="20" fill={m.c2}/>
      <ellipse cx="147" cy="60"  rx="13" ry="11" fill={`url(#${eId})`}/>
      <ellipse cx="100" cy="170" rx="58" ry="50" fill={`url(#${gId})`}/>
      <ellipse cx="100" cy="172" rx="36" ry="30" fill={`url(#${bId})`}/>
      <ellipse cx="100" cy="104" rx="62" ry="57" fill={`url(#${gId})`}/>
      <ellipse cx="100" cy="111" rx="42" ry="35" fill="#FDE8A0" opacity=".4"/>
      <ellipse cx="100" cy="127" rx="26" ry="17" fill="#FDE8A0"/>
      <ellipse cx="100" cy="126" rx="22" ry="13" fill="#FAE090"/>
      <ellipse cx="100" cy="115" rx="8"  ry="5.5" fill="#2A1400"/>
      <ellipse cx="75"  cy="104" rx="9"  ry="9.5" fill="#1A0E00"/>
      <ellipse cx="78"  cy="102" rx="3"  ry="3"   fill="white"/>
      <ellipse cx="125" cy="104" rx="9"  ry="9.5" fill="#1A0E00"/>
      <ellipse cx="128" cy="102" rx="3"  ry="3"   fill="white"/>
      {brow}
      <path d={m.mouth} stroke="#2A1400" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="62"  cy="120" rx="12" ry="7" fill="#F4A0A0" opacity={m.ck}/>
      <ellipse cx="138" cy="120" rx="12" ry="7" fill="#F4A0A0" opacity={m.ck}/>
      <ellipse cx="47"  cy="163" rx="15" ry="27" fill={m.c2} transform="rotate(-15,47,163)"/>
      <ellipse cx="153" cy="163" rx="15" ry="27" fill={m.c2} transform="rotate(15,153,163)"/>
      {fx}
    </svg>
  )
}

export function MoodStrip({ currentMood, onPreview }) {
  return (
    <div className={styles.strip}>
      {MOODS.map(m => (
        <button
          key={m.id}
          className={`${styles.chip} ${currentMood === m.id ? styles.sel : ''}`}
          onClick={() => onPreview(m.id)}
          title={m.lbl}
        >
          <MiniBear m={m} />
          <span className={styles.lbl}>{m.lbl}</span>
        </button>
      ))}
    </div>
  )
}
