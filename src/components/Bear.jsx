import React from 'react'

/* ── 배경 SVG 장면 ── */
const BG_SCENES = {
  ecstatic: (<>
    <circle cx="50" cy="44" r="26" fill="#FFD740" opacity=".88"/>
    <line x1="50" y1="8"  x2="50" y2="20" stroke="#FFD740" strokeWidth="3" strokeLinecap="round"/>
    <line x1="50" y1="68" x2="50" y2="80" stroke="#FFD740" strokeWidth="3" strokeLinecap="round"/>
    <line x1="12" y1="44" x2="24" y2="44" stroke="#FFD740" strokeWidth="3" strokeLinecap="round"/>
    <line x1="76" y1="44" x2="88" y2="44" stroke="#FFD740" strokeWidth="3" strokeLinecap="round"/>
    <line x1="22" y1="15" x2="31" y2="23" stroke="#FFD740" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="69" y1="65" x2="78" y2="73" stroke="#FFD740" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="22" y1="73" x2="31" y2="65" stroke="#FFD740" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="69" y1="23" x2="78" y2="15" stroke="#FFD740" strokeWidth="2.5" strokeLinecap="round"/>
    <ellipse cx="310" cy="40" rx="34" ry="19" fill="white" opacity=".52"/>
    <ellipse cx="337" cy="29" rx="24" ry="18" fill="white" opacity=".52"/>
    <ellipse cx="285" cy="35" rx="20" ry="15" fill="white" opacity=".48"/>
    <text x="328" y="52" fontSize="22" opacity=".75">✨</text>
    <text x="366" y="100" fontSize="17" opacity=".62">⭐</text>
    <text x="14"  y="168" fontSize="19" opacity=".52">🎉</text>
    <text x="350" y="176" fontSize="15" opacity=".48">🎊</text>
    <text x="10"  y="224" fontSize="21" opacity=".52">🌸</text>
    <text x="362" y="220" fontSize="17" opacity=".46">🌼</text>
  </>),
  happy: (<>
    <ellipse cx="60"  cy="38" rx="42" ry="23" fill="white" opacity=".6"/>
    <ellipse cx="88"  cy="27" rx="30" ry="21" fill="white" opacity=".6"/>
    <ellipse cx="35"  cy="33" rx="25" ry="17" fill="white" opacity=".58"/>
    <ellipse cx="308" cy="54" rx="34" ry="19" fill="white" opacity=".48"/>
    <ellipse cx="334" cy="43" rx="25" ry="16" fill="white" opacity=".48"/>
    <ellipse cx="360" cy="191" rx="30" ry="34" fill="#66BB6A" opacity=".66"/>
    <ellipse cx="360" cy="174" rx="24" ry="28" fill="#81C784" opacity=".56"/>
    <rect x="355" y="217" width="10" height="18" fill="#8D6E63" opacity=".62" rx="3"/>
    <text x="8"   y="225" fontSize="16" opacity=".62">🌻</text>
    <text x="36"  y="229" fontSize="14" opacity=".58">🌷</text>
    <text x="338" y="229" fontSize="14" opacity=".58">🌸</text>
  </>),
  neutral: (<>
    <ellipse cx="80"  cy="50" rx="52" ry="28" fill="#ECEFF1" opacity=".76"/>
    <ellipse cx="114" cy="38" rx="36" ry="24" fill="#ECEFF1" opacity=".76"/>
    <ellipse cx="50"  cy="44" rx="28" ry="19" fill="#ECEFF1" opacity=".73"/>
    <ellipse cx="302" cy="60" rx="46" ry="25" fill="#ECEFF1" opacity=".58"/>
    <ellipse cx="336" cy="48" rx="32" ry="20" fill="#ECEFF1" opacity=".56"/>
    <rect x="0"   y="204" width="420" height="30" fill="#CFD8DC" opacity=".3"/>
    <ellipse cx="34"  cy="184" rx="23" ry="28" fill="#90A4AE" opacity=".46"/>
    <rect x="30"  y="209" width="8"  height="18" fill="#78909C" opacity=".46" rx="2"/>
    <ellipse cx="378" cy="188" rx="21" ry="25" fill="#90A4AE" opacity=".36"/>
    <rect x="374" y="210" width="8"  height="16" fill="#78909C" opacity=".36" rx="2"/>
  </>),
  tired: (<>
    <circle cx="366" cy="48" r="26" fill="#FFE082" opacity=".76"/>
    <circle cx="378" cy="38" r="20" fill="#FFF9C4" opacity=".56"/>
    <text x="44"  y="56"  fontSize="13" opacity=".43" fill="#8D6E63">★</text>
    <text x="82"  y="38"  fontSize="11" opacity=".34" fill="#8D6E63">★</text>
    <text x="290" y="80"  fontSize="19" opacity=".34" fill="#78909C">z</text>
    <text x="310" y="62"  fontSize="14" opacity=".26" fill="#78909C">z</text>
    <text x="326" y="48"  fontSize="10" opacity=".2"  fill="#78909C">z</text>
    <rect x="0"   y="208" width="420" height="24" fill="#A5D6A7" opacity=".26"/>
    <ellipse cx="34"  cy="186" rx="24" ry="30" fill="#546E7A" opacity=".28"/>
    <rect x="29"  y="212" width="10" height="16" fill="#455A64" opacity=".28" rx="2"/>
  </>),
  worried: (<>
    <ellipse cx="102" cy="48" rx="70" ry="35" fill="#78909C" opacity=".5"/>
    <ellipse cx="140" cy="34" rx="50" ry="30" fill="#90A4AE" opacity=".46"/>
    <ellipse cx="63"  cy="42" rx="38" ry="26" fill="#78909C" opacity=".42"/>
    <ellipse cx="292" cy="56" rx="62" ry="32" fill="#78909C" opacity=".4"/>
    <ellipse cx="327" cy="42" rx="42" ry="26" fill="#90A4AE" opacity=".36"/>
    <line x1="86"  y1="88"  x2="78"  y2="110" stroke="#90CAF9" strokeWidth="1.6" opacity=".58" strokeLinecap="round"/>
    <line x1="114" y1="92"  x2="106" y2="115" stroke="#90CAF9" strokeWidth="1.6" opacity=".52" strokeLinecap="round"/>
    <line x1="142" y1="86"  x2="134" y2="108" stroke="#90CAF9" strokeWidth="1.6" opacity=".46" strokeLinecap="round"/>
    <path d="M198 30 L187 58 L198 58 L185 86" stroke="#FFF176" strokeWidth="2.8" fill="none" opacity=".68" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="76"  cy="228" rx="32" ry="8" fill="#90CAF9" opacity=".36"/>
    <ellipse cx="322" cy="232" rx="26" ry="7" fill="#90CAF9" opacity=".32"/>
  </>),
  angry: (<>
    <ellipse cx="210" cy="244" rx="188" ry="65" fill="#FF5722" opacity=".17"/>
    <path d="M26 224 Q34 192 42 214 Q46 182 54 204 Q58 170 66 198 Q62 232 26 224Z" fill="#FF5722" opacity=".44"/>
    <path d="M32 224 Q38 204 44 219 Q48 199 52 214 Q48 230 32 224Z" fill="#FF8A65" opacity=".5"/>
    <path d="M352 222 Q360 190 368 212 Q372 180 380 202 Q376 232 352 222Z" fill="#FF5722" opacity=".4"/>
    <path d="M358 222 Q364 202 370 217 Q374 197 378 212 Q374 230 358 222Z" fill="#FF8A65" opacity=".44"/>
    <text x="20"  y="82"  fontSize="24" opacity=".38">💢</text>
    <text x="374" y="77"  fontSize="20" opacity=".34">💢</text>
    <text x="16"  y="160" fontSize="15" opacity=".26">💢</text>
  </>),
  exhausted: (<>
    <text x="36"  y="48"  fontSize="13" opacity=".36" fill="#B0BEC5">★</text>
    <text x="76"  y="34"  fontSize="11" opacity=".3"  fill="#B0BEC5">★</text>
    <text x="362" y="42"  fontSize="12" opacity=".34" fill="#B0BEC5">★</text>
    <circle cx="54"  cy="52" r="24" fill="#CFD8DC" opacity=".52"/>
    <circle cx="63"  cy="43" r="18" fill="#ECEFF1" opacity=".42"/>
    <text x="292" y="78"  fontSize="22" opacity=".3"  fill="#90A4AE">Z</text>
    <text x="318" y="56"  fontSize="16" opacity=".22" fill="#90A4AE">Z</text>
    <text x="338" y="40"  fontSize="11" opacity=".17" fill="#90A4AE">Z</text>
    <rect x="16"  y="218" width="388" height="18" fill="#546E7A" opacity=".26" rx="6"/>
    <rect x="16"  y="207" width="62"  height="28" fill="#546E7A" opacity=".24" rx="5"/>
    <rect x="342" y="207" width="62"  height="28" fill="#546E7A" opacity=".24" rx="5"/>
  </>),
}

export function BgScene({ mood }) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 420 242"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {BG_SCENES[mood] || null}
    </svg>
  )
}

/* ── 감정별 설정 ── */
const MOOD_CFG = {
  ecstatic:  { c1: '#FFE135', c2: '#FFA800', cheek: 0.76, cls: 'bounce' },
  happy:     { c1: '#F0C060', c2: '#E8A829', cheek: 0.45, cls: 'float'  },
  neutral:   { c1: '#E8B840', c2: '#D09820', cheek: 0.2,  cls: 'float'  },
  tired:     { c1: '#D4A840', c2: '#B88020', cheek: 0.15, cls: 'droop'  },
  worried:   { c1: '#C09830', c2: '#A07810', cheek: 0.12, cls: 'tremble'},
  angry:     { c1: '#D05020', c2: '#A83010', cheek: 0.86, cls: 'shake'  },
  exhausted: { c1: '#A86818', c2: '#845010', cheek: 0.07, cls: 'droop'  },
}

export const MOOD_STATUS = {
  ecstatic:  '너무 행복해요 ✨',
  happy:     '기분 좋아요 😊',
  neutral:   '그럭저럭이에요 😐',
  tired:     '좀 힘들어요 😔',
  worried:   '불안해요 😨',
  angry:     '화가 나요 😤',
  exhausted: '지쳤어요 😵',
}

/* ── 눈 모양 ── */
function Eyes({ mood }) {
  switch (mood) {
    case 'ecstatic':
      // 활짝 크게 뜬 눈
      return (<>
        <g>
          <ellipse cx="75"  cy="102" rx="11" ry="12" fill="#1A0E00"/>
          <ellipse cx="79"  cy="98"  rx="4"  ry="4"  fill="white"/>
          <ellipse cx="81"  cy="97"  rx="1.8" ry="1.8" fill="white" opacity=".8"/>
        </g>
        <g>
          <ellipse cx="125" cy="102" rx="11" ry="12" fill="#1A0E00"/>
          <ellipse cx="129" cy="98"  rx="4"  ry="4"  fill="white"/>
          <ellipse cx="131" cy="97"  rx="1.8" ry="1.8" fill="white" opacity=".8"/>
        </g>
      </>)
    case 'happy':
      // 반달 눈 (위쪽 클리핑으로 초승달 모양)
      return (<>
        <g>
          <ellipse cx="75"  cy="105" rx="9" ry="9.5" fill="#1A0E00"/>
          <ellipse cx="78"  cy="102" rx="3" ry="3"   fill="white"/>
          <ellipse cx="80"  cy="101" rx="1.4" ry="1.4" fill="white" opacity=".8"/>
        </g>
        <g>
          <ellipse cx="125" cy="105" rx="9" ry="9.5" fill="#1A0E00"/>
          <ellipse cx="128" cy="102" rx="3" ry="3"   fill="white"/>
          <ellipse cx="130" cy="101" rx="1.4" ry="1.4" fill="white" opacity=".8"/>
        </g>
      </>)
    case 'neutral':
      // 평범한 동그란 눈
      return (<>
        <g>
          <ellipse cx="75"  cy="104" rx="9" ry="9" fill="#1A0E00"/>
          <ellipse cx="78"  cy="102" rx="2.5" ry="2.5" fill="white"/>
        </g>
        <g>
          <ellipse cx="125" cy="104" rx="9" ry="9" fill="#1A0E00"/>
          <ellipse cx="128" cy="102" rx="2.5" ry="2.5" fill="white"/>
        </g>
      </>)
    case 'tired':
      // 반쯤 감긴 눈 (위에 눈꺼풀 가림)
      return (<>
        <g>
          <ellipse cx="75"  cy="106" rx="9" ry="7"  fill="#1A0E00"/>
          <rect    x="66"   y="99"   width="18" height="7" fill="#D4A840"/>
        </g>
        <g>
          <ellipse cx="125" cy="106" rx="9" ry="7"  fill="#1A0E00"/>
          <rect    x="116"  y="99"   width="18" height="7" fill="#D4A840"/>
        </g>
        {/* 수면 방울 */}
        <text x="152" y="82" fontSize="14">💤</text>
      </>)
    case 'worried':
      // 불안한 눈 — 살짝 위로 치우친 + 눈썹 찡그림
      return (<>
        <g transform="rotate(-10,75,105)">
          <ellipse cx="75"  cy="105" rx="9" ry="9" fill="#1A0E00"/>
          <ellipse cx="78"  cy="103" rx="2.8" ry="2.8" fill="white"/>
        </g>
        <g transform="rotate(10,125,105)">
          <ellipse cx="125" cy="105" rx="9" ry="9" fill="#1A0E00"/>
          <ellipse cx="128" cy="103" rx="2.8" ry="2.8" fill="white"/>
        </g>
        {/* 눈썹 — 八자 */}
        <path d="M63 91 Q75 97 84 93"  stroke="#2A1400" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M116 93 Q125 97 137 91" stroke="#2A1400" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        {/* 눈물 방울 */}
        <ellipse cx="149" cy="88" rx="4" ry="6" fill="#90BFDF" opacity=".85"/>
      </>)
    case 'angry':
      // 화난 눈 — 치켜뜬 + 눈썹 역V
      return (<>
        <g transform="rotate(14,75,101)">
          <ellipse cx="75"  cy="105" rx="9" ry="7" fill="#1A0E00"/>
          <ellipse cx="78"  cy="103" rx="2.5" ry="2" fill="white"/>
        </g>
        <g transform="rotate(-14,125,101)">
          <ellipse cx="125" cy="105" rx="9" ry="7" fill="#1A0E00"/>
          <ellipse cx="128" cy="103" rx="2.5" ry="2" fill="white"/>
        </g>
        {/* 눈썹 — 역V 화남 */}
        <path d="M62 90 Q75 83 85 89"  stroke="#2A1400" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M115 89 Q125 83 138 90" stroke="#2A1400" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* 💢 이펙트 */}
        <text x="155" y="74" fontSize="17" opacity=".9">💢</text>
        <text x="20"  y="78" fontSize="13" opacity=".75">💢</text>
      </>)
    case 'exhausted':
      // 거의 감긴 눈
      return (<>
        <g>
          <ellipse cx="75"  cy="107" rx="9" ry="5" fill="#1A0E00"/>
          <rect    x="66"   y="99"   width="18" height="8" fill="#A86818"/>
        </g>
        <g>
          <ellipse cx="125" cy="107" rx="9" ry="5" fill="#1A0E00"/>
          <rect    x="116"  y="99"   width="18" height="8" fill="#A86818"/>
        </g>
        <text x="150" y="82" fontSize="14">💤</text>
      </>)
    default:
      return null
  }
}

/* ── 입 모양 ── */
function Mouth({ mood }) {
  const d = {
    ecstatic:  'M 70 126 Q 100 152 130 126',
    happy:     'M 75 126 Q 100 145 125 126',
    neutral:   'M 78 128 Q 100 128 122 128',
    tired:     'M 78 130 Q 100 134 122 130',
    worried:   'M 76 132 Q 100 118 124 132',
    angry:     'M 74 135 Q 100 118 126 135',
    exhausted: 'M 78 132 Q 100 142 122 132',
  }[mood] || 'M 78 128 Q 100 128 122 128'

  const w = mood === 'ecstatic' ? 3.2 : mood === 'angry' ? 3 : 2.2

  return <path d={d} stroke="#2A1400" strokeWidth={w} fill="none" strokeLinecap="round"/>
}

/* ── 눈썹 (ecstatic용 올라간 눈썹) ── */
function Brows({ mood }) {
  if (mood === 'ecstatic') return (<>
    <path d="M63 90 Q75 83 84 88"   stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M116 88 Q125 83 137 90" stroke="#2A1400" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </>)
  // worried, angry 눈썹은 Eyes 컴포넌트에 포함
  return null
}

/* ── 메인 Bear 컴포넌트 ── */
export function Bear({ mood }) {
  const cfg = MOOD_CFG[mood] || MOOD_CFG.neutral

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div className={cfg.cls}>
        <svg width="180" height="200" viewBox="0 0 200 220" role="img" aria-label={`곰돌이 감정 상태: ${MOOD_STATUS[mood]}`}>
          <defs>
            <radialGradient id="rg-body" cx="38%" cy="32%" r="62%">
              <stop offset="0%"   stopColor={cfg.c1}/>
              <stop offset="100%" stopColor={cfg.c2}/>
            </radialGradient>
            <radialGradient id="rg-belly" cx="50%" cy="38%" r="58%">
              <stop offset="0%"   stopColor="#FDE8B0"/>
              <stop offset="100%" stopColor="#F5D080"/>
            </radialGradient>
            <radialGradient id="rg-ear" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#F4A0A0"/>
              <stop offset="100%" stopColor="#D97070"/>
            </radialGradient>
          </defs>

          {/* 귀 */}
          <ellipse cx="53"  cy="58" rx="22" ry="20" fill={cfg.c2}/>
          <ellipse cx="53"  cy="60" rx="13" ry="11" fill="url(#rg-ear)"/>
          <ellipse cx="147" cy="58" rx="22" ry="20" fill={cfg.c2}/>
          <ellipse cx="147" cy="60" rx="13" ry="11" fill="url(#rg-ear)"/>

          {/* 몸통 */}
          <ellipse cx="100" cy="170" rx="58" ry="50" fill="url(#rg-body)"/>
          <ellipse cx="100" cy="172" rx="36" ry="30" fill="url(#rg-belly)"/>

          {/* 팔 */}
          <ellipse cx="47"  cy="163" rx="15" ry="27" fill={cfg.c2} transform="rotate(-15,47,163)"/>
          <ellipse cx="153" cy="163" rx="15" ry="27" fill={cfg.c2} transform="rotate(15,153,163)"/>

          {/* 머리 */}
          <ellipse cx="100" cy="104" rx="62" ry="57" fill="url(#rg-body)"/>
          <ellipse cx="100" cy="111" rx="42" ry="35" fill="#FDE8A0" opacity=".4"/>

          {/* 주둥이 */}
          <ellipse cx="100" cy="127" rx="26" ry="17" fill="#FDE8A0"/>
          <ellipse cx="100" cy="126" rx="22" ry="13" fill="#FAE090"/>

          {/* 코 */}
          <ellipse cx="100" cy="115" rx="8" ry="5.5" fill="#2A1400"/>

          {/* 눈썹 (ecstatic) */}
          <Brows mood={mood}/>

          {/* 눈 — 감정별 다름 */}
          <Eyes mood={mood}/>

          {/* 입 */}
          <Mouth mood={mood}/>

          {/* 볼터치 */}
          <ellipse cx="62"  cy="120" rx="12" ry="7" fill="#F4A0A0" opacity={cfg.cheek}/>
          <ellipse cx="138" cy="120" rx="12" ry="7" fill="#F4A0A0" opacity={cfg.cheek}/>

          {/* ecstatic 이펙트 */}
          {mood === 'ecstatic' && (<>
            <text x="154" y="70" fontSize="14">✨</text>
            <text x="24"  y="74" fontSize="12">✨</text>
            <text x="90"  y="48" fontSize="11">⭐</text>
          </>)}
        </svg>
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 13, fontWeight: 500, padding: '5px 14px',
        borderRadius: 999, border: '0.5px solid var(--border-md)',
        background: 'var(--bg-card)', color: 'var(--text-primary)',
      }}>
        {MOOD_STATUS[mood] || '...'}
      </div>
    </div>
  )
}
