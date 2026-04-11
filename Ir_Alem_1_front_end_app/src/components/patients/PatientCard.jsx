import { Badge } from '@/components/ui/Badge'
import { formatDateShort } from '@/utils/dateUtils'
import styles from './PatientCard.module.css'

export function PatientCard({ patient, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <span className={styles.id}>{patient.id}</span>
        <Badge label={patient.riscoCardiovascular} />
      </div>
      <h3 className={styles.name}>{patient.nome}</h3>
      <p className={styles.info}>
        {patient.idade} anos · {patient.sexo}
      </p>
      <p className={styles.pa}>{patient.pressaoArterial}</p>
      <div className={styles.symptoms}>
        {patient.sintomasPresentes.slice(0, 2).map((s) => (
          <span key={s} className={styles.symptomTag}>
            {s}
          </span>
        ))}
        {patient.sintomasPresentes.length > 2 && (
          <span className={styles.symptomTag}>
            +{patient.sintomasPresentes.length - 2}
          </span>
        )}
      </div>
      <div className={styles.footer}>
        <span className={styles.doctor}>{patient.medicoResponsavel}</span>
        <span className={styles.date}>{formatDateShort(patient.ultimaConsulta)}</span>
      </div>
    </div>
  )
}
