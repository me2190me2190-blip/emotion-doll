import React from 'react'
import { EMOTIONS, NEG_KEYS, POS_KEYS } from '../constants'
import styles from './TabGauge.module.css'

function GaugeCard({ emotionKey, value }) {
  const cfg = EMOTIONS[emotionKey]
  const pct = Math.min(100, Math.round((value / 150) * 100))
  return (
    <div className={styles.card}>
      <div className={styles.name}>{cfg.label}</div>
      <div className={styles.value} style={{ color: cfg.color }}>{Math.round(value)}</div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%`, background: cfg.color }} />
      </div>
    </div>
  )
}

export function TabGauge({ totals, negTotal, posTotal, netScore }) {
  return (
    <div className="fade-in">
      <div className={styles.sectionTitle}>부정 감정 (Q2~Q3)</div>
      <div className={styles.grid}>
        {NEG_KEYS.map(k => <GaugeCard key={k} emotionKey={k} value={totals[k] || 0} />)}
      </div>

      <div className={styles.sectionTitle}>긍정 감정 (Q1~Q4)</div>
      <div className={styles.grid}>
        {POS_KEYS.map(k => <GaugeCard key={k} emotionKey={k} value={totals[k] || 0} />)}
      </div>

      <div className={styles.netWrap}>
        <div>
          <div className={styles.netLabel}>감정 순지수</div>
          <div className={styles.netSub}>긍정 합계 − 부정 합계</div>
        </div>
        <div className={styles.netValue} style={{ color: netScore >= 0 ? '#3B6D11' : '#A32D2D' }}>
          {netScore > 0 ? '+' : ''}{Math.round(netScore)}
        </div>
      </div>

      <div className={styles.hint}>각 게이지 최대 150pt 기준 · 누적 합산은 계속 증가해요</div>
    </div>
  )
}
