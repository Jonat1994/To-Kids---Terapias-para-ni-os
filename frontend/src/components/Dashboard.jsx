import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const displayName = user?.user_metadata?.nombre || user?.email || 'Usuario'

  return (
    <div className="dashboard-container">
      <div className="dashboard-card card">
        <div className="dashboard-header">
          <h1>👋 Bienvenido</h1>
          <p className="user-name">{displayName}</p>
        </div>

        <div className="dashboard-content">
          <div className="info-card">
            <h3>📧 Email</h3>
            <p>{user?.email}</p>
          </div>

          <div className="info-card">
            <h3>👤 Nombre</h3>
            <p>{user?.user_metadata?.nombre || 'No especificado'}</p>
          </div>

          <div className="info-card">
            <h3>🆔 ID de Usuario</h3>
            <p className="user-id">{user?.id}</p>
          </div>

          <div className="info-card">
            <h3>📅 Fecha de Registro</h3>
            <p>{new Date(user?.created_at).toLocaleDateString('es-ES')}</p>
          </div>
        </div>

        <div className="dashboard-footer">
          <button onClick={handleLogout} className="btn btn-secondary">
            🚪 Cerrar Sesión
          </button>
          <a href="/" className="btn btn-primary">
            ← Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
