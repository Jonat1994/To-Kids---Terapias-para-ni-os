import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si'
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './App.css'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import PacientesList from './components/PacientesList'
import PacienteForm from './components/PacienteForm'
import Home from './components/Home'
import Servicios from './components/Servicios'
import AgendarCita from './components/AgendarCita'
import Materiales from './components/Materiales'
import Contacto from './components/Contacto'
import Metodo from './components/Metodo'
import Login from './components/Login'
import Registro from './components/Registro'
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import WhatsAppFloat from './components/WhatsAppFloat'

function AppContent() {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            {/* Botón Hamburguesa */}
            <button className="hamburger-menu" onClick={toggleMenu}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link to="/" className="nav-logo" onClick={closeMenu}>
              <img src="/logo.png.png" alt="TO kids - Terapias para niños" className="logo-image" />
            </Link>

            {/* Overlay para cerrar menú */}
            {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

            {/* Menú Principal */}
            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={closeMenu}>🏠 Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/servicios" className="nav-link" onClick={closeMenu}>⭐ Servicios</Link>
              </li>
              <li className="nav-item">
                <Link to="/agendar-cita" className="nav-link" onClick={closeMenu}>📅 Agendar Cita</Link>
              </li>
              <li className="nav-item">
                <Link to="/materiales" className="nav-link" onClick={closeMenu}>📚 Materiales</Link>
              </li>
              <li className="nav-item">
                <Link to="/metodo" className="nav-link" onClick={closeMenu}>🎯 Método</Link>
              </li>
              <li className="nav-item">
                <Link to="/contacto" className="nav-link" onClick={closeMenu}>📞 Contacto</Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <Link to="/dashboard" className="nav-link nav-auth nav-auth-icon" title="Mi Cuenta" onClick={closeMenu}>
                    <FaUser /> <span className="nav-auth-text">Cuenta</span>
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link nav-auth nav-auth-icon" title="Inicia Sesión" onClick={closeMenu}>
                    <FaUser /> <span className="nav-auth-text">Login</span>
                  </Link>
                )}
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
            <Route path="/metodo" element={<Metodo />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
                  <span>Diagonal 2 Luis E Vasquez No 224, San Salvador. Local#303</span>
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
                  href="https://www.facebook.com/share/1DrFpwdWG3/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link facebook"
                  aria-label="Facebook"
                >
                  <SiFacebook className="social-icon" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/terapiastokids?igsh=MTdrcTUzc2Fmc3E5Yg==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link instagram"
                  aria-label="Instagram"
                >
                  <SiInstagram className="social-icon" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link tiktok"
                  aria-label="TikTok"
                >
                  <SiTiktok className="social-icon" />
                  <span>TikTok</span>
                </a>
                <a 
                  href="https://wa.me/50370629993" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link whatsapp"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="social-icon" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Centro de Terapia Infantil. Todos los derechos reservados. | Desarrollado por Jonathan Flamenco</p>
          </div>
        </footer>

        {/* Burbuja flotante de WhatsApp */}
        <WhatsAppFloat />
      </div>
      </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App

