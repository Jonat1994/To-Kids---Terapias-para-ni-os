import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section card">
        <h1 className="hero-title">🌈 Bienvenido al Centro de Terapia Infantil 🌈</h1>
        <p className="hero-subtitle">
          Especializados en atención y estimulación temprana, retraso madurativo y desarrollo integral de los más pequeños
        </p>
        <p className="hero-description">
          Un espacio lleno de amor, aprendizaje y crecimiento donde cada niño recibe el apoyo que necesita para alcanzar su máximo potencial
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
            <div className="stat-number">+500</div>
            <div className="stat-label">👨‍👩‍👧 Familias Atendidas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">+2000</div>
            <div className="stat-label">⭐ Valoraciones</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">👨‍⚕️ Profesionales</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-label">📚 Años de Experiencia</div>
          </div>
        </div>
      </div>

      {/* Nuestras Terapias */}
      <div className="terapias-section card">
        <h2 className="section-title">💙 Nuestras Terapias 💙</h2>
        <div className="terapias-grid">
          <div className="terapia-card">
            <div className="terapia-icon">🗣️</div>
            <h3>Logopedia Infantil</h3>
            <p>Intervención individual para rehabilitar alteraciones del habla y lenguaje</p>
          </div>
          <div className="terapia-card">
            <div className="terapia-icon">🧠</div>
            <h3>Terapia Ocupacional</h3>
            <p>Mejora de actividades cotidianas, integración sensorial y psicomotricidad</p>
          </div>
          <div className="terapia-card">
            <div className="terapia-icon">👶</div>
            <h3>Atención Temprana</h3>
            <p>Trabajo en áreas cognitiva, motriz, lenguaje y socioemocional</p>
          </div>
          <div className="terapia-card">
            <div className="terapia-icon">🧘</div>
            <h3>Psicología Infantil</h3>
            <p>Análisis de conducta y procesos mentales con distintos enfoques</p>
          </div>
          <div className="terapia-card">
            <div className="terapia-icon">📚</div>
            <h3>Psicopedagogía</h3>
            <p>Técnicas de estudio, dificultades del aprendizaje y funciones ejecutivas</p>
          </div>
          <div className="terapia-card">
            <div className="terapia-icon">🏃</div>
            <h3>Fisioterapia Infantil</h3>
            <p>Mejora de habilidades motoras, integración sensorial y cognitiva</p>
          </div>
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
              <li>✓ Psicología Infantil</li>
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

