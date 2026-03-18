import { delay } from './delay'
import { logActivity } from './activityLogs'

const USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: '系統管理員' },
  { id: 2, username: 'user', password: 'user123', role: 'user', name: '一般使用者' },
]

export async function login({ username, password }) {
  await delay()
  const user = USERS.find((u) => u.username === username && u.password === password)
  if (!user) throw new Error('帳號或密碼錯誤')
  const { password: _, ...safeUser } = user
  logActivity({ userId: safeUser.id, username: safeUser.username, action: 'login', target: safeUser.username })
  return safeUser
}

export function logout(user) {
  if (user) {
    logActivity({ userId: user.id, username: user.username, action: 'logout', target: user.username })
  }
}
