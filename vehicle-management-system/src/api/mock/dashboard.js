import { delay } from './delay'
import { getVehicles } from './vehicles'
import { getEmployees } from './employees'

export async function getDashboardStats() {
  await delay()
  const [vehicles, employees] = await Promise.all([getVehicles(), getEmployees()])

  const totalVehicles = vehicles.length
  const activeVehicles = vehicles.filter((v) => v.status === '使用中').length
  const totalEmployees = employees.length

  const vehicleStatusChart = [
    { name: '使用中', value: vehicles.filter((v) => v.status === '使用中').length },
    { name: '閒置', value: vehicles.filter((v) => v.status === '閒置').length },
    { name: '維修中', value: vehicles.filter((v) => v.status === '維修中').length },
  ]

  const monthlyVehicleChart = [
    { month: '10月', count: 2 },
    { month: '11月', count: 4 },
    { month: '12月', count: 1 },
    { month: '1月', count: 3 },
    { month: '2月', count: 2 },
    { month: '3月', count: totalVehicles },
  ]

  return { totalVehicles, activeVehicles, totalEmployees, vehicleStatusChart, monthlyVehicleChart }
}
