import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Layout from '../../components/Layout'
import { getDashboardStats } from '../../api/mock/dashboard'

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b']

function KpiCard({ label, value, color }) {
  return (
    <div className={`bg-white rounded-xl p-5 border-l-4 shadow-sm ${color}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-400">載入中...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">儀表板</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <KpiCard label="車輛總數" value={stats.totalVehicles} color="border-blue-500" />
        <KpiCard label="使用中車輛" value={stats.activeVehicles} color="border-green-500" />
        <KpiCard label="員工總數" value={stats.totalEmployees} color="border-yellow-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">車輛狀態分佈</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={stats.vehicleStatusChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {stats.vehicleStatusChart.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">近 6 個月新增車輛</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.monthlyVehicleChart}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" name="新增車輛" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  )
}
