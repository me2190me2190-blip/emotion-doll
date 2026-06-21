import React, { useState, useCallback } from 'react'
import { Bear, BgScene } from './components/Bear'
import { MoodStrip, MOODS } from './components/MoodStrip'
import { RussellModal } from './components/RussellModal'
import { BearNameModal } from './components/BearNameModal'
import { TabInput } from './components/TabInput'
import { TabGauge } from './components/TabGauge'
import { TabLog } from './components/TabLog'
import { TabGoals } from './components/TabGoals'
import { MoodThermometer } from './components/MoodThermometer'
import { useEmotionStore } from './hooks/useEmotionStore'
import { EMOTIONS } from './constants'
import styles from './App.module.css'

const TABS = [
  { id: 'input', label: '💬 입력' },
  { id: 'gauge', label: '📊 현황' },
  { id: 'log',   label: '📅 기록' },
  { id: 'goals', label: '🎯 목표' },
]

export default function App() {
  const [tab, setTab] = useState('input')
  const [modalOpen, setModalOpen] = useState(false)
  const [nameModalOpen, setNameModalOpen] = useState(false)
  const [stripOpen, setStripOpen] = useState(false)
  const [previewMood, setPreviewMood] = useState(null)
  const { data, addEntry, deleteEntry, clearGoal, resetAll, negTotal, posTotal, netScore, saveBearName } = useEmotionStore()

  const handlePreview = useCallback((moodId) => {
    setPreviewMood(moodId)
    setTimeout(() => setPreviewMood(null), 2500)
  }, [])

  const activeMood = previewMood ?? (() => {
    const net = netScore, t = data.totals
    if (net > 80)  return 'ecstatic'
    if (net > 20)  return 'happy'
    if (net > -20) return 'neutral'
    if (net > -80) return 'tired'
    if ((t.anger || 0) > 80)   return 'angry'
    if ((t.anxiety || 0) > 70) return 'worried'
    return 'exhausted'
  })()

  const negPct = Math.min(50, Math.round((negTotal / 300) * 50))
  const posPct = Math.min(50, Math.round((posTotal / 300) * 50))
  const bearName = data.bearName || ''

  return (
    <div className={styles.app}>
      {/* 헤더: 3열 그리드 — 절대 겹치지 않음 */}
      <header className={styles.header}>
        <div />
        <h1 className={styles.title}>🧸 AI 감정 인형</h1>
        <div className={styles.headerRight}>
          {/* 두 버튼 width:100% → 부모 너비에 맞춰 동일 크기 */}
          <button className={styles.hdrBtn} onClick={() => setModalOpen(true)}>
            📖 감정 모델 근거
          </button>
          <button className={styles.hdrBtn} onClick={() => setStripOpen(v => !v)}>
            {stripOpen ? '표정 모아보기 ▴' : '표정 모아보기 ▾'}
          </button>
        </div>
      </header>

      {/* 표정 스트립 */}
      <div className={`${styles.stripWrap} ${stripOpen ? styles.stripOpen : ''}`}>
        <MoodStrip currentMood={activeMood} onPreview={handlePreview} />
      </div>

      {/* 모달들 */}
      <RussellModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <BearNameModal
        open={nameModalOpen}
        currentName={bearName}
        onSave={name => saveBearName(name)}
        onClose={() => setNameModalOpen(false)}
      />

      {/* 스테이지 */}
      <section className={styles.stage} data-mood={activeMood}>
        {/* 배경 SVG 장면 */}
        <BgScene mood={activeMood} />
        <div className={styles.stageInner}>
          {/* 이름 뱃지 */}
          <div className={styles.nameWrap}>
            <span className={styles.bearName}>{bearName || '이름 없음'}</span>
            <button className={styles.nameEditBtn} onClick={() => setNameModalOpen(true)}>
              {bearName ? '✏️ 수정' : '✏️ 이름 짓기'}
            </button>
          </div>

          {/* 곰돌이 */}
          <Bear mood={activeMood} />

          {/* 무드 바 */}
          <div className={styles.moodBar}>
            <div className={styles.moodTrack}>
              <div className={styles.moodNeg} style={{ width: `${negPct}%` }} />
              <div className={styles.moodPos} style={{ width: `${posPct}%` }} />
            </div>
            <div className={styles.moodLabels}>
              <span>부정 {Math.round(negTotal)}</span>
              <span>긍정 {Math.round(posTotal)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 감정 배지 */}
      <div className={styles.badges}>
        {Object.entries(EMOTIONS).map(([k, c]) => (
          <span key={k} className={styles.badge}
            style={{ background: c.bg, color: c.color, borderColor: c.border }}>
            {c.label} {Math.round(data.totals[k] || 0)}
          </span>
        ))}
      </div>

      {/* 탭 */}
      <nav className={styles.tabs} role="tablist">
        {TABS.map(t => (
          <button key={t.id} role="tab" aria-selected={tab === t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'input' && (
          <TabInput
            bearName={bearName}
            onSubmit={(scores, event, summary) => addEntry(scores, event, summary)}
            onReset={resetAll}
          />
        )}
        {tab === 'gauge' && <TabGauge totals={data.totals} negTotal={negTotal} posTotal={posTotal} netScore={netScore} />}
        {tab === 'log'   && (
          <>
            <MoodThermometer logs={data.logs} />
            <TabLog logs={data.logs} onDelete={deleteEntry} />
          </>
        )}
        {tab === 'goals' && <TabGoals totals={data.totals} negTotal={negTotal} clearedGoals={data.clearedGoals} onClear={clearGoal} />}
      </main>
    </div>
  )
}
