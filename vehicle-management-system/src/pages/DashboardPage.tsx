import { useEffect, useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Area, ComposedChart,
} from 'recharts'

interface Stats {
  totalVehicles: number
  inUseVehicles: number
  idleVehicles: number
  totalEmployees: number
  statusDistribution: { name: string; value: number }[]
  monthlyTrend: { month: string; inUse: number; idle: number }[]
}

const PIE_COLORS = ['#3B82F6', '#10B981', '#F59E0B']

/* ---------- Inline SVG Icons ---------- */

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function PauseCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="10" y1="15" x2="10" y2="9" />
      <line x1="14" y1="15" x2="14" y2="9" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

/* ---------- Custom Tooltip ---------- */

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 px-4 py-3">
      {label && <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>}
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          <span className="font-semibold">{entry.name}:</span> {entry.value}
        </p>
      ))}
    </div>
  )
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-sm">
        <span className="font-semibold" style={{ color: entry.payload.fill }}>{entry.name}:</span>{' '}
        {entry.value}
      </p>
    </div>
  )
}

/* ---------- Skeleton Loading ---------- */

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />

      {/* Stats card skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-32 animate-pulse" />
        ))}
      </div>

      {/* Chart skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-200 rounded-xl h-80 animate-pulse" />
        <div className="bg-gray-200 rounded-xl h-80 animate-pulse" />
      </div>
    </div>
  )
}

/* ---------- Center Label for Donut ---------- */

function CenterLabel({ viewBox, total }: { viewBox?: any; total: number }) {
  const { cx, cy } = viewBox || {}
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-0.5em" className="text-2xl font-bold fill-gray-900">
        {total}
      </tspan>
      <tspan x={cx} dy="1.6em" className="text-xs fill-gray-500">
        總計
      </tspan>
    </text>
  )
}

/* ---------- Main Component ---------- */

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json())
      .then(setStats)
  }, [])

  if (!stats) return <DashboardSkeleton />

  const cards = [
    {
      label: '車輛總數',
      value: stats.totalVehicles,
      icon: TruckIcon,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: '使用中',
      value: stats.inUseVehicles,
      icon: CheckCircleIcon,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: '閒置中',
      value: stats.idleVehicles,
      icon: PauseCircleIcon,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: '員工總數',
      value: stats.totalEmployees,
      icon: UsersIcon,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ]

  const totalVehicles = stats.totalVehicles

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">儀表板</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-default"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 ${card.bgColor} ${card.textColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mt-4">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              <div className="mt-3 h-1 w-12 rounded-full bg-gray-100" />
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
          <h3 className="text-lg font-semibold text-gray-800 pb-3 mb-4 border-b border-gray-100">
            車輛狀態分佈
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                paddingAngle={2}
                strokeWidth={0}
              >
                {stats.statusDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
                <CenterLabel total={totalVehicles} />
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-sm text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line / Area Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
          <h3 className="text-lg font-semibold text-gray-800 pb-3 mb-4 border-b border-gray-100">
            近 6 個月使用趨勢
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={stats.monthlyTrend}>
              <defs>
                <linearGradient id="fillInUse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillIdle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingBottom: 8 }}
                formatter={(value: string) => (
                  <span className="text-sm text-gray-600">{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="inUse"
                fill="url(#fillInUse)"
                stroke="none"
                name="使用中"
              />
              <Area
                type="monotone"
                dataKey="idle"
                fill="url(#fillIdle)"
                stroke="none"
                name="閒置"
              />
              <Line
                type="monotone"
                dataKey="inUse"
                stroke="#3B82F6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#3B82F6' }}
                name="使用中"
              />
              <Line
                type="monotone"
                dataKey="idle"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#10B981' }}
                name="閒置"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
