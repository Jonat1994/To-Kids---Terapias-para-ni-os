import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PacientesList from './components/PacientesList'
import PacienteForm from './components/PacienteForm'
import Home from './components/Home'
import Servicios from './components/Servicios'
import AgendarCita from './components/AgendarCita'
import Materiales from './components/Materiales'
import Contacto from './components/Contacto'
import AdminPanel from './components/AdminPanel'

function App() {
  return (
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
            <Route path="/pacientes" element={<PacientesList />} />
            <Route path="/nuevo-paciente" element={<PacienteForm />} />
            <Route path="/editar-paciente/:id" element={<PacienteForm />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Centro de Terapia Infantil. Todos los derechos reservados. Jonathan Flamenco</p>
        </footer>
      </div>
    </Router>
  )
}

export default App

