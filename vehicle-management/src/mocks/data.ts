export interface User {
  username: string
  password: string
  role: 'admin' | 'user'
  name: string
}

export interface Vehicle {
  id: number
  plateNumber: string
  brand: string
  model: string
  year: number
  status: 'active' | 'maintenance' | 'retired'
  assignedTo: string
}

export interface Employee {
  id: number
  name: string
  email: string
  department: string
  position: string
  phone: string
}

export const users: User[] = [
  { username: 'admin', password: 'admin123', role: 'admin', name: '系統管理員' },
  { username: 'user', password: 'user123', role: 'user', name: '一般使用者' },
]

export let vehicles: Vehicle[] = [
  { id: 1, plateNumber: 'ABC-1234', brand: 'Toyota', model: 'Camry', year: 2022, status: 'active', assignedTo: '王小明' },
  { id: 2, plateNumber: 'DEF-5678', brand: 'Honda', model: 'Civic', year: 2021, status: 'active', assignedTo: '李小華' },
  { id: 3, plateNumber: 'GHI-9012', brand: 'Ford', model: 'Focus', year: 2020, status: 'maintenance', assignedTo: '' },
  { id: 4, plateNumber: 'JKL-3456', brand: 'Nissan', model: 'Sentra', year: 2023, status: 'active', assignedTo: '張大衛' },
  { id: 5, plateNumber: 'MNO-7890', brand: 'BMW', model: '320i', year: 2019, status: 'retired', assignedTo: '' },
]

export type ActivityAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'VEHICLE_CREATE'
  | 'VEHICLE_UPDATE'
  | 'VEHICLE_DELETE'
  | 'EMPLOYEE_CREATE'
  | 'EMPLOYEE_UPDATE'
  | 'EMPLOYEE_DELETE'

export interface ActivityLog {
  id: string
  userId: string
  username: string
  action: ActivityAction
  target: string
  timestamp: string
}

export const activityLogs: ActivityLog[] = [
  { id: '1', userId: 'admin', username: '系統管理員', action: 'LOGIN', target: '', timestamp: '2026-03-20T09:00:00Z' },
  { id: '2', userId: 'user', username: '一般使用者', action: 'LOGIN', target: '', timestamp: '2026-03-20T08:55:00Z' },
  { id: '3', userId: 'admin', username: '系統管理員', action: 'VEHICLE_CREATE', target: 'ABC-1234', timestamp: '2026-03-19T14:30:00Z' },
  { id: '4', userId: 'admin', username: '系統管理員', action: 'VEHICLE_UPDATE', target: 'DEF-5678', timestamp: '2026-03-19T13:20:00Z' },
  { id: '5', userId: 'user', username: '一般使用者', action: 'LOGOUT', target: '', timestamp: '2026-03-19T12:00:00Z' },
  { id: '6', userId: 'admin', username: '系統管理員', action: 'EMPLOYEE_CREATE', target: '王小明', timestamp: '2026-03-19T11:00:00Z' },
  { id: '7', userId: 'admin', username: '系統管理員', action: 'EMPLOYEE_UPDATE', target: '李小華', timestamp: '2026-03-18T16:45:00Z' },
  { id: '8', userId: 'user', username: '一般使用者', action: 'LOGIN', target: '', timestamp: '2026-03-18T09:10:00Z' },
  { id: '9', userId: 'admin', username: '系統管理員', action: 'VEHICLE_DELETE', target: 'MNO-7890', timestamp: '2026-03-18T08:30:00Z' },
  { id: '10', userId: 'admin', username: '系統管理員', action: 'LOGIN', target: '', timestamp: '2026-03-18T08:00:00Z' },
  { id: '11', userId: 'user', username: '一般使用者', action: 'VEHICLE_UPDATE', target: 'GHI-9012', timestamp: '2026-03-17T15:20:00Z' },
  { id: '12', userId: 'admin', username: '系統管理員', action: 'EMPLOYEE_DELETE', target: '陳美玲', timestamp: '2026-03-17T14:00:00Z' },
  { id: '13', userId: 'user', username: '一般使用者', action: 'LOGOUT', target: '', timestamp: '2026-03-17T12:30:00Z' },
  { id: '14', userId: 'admin', username: '系統管理員', action: 'VEHICLE_CREATE', target: 'JKL-3456', timestamp: '2026-03-17T10:15:00Z' },
  { id: '15', userId: 'user', username: '一般使用者', action: 'LOGIN', target: '', timestamp: '2026-03-17T09:00:00Z' },
  { id: '16', userId: 'admin', username: '系統管理員', action: 'VEHICLE_UPDATE', target: 'ABC-1234', timestamp: '2026-03-16T16:00:00Z' },
  { id: '17', userId: 'admin', username: '系統管理員', action: 'LOGIN', target: '', timestamp: '2026-03-16T08:30:00Z' },
  { id: '18', userId: 'user', username: '一般使用者', action: 'VEHICLE_CREATE', target: 'PQR-1111', timestamp: '2026-03-15T14:45:00Z' },
  { id: '19', userId: 'admin', username: '系統管理員', action: 'EMPLOYEE_UPDATE', target: '張大衛', timestamp: '2026-03-15T11:30:00Z' },
  { id: '20', userId: 'user', username: '一般使用者', action: 'LOGOUT', target: '', timestamp: '2026-03-15T10:00:00Z' },
  { id: '21', userId: 'admin', username: '系統管理員', action: 'VEHICLE_DELETE', target: 'STU-2222', timestamp: '2026-03-14T15:30:00Z' },
  { id: '22', userId: 'user', username: '一般使用者', action: 'LOGIN', target: '', timestamp: '2026-03-14T09:15:00Z' },
  { id: '23', userId: 'admin', username: '系統管理員', action: 'EMPLOYEE_CREATE', target: '陳美玲', timestamp: '2026-03-14T08:45:00Z' },
  { id: '24', userId: 'admin', username: '系統管理員', action: 'LOGIN', target: '', timestamp: '2026-03-14T08:00:00Z' },
  { id: '25', userId: 'user', username: '一般使用者', action: 'VEHICLE_UPDATE', target: 'DEF-5678', timestamp: '2026-03-13T16:30:00Z' },
  { id: '26', userId: 'admin', username: '系統管理員', action: 'LOGOUT', target: '', timestamp: '2026-03-13T18:00:00Z' },
  { id: '27', userId: 'admin', username: '系統管理員', action: 'VEHICLE_CREATE', target: 'VWX-3333', timestamp: '2026-03-13T10:20:00Z' },
  { id: '28', userId: 'user', username: '一般使用者', action: 'LOGIN', target: '', timestamp: '2026-03-13T09:00:00Z' },
  { id: '29', userId: 'admin', username: '系統管理員', action: 'EMPLOYEE_UPDATE', target: '王小明', timestamp: '2026-03-12T14:00:00Z' },
  { id: '30', userId: 'user', username: '一般使用者', action: 'LOGOUT', target: '', timestamp: '2026-03-12T17:30:00Z' },
]

export let employees: Employee[] = [
  { id: 1, name: '王小明', email: 'wang@example.com', department: '業務部', position: '業務經理', phone: '0912-345-678' },
  { id: 2, name: '李小華', email: 'lee@example.com', department: '工程部', position: '工程師', phone: '0923-456-789' },
  { id: 3, name: '張大衛', email: 'chang@example.com', department: '行政部', position: '行政專員', phone: '0934-567-890' },
  { id: 4, name: '陳美玲', email: 'chen@example.com', department: '人資部', position: '人資主管', phone: '0945-678-901' },
]
