import { createContext, useContext, useState } from 'react'
import { login as apiLogin } from '../api/mock/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(credentials) {
    const userData = await apiLogin(credentials)
    setUser(userData)
    return userData
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
