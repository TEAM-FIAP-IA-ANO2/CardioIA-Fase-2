import styles from './Card.module.css'

export function Card({ children, className = '', onClick }) {
  return (
    <div
      className={[styles.card, onClick ? styles.clickable : '', className].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
