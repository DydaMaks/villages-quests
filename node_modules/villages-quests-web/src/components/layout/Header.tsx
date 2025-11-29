import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header style={{
      backgroundColor: '#22c55e',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            🏞️ Villages Quests
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <>
                <Link 
                  to="/quests" 
                  className="btn btn-outline"
                  style={{ 
                    color: 'white', 
                    borderColor: 'white',
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: isActive('/quests') ? 'rgba(255,255,255,0.2)' : 'transparent'
                  }}
                >
                  Квести
                </Link>

                {user.role === 'organizer' && (
                  <Link 
                    to="/add-quest" 
                    className="btn btn-outline"
                    style={{ 
                      color: 'white', 
                      borderColor: 'white',
                      padding: '8px 16px',
                      fontSize: '14px',
                      backgroundColor: isActive('/add-quest') ? 'rgba(255,255,255,0.2)' : 'transparent'
                    }}
                  >
                    Додати квест
                  </Link>
                )}

                <Link 
                  to="/profile" 
                  className="btn btn-outline"
                  style={{ 
                    color: 'white', 
                    borderColor: 'white',
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: isActive('/profile') ? 'rgba(255,255,255,0.2)' : 'transparent'
                  }}
                >
                  👤 {user.username}
                </Link>

                <button 
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{ 
                    color: 'white', 
                    borderColor: 'white',
                    padding: '8px 16px',
                    fontSize: '14px'
                  }}
                >
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline"
                  style={{ 
                    color: 'white', 
                    borderColor: 'white',
                    padding: '8px 16px',
                    fontSize: '14px'
                  }}
                >
                  Вхід
                </Link>
                <Link 
                  to="/register" 
                  className="btn"
                  style={{ 
                    backgroundColor: 'white',
                    color: '#22c55e',
                    padding: '8px 16px',
                    fontSize: '14px'
                  }}
                >
                  Реєстрація
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header