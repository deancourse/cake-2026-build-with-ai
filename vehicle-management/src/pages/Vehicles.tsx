import { useEffect, useState, type FormEvent } from 'react'
import type { Vehicle } from '../mocks/data'

const emptyVehicle: Omit<Vehicle, 'id'> = { plateNumber: '', brand: '', model: '', year: new Date().getFullYear(), status: 'active', assignedTo: '' }

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [form, setForm] = useState<Omit<Vehicle, 'id'>>(emptyVehicle)

  const loadVehicles = () => fetch('/api/vehicles').then((r) => r.json()).then(setVehicles)

  useEffect(() => { loadVehicles() }, [])

  const openAdd = () => { setEditing(null); setForm(emptyVehicle); setShowForm(true) }
  const openEdit = (v: Vehicle) => { setEditing(v); setForm(v); setShowForm(true) }
  const close = () => { setShowForm(false); setEditing(null) }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch(`/api/vehicles/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/vehicles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    close()
    loadVehicles()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('確定要刪除此車輛嗎？')) return
    await fetch(`/api/vehicles/${id}`, { method: 'DELETE' })
    loadVehicles()
  }

  const statusMap: Record<string, string> = { active: '使用中', maintenance: '維修中', retired: '已報廢' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>車輛管理</h2>
        <button onClick={openAdd} style={btnStyle('#1677ff')}>新增車輛</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>{['車牌號碼', '品牌', '型號', '年份', '狀態', '指派人員', '操作'].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td style={tdStyle}>{v.plateNumber}</td>
              <td style={tdStyle}>{v.brand}</td>
              <td style={tdStyle}>{v.model}</td>
              <td style={tdStyle}>{v.year}</td>
              <td style={tdStyle}>{statusMap[v.status] || v.status}</td>
              <td style={tdStyle}>{v.assignedTo || '-'}</td>
              <td style={tdStyle}>
                <button onClick={() => openEdit(v)} style={btnStyle('#1677ff', true)}>編輯</button>
                <button onClick={() => handleDelete(v.id)} style={btnStyle('#ff4d4f', true)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>{editing ? '編輯車輛' : '新增車輛'}</h3>
            <form onSubmit={handleSubmit}>
              {([
                ['plateNumber', '車牌號碼', 'text'],
                ['brand', '品牌', 'text'],
                ['model', '型號', 'text'],
                ['year', '年份', 'number'],
                ['assignedTo', '指派人員', 'text'],
              ] as const).map(([key, label, type]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>
                  <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })} style={inputStyle} required={key !== 'assignedTo'} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>狀態</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Vehicle['status'] })} style={inputStyle}>
                  <option value="active">使用中</option>
                  <option value="maintenance">維修中</option>
                  <option value="retired">已報廢</option>
                </select>
              </div>
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
