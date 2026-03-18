import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../contexts/AuthContext'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../api/mock/employees'

const EMPTY_FORM = { name: '', employeeId: '', department: '', title: '', email: '' }

function EmployeeForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    const required = ['name', 'employeeId', 'department', 'title', 'email']
    required.forEach((k) => { if (!form[k].trim()) e[k] = '必填' })
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    onSubmit(form)
  }

  const field = (key, label, placeholder, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
      <input
        type={type}
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
      {field('name', '姓名', '王小明')}
      {field('employeeId', '員工編號', 'E001')}
      {field('department', '部門', '業務部')}
      {field('title', '職稱', '專員')}
      {field('email', 'Email', 'user@example.com', 'email')}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-50">取消</button>
        <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {loading ? '儲存中...' : '儲存'}
        </button>
      </div>
    </form>
  )
}

export default function Employees() {
  const { user } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setEmployees(await getEmployees())
    setLoading(false)
  }

  async function handleCreate(form) {
    setSaving(true)
    const newE = await createEmployee(form, user)
    setEmployees((prev) => [...prev, newE])
    setModal(null)
    setSaving(false)
  }

  async function handleUpdate(form) {
    setSaving(true)
    const updated = await updateEmployee(modal.employee.id, form, user)
    setEmployees((prev) => prev.map((e) => e.id === updated.id ? updated : e))
    setModal(null)
    setSaving(false)
  }

  async function handleDelete(id) {
    await deleteEmployee(id, user)
    setEmployees((prev) => prev.filter((e) => e.id !== id))
    setConfirm(null)
  }

  const columns = [
    { key: 'name', label: '姓名' },
    { key: 'employeeId', label: '員工編號' },
    { key: 'department', label: '部門' },
    { key: 'title', label: '職稱' },
    { key: 'email', label: 'Email' },
    {
      key: 'actions', label: '操作', render: (row) => (
        <div className="flex gap-2">
          <button onClick={() => setModal({ mode: 'edit', employee: row })} className="text-xs text-blue-500 hover:underline">編輯</button>
          <button onClick={() => setConfirm(row)} className="text-xs text-red-500 hover:underline">刪除</button>
        </div>
      )
    },
  ]

  return (
    <Layout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-800">員工管理</h1>
        <button
          onClick={() => setModal('create')}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          + 新增員工
        </button>
      </div>

      <DataTable columns={columns} data={employees} loading={loading} />

      {modal === 'create' && (
        <Modal title="新增員工" onClose={() => setModal(null)}>
          <EmployeeForm onSubmit={handleCreate} onCancel={() => setModal(null)} loading={saving} />
        </Modal>
      )}

      {modal?.mode === 'edit' && (
        <Modal title="編輯員工" onClose={() => setModal(null)}>
          <EmployeeForm initial={modal.employee} onSubmit={handleUpdate} onCancel={() => setModal(null)} loading={saving} />
        </Modal>
      )}

      {confirm && (
        <ConfirmDialog
          message={`確定要刪除員工 ${confirm.name}（${confirm.employeeId}）嗎？`}
          onConfirm={() => handleDelete(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </Layout>
  )
}
