import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useAppointments } from '@/contexts/AppointmentContext'
import { fetchPatients } from '@/services/patientService'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime } from '@/utils/dateUtils'
import styles from './Dashboard.module.css'

const RISK_LEVELS = ['Baixo', 'Moderado', 'Alto', 'Muito Alto']
const RISK_COLORS = {
  Baixo: '#38a169',
  Moderado: '#d69e2e',
  Alto: '#dd6b20',
  'Muito Alto': '#e53e3e',
}

export function Dashboard() {
  const { user } = useAuth()
  const { appointments } = useAppointments()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients().then((data) => {
      setPatients(data)
      setLoading(false)
    })
  }, [])

  const agendadas = appointments.filter((a) => a.status === 'Agendado').length
  const confirmadas = appointments.filter((a) => a.status === 'Confirmado').length
  const altoRisco = patients.filter(
    (p) => p.riscoCardiovascular === 'Alto' || p.riscoCardiovascular === 'Muito Alto'
  ).length

  const riskCounts = RISK_LEVELS.map((level) => ({
    level,
    count: patients.filter((p) => p.riscoCardiovascular === level).length,
    color: RISK_COLORS[level],
  }))

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5)

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={styles.page}>
      <div className={styles.welcomeBanner}>
        <div>
          <h2 className={styles.welcomeTitle}>Bem-vindo, {user?.nome}!</h2>
          <p className={styles.welcomeDate}>{today}</p>
        </div>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          title="Total de Pacientes"
          value={loading ? '—' : patients.length}
          accentColor="#e53e3e"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          title="Consultas Agendadas"
          value={agendadas}
          accentColor="#3182ce"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />
        <StatCard
          title="Consultas Confirmadas"
          value={confirmadas}
          accentColor="#38a169"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        />
        <StatCard
          title="Pacientes Alto Risco"
          value={loading ? '—' : altoRisco}
          accentColor="#dd6b20"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
        />
      </div>

      <div className={styles.grid2col}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Distribuição por Risco Cardiovascular</h3>
          {loading ? (
            <p className={styles.loading}>Carregando...</p>
          ) : (
            <div className={styles.riskSection}>
              <div className={styles.riskBar}>
                {riskCounts.map(({ level, count, color }) => {
                  const pct = patients.length ? (count / patients.length) * 100 : 0
                  return pct > 0 ? (
                    <div
                      key={level}
                      className={styles.riskSegment}
                      style={{ width: `${pct}%`, background: color }}
                      title={`${level}: ${count} pacientes (${pct.toFixed(0)}%)`}
                    />
                  ) : null
                })}
              </div>
              <div className={styles.riskLegend}>
                {riskCounts.map(({ level, count, color }) => (
                  <div key={level} className={styles.riskLegendItem}>
                    <span className={styles.riskDot} style={{ background: color }} />
                    <span className={styles.riskLabel}>{level}</span>
                    <span className={styles.riskCount}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Agendamentos Recentes</h3>
          {recentAppointments.length === 0 ? (
            <p className={styles.empty}>Nenhum agendamento cadastrado.</p>
          ) : (
            <div className={styles.appointmentList}>
              {recentAppointments.map((a) => (
                <div key={a.id} className={styles.appointmentRow}>
                  <div className={styles.appointmentInfo}>
                    <span className={styles.appointmentPatient}>{a.pacienteNome}</span>
                    <span className={styles.appointmentDetails}>
                      {formatDateTime(a.data, a.horario)} · {a.tipo}
                    </span>
                  </div>
                  <Badge label={a.status} size="sm" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
