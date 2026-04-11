import styles from './StatCard.module.css'

export function StatCard({ title, value, icon, accentColor = 'var(--color-primary)' }) {
  return (
    <div className={styles.card} style={{ '--accent': accentColor }}>
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.body}>
        <span className={styles.value}>{value}</span>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  )
}
