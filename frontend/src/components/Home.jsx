import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section card">
        <h1 className="hero-title">🌈 Bienvenido al Centro de Terapia Infantil 🌈</h1>
        <p className="hero-subtitle">
          Un espacio lleno de amor, aprendizaje y crecimiento para los más pequeños
        </p>
        <div className="hero-buttons">
          <Link to="/agendar-cita" className="btn btn-primary">
            📅 Agendar una Cita
          </Link>
          <Link to="/servicios" className="btn btn-secondary">
            ⭐ Ver Nuestros Servicios
          </Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card card">
          <div className="feature-icon">📅</div>
          <h3>Reserva de Citas Fácil</h3>
          <p>Agenda tu cita en 3 simples pasos y recibe confirmación por email</p>
        </div>

        <div className="feature-card card">
          <div className="feature-icon">⭐</div>
          <h3>Terapias Especializadas</h3>
          <p>Lenguaje, ocupacional, fisioterapia y más servicios para tu hijo/a</p>
        </div>

        <div className="feature-card card">
          <div className="feature-icon">📚</div>
          <h3>Materiales Gratuitos</h3>
          <p>Descarga ejercicios, guías y actividades para practicar en casa</p>
        </div>

        <div className="feature-card card">
          <div className="feature-icon">👨‍👩‍👧</div>
          <h3>Atención Personalizada</h3>
          <p>Cada niño es único y recibe un plan terapéutico individualizado</p>
        </div>
      </div>
    </div>
  )
}

export default Home

