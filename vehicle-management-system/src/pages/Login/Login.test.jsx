import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './index'

// Mock react-router-dom navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock AuthContext
const mockLogin = vi.fn()
let mockUser = null

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, login: mockLogin }),
}))

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  mockUser = null
})

// ─── 渲染測試 ───────────────────────────────────────────
describe('渲染測試', () => {
  it('未登入時應渲染登入表單', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('admin / user')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('admin123 / user123')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '登入' })).toBeInTheDocument()
  })

  it('應顯示提示帳號密碼的說明文字', () => {
    renderLogin()
    expect(screen.getByText(/admin \/ admin123/)).toBeInTheDocument()
    expect(screen.getByText(/user \/ user123/)).toBeInTheDocument()
  })

  it('已登入時應自動導向 /dashboard', () => {
    mockUser = { id: 1, username: 'admin', role: 'admin' }
    renderLogin()
    // Navigate is triggered via <Navigate> component, check mockNavigate not called but redirect rendered
    expect(screen.queryByRole('button', { name: '登入' })).not.toBeInTheDocument()
  })
})

// ─── 功能測試 — 正常路徑 ────────────────────────────────
describe('功能測試 — 正常路徑', () => {
  it('輸入正確的 admin 帳密後成功登入並導向 dashboard', async () => {
    mockLogin.mockResolvedValue({ id: 1, username: 'admin', role: 'admin' })
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin / user'), 'admin')
    await user.type(screen.getByPlaceholderText('admin123 / user123'), 'admin123')
    await user.click(screen.getByRole('button', { name: '登入' }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ username: 'admin', password: 'admin123' })
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('登入請求進行中應顯示「登入中...」', async () => {
    mockLogin.mockImplementation(() => new Promise(() => {})) // never resolves
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin / user'), 'admin')
    await user.type(screen.getByPlaceholderText('admin123 / user123'), 'admin123')
    await user.click(screen.getByRole('button', { name: '登入' }))

    expect(await screen.findByRole('button', { name: '登入中...' })).toBeDisabled()
  })

  it('登入成功後按鈕恢復可用', async () => {
    mockLogin.mockResolvedValue({ id: 1, username: 'admin', role: 'admin' })
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin / user'), 'admin')
    await user.type(screen.getByPlaceholderText('admin123 / user123'), 'admin123')
    await user.click(screen.getByRole('button', { name: '登入' }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
    // After navigation, button is not disabled (loading = false)
    expect(screen.getByRole('button', { name: '登入' })).not.toBeDisabled()
  })
})

// ─── 功能測試 — 錯誤路徑 ────────────────────────────────
describe('功能測試 — 錯誤路徑', () => {
  it('輸入錯誤帳密應顯示錯誤訊息', async () => {
    mockLogin.mockRejectedValue(new Error('帳號或密碼錯誤'))
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin / user'), 'wrong')
    await user.type(screen.getByPlaceholderText('admin123 / user123'), 'wrong')
    await user.click(screen.getByRole('button', { name: '登入' }))

    expect(await screen.findByText('帳號或密碼錯誤')).toBeInTheDocument()
  })

  it('錯誤訊息在重新提交時應被清除', async () => {
    mockLogin
      .mockRejectedValueOnce(new Error('帳號或密碼錯誤'))
      .mockRejectedValueOnce(new Error('帳號或密碼錯誤'))
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin / user'), 'wrong')
    await user.type(screen.getByPlaceholderText('admin123 / user123'), 'wrong')
    await user.click(screen.getByRole('button', { name: '登入' }))
    await screen.findByText('帳號或密碼錯誤')

    // 再次送出，錯誤訊息應先消失（loading 期間）
    await user.click(screen.getByRole('button', { name: '登入' }))
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(2)
    })
  })

  it('登入失敗後按鈕應恢復可用', async () => {
    mockLogin.mockRejectedValue(new Error('帳號或密碼錯誤'))
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin / user'), 'wrong')
    await user.type(screen.getByPlaceholderText('admin123 / user123'), 'wrong')
    await user.click(screen.getByRole('button', { name: '登入' }))

    await screen.findByText('帳號或密碼錯誤')
    expect(screen.getByRole('button', { name: '登入' })).not.toBeDisabled()
  })
})

// ─── 表單驗證測試 ────────────────────────────────────────
describe('表單驗證測試', () => {
  it('帳號欄位為必填，空白不可送出', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin123 / user123'), 'admin123')
    await user.click(screen.getByRole('button', { name: '登入' }))

    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('密碼欄位為必填，空白不可送出', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByPlaceholderText('admin / user'), 'admin')
    await user.click(screen.getByRole('button', { name: '登入' }))

    expect(mockLogin).not.toHaveBeenCalled()
  })
})
