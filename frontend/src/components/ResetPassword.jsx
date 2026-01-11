import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../config/firebase'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './ResetPassword.css'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionValid, setSessionValid] = useState(false)
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar si hay una sesión válida (usuario debe venir desde el link del email)
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (data?.session?.user) {
          setSessionValid(true)
        } else {
          setError('Este enlace de recuperación no es válido o ha expirado. Por favor, solicita uno nuevo.')
          setTimeout(() => navigate('/forgot-password'), 3000)
        }
      } catch (err) {
        setError('Error al verificar tu sesión.')
        setTimeout(() => navigate('/forgot-password'), 3000)
      }
    }

    checkSession()
  }, [navigate])

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    // Validaciones
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    try {
      await updatePassword(password)
      setSuccess(true)
      // Redirigir al login después de 3 segundos
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message || 'Error al actualizar contraseña')
    } finally {
      setLoading(false)
    }
  }

  if (!sessionValid) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card card">
          <div className="reset-password-logo-container">
            <img src="/logoligin.png" alt="TO kids - Terapias para niños" className="reset-password-logo" />
          </div>
          <h1>🔄 Verificando...</h1>
          <p className="reset-password-subtitle">Verificando tu enlace de recuperación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-card card">
        <div className="reset-password-logo-container">
          <img src="/logoligin.png" alt="TO kids - Terapias para niños" className="reset-password-logo" />
        </div>
        <h1>🔑 Nueva Contraseña</h1>
        <p className="reset-password-subtitle">
          Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            ✅ Contraseña actualizada exitosamente. En 3 segundos serás redirigido al login...
          </div>
        )}

        {!success && sessionValid ? (
          <form onSubmit={handleResetPassword} className="reset-password-form">
            <div className="form-group">
              <label htmlFor="password">🔒 Nueva Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength="6"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  disabled={loading}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <small>Mínimo 6 caracteres</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">🔒 Confirmar Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength="6"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                  disabled={loading}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  )
}

export default ResetPassword
