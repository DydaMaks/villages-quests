import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questsAPI } from '../services/api'
import { validateQuest } from '../utils/validation'

const AddQuestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    price: 0,
    duration: 60,
    maxParticipants: 10,
    tags: [] as string[]
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const validation = validateQuest(formData)
    const newErrors: {[key: string]: string} = {}
    
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        // Спрощена логіка для призначення помилок полям
        if (error.includes('Назва')) newErrors.title = error
        else if (error.includes('Опис')) newErrors.description = error
        else if (error.includes('Локація')) newErrors.location = error
        else if (error.includes('Ціна')) newErrors.price = error
        else if (error.includes('Тривалість')) newErrors.duration = error
        else if (error.includes('учасників')) newErrors.maxParticipants = error
        else newErrors.general = error
      })
    }
    
    setErrors(newErrors)
    return validation.isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)

    try {
      const response = await questsAPI.create(formData)
      if (response.data.success) {
        navigate('/quests')
      } else {
        setErrors({ general: 'Помилка створення квесту' })
      }
    } catch (err: any) {
      setErrors({ general: err.response?.data?.message || 'Помилка створення квесту' })
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Очищаємо помилку поля при зміні
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Створення нового квесту</h1>
        
        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Назва квесту *</label>
              <input
                type="text"
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                required
                placeholder="Введіть назву квесту"
              />
              {errors.title && <div className="text-error">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Опис квесту *</label>
              <textarea
                className={`form-input ${errors.description ? 'error' : ''}`}
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                required
                rows={4}
                placeholder="Опишіть ваш квест..."
                style={{ resize: 'vertical' }}
              />
              {errors.description && <div className="text-error">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Локація *</label>
              <input
                type="text"
                className={`form-input ${errors.location ? 'error' : ''}`}
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                required
                placeholder="Де буде проходити квест?"
              />
              {errors.location && <div className="text-error">{errors.location}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Тривалість (хв) *</label>
                <input
                  type="number"
                  className={`form-input ${errors.duration ? 'error' : ''}`}
                  value={formData.duration}
                  onChange={(e) => updateFormData('duration', parseInt(e.target.value))}
                  required
                  min="15"
                  max="480"
                />
                {errors.duration && <div className="text-error">{errors.duration}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Макс. учасників *</label>
                <input
                  type="number"
                  className={`form-input ${errors.maxParticipants ? 'error' : ''}`}
                  value={formData.maxParticipants}
                  onChange={(e) => updateFormData('maxParticipants', parseInt(e.target.value))}
                  required
                  min="1"
                  max="50"
                />
                {errors.maxParticipants && <div className="text-error">{errors.maxParticipants}</div>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Складність *</label>
                <select
                  className="form-input"
                  value={formData.difficulty}
                  onChange={(e) => updateFormData('difficulty', e.target.value)}
                  required
                >
                  <option value="easy">Легко</option>
                  <option value="medium">Середньо</option>
                  <option value="hard">Складно</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Ціна (грн) *</label>
                <input
                  type="number"
                  className={`form-input ${errors.price ? 'error' : ''}`}
                  value={formData.price}
                  onChange={(e) => updateFormData('price', parseInt(e.target.value))}
                  required
                  min="0"
                />
                {errors.price && <div className="text-error">{errors.price}</div>}
              </div>
            </div>

            {errors.general && (
              <div style={{
                color: '#ef4444',
                backgroundColor: '#fef2f2',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #fecaca'
              }}>
                {errors.general}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => navigate('/quests')}
              >
                Скасувати
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={loading}
              >
                {loading ? 'Створення...' : 'Створити квест'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddQuestPage