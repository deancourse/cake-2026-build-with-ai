import { delay } from './delay'
import { logActivity } from './activityLogs'

let nextId = 6
let employees = [
  { id: 1, name: '王小明', employeeId: 'E001', department: '業務部', title: '業務專員', email: 'wang@example.com' },
  { id: 2, name: '李小華', employeeId: 'E002', department: '技術部', title: '工程師', email: 'lee@example.com' },
  { id: 3, name: '張大偉', employeeId: 'E003', department: '管理部', title: '經理', email: 'chang@example.com' },
  { id: 4, name: '陳美玲', employeeId: 'E004', department: '業務部', title: '業務主任', email: 'chen@example.com' },
  { id: 5, name: '林志明', employeeId: 'E005', department: '技術部', title: '技術長', email: 'lin@example.com' },
]

export async function getEmployees() {
  await delay()
  return [...employees]
}

export async function createEmployee(data, user) {
  await delay()
  const employee = { id: nextId++, ...data }
  employees.push(employee)
  if (user) logActivity({ userId: user.id, username: user.username, action: 'create_employee', target: data.name })
  return employee
}

export async function updateEmployee(id, data, user) {
  await delay()
  const idx = employees.findIndex((e) => e.id === id)
  if (idx === -1) throw new Error('員工不存在')
  employees[idx] = { ...employees[idx], ...data }
  if (user) logActivity({ userId: user.id, username: user.username, action: 'update_employee', target: employees[idx].name })
  return employees[idx]
}

export async function deleteEmployee(id, user) {
  await delay()
  const employee = employees.find((e) => e.id === id)
  employees = employees.filter((e) => e.id !== id)
  if (user && employee) logActivity({ userId: user.id, username: user.username, action: 'delete_employee', target: employee.name })
  return { success: true }
}
