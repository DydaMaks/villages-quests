import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { authAPI } from '../services/api'
import { User, AuthResponse } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const userData = localStorage.getItem('userData')
      const token = localStorage.getItem('userToken')
      
      if (userData && token) {
        try {
          const response = await authAPI.getProfile()
          const data = response.data
          
          if (data.success && data.user) {
            setUser(data.user)
          } else {
            // Токен недійсний
            logout()
          }
        } catch (error) {
          // Помилка мережі або недійсний токен
          logout()
        }
      }
    } catch (error) {
      console.error('Auth status check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password)
      const data: AuthResponse = response.data
      
      if (data.success && data.token && data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user))
        localStorage.setItem('userToken', data.token)
        setUser(data.user)
        return true
      }
      return false
    } catch (error: any) {
      console.error('Login error:', error.response?.data?.message || error.message)
      return false
    }
  }

  const register = async (userData: any): Promise<boolean> => {
    try {
      const response = await authAPI.register(userData)
      const data: AuthResponse = response.data
      
      if (data.success && data.token && data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user))
        localStorage.setItem('userToken', data.token)
        setUser(data.user)
        return true
      }
      return false
    } catch (error: any) {
      console.error('Registration error:', error.response?.data?.message || error.message)
      return false
    }
  }

  const logout = (): void => {
    localStorage.removeItem('userData')
    localStorage.removeItem('userToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}