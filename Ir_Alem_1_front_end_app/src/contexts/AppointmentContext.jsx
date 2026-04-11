import { createContext, useContext, useReducer, useEffect } from 'react'
import seedAppointments from '@/data/appointments.json'

const AppointmentContext = createContext(null)

function init(seed) {
  try {
    const stored = localStorage.getItem('cardioia_appointments')
    const appointments = stored ? JSON.parse(stored) : seed
    return { appointments, selectedAppointment: null, filterStatus: 'Todos' }
  } catch {
    return { appointments: seed, selectedAppointment: null, filterStatus: 'Todos' }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [
          { ...action.payload, id: `AGN-${Date.now()}` },
          ...state.appointments,
        ],
      }
    case 'REMOVE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter((a) => a.id !== action.payload.id),
        selectedAppointment:
          state.selectedAppointment?.id === action.payload.id
            ? null
            : state.selectedAppointment,
      }
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? { ...a, ...action.payload } : a
        ),
      }
    case 'SET_FILTER':
      return { ...state, filterStatus: action.payload }
    case 'SELECT_APPOINTMENT':
      return { ...state, selectedAppointment: action.payload }
    case 'CLEAR_SELECTION':
      return { ...state, selectedAppointment: null }
    default:
      return state
  }
}

export function AppointmentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, seedAppointments, init)

  useEffect(() => {
    try {
      localStorage.setItem('cardioia_appointments', JSON.stringify(state.appointments))
    } catch (error) {
      console.error('Erro ao persistir agendamentos:', error)
    }
  }, [state.appointments])

  const filteredAppointments =
    state.filterStatus === 'Todos'
      ? state.appointments
      : state.appointments.filter((a) => a.status === state.filterStatus)

  const value = {
    appointments: state.appointments,
    filteredAppointments,
    selectedAppointment: state.selectedAppointment,
    filterStatus: state.filterStatus,
    dispatch,
  }

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const ctx = useContext(AppointmentContext)
  if (!ctx)
    throw new Error('useAppointments deve ser usado dentro de AppointmentProvider')
  return ctx
}
