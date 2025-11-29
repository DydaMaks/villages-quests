import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/quests')
      } else {
        setError('Невірний email або пароль')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Помилка входу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem', color: '#1f2937' }}>Вхід</h1>
          <p style={{ color: '#6b7280' }}>Увійдіть у свій акаунт</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Введіть ваш email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введіть ваш пароль"
            />
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
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#6b7280' }}>
            Немає акаунту?{' '}
            <Link to="/register" style={{ color: '#22c55e', textDecoration: 'none' }}>
              Зареєструватися
            </Link>
          </p>
        </div>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#166534'
        }}>
          <strong>Тестові акаунти:</strong>
          <div>user@example.com / password123</div>
          <div>organizer@example.com / password123</div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage