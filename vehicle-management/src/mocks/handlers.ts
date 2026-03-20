import { http, HttpResponse } from 'msw'
import { users, vehicles, employees } from './data'

let nextVehicleId = vehicles.length + 1
let nextEmployeeId = employees.length + 1

export const handlers = [
  // Login
  http.post('/api/login', async ({ request }) => {
    const { username, password } = (await request.json()) as { username: string; password: string }
    const user = users.find((u) => u.username === username && u.password === password)
    if (!user) {
      return HttpResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 })
    }
    return HttpResponse.json({ username: user.username, role: user.role, name: user.name })
  }),

  // Dashboard stats
  http.get('/api/dashboard/stats', () => {
    const total = vehicles.length
    const active = vehicles.filter((v) => v.status === 'active').length
    const maintenance = vehicles.filter((v) => v.status === 'maintenance').length
    const retired = vehicles.filter((v) => v.status === 'retired').length
    const employeeCount = employees.length
    return HttpResponse.json({ total, active, maintenance, retired, employeeCount })
  }),

  // Vehicles CRUD
  http.get('/api/vehicles', () => {
    return HttpResponse.json(vehicles)
  }),

  http.post('/api/vehicles', async ({ request }) => {
    const body = (await request.json()) as Omit<import('./data').Vehicle, 'id'>
    const newVehicle = { ...body, id: nextVehicleId++ }
    vehicles.push(newVehicle)
    return HttpResponse.json(newVehicle, { status: 201 })
  }),

  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const body = (await request.json()) as Partial<import('./data').Vehicle>
    const index = vehicles.findIndex((v) => v.id === id)
    if (index === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    vehicles[index] = { ...vehicles[index], ...body }
    return HttpResponse.json(vehicles[index])
  }),

  http.delete('/api/vehicles/:id', ({ params }) => {
    const id = Number(params.id)
    const index = vehicles.findIndex((v) => v.id === id)
    if (index === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    vehicles.splice(index, 1)
    return HttpResponse.json({ success: true })
  }),

  // Employees CRUD
  http.get('/api/employees', () => {
    return HttpResponse.json(employees)
  }),

  http.post('/api/employees', async ({ request }) => {
    const body = (await request.json()) as Omit<import('./data').Employee, 'id'>
    const newEmployee = { ...body, id: nextEmployeeId++ }
    employees.push(newEmployee)
    return HttpResponse.json(newEmployee, { status: 201 })
  }),

  http.put('/api/employees/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const body = (await request.json()) as Partial<import('./data').Employee>
    const index = employees.findIndex((e) => e.id === id)
    if (index === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    employees[index] = { ...employees[index], ...body }
    return HttpResponse.json(employees[index])
  }),

  http.delete('/api/employees/:id', ({ params }) => {
    const id = Number(params.id)
    const index = employees.findIndex((e) => e.id === id)
    if (index === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    employees.splice(index, 1)
    return HttpResponse.json({ success: true })
  }),
]
