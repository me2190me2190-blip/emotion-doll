import React from 'react'
import { GOALS } from '../constants'
import styles from './TabGoals.module.css'

export function TabGoals({ totals, negTotal, clearedGoals, onClear }) {
  return (
    <div className="fade-in">
      <div className={styles.wrap}>
        {GOALS.map(g => {
          const isNegT   = g.emotion === 'negTotal'
          const current  = isNegT ? negTotal : (totals[g.emotion] || 0)
          const pct      = Math.min(100, Math.round((current / g.threshold) * 100))
          const unlocked = current >= g.threshold
          const cleared  = (clearedGoals || []).includes(g.id)

          return (
            <div key={g.id} className={styles.row} style={{ opacity: cleared ? 0.4 : 1 }}>
              <span className={styles.emoji}>{g.emoji}</span>
              <div className={styles.info}>
                <div className={styles.name}>{g.name}</div>
                <div className={styles.desc}>{g.desc}</div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${pct}%`, background: unlocked ? '#3B6D11' : g.color }}
                  />
                </div>
              </div>
              <div className={styles.right}>
                {cleared ? (
                  <span className={styles.doneText}>완료됨</span>
                ) : unlocked ? (
                  <button className={styles.doneBtn} onClick={() => onClear(g.id)}>완료 ✓</button>
                ) : (
                  <span className={styles.progress}>{Math.round(current)} / {g.threshold}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.hint}>수치가 기준에 도달하면 해금 → 완료 버튼으로 초기화</div>
    </div>
  )
}
