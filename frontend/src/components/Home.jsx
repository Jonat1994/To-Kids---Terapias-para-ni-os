import { Link } from 'react-router-dom'
import './Home.css'
import terapias from '../data/terapiasData'
import { FALLBACK_THERAPY_IMAGE } from '../constants/imageFallback'
import AnimatedCounter from './AnimatedCounter'

function Home() {
  const handleImageError = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = FALLBACK_THERAPY_IMAGE
  }
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section card">
        <h1 className="hero-title">🧩Bienvenido a TO Kids – Clínica de terapias para niños🧸</h1>
        <p className="hero-subtitle">
          Un espacio lleno de amor
        </p>
        <p className="hero-description">
          Un espacio lleno de amor, aprendizaje y crecimiento, donde cada niño recibe el apoyo que necesita para alcanzar su máximo potencial
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

      {/* Estadísticas */}
      <div className="stats-section card">
        <h2 className="stats-title">✨ Nuestros Logros ✨</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number"><AnimatedCounter targetValue="+50" /></div>
            <div className="stat-label">👨‍👩‍👧 Familias Atendidas al año</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><AnimatedCounter targetValue="+100" /></div>
            <div className="stat-label">⭐ Valoraciones</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><AnimatedCounter targetValue="5+" /></div>
            <div className="stat-label">👨‍⚕️terapias disponibles</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><AnimatedCounter targetValue="3+" /></div>
            <div className="stat-label">📚 Años de Experiencia</div>
          </div>
        </div>
      </div>

      {/* Nuestras Terapias */}
      <div className="terapias-section card">
        <h2 className="section-title">💙 Nuestros Servicios 💙</h2>
        <div className="terapias-grid">
          {terapias.map((terapia) => (
            <article key={terapia.id} className="terapia-card">
              <div className="terapia-image">
                <img
                  src={terapia.imagen}
                  alt={terapia.titulo}
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              <h3>{terapia.titulo}</h3>
              <p>{terapia.descripcion}</p>
            </article>
          ))}
        </div>
        <div className="terapias-cta">
          <Link to="/servicios" className="btn btn-primary">
            Ver Todos los Servicios
          </Link>
        </div>
      </div>

      {/* Método */}
      <div className="metodo-section card">
        <h2 className="section-title">🎯 Nuestro Método 🎯</h2>
        <div className="metodo-content">
          <div className="metodo-text">
            <p className="metodo-intro">
              Desde que nacen, nuestros hijos e hijas pueden necesitar apoyo. <strong>La evolución de las áreas cerebrales están aún por conectar</strong> y conformarán esa unión a través de estímulos que recibirán en su día a día.
            </p>
            <p>
              En nuestro centro, sabemos cómo <strong>conectar y activar todos estos reflejos</strong>, potenciando al máximo todas sus habilidades y fomentando y/o fortaleciendo las ya existentes. Nos basamos en un <strong>crecimiento evolutivo</strong> e identificamos cualquier necesidad en el momento de su vida.
            </p>
            <p>
              Nos basamos en un enfoque terapéutico, bien sea desde <strong>profesionales sanitarios o educativos</strong>, basados en nuestra herramienta de conocimiento y nuevas áreas de investigación, que nos permite abordar, evaluar, sistematizar y desarrollar la mejor terapia para la evolución de su hijo.
            </p>
          </div>
          <div className="metodo-features">
            <div className="metodo-feature">
              <span className="feature-check">✓</span>
              <span>Evaluación integral personalizada</span>
            </div>
            <div className="metodo-feature">
              <span className="feature-check">✓</span>
              <span>Plan terapéutico individualizado</span>
            </div>
            <div className="metodo-feature">
              <span className="feature-check">✓</span>
              <span>Seguimiento continuo y adaptativo</span>
            </div>
            <div className="metodo-feature">
              <span className="feature-check">✓</span>
              <span>Trabajo en equipo multidisciplinario</span>
            </div>
            <div className="metodo-feature">
              <span className="feature-check">✓</span>
              <span>Involucración activa de la familia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tipos de Sesiones */}
      <div className="sesiones-section card">
        <h2 className="section-title">📋 Ofrecemos Sesiones</h2>
        <div className="sesiones-grid">
          <div className="sesion-type">
            <h3>👤 Individuales</h3>
            <ul>
              <li>✓ Atención Temprana</li>
              <li>✓ Retraso Madurativo</li>
              <li>✓ Logopedia Infantil</li>
              <li>✓ Psicopedagogía</li>
              <li>✓ Terapia Ocupacional</li>
              <li>✓ Fisioterapia Infantil</li>
            </ul>
          </div>
          <div className="sesion-type">
            <h3>👥 Grupales</h3>
            <ul>
              <li>✓ Psicomotricidad</li>
              <li>✓ Habilidades Sociales</li>
              <li>✓ Lenguaje – Lectoescritura</li>
              <li>✓ Gestión Emocional</li>
              <li>✓ Funciones Ejecutivas</li>
              <li>✓ Técnicas de Estudio</li>
            </ul>
          </div>
          <div className="sesion-type">
            <h3>⚡ Intensivas</h3>
            <ul>
              <li>✓ Retraso Madurativo</li>
              <li>✓ Neurodesarrollo</li>
              <li>✓ Therasuit</li>
              <li>✓ Integral Sensorial</li>
              <li>✓ Programas de Refuerzo</li>
              <li>✓ Logopedia Intensiva</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Etapas de Desarrollo */}
      <div className="etapas-section card">
        <h2 className="section-title">🌱 ¿En qué etapa se encuentra tu hijo o hija?</h2>
        <div className="etapas-grid">
          <div className="etapa-card">
            <div className="etapa-icon">👶</div>
            <h3>0 - 3 años</h3>
            <p>Atención Temprana</p>
            <p className="etapa-desc">Estimulación y desarrollo en los primeros años de vida</p>
          </div>
          <div className="etapa-card">
            <div className="etapa-icon">🧒</div>
            <h3>3 - 6 años</h3>
            <p>Desarrollo Preescolar</p>
            <p className="etapa-desc">Preparación para la etapa escolar y desarrollo social</p>
          </div>
          <div className="etapa-card">
            <div className="etapa-icon">👦</div>
            <h3>6 - 12 años</h3>
            <p>Etapa Escolar</p>
            <p className="etapa-desc">Apoyo académico, social y emocional durante la primaria</p>
          </div>
          <div className="etapa-card">
            <div className="etapa-icon">🧑</div>
            <h3>12+ años</h3>
            <p>Adolescencia</p>
            <p className="etapa-desc">Desarrollo de habilidades y transición a la vida adulta</p>
          </div>
        </div>
        <div className="etapas-cta">
          <Link to="/agendar-cita" className="btn btn-primary">
            Agendar Evaluación
          </Link>
        </div>
      </div>

      {/* Features Grid Original */}
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

