import React, { useEffect, useRef } from 'react'
import styles from './CommentCard.module.css'

// 감정 유형별 코멘트 풀
const POOL = {
  anger: [
    { e: '🤗', t: '지금 많이 화가 나셨군요. 화는 내 경계선이 침범당했다는 신호예요.', s: '잠깐 심호흡 세 번, 그걸로 충분해요.' },
    { e: '🧊', t: '화가 극에 달했을 때는 차가운 물 한 잔이 생각보다 큰 도움이 돼요.', s: '몸을 식히면 마음도 따라와요.' },
    { e: '🚶', t: '지금 당장 그 상황에서 벗어나는 게 최선일 수 있어요.', s: '자리를 잠깐 피하는 것도 용기예요.' },
  ],
  irritation: [
    { e: '😤', t: '작은 것들이 쌓여서 터진 거예요. 충분히 짜증날 만해요.', s: '오늘 하나쯤은 내려놓아도 괜찮아요.' },
    { e: '🎵', t: '짜증날 때 좋아하는 노래 한 곡 틀어보세요.', s: '기분 전환의 가장 빠른 방법이에요.' },
    { e: '☕', t: '잠깐 자리를 비우고 따뜻한 음료 한 잔 어떨까요?', s: '5분의 쉬어가기가 상황을 바꿀 수 있어요.' },
  ],
  anxiety: [
    { e: '🌿', t: '불안할 때는 지금 눈에 보이는 것 5가지를 세어보세요.', s: '그라운딩 기법 — 현재로 돌아오는 닻이에요.' },
    { e: '🌬️', t: '4초 들이쉬고, 4초 참고, 4초 내쉬기. 박스 호흡법이에요.', s: '몇 번만 반복하면 심장박동이 안정돼요.' },
    { e: '📝', t: '걱정되는 것들을 종이에 써보세요. 머릿속에서 꺼내놓으면 훨씬 가벼워져요.', s: '쓰는 것만으로도 반은 해결돼요.' },
  ],
  stress: [
    { e: '🛁', t: '오늘 밤은 반신욕 어때요? 스트레스 호르몬 코르티솔이 실제로 줄어들어요.', s: '38~40도 물에 15분이면 충분해요.' },
    { e: '🤸', t: '스트레스가 쌓이면 몸이 먼저 반응해요. 가볍게 스트레칭 5분만 해보세요.', s: '몸을 움직이면 기분이 따라 바뀌어요.' },
    { e: '🌙', t: '지금 가장 필요한 건 수면일 수 있어요. 오늘은 일찍 쉬어도 돼요.', s: '내일의 나에게 줄 수 있는 최고의 선물이에요.' },
  ],
  resentment: [
    { e: '💬', t: '억울한 감정은 혼자 삭이면 독이 돼요. 믿을 수 있는 사람에게 털어놓아 보세요.', s: '들어줄 사람 한 명만 있어도 달라져요.' },
    { e: '✍️', t: '억울했던 상황을 글로 써보세요. 쓰면서 내 감정이 정당했다는 걸 확인하게 돼요.', s: '자기 인정이 먼저예요.' },
    { e: '⏳', t: '지금 당장 해결되지 않아도 괜찮아요. 때로는 시간이 가장 공정한 심판이에요.', s: '지금은 나를 챙기는 게 우선이에요.' },
  ],
  mixed: [
    { e: '🌈', t: '복잡한 감정들이 한꺼번에 쏟아졌네요. 그래도 여기까지 잘 버텼어요.', s: '여러 감정이 동시에 드는 건 자연스러운 일이에요.' },
    { e: '🤝', t: '힘든 하루를 보내셨군요. 지금 이 순간 여기 있다는 것만으로도 충분해요.', s: '오늘을 버텨냈다는 것, 잊지 마세요.' },
    { e: '🌟', t: '감정을 기록하는 것 자체가 자기 자신을 돌보는 거예요.', s: '오늘 수고했어요.' },
  ],
}

const NEG_KEYS = ['anger', 'irritation', 'anxiety', 'stress', 'resentment']
const POS_KEYS = ['joy', 'excitement', 'contentment', 'serenity', 'gratitude']

export function pickComment(scores) {
  const negTotal = NEG_KEYS.reduce((a, k) => a + (scores[k] || 0), 0)
  const posTotal = POS_KEYS.reduce((a, k) => a + (scores[k] || 0), 0)
  // 긍정이 과반이거나 부정이 없으면 코멘트 없음
  if (negTotal === 0 || posTotal >= negTotal) return null
  // 가장 높은 부정 감정 찾기
  const dominant = NEG_KEYS.reduce((a, b) => (scores[a] || 0) >= (scores[b] || 0) ? a : b)
  const pool = POOL[dominant] || POOL.mixed
  return pool[Math.floor(Math.random() * pool.length)]
}

export function CommentCard({ comment, onClose }) {
  const timerRef = useRef(null)

  useEffect(() => {
    if (!comment) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(onClose, 8000)
    return () => clearTimeout(timerRef.current)
  }, [comment])

  if (!comment) return null

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <span className={styles.emoji}>{comment.e}</span>
        <div className={styles.body}>
          <div className={styles.text}>{comment.t}</div>
          <div className={styles.sub}>{comment.s}</div>
        </div>
        <button className={styles.close} onClick={onClose} aria-label="닫기">✕</button>
      </div>
    </div>
  )
}
