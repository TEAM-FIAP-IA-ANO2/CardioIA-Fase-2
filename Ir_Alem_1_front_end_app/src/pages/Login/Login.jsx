import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import styles from './Login.module.css'

export function Login() {
  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    const result = await login(email, senha)
    if (result.success) {
      navigate('/dashboard', { replace: true })
    } else {
      setErro(result.message)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.brandPanel}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="#fff" stroke="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <h2 className={styles.brandTitle}>CardioIA</h2>
        <p className={styles.brandSub}>Sistema de Gestão Cardiovascular</p>
        <ul className={styles.brandFeatures}>
          <li>Monitoramento de pacientes em tempo real</li>
          <li>Agendamento inteligente de consultas</li>
          <li>Diagnóstico assistido por IA</li>
          <li>Dashboard clínico integrado</li>
        </ul>
      </div>

      <div className={styles.formPanel}>
        <div className={[styles.card, shake ? styles.shake : ''].join(' ')}>
          <h1 className={styles.title}>Acesso ao Portal</h1>
          <p className={styles.subtitle}>Insira suas credenciais para continuar</p>

          {erro && <div className={styles.errorAlert}>{erro}</div>}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="senha">Senha</label>
              <div className={styles.passwordWrap}>
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setMostrarSenha((v) => !v)}
                  tabIndex={-1}
                >
                  {mostrarSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <details className={styles.demoBox}>
            <summary>Credenciais de demonstração</summary>
            <div className={styles.demoList}>
              <div className={styles.demoItem}>
                <strong>Médico:</strong> carlos@cardioia.br &nbsp;·&nbsp; senha: 12345
              </div>
              <div className={styles.demoItem}>
                <strong>Médico:</strong> fernanda@cardioia.br &nbsp;·&nbsp; senha: 12345
              </div>
              <div className={styles.demoItem}>
                <strong>Admin:</strong> admin@cardioia.br &nbsp;·&nbsp; senha: admin
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
