import React, { useState, useEffect, useRef } from 'react'
import styles from './BearNameModal.module.css'

export function BearNameModal({ open, currentName, onSave, onClose }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setValue(currentName || '')
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open, currentName])

  if (!open) return null

  function handleSave() {
    onSave(value.trim())
    onClose()
  }

  return (
    <div className={styles.bg} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.title}>🐻 캐릭터 이름 짓기</div>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="이름을 입력하세요 (최대 10자)"
          maxLength={10}
        />
        <div className={styles.btns}>
          <button className={styles.cancel} onClick={onClose}>취소</button>
          <button className={styles.save} onClick={handleSave}>저장하기</button>
        </div>
      </div>
    </div>
  )
}
