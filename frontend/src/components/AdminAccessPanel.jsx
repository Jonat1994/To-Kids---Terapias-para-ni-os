import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import './AdminAccessPanel.css'

const mockCredentials = [
  {
    id: 'admin',
    label: 'Panel principal',
    usuario: 'admin@centro.com',
    nota: 'Contraseña activa desde hace 3 días',
    estado: 'activo'
  },
  {
    id: 'correos',
    label: 'Correo institucional',
    usuario: 'notificaciones@centro.com',
    nota: 'Contraseña rotada cada mes',
    estado: 'activo'
  },
  {
    id: 'base-datos',
    label: 'Servidor de datos',
    usuario: 'dba@centro.com',
    nota: 'Bloqueado tras 4 intentos fallidos',
    estado: 'bloqueado'
  }
]

const accessLogs = [
  { id: 1, fecha: '04 Dic 2025 · 08:12', accion: 'Cambio de contraseña aprobado', responsable: 'Jonathan' },
  { id: 2, fecha: '03 Dic 2025 · 18:36', accion: 'Intento de acceso fallido (3/5)', responsable: 'Sistema' },
  { id: 3, fecha: '03 Dic 2025 · 09:11', accion: 'Restableció token de desbloqueo', responsable: 'Analista' }
]

function AdminAccessPanel() {
  const { success, error } = useToast()
  const [selectedCredential, setSelectedCredential] = useState(mockCredentials[0])
  const [newPassword, setNewPassword] = useState('')
  const [unlockReason, setUnlockReason] = useState('')

  const handlePasswordReset = (event) => {
    event.preventDefault()
    if (!newPassword) {
      error('Especifica una contraseña nueva antes de continuar')
      return
    }
    success(`Se simuló la rotación de la contraseña de "${selectedCredential.label}"`)
    setNewPassword('')
  }

  const handleUnlock = (event) => {
    event.preventDefault()
    if (!unlockReason.trim()) {
      error('Agrega una razón para desbloquear temporalmente')
      return
    }
    success(
      `Se liberó el acceso para "${selectedCredential.label}" durante 30 minutos (justificación: ${unlockReason.trim()})`
    )
    setUnlockReason('')
  }

  return (
    <div className="access-panel-layout">
      <header className="access-hero card">
        <div>
          <p className="hero-label">Gestor de accesos</p>
          <h1>Mock de contraseñas y desbloqueos</h1>
          <p>
            Esta vista replica cómo se administraría la contraseña del panel administrativo sin tocar el backend. Todas las acciones
            simulan el flujo y registran eventos ficticios.
          </p>
        </div>
        <Link to="/admin" className="btn btn-primary">
          Volver al panel
        </Link>
      </header>

      <div className="grid two-column">
        <section className="credential-list card">
          <h2>Credenciales monitoreadas</h2>
          <ul>
            {mockCredentials.map(entry => (
              <li
                key={entry.id}
                className={`credential-item ${selectedCredential.id === entry.id ? 'active' : ''}`}
                onClick={() => setSelectedCredential(entry)}
              >
                <div>
                  <strong>{entry.label}</strong>
                  <p>{entry.usuario}</p>
                </div>
                <span className={`status-badge status-${entry.estado}`}>{entry.estado}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="credential-panel card">
          <h2>Actualizaciones para "{selectedCredential.label}"</h2>
          <p className="muted">{selectedCredential.nota}</p>

          <form onSubmit={handlePasswordReset} className="panel-form">
            <label htmlFor="new-password">Nueva contraseña</label>
            <input
              id="new-password"
              type="password"
              placeholder="••••••••••"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <button type="submit" className="btn btn-secondary">
              Simular rotación
            </button>
          </form>

          <form onSubmit={handleUnlock} className="panel-form">
            <label htmlFor="unlock-reason">¿Por qué desbloqueas?</label>
            <textarea
              id="unlock-reason"
              rows="3"
              placeholder="Ej: Paciente requiere atención inmediata"
              value={unlockReason}
              onChange={(event) => setUnlockReason(event.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Simular desbloqueo
            </button>
          </form>
        </section>
      </div>

      <section className="card log-section">
        <h2>Registro de acciones recientes</h2>
        <div className="log-grid">
          {accessLogs.map(log => (
            <article key={log.id} className="log-item">
              <p className="log-date">{log.fecha}</p>
              <p className="log-action">{log.accion}</p>
              <p className="log-by">Responsable: {log.responsable}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminAccessPanel

