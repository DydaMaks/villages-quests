import React from 'react'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = 'Завантаження...' 
}) => {
  const sizeMap = {
    small: '24px',
    medium: '32px',
    large: '48px'
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div 
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: `3px solid #f3f3f3`,
          borderTop: `3px solid #22c55e`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}
      />
      {text && (
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: size === 'small' ? '14px' : '16px'
        }}>
          {text}
        </p>
      )}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Loading