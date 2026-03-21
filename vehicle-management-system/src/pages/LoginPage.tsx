import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(username, password)
    setLoading(false)
    if (!result.success) {
      setError(result.error || '登入失敗')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#1E40AF] flex items-center justify-center relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

      {/* Login card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Top section with icon and title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
            <svg
              className="w-8 h-8 text-white"
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
          <h1 className="text-2xl font-bold text-[#1E3A8A]">車輛管理系統</h1>
          <p className="text-sm text-[#64748B] mt-1">Vehicle Management System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
              帳號
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
              placeholder="請輸入帳號"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              密碼
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
              placeholder="請輸入密碼"
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              {error}
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 transition-all duration-200 active:scale-[0.98] font-medium text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                登入中...
              </span>
            ) : (
              '登入'
            )}
          </button>
        </form>

        {/* Test account hint */}
        <div className="mt-6 bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-[#64748B] text-center leading-relaxed">
            <span className="font-medium text-gray-600">測試帳號</span>
            <br />
            admin / admin123（管理員）
            <br />
            user / user123（一般用戶）
          </p>
        </div>
      </div>
    </div>
  )
}
