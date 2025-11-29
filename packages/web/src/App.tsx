import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/layout/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import QuestsPage from './pages/QuestsPage'
import ProfilePage from './pages/ProfilePage'
import AddQuestPage from './pages/AddQuestPage'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="loading">Завантаження...</div>
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />
}

const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="loading">Завантаження...</div>
  }
  
  return !user ? <>{children}</> : <Navigate to="/quests" />
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/quests" />} />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          <Route path="/quests" element={
            <ProtectedRoute>
              <QuestsPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/add-quest" element={
            <ProtectedRoute>
              <AddQuestPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App