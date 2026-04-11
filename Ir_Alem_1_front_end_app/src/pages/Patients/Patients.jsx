import { useState, useEffect } from 'react'
import { fetchPatients } from '@/services/patientService'
import { PatientCard } from '@/components/patients/PatientCard'
import { PatientTable } from '@/components/patients/PatientTable'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/utils/dateUtils'
import styles from './Patients.module.css'

const RISK_LEVELS = ['Todos', 'Baixo', 'Moderado', 'Alto', 'Muito Alto']

export function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterRisk, setFilterRisk] = useState('Todos')
  const [viewMode, setViewMode] = useState('cards')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchPatients().then((data) => {
      setPatients(data)
      setLoading(false)
    })
  }, [])

  const filtered = patients.filter((p) => {
    const matchSearch =
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.medicoResponsavel.toLowerCase().includes(search.toLowerCase())
    const matchRisk = filterRisk === 'Todos' || p.riscoCardiovascular === filterRisk
    return matchSearch && matchRisk
  })

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Buscar por nome, ID ou médico..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.filterSelect}
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
        >
          {RISK_LEVELS.map((r) => (
            <option key={r} value={r}>{r === 'Todos' ? 'Todos os riscos' : `Risco ${r}`}</option>
          ))}
        </select>
        <div className={styles.viewToggle}>
          <button
            className={viewMode === 'cards' ? styles.toggleActive : styles.toggleBtn}
            onClick={() => setViewMode('cards')}
            title="Visualização em cards"
          >
            ⊞
          </button>
          <button
            className={viewMode === 'table' ? styles.toggleActive : styles.toggleBtn}
            onClick={() => setViewMode('table')}
            title="Visualização em tabela"
          >
            ☰
          </button>
        </div>
      </div>

      <p className={styles.resultCount}>
        {loading ? 'Carregando...' : `${filtered.length} paciente${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
      </p>

      {!loading && filtered.length === 0 && (
        <div className={styles.emptyState}>
          <p>Nenhum paciente encontrado para os filtros aplicados.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && viewMode === 'cards' && (
        <div className={styles.grid}>
          {filtered.map((p) => (
            <PatientCard key={p.id} patient={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && viewMode === 'table' && (
        <PatientTable patients={filtered} onSelect={(p) => setSelected(p)} />
      )}

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.nome} · ${selected.id}` : ''}
      >
        {selected && <PatientDetail patient={selected} />}
      </Modal>
    </div>
  )
}

function PatientDetail({ patient }) {
  return (
    <div className={styles.detail}>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Risco Cardiovascular</span>
        <Badge label={patient.riscoCardiovascular} />
      </div>
      <div className={styles.detailGrid}>
        {[
          { label: 'Idade', value: `${patient.idade} anos` },
          { label: 'Sexo', value: patient.sexo },
          { label: 'Pressão Arterial', value: patient.pressaoArterial },
          { label: 'Classificação PA', value: patient.classificacaoPA },
          { label: 'Colesterol Total', value: `${patient.colesterolTotal} mg/dL` },
          { label: 'LDL', value: `${patient.colesterolLDL} mg/dL` },
          { label: 'HDL', value: `${patient.colesterolHDL} mg/dL` },
          { label: 'Triglicerídeos', value: `${patient.triglicerides} mg/dL` },
          { label: 'Freq. Cardíaca', value: `${patient.frequenciaCardiaca} bpm` },
        ].map(({ label, value }) => (
          <div key={label} className={styles.detailItem}>
            <span className={styles.detailLabel}>{label}</span>
            <span className={styles.detailValue}>{value}</span>
          </div>
        ))}
      </div>
      <div className={styles.detailSection}>
        <span className={styles.detailLabel}>Histórico</span>
        <p className={styles.detailText}>{patient.historicoDoencas}</p>
      </div>
      <div className={styles.detailSection}>
        <span className={styles.detailLabel}>Sintomas</span>
        <div className={styles.tagList}>
          {patient.sintomasPresentes.map((s) => (
            <span key={s} className={styles.tag}>{s}</span>
          ))}
        </div>
      </div>
      <div className={styles.detailSection}>
        <span className={styles.detailLabel}>Fatores de Risco</span>
        <div className={styles.tagList}>
          {patient.fatoresRisco.map((f) => (
            <span key={f} className={[styles.tag, styles.tagRisk].join(' ')}>{f}</span>
          ))}
        </div>
      </div>
      <div className={styles.detailRow} style={{ marginTop: 16 }}>
        <span className={styles.detailLabel}>Médico Responsável</span>
        <span className={styles.detailDoctor}>{patient.medicoResponsavel}</span>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Última Consulta</span>
        <span className={styles.detailValue}>{formatDate(patient.ultimaConsulta)}</span>
      </div>
    </div>
  )
}
