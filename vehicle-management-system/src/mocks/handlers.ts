import { http, HttpResponse } from 'msw'
import { users, vehicles, employees, activityLogs } from './data'
import type { Vehicle, Employee } from './data'

export const handlers = [
  // Auth
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string
      password: string
    }
    const user = users.find(
      (u) => u.username === username && u.password === password,
    )
    if (!user) {
      return HttpResponse.json(
        { message: '帳號或密碼錯誤' },
        { status: 401 },
      )
    }
    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: { username: user.username, role: user.role, name: user.name },
    })
  }),

  // Vehicles
  http.get('/api/vehicles', () => {
    return HttpResponse.json(vehicles)
  }),

  http.post('/api/vehicles', async ({ request }) => {
    const body = (await request.json()) as Omit<Vehicle, 'id'>
    const newVehicle: Vehicle = { ...body, id: crypto.randomUUID() }
    vehicles.push(newVehicle)
    return HttpResponse.json(newVehicle, { status: 201 })
  }),

  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Partial<Vehicle>
    const index = vehicles.findIndex((v) => v.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { message: '找不到該車輛' },
        { status: 404 },
      )
    }
    vehicles[index] = { ...vehicles[index], ...body, id: vehicles[index].id }
    return HttpResponse.json(vehicles[index])
  }),

  http.delete('/api/vehicles/:id', ({ params }) => {
    const { id } = params
    const index = vehicles.findIndex((v) => v.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { message: '找不到該車輛' },
        { status: 404 },
      )
    }
    vehicles.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // Employees
  http.get('/api/employees', () => {
    return HttpResponse.json(employees)
  }),

  http.post('/api/employees', async ({ request }) => {
    const body = (await request.json()) as Omit<Employee, 'id'>
    const newEmployee: Employee = { ...body, id: crypto.randomUUID() }
    employees.push(newEmployee)
    return HttpResponse.json(newEmployee, { status: 201 })
  }),

  http.put('/api/employees/:id', async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Partial<Employee>
    const index = employees.findIndex((e) => e.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { message: '找不到該員工' },
        { status: 404 },
      )
    }
    employees[index] = { ...employees[index], ...body, id: employees[index].id }
    return HttpResponse.json(employees[index])
  }),

  http.delete('/api/employees/:id', ({ params }) => {
    const { id } = params
    const index = employees.findIndex((e) => e.id === id)
    if (index === -1) {
      return HttpResponse.json(
        { message: '找不到該員工' },
        { status: 404 },
      )
    }
    employees.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // Activity Logs
  http.get('/api/activity-logs', ({ request }) => {
    const url = new URL(request.url)
    const action = url.searchParams.get('action')
    const user = url.searchParams.get('user')

    let filtered = [...activityLogs]
    if (action) filtered = filtered.filter((l) => l.action === action)
    if (user) filtered = filtered.filter((l) => l.user === user)

    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    return HttpResponse.json(filtered)
  }),

  // Dashboard stats
  http.get('/api/dashboard/stats', () => {
    const totalVehicles = vehicles.length
    const inUseVehicles = vehicles.filter((v) => v.status === 'in-use').length
    const idleVehicles = vehicles.filter((v) => v.status === 'idle').length
    const maintenanceVehicles = vehicles.filter((v) => v.status === 'maintenance').length
    const totalEmployees = employees.length

    const statusDistribution = [
      { name: '使用中', value: inUseVehicles },
      { name: '閒置', value: idleVehicles },
      { name: '維修中', value: maintenanceVehicles },
    ]

    const monthlyTrend = [
      { month: '2025/10', inUse: 5, idle: 3 },
      { month: '2025/11', inUse: 4, idle: 4 },
      { month: '2025/12', inUse: 6, idle: 2 },
      { month: '2026/01', inUse: 5, idle: 3 },
      { month: '2026/02', inUse: 3, idle: 5 },
      { month: '2026/03', inUse: inUseVehicles, idle: idleVehicles },
    ]

    return HttpResponse.json({
      totalVehicles,
      inUseVehicles,
      idleVehicles,
      totalEmployees,
      statusDistribution,
      monthlyTrend,
    })
  }),
]
