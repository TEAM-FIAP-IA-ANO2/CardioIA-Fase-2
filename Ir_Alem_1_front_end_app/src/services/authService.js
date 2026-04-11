export const MOCK_USERS = [
  {
    id: 'USR-001',
    nome: 'Dr. Carlos Andrade',
    email: 'carlos@cardioia.br',
    senha: '12345',
    role: 'medico',
    crm: 'CRM/SP 123456',
  },
  {
    id: 'USR-002',
    nome: 'Dra. Fernanda Lima',
    email: 'fernanda@cardioia.br',
    senha: '12345',
    role: 'medico',
    crm: 'CRM/SP 654321',
  },
  {
    id: 'USR-ADM',
    nome: 'Admin Portal',
    email: 'admin@cardioia.br',
    senha: 'admin',
    role: 'admin',
    crm: null,
  },
]

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)))
}

function fromBase64(str) {
  return decodeURIComponent(escape(atob(str)))
}

export function generateFakeJWT(user) {
  const header = toBase64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = toBase64(
    JSON.stringify({
      sub: user.id,
      name: user.nome,
      email: user.email,
      role: user.role,
      crm: user.crm,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  )
  const signature = toBase64(`fake-sig-${user.id}-cardioia`)
  return `${header}.${payload}.${signature}`
}

export function decodeToken(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(fromBase64(parts[1]))
  } catch {
    return null
  }
}

export function isTokenValid(token) {
  if (!token) return false
  const payload = decodeToken(token)
  if (!payload) return false
  return payload.exp * 1000 > Date.now()
}
