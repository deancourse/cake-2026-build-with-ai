import { delay } from './delay'

let nextId = 7
let activityLogs = [
  { id: 1, userId: 1, username: 'admin', action: 'login', target: 'admin', timestamp: '2026-03-18T08:00:00.000Z' },
  { id: 2, userId: 1, username: 'admin', action: 'create_vehicle', target: 'MNO-1111', timestamp: '2026-03-18T08:05:00.000Z' },
  { id: 3, userId: 1, username: 'admin', action: 'update_employee', target: '王小明', timestamp: '2026-03-18T08:10:00.000Z' },
  { id: 4, userId: 2, username: 'user', action: 'login', target: 'user', timestamp: '2026-03-18T09:00:00.000Z' },
  { id: 5, userId: 2, username: 'user', action: 'update_vehicle', target: 'ABC-1234', timestamp: '2026-03-18T09:15:00.000Z' },
  { id: 6, userId: 1, username: 'admin', action: 'delete_vehicle', target: 'MNO-1111', timestamp: '2026-03-18T10:00:00.000Z' },
]

export function logActivity({ userId, username, action, target }) {
  activityLogs.push({
    id: nextId++,
    userId,
    username,
    action,
    target,
    timestamp: new Date().toISOString(),
  })
}

export async function getActivityLogs(filters = {}) {
  await delay()
  let result = [...activityLogs].reverse()
  if (filters.username) result = result.filter((l) => l.username === filters.username)
  if (filters.action) result = result.filter((l) => l.action === filters.action)
  return result
}
