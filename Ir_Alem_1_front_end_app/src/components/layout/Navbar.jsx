import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import styles from './Navbar.module.css'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/pacientes': 'Pacientes',
  '/agendamentos': 'Agendamentos',
}

export function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = user?.nome
    ? user.nome.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    : '?'

  const pageTitle = PAGE_TITLES[location.pathname] || 'CardioIA'

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </div>
      <div className={styles.right}>
        {user?.crm && <span className={styles.crm}>{user.crm}</span>}
        <div className={styles.avatar}>{initials}</div>
        <span className={styles.userName}>{user?.nome}</span>
        <button className={styles.logoutBtn} onClick={handleLogout} title="Sair">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </button>
      </div>
    </header>
  )
}
