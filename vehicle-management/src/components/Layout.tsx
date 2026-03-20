import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const linkStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'block',
  padding: '12px 20px',
  color: isActive ? '#1677ff' : '#333',
  background: isActive ? '#e6f4ff' : 'transparent',
  textDecoration: 'none',
  borderRadius: 4,
  marginBottom: 4,
})

export default function Layout() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #e8e8e8', padding: '16px 8px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ padding: '0 12px', marginBottom: 24 }}>車輛管理系統</h3>
        <nav style={{ flex: 1 }}>
          <NavLink to="/" end style={({ isActive }) => linkStyle(isActive)}>
            儀表板
          </NavLink>
          <NavLink to="/vehicles" style={({ isActive }) => linkStyle(isActive)}>
            車輛管理
          </NavLink>
          {isAdmin && (
            <>
              <NavLink to="/employees" style={({ isActive }) => linkStyle(isActive)}>
                員工管理
              </NavLink>
              <NavLink to="/activity-log" style={({ isActive }) => linkStyle(isActive)}>
                活動紀錄
              </NavLink>
            </>
          )}
        </nav>
        <div style={{ padding: '12px', borderTop: '1px solid #e8e8e8', fontSize: 14 }}>
          <div style={{ marginBottom: 8, color: '#666' }}>{user?.name}（{user?.role === 'admin' ? '管理者' : '一般使用者'}）</div>
          <button onClick={handleLogout} style={{ width: '100%', padding: 8, background: '#fff', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>
            登出
          </button>
        </div>
      </aside>
      {/* Main content */}
      <main style={{ flex: 1, padding: 24, background: '#f5f5f5' }}>
        <Outlet />
      </main>
    </div>
  )
}
