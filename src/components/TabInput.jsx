import React, { useState } from 'react'
import { useAnalyze } from '../hooks/useAnalyze'
import { CommentCard, pickComment } from './CommentCard'
import styles from './TabInput.module.css'

export function TabInput({ bearName, onSubmit, onReset }) {
  const [text, setText]       = useState('')
  const [lastMsg, setLastMsg] = useState('')
  const [comment, setComment] = useState(null)
  const { analyze, loading, error } = useAnalyze()

  async function handleSubmit() {
    if (!text.trim() || loading) return
    const result = await analyze(text.trim())
    if (!result) return
    const { summary, ...scores } = result
    onSubmit(scores, text.trim(), summary)

    // 결과 메시지
    const labels = { anger:'분노', irritation:'짜증', anxiety:'불안', stress:'스트레스',
      resentment:'억울함', joy:'기쁨', excitement:'신남', contentment:'만족',
      serenity:'평온', gratitude:'감사' }
    const parts = Object.entries(scores).filter(([,v]) => v > 0)
      .map(([k,v]) => `${labels[k]||k} +${v}`).slice(0, 6)
    setLastMsg(`"${summary}" — ${parts.join(', ')}`)

    // 부정 과반일 때 코멘트
    setComment(pickComment(scores))
    setText('')
  }

  return (
    <div className="fade-in">
      {/* 코멘트 카드 — 분석 결과 바로 위 */}
      <CommentCard comment={comment} onClose={() => setComment(null)} />

      <div className={styles.card}>
        <label className={styles.label}>
          {bearName ? `${bearName}에게 오늘 있었던 일을 말해줘요` : '오늘 무슨 일이 있었나요?'}
        </label>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit() }}
          placeholder="예: 팀장한테 칭찬받았는데 옆 동료가 딴지를 걸어서 좀 짜증났어..."
          rows={3}
        />
        <button className={styles.btn} onClick={handleSubmit} disabled={loading || !text.trim()}>
          {loading
            ? <span className="pulse">🐾 감정 분석 중...</span>
            : <><span>감정 분석하기</span><span className={styles.hint}>Ctrl+Enter</span></>
          }
        </button>
        {(lastMsg || error) && <div className={styles.result}>{error || lastMsg}</div>}
      </div>

      <button className={styles.resetBtn}
        onClick={() => { if (window.confirm('모든 데이터를 초기화할까요?')) onReset() }}>
        데이터 초기화
      </button>
    </div>
  )
}
