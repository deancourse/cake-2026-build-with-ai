import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-5 text-lg font-bold border-b border-gray-700">
          車輛管理系統
        </div>
        <nav className="flex-1 py-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700 font-semibold' : ''}`
            }
          >
            儀表板
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700 font-semibold' : ''}`
            }
          >
            車輛管理
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-sm hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700 font-semibold' : ''}`
              }
            >
              員工管理
            </NavLink>
          )}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {user?.role === 'admin' ? '管理者' : '一般使用者'}：{user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            登出
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
