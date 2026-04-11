import styles from './Badge.module.css'

const colorMap = {
  Baixo: styles.green,
  Moderado: styles.yellow,
  Alto: styles.orange,
  'Muito Alto': styles.red,
  Agendado: styles.blue,
  Confirmado: styles.green,
  Cancelado: styles.gray,
  Realizado: styles.teal,
  medico: styles.blue,
  admin: styles.purple,
}

export function Badge({ label, size = 'md' }) {
  const colorClass = colorMap[label] || styles.gray
  return (
    <span className={[styles.badge, colorClass, styles[size]].join(' ')}>
      {label}
    </span>
  )
}
