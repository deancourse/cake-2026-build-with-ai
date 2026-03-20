import { useEffect, useState, type FormEvent } from 'react'
import type { Employee } from '../mocks/data'

const emptyEmployee = { name: '', email: '', department: '', position: '', phone: '' }

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [form, setForm] = useState(emptyEmployee)

  const loadEmployees = () => fetch('/api/employees').then((r) => r.json()).then(setEmployees)

  useEffect(() => { loadEmployees() }, [])

  const openAdd = () => { setEditing(null); setForm(emptyEmployee); setShowForm(true) }
  const openEdit = (e: Employee) => { setEditing(e); setForm(e); setShowForm(true) }
  const close = () => { setShowForm(false); setEditing(null) }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch(`/api/employees/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/employees', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    close()
    loadEmployees()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('確定要刪除此員工嗎？')) return
    await fetch(`/api/employees/${id}`, { method: 'DELETE' })
    loadEmployees()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>員工管理</h2>
        <button onClick={openAdd} style={btnStyle('#1677ff')}>新增員工</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>{['姓名', 'Email', '部門', '職稱', '電話', '操作'].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={tdStyle}>{emp.name}</td>
              <td style={tdStyle}>{emp.email}</td>
              <td style={tdStyle}>{emp.department}</td>
              <td style={tdStyle}>{emp.position}</td>
              <td style={tdStyle}>{emp.phone}</td>
              <td style={tdStyle}>
                <button onClick={() => openEdit(emp)} style={btnStyle('#1677ff', true)}>編輯</button>
                <button onClick={() => handleDelete(emp.id)} style={btnStyle('#ff4d4f', true)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>{editing ? '編輯員工' : '新增員工'}</h3>
            <form onSubmit={handleSubmit}>
              {([
                ['name', '姓名'],
                ['email', 'Email'],
                ['department', '部門'],
                ['position', '職稱'],
                ['phone', '電話'],
              ] as const).map(([key, label]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>
                  <input type={key === 'email' ? 'email' : 'text'} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={inputStyle} required />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" onClick={close} style={btnStyle('#d9d9d9')}>取消</button>
                <button type="submit" style={btnStyle('#1677ff')}>儲存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const btnStyle = (bg: string, small = false): React.CSSProperties => ({ padding: small ? '4px 12px' : '8px 16px', background: bg, color: bg === '#d9d9d9' ? '#333' : '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', marginRight: small ? 8 : 0, fontSize: small ? 13 : 14 })
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
const thStyle: React.CSSProperties = { padding: '12px 16px', textAlign: 'left', background: '#fafafa', borderBottom: '1px solid #e8e8e8', fontWeight: 600 }
const tdStyle: React.CSSProperties = { padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }
const inputStyle: React.CSSProperties = { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #d9d9d9', boxSizing: 'border-box' }
const modalOverlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }
const modalBox: React.CSSProperties = { background: '#fff', padding: 32, borderRadius: 8, width: 420, maxHeight: '80vh', overflow: 'auto' }
