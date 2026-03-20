import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from '../Login'

const mockLogin = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin }),
}))

function getAccountInput() {
  return screen.getByRole('textbox') // only one text input (password is type=password)
}

function getPasswordInput() {
  return document.querySelector('input[type="password"]') as HTMLInputElement
}

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('前端元素', () => {
    it('應正確渲染登入表單的所有欄位與按鈕', () => {
      render(<Login />)
      expect(screen.getByText('車輛管理系統')).toBeInTheDocument()
      expect(screen.getByText('帳號')).toBeInTheDocument()
      expect(screen.getByText('密碼')).toBeInTheDocument()
      expect(getAccountInput()).toBeInTheDocument()
      expect(getPasswordInput()).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '登入' })).toBeInTheDocument()
      expect(screen.getByText(/admin \/ admin123/)).toBeInTheDocument()
    })

    it('密碼欄位應為 password 類型', () => {
      render(<Login />)
      expect(getPasswordInput()).toHaveAttribute('type', 'password')
    })

    it('登入過程中按鈕應顯示 loading 狀態', async () => {
      let resolveLogin!: (value: string | null) => void
      mockLogin.mockImplementation(() => new Promise((resolve) => { resolveLogin = resolve }))

      const user = userEvent.setup()
      render(<Login />)

      await user.type(getAccountInput(), 'admin')
      await user.type(getPasswordInput()!, 'admin123')
      await user.click(screen.getByRole('button', { name: '登入' }))

      expect(screen.getByRole('button', { name: '登入中...' })).toBeDisabled()

      resolveLogin(null)
    })

    it('帳號與密碼欄位皆為必填', () => {
      render(<Login />)
      expect(getAccountInput()).toBeRequired()
      expect(getPasswordInput()).toBeRequired()
    })
  })

  describe('function 邏輯', () => {
    it('輸入帳號密碼後應更新表單狀態', async () => {
      const user = userEvent.setup()
      render(<Login />)

      await user.type(getAccountInput(), 'admin')
      await user.type(getPasswordInput()!, 'admin123')

      expect(getAccountInput()).toHaveValue('admin')
      expect(getPasswordInput()).toHaveValue('admin123')
    })

    it('登入成功後應導向首頁', async () => {
      mockLogin.mockResolvedValue(null)
      const user = userEvent.setup()
      render(<Login />)

      await user.type(getAccountInput(), 'admin')
      await user.type(getPasswordInput()!, 'admin123')
      await user.click(screen.getByRole('button', { name: '登入' }))

      expect(mockNavigate).toHaveBeenCalledWith('/')
    })

    it('登入失敗時應顯示錯誤訊息', async () => {
      mockLogin.mockResolvedValue('帳號或密碼錯誤')
      const user = userEvent.setup()
      render(<Login />)

      await user.type(getAccountInput(), 'wrong')
      await user.type(getPasswordInput()!, 'wrong')
      await user.click(screen.getByRole('button', { name: '登入' }))

      expect(screen.getByText('帳號或密碼錯誤')).toBeInTheDocument()
    })
  })
})
