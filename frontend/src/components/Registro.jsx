import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import './Registro.css'

function Registro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await register(email, password, { nombre })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setError('')
    setLoading(true)

    try {
      await loginWithGoogle()
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="registro-container">
      <div className="registro-card card">
        <div className="registro-logo-container">
          <img src="/logoligin.png" alt="TO kids - Terapias para niños" className="registro-logo" />
        </div>
        <h1> Crear Cuenta</h1>
        <p className="registro-subtitle">Centro de Terapia Infantil</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister} className="registro-form">
          <div className="form-group">
            <label htmlFor="nombre"> Nombre Completo</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email"> Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"> Contraseña</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <small>Mínimo 6 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">✓ Confirmar Contraseña</label>
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="divider">O</div>

        <button onClick={handleGoogleRegister} className="btn-google" disabled={loading}>
          <FaGoogle /> Regístrate con Google
        </button>

        <p className="registro-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}

export default Registro
