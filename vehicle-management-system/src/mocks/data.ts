export interface User {
  username: string
  password: string
  role: 'admin' | 'user'
  name: string
}

export interface Vehicle {
  id: string
  plateNumber: string
  brand: string
  model: string
  status: 'in-use' | 'idle' | 'maintenance'
  assignee: string
}

export interface Employee {
  id: string
  name: string
  department: string
  title: string
  phone: string
  email: string
}

export let users: User[] = [
  { username: 'admin', password: 'admin123', role: 'admin', name: '系統管理員' },
  { username: 'user', password: 'user123', role: 'user', name: '王小明' },
]

export let vehicles: Vehicle[] = [
  { id: '1', plateNumber: 'ABC-1234', brand: 'Toyota', model: 'Camry', status: 'in-use', assignee: '王小明' },
  { id: '2', plateNumber: 'DEF-5678', brand: 'Honda', model: 'CR-V', status: 'idle', assignee: '' },
  { id: '3', plateNumber: 'GHI-9012', brand: 'Ford', model: 'Kuga', status: 'maintenance', assignee: '' },
  { id: '4', plateNumber: 'JKL-3456', brand: 'Toyota', model: 'RAV4', status: 'in-use', assignee: '李大華' },
  { id: '5', plateNumber: 'MNO-7890', brand: 'Nissan', model: 'Sentra', status: 'idle', assignee: '' },
  { id: '6', plateNumber: 'PQR-2345', brand: 'Mazda', model: 'CX-5', status: 'in-use', assignee: '陳美玲' },
  { id: '7', plateNumber: 'STU-6789', brand: 'Honda', model: 'Fit', status: 'maintenance', assignee: '' },
  { id: '8', plateNumber: 'VWX-0123', brand: 'Toyota', model: 'Altis', status: 'idle', assignee: '' },
]

export interface ActivityLog {
  id: string
  timestamp: string
  user: string
  action: 'login' | 'create' | 'update' | 'delete'
  target: 'auth' | 'vehicle' | 'employee'
  description: string
}

export let activityLogs: ActivityLog[] = [
  { id: '1', timestamp: '2026-03-21T09:00:00', user: '系統管理員', action: 'login', target: 'auth', description: '管理員登入系統' },
  { id: '2', timestamp: '2026-03-21T09:05:00', user: '系統管理員', action: 'create', target: 'vehicle', description: '新增車輛 ABC-1234 (Toyota Camry)' },
  { id: '3', timestamp: '2026-03-21T09:10:00', user: '王小明', action: 'login', target: 'auth', description: '使用者登入系統' },
  { id: '4', timestamp: '2026-03-21T09:15:00', user: '王小明', action: 'update', target: 'vehicle', description: '更新車輛 DEF-5678 狀態為使用中' },
  { id: '5', timestamp: '2026-03-21T09:30:00', user: '系統管理員', action: 'create', target: 'employee', description: '新增員工 張志偉（業務部）' },
  { id: '6', timestamp: '2026-03-21T10:00:00', user: '系統管理員', action: 'update', target: 'employee', description: '更新員工 李大華 職稱為資深工程師' },
  { id: '7', timestamp: '2026-03-21T10:15:00', user: '王小明', action: 'update', target: 'vehicle', description: '更新車輛 GHI-9012 狀態為維修中' },
  { id: '8', timestamp: '2026-03-21T10:30:00', user: '系統管理員', action: 'delete', target: 'vehicle', description: '刪除車輛 XYZ-9999' },
  { id: '9', timestamp: '2026-03-20T08:45:00', user: '系統管理員', action: 'login', target: 'auth', description: '管理員登入系統' },
  { id: '10', timestamp: '2026-03-20T09:00:00', user: '系統管理員', action: 'create', target: 'vehicle', description: '新增車輛 JKL-3456 (Toyota RAV4)' },
  { id: '11', timestamp: '2026-03-20T09:20:00', user: '王小明', action: 'login', target: 'auth', description: '使用者登入系統' },
  { id: '12', timestamp: '2026-03-20T09:45:00', user: '系統管理員', action: 'create', target: 'employee', description: '新增員工 林雅婷（行政部）' },
  { id: '13', timestamp: '2026-03-20T10:10:00', user: '王小明', action: 'update', target: 'vehicle', description: '更新車輛 MNO-7890 負責人為王小明' },
  { id: '14', timestamp: '2026-03-20T11:00:00', user: '系統管理員', action: 'delete', target: 'employee', description: '刪除員工 周大明' },
  { id: '15', timestamp: '2026-03-20T14:30:00', user: '系統管理員', action: 'update', target: 'vehicle', description: '更新車輛 PQR-2345 狀態為使用中' },
  { id: '16', timestamp: '2026-03-19T08:30:00', user: '王小明', action: 'login', target: 'auth', description: '使用者登入系統' },
  { id: '17', timestamp: '2026-03-19T09:00:00', user: '系統管理員', action: 'login', target: 'auth', description: '管理員登入系統' },
  { id: '18', timestamp: '2026-03-19T09:30:00', user: '系統管理員', action: 'create', target: 'vehicle', description: '新增車輛 STU-6789 (Honda Fit)' },
]

export let employees: Employee[] = [
  { id: '1', name: '王小明', department: '業務部', title: '業務經理', phone: '0912-345-678', email: 'wang.xm@example.com' },
  { id: '2', name: '李大華', department: '工程部', title: '資深工程師', phone: '0923-456-789', email: 'li.dh@example.com' },
  { id: '3', name: '陳美玲', department: '管理部', title: '管理專員', phone: '0934-567-890', email: 'chen.ml@example.com' },
  { id: '4', name: '張志偉', department: '業務部', title: '業務專員', phone: '0945-678-901', email: 'zhang.zw@example.com' },
  { id: '5', name: '林雅婷', department: '行政部', title: '行政助理', phone: '0956-789-012', email: 'lin.yt@example.com' },
  { id: '6', name: '黃建國', department: '工程部', title: '工程師', phone: '0967-890-123', email: 'huang.jg@example.com' },
]
