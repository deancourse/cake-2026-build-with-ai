import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface AuthUser {
  username: string
  role: 'admin' | 'user'
  name: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const AUTH_STORAGE_KEY = 'auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  }, [])

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        return { success: false, error: '帳號或密碼錯誤' }
      }

      const data = await response.json()
      const authUser: AuthUser = data.user
      setUser(authUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser))
      return { success: true }
    } catch {
      return { success: false, error: '帳號或密碼錯誤' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const isAuthenticated = user !== null
  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
