import { createContext, useContext, useState, useEffect } from 'react'
import {
  MOCK_USERS,
  generateFakeJWT,
  isTokenValid,
  decodeToken,
} from '@/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('cardioia_token')
    const storedUser = localStorage.getItem('cardioia_user')
    if (storedToken && isTokenValid(storedToken) && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    } else {
      localStorage.removeItem('cardioia_token')
      localStorage.removeItem('cardioia_user')
    }
    setIsLoading(false)
  }, [])

  async function login(email, senha) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.senha === senha
    )
    if (!found) {
      setIsLoading(false)
      return { success: false, message: 'E-mail ou senha inválidos.' }
    }
    const { senha: _senha, ...safeUser } = found
    const newToken = generateFakeJWT(safeUser)
    localStorage.setItem('cardioia_token', newToken)
    localStorage.setItem('cardioia_user', JSON.stringify(safeUser))
    setToken(newToken)
    setUser(safeUser)
    setIsLoading(false)
    return { success: true }
  }

  function logout() {
    localStorage.removeItem('cardioia_token')
    localStorage.removeItem('cardioia_user')
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user && isTokenValid(token),
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
