import React, { useState } from 'react'
import { EMOTIONS } from '../constants'
import styles from './TabLog.module.css'

function fmtDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

export function TabLog({ logs, onDelete }) {
  const [filterDate, setFilterDate] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const filtered = filterDate
    ? logs.filter(l => l.date.startsWith(filterDate))
    : logs

  function handleDelete(id) {
    if (confirmId === id) {
      onDelete(id)
      setConfirmId(null)
    } else {
      setConfirmId(id)
      setTimeout(() => setConfirmId(null), 3000)
    }
  }

  return (
    <div className="fade-in">
      <div className={styles.dateRow}>
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className={styles.dateInput}
        />
        {filterDate && (
          <button className={styles.clearBtn} onClick={() => setFilterDate('')}>전체 보기</button>
        )}
        <span className={styles.count}>{filtered.length}개</span>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>아직 기록이 없어요 🐾</div>
      ) : (
        <div className={styles.list}>
          {filtered.map(log => (
            <div key={log.id} className={styles.item}>
              <div className={styles.meta}>
                <span className={styles.date}>{fmtDate(log.date)}</span>
                <span className={styles.summary}>{log.summary}</span>
                <button
                  className={`${styles.deleteBtn} ${confirmId === log.id ? styles.deleteBtnConfirm : ''}`}
                  onClick={() => handleDelete(log.id)}
                  title={confirmId === log.id ? '한 번 더 누르면 삭제돼요' : '기록 삭제'}
                >
                  {confirmId === log.id ? '삭제 확인 ✕' : '🗑'}
                </button>
              </div>
              <div className={styles.event}>{log.event}</div>
              <div className={styles.badges}>
                {Object.entries(log.scores || {})
                  .filter(([, v]) => v > 0)
                  .map(([k, v]) => EMOTIONS[k] && (
                    <span
                      key={k}
                      className={styles.badge}
                      style={{
                        background: EMOTIONS[k].bg,
                        color: EMOTIONS[k].color,
                        border: `0.5px solid ${EMOTIONS[k].border}`,
                      }}
                    >
                      {EMOTIONS[k].label} +{v}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
