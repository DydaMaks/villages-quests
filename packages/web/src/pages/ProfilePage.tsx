import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const ProfilePage: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Користувача не знайдено</div>
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Профіль користувача</h1>
        
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <img
              src={user.avatar}
              alt={user.username}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                marginRight: '1rem'
              }}
            />
            <div>
              <h2 style={{ margin: 0 }}>{user.username}</h2>
              <p style={{ color: '#6b7280', margin: 0 }}>
                {user.role === 'organizer' ? 'Організатор' : 'Користувач'}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{ marginRight: '1rem', fontSize: '1.5rem' }}>
                👤
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ім'я користувача</div>
                <div style={{ fontWeight: '500' }}>{user.username}</div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{ marginRight: '1rem', fontSize: '1.5rem' }}>
                ✉️
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Email</div>
                <div style={{ fontWeight: '500' }}>{user.email}</div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{ marginRight: '1rem', fontSize: '1.5rem' }}>
                🎯
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Роль</div>
                <div style={{ fontWeight: '500' }}>
                  {user.role === 'organizer' ? 'Організатор квестів' : 'Учасник квестів'}
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{ marginRight: '1rem', fontSize: '1.5rem' }}>
                ✅
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Статус акаунту</div>
                <div style={{ fontWeight: '500', color: '#22c55e' }}>Активний</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage