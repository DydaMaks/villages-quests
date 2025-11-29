import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { questsAPI, seedAPI } from '../services/api'
import { Link } from 'react-router-dom'
import { Quest } from '../types'

const QuestsPage: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const [seedLoading, setSeedLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    loadQuests()
  }, [])

  const loadQuests = async () => {
    try {
      const response = await questsAPI.getAll()
      const data = response.data
      
      if (data.success && data.quests) {
        setQuests(data.quests)
      } else {
        console.error('Помилка завантаження квестів:', data.message)
      }
    } catch (error) {
      console.error('Помилка завантаження квестів:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTestData = async () => {
    setSeedLoading(true)
    try {
      await seedAPI.createTestData()
      await loadQuests()
      alert('Тестові дані успішно створено!')
    } catch (error) {
      alert('Помилка створення тестових даних')
    } finally {
      setSeedLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#22c55e'
      case 'medium': return '#f59e0b'
      case 'hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко'
      case 'medium': return 'Середньо'
      case 'hard': return 'Складно'
      default: return difficulty
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <div>Завантаження квестів...</div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>
            {user?.role === 'organizer' ? 'Мої квести' : 'Доступні квести'}
          </h1>
          <p style={{ color: '#6b7280' }}>
            {user?.role === 'organizer' 
              ? 'Керуйте вашими квестами' 
              : 'Оберіть квест для незабутньої пригоди'
            }
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {quests.length === 0 && (
            <button 
              onClick={createTestData}
              className="btn btn-outline"
              disabled={seedLoading}
              style={{ borderColor: '#6b7280', color: '#6b7280' }}
            >
              {seedLoading ? 'Створення...' : 'Створити тестові дані'}
            </button>
          )}
          
          {user?.role === 'organizer' && (
            <Link to="/add-quest" className="btn btn-primary">
              ➕ Додати квест
            </Link>
          )}
        </div>
      </div>

      {quests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1.5rem' }}>
          {quests.map((quest) => (
            <div key={quest._id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ 
                height: '200px',
                backgroundImage: `url(${quest.images?.[0]?.url || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                marginBottom: '1rem'
              }} />
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <h3 style={{ margin: 0, flex: 1, fontSize: '1.25rem' }}>{quest.title}</h3>
                <span style={{
                  backgroundColor: getDifficultyColor(quest.difficulty),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getDifficultyText(quest.difficulty)}
                </span>
              </div>

              <p style={{ 
                color: '#6b7280', 
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                {quest.description.length > 100 
                  ? `${quest.description.substring(0, 100)}...` 
                  : quest.description
                }
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <div>📍 {quest.location}</div>
                <div>⏱ {quest.duration} хв</div>
                <div>👥 до {quest.maxParticipants} ос.</div>
                <div>⭐ {quest.rating?.average || 0} ({quest.rating?.count || 0})</div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold',
                    color: '#22c55e'
                  }}>
                    {quest.price > 0 ? `${quest.price} грн` : 'Безкоштовно'}
                  </span>
                </div>

                {user?.role === 'user' && (
                  <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                    Замовити
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#6b7280'
        }}>
          <h3>Квестів поки що немає</h3>
          <p>Натисніть "Створити тестові дані" або додайте перший квест!</p>
        </div>
      )}
    </div>
  )
}

export default QuestsPage