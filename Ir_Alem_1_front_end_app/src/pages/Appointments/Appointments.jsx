import { useState } from 'react'
import { useAppointments } from '@/contexts/AppointmentContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AppointmentForm } from './AppointmentForm'
import { formatDateTime, formatDate } from '@/utils/dateUtils'
import styles from './Appointments.module.css'

const FILTERS = ['Todos', 'Agendado', 'Confirmado', 'Cancelado', 'Realizado']

export function Appointments() {
  const { filteredAppointments, filterStatus, dispatch } = useAppointments()
  const [showForm, setShowForm] = useState(false)
  const [detailAppointment, setDetailAppointment] = useState(null)

  function handleRemove(id) {
    if (window.confirm('Deseja cancelar este agendamento?')) {
      dispatch({ type: 'REMOVE_APPOINTMENT', payload: { id } })
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={[
                styles.filterBtn,
                filterStatus === f ? styles.filterBtnActive : '',
              ].join(' ')}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
            >
              {f}
            </button>
          ))}
        </div>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          + Novo Agendamento
        </Button>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhum agendamento encontrado.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredAppointments.map((a) => (
            <div key={a.id} className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={styles.dateBlock}>
                  <span className={styles.dateDay}>
                    {a.data ? a.data.split('-')[2] : '—'}
                  </span>
                  <span className={styles.dateMonth}>
                    {a.data
                      ? new Date(a.data + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' })
                      : '—'}
                  </span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.patientName}>{a.pacienteNome}</span>
                  <Badge label={a.status} size="sm" />
                </div>
                <div className={styles.cardMeta}>
                  <span>🕐 {a.horario}</span>
                  <span>👨‍⚕️ {a.medico}</span>
                  <span>📋 {a.tipo}</span>
                </div>
                {a.observacoes && (
                  <p className={styles.obs}>{a.observacoes}</p>
                )}
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.detailBtn}
                  onClick={() => setDetailAppointment(a)}
                >
                  Detalhes
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(a.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Novo Agendamento">
        <AppointmentForm onClose={() => setShowForm(false)} />
      </Modal>

      {/* Detail modal */}
      <Modal
        isOpen={!!detailAppointment}
        onClose={() => setDetailAppointment(null)}
        title="Detalhes do Agendamento"
      >
        {detailAppointment && (
          <div className={styles.detailView}>
            {[
              { label: 'Paciente', value: detailAppointment.pacienteNome },
              { label: 'Data e Hora', value: formatDateTime(detailAppointment.data, detailAppointment.horario) },
              { label: 'Médico', value: detailAppointment.medico },
              { label: 'Tipo', value: detailAppointment.tipo },
              { label: 'Status', value: <Badge label={detailAppointment.status} /> },
              { label: 'Observações', value: detailAppointment.observacoes || '—' },
            ].map(({ label, value }) => (
              <div key={label} className={styles.detailRow}>
                <span className={styles.detailLabel}>{label}</span>
                <span className={styles.detailValue}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}
