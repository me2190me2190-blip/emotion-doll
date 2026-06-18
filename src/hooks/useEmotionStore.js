import { useState, useEffect } from 'react'
import { STORAGE_KEY, emptyData, EMOTIONS, NEG_KEYS } from '../constants'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return { ...emptyData(), bearName: '' }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch (e) {}
}

export function useEmotionStore() {
  const [data, setData] = useState(load)
  useEffect(() => save(data), [data])

  function addEntry(scores, event, summary) {
    const newTotals = { ...data.totals }
    Object.keys(EMOTIONS).forEach(k => {
      if (scores[k] != null) newTotals[k] = (newTotals[k] || 0) + (scores[k] || 0)
    })
    const log = { id: Date.now(), date: new Date().toISOString(), event, scores, summary: summary || event.slice(0, 20) }
    setData(prev => ({ ...prev, logs: [log, ...prev.logs], totals: newTotals }))
  }

  function clearGoal(id) {
    setData(prev => ({ ...prev, clearedGoals: [...(prev.clearedGoals || []), id] }))
  }

  function resetAll() {
    setData(prev => ({ ...emptyData(), bearName: prev.bearName || '' }))
  }

  function saveBearName(name) {
    setData(prev => ({ ...prev, bearName: name }))
  }

  const negTotal = NEG_KEYS.reduce((a, k) => a + (data.totals[k] || 0), 0)
  const posTotal = ['joy', 'excitement', 'contentment', 'serenity', 'gratitude']
    .reduce((a, k) => a + (data.totals[k] || 0), 0)
  const netScore = posTotal - negTotal

  return { data, addEntry, clearGoal, resetAll, saveBearName, negTotal, posTotal, netScore }
}
