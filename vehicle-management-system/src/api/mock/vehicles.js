import { delay } from './delay'
import { logActivity } from './activityLogs'

let nextId = 6
let vehicles = [
  { id: 1, plate: 'ABC-1234', brand: 'Toyota', model: 'Camry', status: '使用中', assignedEmployee: '王小明' },
  { id: 2, plate: 'XYZ-5678', brand: 'Honda', model: 'CR-V', status: '閒置', assignedEmployee: '' },
  { id: 3, plate: 'DEF-9012', brand: 'Ford', model: 'Focus', status: '維修中', assignedEmployee: '李小華' },
  { id: 4, plate: 'GHI-3456', brand: 'Nissan', model: 'Sentra', status: '使用中', assignedEmployee: '張大偉' },
  { id: 5, plate: 'JKL-7890', brand: 'Mazda', model: 'CX-5', status: '閒置', assignedEmployee: '' },
]

export async function getVehicles() {
  await delay()
  return [...vehicles]
}

export async function createVehicle(data, user) {
  await delay()
  const vehicle = { id: nextId++, ...data }
  vehicles.push(vehicle)
  if (user) logActivity({ userId: user.id, username: user.username, action: 'create_vehicle', target: data.plate })
  return vehicle
}

export async function updateVehicle(id, data, user) {
  await delay()
  const idx = vehicles.findIndex((v) => v.id === id)
  if (idx === -1) throw new Error('車輛不存在')
  vehicles[idx] = { ...vehicles[idx], ...data }
  if (user) logActivity({ userId: user.id, username: user.username, action: 'update_vehicle', target: vehicles[idx].plate })
  return vehicles[idx]
}

export async function deleteVehicle(id, user) {
  await delay()
  const vehicle = vehicles.find((v) => v.id === id)
  vehicles = vehicles.filter((v) => v.id !== id)
  if (user && vehicle) logActivity({ userId: user.id, username: user.username, action: 'delete_vehicle', target: vehicle.plate })
  return { success: true }
}
