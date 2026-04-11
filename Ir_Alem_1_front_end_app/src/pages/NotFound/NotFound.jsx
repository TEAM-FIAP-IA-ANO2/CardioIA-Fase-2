import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import styles from './NotFound.module.css'

export function NotFound() {
  const { isAuthenticated } = useAuth()

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.ecg}>
          <svg viewBox="0 0 400 80" className={styles.ecgSvg}>
            <polyline
              points="0,40 60,40 80,10 100,70 120,40 140,40 160,20 170,60 180,40 400,40"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Página não encontrada</h2>
        <p className={styles.text}>
          A rota que você acessou não existe no CardioIA Portal.
        </p>
        <Link
          to={isAuthenticated ? '/dashboard' : '/login'}
          className={styles.homeBtn}
        >
          Voltar ao {isAuthenticated ? 'Dashboard' : 'Login'}
        </Link>
      </div>
    </div>
  )
}
