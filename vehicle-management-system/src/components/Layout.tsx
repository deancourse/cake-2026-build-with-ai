import { NavLink, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export default function Layout() {
  const { user, isAdmin, logout } = useAuth()

  const today = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  const userInitial = user?.name?.charAt(0) || 'U'

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive
        ? 'bg-white/10 text-white border-l-3 border-blue-400'
        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-l-3 border-transparent'
    }`

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-64 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white flex flex-col flex-shrink-0"
        role="navigation"
        aria-label="主選單"
      >
        {/* App title */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 0-.878-2.121l-2.012-2.012A2.999 2.999 0 0 0 16.5 9H5.625c-.621 0-1.125.504-1.125 1.125v7.5c0 .621.504 1.125 1.125 1.125"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">車輛管理系統</h1>
              <p className="text-xs text-gray-500">Vehicle Management</p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLink to="/" end className={linkClass}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>
            儀表板
          </NavLink>
          <NavLink to="/vehicles" className={linkClass}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 0-.878-2.121l-2.012-2.012A2.999 2.999 0 0 0 16.5 9H5.625c-.621 0-1.125.504-1.125 1.125v7.5c0 .621.504 1.125 1.125 1.125"
              />
            </svg>
            車輛管理
          </NavLink>
          {isAdmin && (
            <NavLink to="/employees" className={linkClass}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2.228 2.228 0 0 1 3 16.9c0-4.972 4.03-9 9-9a8.96 8.96 0 0 1 5.214 1.667M15 19.128l-.003-.002ZM12 7.875a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z"
                />
              </svg>
              員工管理
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/activity-log" className={linkClass}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              操作紀錄
            </NavLink>
          )}
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <span
                className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                  user?.role === 'admin'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {user?.role === 'admin' ? '管理員' : '一般用戶'}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-200 text-left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            登出
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#F8FAFC] min-h-screen">
        {/* Top header bar */}
        <header className="bg-white border-b border-[#DBEAFE] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#1E3A8A]">
                歡迎回來，{user?.name}
              </h2>
              <p className="text-sm text-[#64748B]">{today}</p>
            </div>
          </div>
        </header>

        <div className="px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
