export function formatDate(isoString) {
  if (!isoString) return '—'
  const [year, month, day] = isoString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(isoString) {
  if (!isoString) return '—'
  const [year, month, day] = isoString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR')
}

export function formatDateTime(isoDate, time) {
  if (!isoDate) return '—'
  return `${formatDateShort(isoDate)} às ${time}`
}

export function isDateInPast(isoString) {
  if (!isoString) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [year, month, day] = isoString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date < today
}

export function todayISO() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

export function generateTimeSlots(start = '07:00', end = '18:30', intervalMin = 30) {
  const slots = []
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  let current = startH * 60 + startM
  const finish = endH * 60 + endM
  while (current <= finish) {
    const h = String(Math.floor(current / 60)).padStart(2, '0')
    const m = String(current % 60).padStart(2, '0')
    slots.push(`${h}:${m}`)
    current += intervalMin
  }
  return slots
}
