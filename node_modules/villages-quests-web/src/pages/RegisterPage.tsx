import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'organizer'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають')
      return
    }

    if (formData.password.length < 6) {
      setError('Пароль повинен містити принаймні 6 символів')
      return
    }

    setLoading(true)

    try {
      const success = await register(formData)
      if (success) {
        navigate('/quests')
      } else {
        setError('Помилка реєстрації')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Помилка реєстрації')
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>Реєстрація</h1>
          <p style={{ color: '#6b7280' }}>Створіть новий акаунт</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Ім'я користувача</label>
            <input
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(e) => updateFormData('username', e.target.value)}
              required
              placeholder="Введіть ваше ім'я"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              required
              placeholder="Введіть ваш email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              required
              placeholder="Введіть пароль"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Підтвердження пароля</label>
            <input
              type="password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              required
              placeholder="Повторіть пароль"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Тип акаунту</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={(e) => updateFormData('role', e.target.value)}
                />
                Користувач
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <input
                  type="radio"
                  name="role"
                  value="organizer"
                  checked={formData.role === 'organizer'}
                  onChange={(e) => updateFormData('role', e.target.value)}
                />
                Організатор
              </label>
            </div>
          </div>

          {error && (
            <div style={{
              color: '#ef4444',
              backgroundColor: '#fef2f2',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Реєстрація...' : 'Зареєструватися'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#6b7280' }}>
            Вже є акаунт?{' '}
            <Link to="/login" style={{ color: '#22c55e', textDecoration: 'none' }}>
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage