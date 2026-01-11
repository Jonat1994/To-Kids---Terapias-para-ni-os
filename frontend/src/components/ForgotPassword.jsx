import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await resetPassword(email)
      setSuccess(true)
      setEmail('')
      // Redirigir al login después de 3 segundos
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message || 'Error al enviar enlace de recuperación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card card">
        <div className="forgot-password-logo-container">
          <img src="/logoligin.png" alt="TO kids - Terapias para niños" className="forgot-password-logo" />
        </div>
        <h1>🔑 Recuperar Contraseña</h1>
        <p className="forgot-password-subtitle">
          Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            ✅ Correo enviado exitosamente. Revisa tu bandeja de entrada (o spam) en 3 segundos serás redirigido al login...
          </div>
        )}

        {!success ? (
          <form onSubmit={handleResetPassword} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email">📧 Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
            </button>
          </form>
        ) : null}

        <p className="forgot-password-footer">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
