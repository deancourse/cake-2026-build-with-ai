import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../contexts/AuthContext'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../../api/mock/vehicles'

const STATUS_OPTIONS = ['使用中', '閒置', '維修中']

const EMPTY_FORM = { plate: '', brand: '', model: '', status: '閒置', assignedEmployee: '' }

function VehicleForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.plate.trim()) e.plate = '必填'
    if (!form.brand.trim()) e.brand = '必填'
    if (!form.model.trim()) e.model = '必填'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    onSubmit(form)
  }

  const field = (key, label, placeholder) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        value={form[key]}
        onChange={(ev) => setForm({ ...form, [key]: ev.target.value })}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400' : 'border-gray-300'}`}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {field('plate', '車牌 *', 'ABC-1234')}
      {field('brand', '廠牌 *', 'Toyota')}
      {field('model', '型號 *', 'Camry')}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">狀態</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {field('assignedEmployee', '指派員工', '員工姓名（選填）')}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-50">取消</button>
        <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {loading ? '儲存中...' : '儲存'}
        </button>
      </div>
    </form>
  )
}

export default function Vehicles() {
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'create' | { mode: 'edit', vehicle }
  const [confirm, setConfirm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setVehicles(await getVehicles())
    setLoading(false)
  }

  async function handleCreate(form) {
    setSaving(true)
    const newV = await createVehicle(form, user)
    setVehicles((prev) => [...prev, newV])
    setModal(null)
    setSaving(false)
  }

  async function handleUpdate(form) {
    setSaving(true)
    const updated = await updateVehicle(modal.vehicle.id, form, user)
    setVehicles((prev) => prev.map((v) => v.id === updated.id ? updated : v))
    setModal(null)
    setSaving(false)
  }

  async function handleDelete(id) {
    await deleteVehicle(id, user)
    setVehicles((prev) => prev.filter((v) => v.id !== id))
    setConfirm(null)
  }

  const STATUS_COLOR = { '使用中': 'text-green-600 bg-green-50', '閒置': 'text-gray-600 bg-gray-100', '維修中': 'text-yellow-600 bg-yellow-50' }

  const columns = [
    { key: 'plate', label: '車牌' },
    { key: 'brand', label: '廠牌' },
    { key: 'model', label: '型號' },
    {
      key: 'status', label: '狀態', render: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[row.status]}`}>{row.status}</span>
      )
    },
    { key: 'assignedEmployee', label: '指派員工', render: (row) => row.assignedEmployee || '—' },
    {
      key: 'actions', label: '操作', render: (row) => (
        <div className="flex gap-2">
          <button onClick={() => setModal({ mode: 'edit', vehicle: row })} className="text-xs text-blue-500 hover:underline">編輯</button>
          <button onClick={() => setConfirm(row)} className="text-xs text-red-500 hover:underline">刪除</button>
        </div>
      )
    },
  ]

  return (
    <Layout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-800">車輛管理</h1>
        <button
          onClick={() => setModal('create')}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          + 新增車輛
        </button>
      </div>

      <DataTable columns={columns} data={vehicles} loading={loading} />

      {(modal === 'create') && (
        <Modal title="新增車輛" onClose={() => setModal(null)}>
          <VehicleForm onSubmit={handleCreate} onCancel={() => setModal(null)} loading={saving} />
        </Modal>
      )}

      {modal?.mode === 'edit' && (
        <Modal title="編輯車輛" onClose={() => setModal(null)}>
          <VehicleForm initial={modal.vehicle} onSubmit={handleUpdate} onCancel={() => setModal(null)} loading={saving} />
        </Modal>
      )}

      {confirm && (
        <ConfirmDialog
          message={`確定要刪除車牌 ${confirm.plate} 的車輛嗎？`}
          onConfirm={() => handleDelete(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </Layout>
  )
}
