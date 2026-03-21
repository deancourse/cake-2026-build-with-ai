import { useEffect, useState } from 'react'
import type { Vehicle } from '../mocks/data'

type VehicleStatus = 'in-use' | 'idle' | 'maintenance'
const emptyVehicle = { plateNumber: '', brand: '', model: '', status: 'idle' as VehicleStatus, assignee: '' }

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [form, setForm] = useState(emptyVehicle)
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null)

  const load = () => fetch('/api/vehicles').then((r) => r.json()).then(setVehicles)
  useEffect(() => { load() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyVehicle)
    setShowModal(true)
  }

  const openEdit = (v: Vehicle) => {
    setEditing(v)
    setForm({ plateNumber: v.plateNumber, brand: v.brand, model: v.model, status: v.status as VehicleStatus, assignee: v.assignee })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (editing) {
      await fetch(`/api/vehicles/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    setShowModal(false)
    load()
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await fetch(`/api/vehicles/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleteTarget(null)
    load()
  }

  const statusLabel: Record<string, string> = { 'in-use': '使用中', idle: '閒置', maintenance: '維修中' }
  const statusStyle: Record<string, string> = {
    'in-use': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    idle: 'bg-gray-50 text-gray-600 border border-gray-200',
    maintenance: 'bg-amber-50 text-amber-700 border border-amber-200',
  }

  const inputClass = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 placeholder:text-gray-400'

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">車輛管理</h2>
          <p className="text-sm text-gray-500 mt-1">管理所有車輛資訊</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:shadow-blue-500/25 transition-all duration-200 min-h-[44px] focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 font-medium text-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          新增車輛
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/80">
            <tr>
              <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">車牌號碼</th>
              <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">品牌</th>
              <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">型號</th>
              <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">狀態</th>
              <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">負責人</th>
              <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors duration-150">
                <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{v.plateNumber}</td>
                <td className="px-5 py-3.5 text-sm text-gray-700">{v.brand}</td>
                <td className="px-5 py-3.5 text-sm text-gray-700">{v.model}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyle[v.status]}`}>
                    {statusLabel[v.status]}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-700">
                  {v.assignee || <span className="text-gray-300">&mdash;</span>}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(v)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                      aria-label={`編輯 ${v.plateNumber}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(v)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none"
                      aria-label={`刪除 ${v.plateNumber}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{editing ? '編輯車輛' : '新增車輛'}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                aria-label="關閉"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">車牌號碼</label>
                <input
                  value={form.plateNumber}
                  onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
                  placeholder="例：ABC-1234"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">品牌</label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  placeholder="例：Toyota"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">型號</label>
                <input
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  placeholder="例：Camry"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">狀態</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as VehicleStatus })}
                  className={inputClass}
                >
                  <option value="idle">閒置</option>
                  <option value="in-use">使用中</option>
                  <option value="maintenance">維修中</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">負責人</label>
                <input
                  value={form.assignee}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                  placeholder="選填"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 min-h-[44px] focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="px-6 py-6 text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
                <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">確認刪除</h3>
              <p className="text-sm text-gray-500">
                確定要刪除車牌號碼為 <span className="font-medium text-gray-700">{deleteTarget.plateNumber}</span> 的車輛嗎？此操作無法復原。
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 min-h-[44px] focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
