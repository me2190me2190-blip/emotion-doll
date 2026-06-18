import React from 'react'
import styles from './RussellModal.module.css'

export function RussellModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className={styles.bg} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.title}>📊 Russell 감정 원형 모델 (1980)</div>
        <div className={styles.body}>
          심리학자 James Russell이 제안한 모델로, 모든 감정을{' '}
          <strong>Valence(쾌↔불쾌)</strong>와{' '}
          <strong>Arousal(고각성↔저각성)</strong> 2축으로 배치합니다.
          <br /><br />
          이 앱은 4사분면에서 10개 감정을 추출해 수치화합니다.
          <div className={styles.grid}>
            <div className={styles.q} style={{ background: '#FCEBEB', color: '#791F1F' }}>
              <b>Q2 고각성+부정</b>분노 · 짜증 · 불안
            </div>
            <div className={styles.q} style={{ background: '#EAF3DE', color: '#173404' }}>
              <b>Q1 고각성+긍정</b>기쁨 · 신남
            </div>
            <div className={styles.q} style={{ background: '#E6F1FB', color: '#042C53' }}>
              <b>Q3 저각성+부정</b>스트레스 · 억울함
            </div>
            <div className={styles.q} style={{ background: '#E1F5EE', color: '#04342C' }}>
              <b>Q4 저각성+긍정</b>만족 · 평온 · 감사
            </div>
          </div>
        </div>
        <div className={styles.cite}>
          Russell, J. A. (1980). A circumplex model of affect.<br />
          <em>Journal of Personality and Social Psychology, 39</em>(6), 1161–1178.<br />
          Semantic Scholar 인용: 15,213회 · 고영향 인용: 1,151회
        </div>
      </div>
    </div>
  )
}
