// Russell 감정 원형 모델(1980) 기반 10개 감정축
// 출처: Russell, J. A. (1980). A circumplex model of affect.
//       Journal of Personality and Social Psychology, 39(6), 1161–1178. (15,213회 인용)

export const EMOTIONS = {
  // 부정 감정 Q2~Q3 (Negative Valence)
  anger:       { label: '분노',     quadrant: 'neg', color: '#E24B4A', bg: '#FCEBEB', border: '#F09595' },
  irritation:  { label: '짜증',     quadrant: 'neg', color: '#BA7517', bg: '#FAEEDA', border: '#EF9F27' },
  anxiety:     { label: '불안',     quadrant: 'neg', color: '#534AB7', bg: '#EEEDFE', border: '#AFA9EC' },
  stress:      { label: '스트레스', quadrant: 'neg', color: '#993C1D', bg: '#FAECE7', border: '#F0997B' },
  resentment:  { label: '억울함',   quadrant: 'neg', color: '#993556', bg: '#FBEAF0', border: '#ED93B1' },
  // 긍정 감정 Q1~Q4 (Positive Valence)
  joy:         { label: '기쁨',     quadrant: 'pos', color: '#27500A', bg: '#EAF3DE', border: '#97C459' },
  excitement:  { label: '신남',     quadrant: 'pos', color: '#633806', bg: '#FAEEDA', border: '#FAC775' },
  contentment: { label: '만족',     quadrant: 'pos', color: '#085041', bg: '#E1F5EE', border: '#5DCAA5' },
  serenity:    { label: '평온',     quadrant: 'pos', color: '#185FA5', bg: '#E6F1FB', border: '#85B7EB' },
  gratitude:   { label: '감사',     quadrant: 'pos', color: '#3C3489', bg: '#EEEDFE', border: '#AFA9EC' },
}

export const NEG_KEYS = ['anger', 'irritation', 'anxiety', 'stress', 'resentment']
export const POS_KEYS = ['joy', 'excitement', 'contentment', 'serenity', 'gratitude']

export const GOALS = [
  { id: 'g1',  emoji: '🍗', name: '치킨 먹기',        desc: '짜증 누적 100pt',       emotion: 'irritation', threshold: 100, color: '#BA7517' },
  { id: 'g2',  emoji: '☕', name: '카페 혼자 가기',    desc: '스트레스 누적 80pt',    emotion: 'stress',     threshold: 80,  color: '#993C1D' },
  { id: 'g3',  emoji: '🎮', name: '게임 1시간',        desc: '분노 누적 120pt',       emotion: 'anger',      threshold: 120, color: '#E24B4A' },
  { id: 'g4',  emoji: '🛁', name: '반신욕',            desc: '불안 누적 90pt',        emotion: 'anxiety',    threshold: 90,  color: '#534AB7' },
  { id: 'g5',  emoji: '🍣', name: '스시 먹기',         desc: '억울함 누적 150pt',     emotion: 'resentment', threshold: 150, color: '#993556' },
  { id: 'g6',  emoji: '🎉', name: '친구한테 자랑',     desc: '기쁨 누적 100pt',       emotion: 'joy',        threshold: 100, color: '#27500A' },
  { id: 'g7',  emoji: '🎵', name: '좋아하는 곡 틀기',  desc: '신남 누적 80pt',        emotion: 'excitement', threshold: 80,  color: '#633806' },
  { id: 'g8',  emoji: '📔', name: '감사일기 쓰기',     desc: '감사 누적 70pt',        emotion: 'gratitude',  threshold: 70,  color: '#3C3489' },
  { id: 'g9',  emoji: '✈️', name: '여행 계획 세우기',  desc: '부정 감정 합산 300pt',  emotion: 'negTotal',   threshold: 300, color: '#A32D2D' },
  { id: 'g10', emoji: '🌸', name: '산책 나가기',       desc: '평온 누적 60pt',        emotion: 'serenity',   threshold: 60,  color: '#185FA5' },
]

export const STORAGE_KEY = 'emotion_doll_v2'

export const emptyData = () => ({
  logs: [],
  totals: Object.fromEntries(Object.keys(EMOTIONS).map(k => [k, 0])),
  clearedGoals: [],
})
