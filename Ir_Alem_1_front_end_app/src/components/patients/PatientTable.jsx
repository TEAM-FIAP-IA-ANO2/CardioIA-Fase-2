import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { formatDateShort } from '@/utils/dateUtils'
import styles from './PatientTable.module.css'

export function PatientTable({ patients, onSelect }) {
  const [sortKey, setSortKey] = useState('nome')
  const [sortDir, setSortDir] = useState('asc')

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...patients].sort((a, b) => {
    const av = a[sortKey] ?? ''
    const bv = b[sortKey] ?? ''
    const cmp = String(av).localeCompare(String(bv), 'pt-BR')
    return sortDir === 'asc' ? cmp : -cmp
  })

  function SortIcon({ col }) {
    if (sortKey !== col) return <span className={styles.sortIcon}>↕</span>
    return <span className={styles.sortIcon}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {[
              { key: 'id', label: 'ID' },
              { key: 'nome', label: 'Nome' },
              { key: 'idade', label: 'Idade' },
              { key: 'sexo', label: 'Sexo' },
              { key: 'riscoCardiovascular', label: 'Risco' },
              { key: 'pressaoArterial', label: 'Pressão Arterial' },
              { key: 'ultimaConsulta', label: 'Última Consulta' },
              { key: 'medicoResponsavel', label: 'Médico' },
            ].map(({ key, label }) => (
              <th key={key} onClick={() => handleSort(key)} className={styles.th}>
                {label} <SortIcon col={key} />
              </th>
            ))}
            <th className={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id} className={styles.row}>
              <td className={styles.tdMono}>{p.id}</td>
              <td className={styles.tdName}>{p.nome}</td>
              <td>{p.idade}</td>
              <td>{p.sexo}</td>
              <td>
                <Badge label={p.riscoCardiovascular} size="sm" />
              </td>
              <td>{p.pressaoArterial}</td>
              <td>{formatDateShort(p.ultimaConsulta)}</td>
              <td className={styles.tdDoctor}>{p.medicoResponsavel}</td>
              <td>
                <button className={styles.detailBtn} onClick={() => onSelect(p)}>
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
