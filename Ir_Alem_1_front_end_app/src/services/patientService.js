import patientsData from '@/data/patients.json'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchPatients() {
  await delay(400)
  return [...patientsData]
}

export async function fetchPatientById(id) {
  await delay(300)
  return patientsData.find((p) => p.id === id) || null
}

export async function fetchPatientsByRisk(nivel) {
  await delay(350)
  return patientsData.filter((p) => p.riscoCardiovascular === nivel)
}

export const MEDICOS = [
  'Dr. Carlos Andrade',
  'Dra. Fernanda Lima',
  'Dr. Ricardo Moraes',
  'Dra. Juliana Costa',
  'Dr. Marcelo Oliveira',
]

export const TIPOS_CONSULTA = [
  'Consulta de Rotina',
  'Retorno',
  'Eletrocardiograma',
  'Ecocardiograma',
  'Holter 24h',
  'Teste Ergométrico',
  'Urgência',
]

export const STATUS_CONSULTA = ['Agendado', 'Confirmado', 'Cancelado', 'Realizado']
