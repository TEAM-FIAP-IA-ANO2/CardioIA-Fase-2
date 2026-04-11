import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import styles from './Layout.module.css'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Navbar onMenuToggle={() => setSidebarOpen((v) => !v)} />
      <div className={styles.body}>
        <Sidebar isOpen={sidebarOpen} />
        {sidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
