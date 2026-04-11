import { useReducer, useState, useEffect } from 'react'
import { useAppointments } from '@/contexts/AppointmentContext'
import { fetchPatients, MEDICOS, TIPOS_CONSULTA } from '@/services/patientService'
import { generateTimeSlots, todayISO } from '@/utils/dateUtils'
import styles from './AppointmentForm.module.css'

const initialFormState = {
  pacienteId: '',
  pacienteNome: '',
  data: '',
  horario: '',
  medico: '',
  tipo: '',
  observacoes: '',
}

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_PATIENT':
      return { ...state, pacienteId: action.id, pacienteNome: action.nome }
    case 'RESET':
      return initialFormState
    default:
      return state
  }
}

const TIME_SLOTS = generateTimeSlots()

export function AppointmentForm({ onClose }) {
  const { dispatch: dispatchAppt } = useAppointments()
  const [form, dispatch] = useReducer(formReducer, initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetchPatients().then(setPatients)
  }, [])

  function validate() {
    const e = {}
    if (!form.pacienteId) e.pacienteId = 'Selecione um paciente.'
    if (!form.data) e.data = 'Informe a data da consulta.'
    else if (form.data < todayISO()) e.data = 'A data não pode ser no passado.'
    if (!form.horario) e.horario = 'Selecione um horário.'
    if (!form.medico) e.medico = 'Selecione um médico.'
    if (!form.tipo) e.tipo = 'Selecione o tipo de consulta.'
    if (form.observacoes.length > 300) e.observacoes = 'Máximo de 300 caracteres.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    dispatchAppt({
      type: 'ADD_APPOINTMENT',
      payload: { ...form, status: 'Agendado' },
    })

    setIsSubmitting(false)
    setSuccessMessage('Consulta agendada com sucesso!')
    setTimeout(() => {
      dispatch({ type: 'RESET' })
      onClose()
    }, 1500)
  }

  function Field({ id, label, error, children }) {
    return (
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        {children}
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    )
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>Novo Agendamento</h3>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      {successMessage && (
        <div className={styles.successBanner}>{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <Field id="paciente" label="Paciente *" error={errors.pacienteId}>
          <select
            id="paciente"
            className={[styles.select, errors.pacienteId ? styles.inputError : ''].join(' ')}
            value={form.pacienteId}
            onChange={(e) => {
              const p = patients.find((pt) => pt.id === e.target.value)
              dispatch({ type: 'SET_PATIENT', id: e.target.value, nome: p?.nome || '' })
            }}
          >
            <option value="">Selecione um paciente...</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </Field>

        <div className={styles.row2}>
          <Field id="data" label="Data *" error={errors.data}>
            <input
              id="data"
              type="date"
              className={[styles.input, errors.data ? styles.inputError : ''].join(' ')}
              min={todayISO()}
              value={form.data}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'data', value: e.target.value })}
            />
          </Field>
          <Field id="horario" label="Horário *" error={errors.horario}>
            <select
              id="horario"
              className={[styles.select, errors.horario ? styles.inputError : ''].join(' ')}
              value={form.horario}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'horario', value: e.target.value })}
            >
              <option value="">Selecione...</option>
              {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field id="medico" label="Médico *" error={errors.medico}>
          <select
            id="medico"
            className={[styles.select, errors.medico ? styles.inputError : ''].join(' ')}
            value={form.medico}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'medico', value: e.target.value })}
          >
            <option value="">Selecione um médico...</option>
            {MEDICOS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>

        <Field id="tipo" label="Tipo de Consulta *" error={errors.tipo}>
          <select
            id="tipo"
            className={[styles.select, errors.tipo ? styles.inputError : ''].join(' ')}
            value={form.tipo}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'tipo', value: e.target.value })}
          >
            <option value="">Selecione o tipo...</option>
            {TIPOS_CONSULTA.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field id="obs" label="Observações" error={errors.observacoes}>
          <textarea
            id="obs"
            className={[styles.textarea, errors.observacoes ? styles.inputError : ''].join(' ')}
            placeholder="Informações adicionais sobre a consulta..."
            rows={3}
            value={form.observacoes}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'observacoes', value: e.target.value })}
          />
          <span className={styles.charCount}>{form.observacoes.length}/300</span>
        </Field>

        <div className={styles.submitRow}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><span className="spinner" /> Salvando...</> : 'Agendar Consulta'}
          </button>
        </div>
      </form>
    </div>
  )
}
