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

export let employees: Employee[] = [
  { id: 1, name: '王小明', email: 'wang@example.com', department: '業務部', position: '業務經理', phone: '0912-345-678' },
  { id: 2, name: '李小華', email: 'lee@example.com', department: '工程部', position: '工程師', phone: '0923-456-789' },
  { id: 3, name: '張大衛', email: 'chang@example.com', department: '行政部', position: '行政專員', phone: '0934-567-890' },
  { id: 4, name: '陳美玲', email: 'chen@example.com', department: '人資部', position: '人資主管', phone: '0945-678-901' },
]
