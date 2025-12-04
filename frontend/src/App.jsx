import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { ToastProvider } from './context/ToastContext'
import PacientesList from './components/PacientesList'
import PacienteForm from './components/PacienteForm'
import Home from './components/Home'
import Servicios from './components/Servicios'
import AgendarCita from './components/AgendarCita'
import Materiales from './components/Materiales'
import Contacto from './components/Contacto'
import AdminPanel from './components/AdminPanel'
import AdminAccessPanel from './components/AdminAccessPanel'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  return (
    <ToastProvider>
      <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <img src="/logo.png.png" alt="TO kids - Terapias para niños" className="logo-image" />
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">🏠 Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/servicios" className="nav-link">⭐ Servicios</Link>
              </li>
              <li className="nav-item">
                <Link to="/agendar-cita" className="nav-link">📅 Agendar Cita</Link>
              </li>
              <li className="nav-item">
                <Link to="/materiales" className="nav-link">📚 Materiales</Link>
              </li>
              <li className="nav-item">
                <Link to="/contacto" className="nav-link">📞 Contacto</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">🔧 Admin</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/agendar-cita" element={<AgendarCita />} />
            <Route path="/materiales" element={<Materiales />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/gestor-acceso" element={<AdminAccessPanel />} />
            <Route path="/pacientes" element={<PacientesList />} />
            <Route path="/nuevo-paciente" element={<PacienteForm />} />
            <Route path="/editar-paciente/:id" element={<PacienteForm />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-container">
            {/* Columna 1: Logo e Información del Centro */}
            <div className="footer-section footer-logo-section">
              <Link to="/" className="footer-logo-link">
                <img src="/logo.png.png" alt="Centro de Terapia Infantil" className="footer-logo-image" />
                <div className="footer-logo-text">
                  <h2 className="footer-logo-title">Centro de</h2>
                  <h2 className="footer-logo-title">Terapia Infantil</h2>
                </div>
              </Link>
              <div className="footer-contact-info">
                <p className="footer-contact-item">
                  <span className="footer-icon">📍</span>
                  <span>Calle Principal 123, Ciudad, País</span>
                </p>
                <p className="footer-contact-item">
                  <span className="footer-icon">📞</span>
                  <span><a href="tel:+50370629993">+503 7062-9993</a></span>
                </p>
                <p className="footer-contact-item">
                  <span className="footer-icon">✉️</span>
                  <span><a href="mailto:contacto.tokids@gmail.com">contacto.tokids@gmail.com</a></span>
                </p>
              </div>
            </div>
            

            {/* Columna 2: Redes Sociales */}
            <div className="footer-section">
              <h3 className="footer-title">Redes Sociales</h3>
              <div className="social-links">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link facebook"
                  aria-label="Facebook"
                >
                  <span className="social-icon">📘</span>
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link instagram"
                  aria-label="Instagram"
                >
                  <span className="social-icon">📷</span>
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link tiktok"
                  aria-label="TikTok"
                >
                  <span className="social-icon">🎵</span>
                  <span>TikTok</span>
                </a>
                <a 
                  href="https://wa.me/50370629993" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link whatsapp"
                  aria-label="WhatsApp"
                >
                  <span className="social-icon">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Centro de Terapia Infantil. Todos los derechos reservados. | Desarrollado por Jonathan Flamenco</p>
          </div>
        </footer>

        {/* Burbuja flotante de WhatsApp */}
        <WhatsAppFloat />
      </div>
      </Router>
    </ToastProvider>
  )
}

export default App

