import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { AppointmentProvider } from '@/contexts/AppointmentContext'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { Login } from '@/pages/Login/Login'
import { Dashboard } from '@/pages/Dashboard/Dashboard'
import { Patients } from '@/pages/Patients/Patients'
import { Appointments } from '@/pages/Appointments/Appointments'
import { NotFound } from '@/pages/NotFound/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppointmentProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pacientes" element={<Patients />} />
              <Route path="/agendamentos" element={<Appointments />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppointmentProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
