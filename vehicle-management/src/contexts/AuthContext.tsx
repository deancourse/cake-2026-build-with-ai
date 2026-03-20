import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthUser {
  username: string
  role: 'admin' | 'user'
  name: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (username: string, password: string) => Promise<string | null>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = async (username: string, password: string): Promise<string | null> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) {
      const data = await res.json()
      return data.message || '登入失敗'
    }
    const data = await res.json()
    setUser(data)
    return null
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
