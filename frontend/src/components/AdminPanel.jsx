import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { citaService, pacienteService, materialService } from '../services/api'
import { useToast } from '../context/ToastContext'
import './AdminPanel.css'

function AdminPanel() {
  const { success, error: showError } = useToast()
  const [citas, setCitas] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [materiales, setMateriales] = useState([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordAttempt, setPasswordAttempt] = useState('')

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

  const initialUploadForm = {
    titulo: '',
    descripcion: '',
    categoria: 'EJERCICIOS',
    visiblePublico: true,
    file: null
  }

  const [uploadForm, setUploadForm] = useState(initialUploadForm)

  useEffect(() => {
    if (!authenticated) {
      return
    }
    loadAllData()
  }, [authenticated])

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    if (passwordAttempt === ADMIN_PASSWORD) {
      success('Acceso concedido')
      setAuthenticated(true)
      setPasswordAttempt('')
    } else {
      showError('Contraseña incorrecta')
      setPasswordAttempt('')
    }
  }

  const loadAllData = async () => {
    try {
      setLoading(true)
      console.log('Iniciando carga de datos administrativos...')
      
      const [citasData, pacientesData, materialesData] = await Promise.all([
        citaService.getAll().catch(err => {
            console.error('Error cargando citas:', err)
            return []
        }),
        pacienteService.getAll().catch(err => {
            console.error('Error cargando pacientes:', err)
            return []
        }),
        materialService.getAll().catch(err => {
            console.error('Error cargando materiales:', err)
            return []
        })
      ])
      
      console.log('Datos cargados:', { citas: citasData?.length, pacientes: pacientesData?.length, materiales: materialesData?.length })
      
      setCitas(citasData || [])
      setPacientes(pacientesData || [])
      setMateriales(materialesData || [])
    } catch (error) {
      console.error('Error CRÍTICO al cargar datos del panel administrativo:', error)
      showError('No se pudieron cargar los datos administrativos. Revisa la consola.')
    } finally {
      setLoading(false)
    }
  }

  const handleCitaEstadoChange = async (id, nuevoEstado) => {
    try {
      const cita = citas.find(c => c.id === id)
      if (!cita) return
      await citaService.update(id, { ...cita, estado: nuevoEstado })
      success('Estado de la cita actualizado')
      loadAllData()
    } catch (error) {
      console.error('Error al actualizar cita:', error)
      showError('Error al actualizar el estado de la cita')
    }
  }

  const handleDeleteCita = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta cita?')) return

    try {
      await citaService.delete(id)
      success('Cita eliminada')
      loadAllData()
    } catch (error) {
      console.error('Error al eliminar cita:', error)
      showError('No se pudo eliminar la cita')
    }
  }

  const handleDeleteMaterial = async (id) => {
    if (!window.confirm('¿Deseas eliminar este material?')) return

    try {
      await materialService.delete(id)
      success('Material eliminado')
      loadAllData()
    } catch (error) {
      console.error('Error al eliminar material:', error)
      showError('No se pudo eliminar el material')
    }
  }

  const handleUploadSubmit = async (e) => {
    e.preventDefault()

    if (!uploadForm.file) {
      showError('Por favor selecciona un archivo')
      return
    }

    const formData = new FormData()
    formData.append('file', uploadForm.file)
    formData.append('titulo', uploadForm.titulo)
    formData.append('descripcion', uploadForm.descripcion)
    formData.append('categoria', uploadForm.categoria)
    formData.append('visiblePublico', uploadForm.visiblePublico)

    try {
      await materialService.upload(formData)
      success('Material subido exitosamente')
      setUploadForm(initialUploadForm)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      loadAllData()
    } catch (error) {
      console.error('Error al subir material:', error)
      showError('Error al subir el material')
    }
  }

  const upcomingCitas = useMemo(() => {
    const now = new Date()
    return [...citas]
      .filter(cita => new Date(cita.fechaHora) >= now)
      .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
      .slice(0, 6)
  }, [citas])

  const recentPacientes = useMemo(() => {
    return [...pacientes]
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 5)
  }, [pacientes])

  const materialHighlights = useMemo(() => {
    return [...materiales]
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 4)
  }, [materiales])

  const stats = useMemo(() => {
    const estados = citas.reduce((acc, cita) => {
      const estado = cita.estado || 'DESCONOCIDO'
      acc[estado] = (acc[estado] || 0) + 1
      return acc
    }, {})

    const publicos = materiales.filter(material => material.visiblePublico).length
    const privados = materiales.length - publicos

    return {
      totalCitas: citas.length,
      confirmadas: estados.CONFIRMADA || 0,
      completadas: estados.COMPLETADA || 0,
      canceladas: estados.CANCELADA || 0,
      proximas: upcomingCitas.length,
      pacientes: pacientes.length,
      materiales: materiales.length,
      materialesPublicos: publicos,
      materialesPrivados: privados
    }
  }, [citas, pacientes, materiales, upcomingCitas])

  if (!authenticated) {
    return (
      <div className="admin-dashboard-container auth-wrapper">
        <div className="auth-card card">
          <p className="hero-label">Acceso restringido</p>
          <h2>Ingresa la contraseña del panel</h2>
          <p>Solo personal autorizado puede acceder a esta sección.</p>
          <form onSubmit={handleAuthSubmit} className="auth-form">
            <input
              type="password"
              placeholder="Contraseña"
              value={passwordAttempt}
              onChange={(e) => setPasswordAttempt(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-hero card">
        <div>
          <p className="hero-label">Administración Central</p>
          <h1>Panel de control</h1>
          <p className="hero-subtitle">
            Monitorea citas, pacientes y materiales desde un solo lugar para tomar decisiones rápidas.
          </p>
        </div>
        <Link to="/pacientes" className="btn btn-primary">
          Registrar paciente
        </Link>
        <Link to="/admin/gestor-acceso" className="btn btn-link">
          Ver gestor de accesos
        </Link>
      </header>

      <section className="cards-grid">
        <article className="stat-card">
          <p className="stat-label">Citas totales</p>
          <strong>{stats.totalCitas}</strong>
          <span>Confirmadas: {stats.confirmadas}</span>
          <span>Completadas: {stats.completadas}</span>
        </article>

        <article className="stat-card">
          <p className="stat-label">Próximas citas</p>
          <strong>{stats.proximas}</strong>
          <span style={{ color: '#FF6B9D' }}>Canceladas: {stats.canceladas}</span>
          <span>Pacientes activos: {stats.pacientes}</span>
        </article>

        <article className="stat-card">
          <p className="stat-label">Materiales</p>
          <strong>{stats.materiales}</strong>
          <span>🌐 Públicos: {stats.materialesPublicos}</span>
          <span>🔒 Privados: {stats.materialesPrivados}</span>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Próximas citas</h2>
          <button className="btn btn-secondary" onClick={loadAllData}>
            Actualizar
          </button>
        </div>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando información...</p>
          </div>
        ) : upcomingCitas.length === 0 ? (
          <p className="empty-message">No hay citas próximas en agenda</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Fecha</th>
                  <th>Duración</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {upcomingCitas.map(cita => (
                  <tr key={cita.id}>
                    <td>
                      <strong>
                        {cita.paciente?.nombre} {cita.paciente?.apellidos}
                      </strong>
                    </td>
                    <td>{new Date(cita.fechaHora).toLocaleString('es-ES')}</td>
                    <td>{cita.duracionMinutos} min</td>
                    <td>
                      <select
                        value={cita.estado}
                        onChange={(e) => handleCitaEstadoChange(cita.id, e.target.value)}
                        className={`estado-select estado-${(cita.estado || '').toLowerCase()}`}
                      >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="CONFIRMADA">Confirmada</option>
                        <option value="COMPLETADA">Completada</option>
                        <option value="CANCELADA">Cancelada</option>
                        <option value="NO_ASISTIO">No asistió</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteCita(cita.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="dashboard-section split">
        <div>
          <div className="section-header">
            <h2>Pacientes recientes</h2>
            <Link to="/pacientes" className="btn btn-link">
              Ver todos
            </Link>
          </div>
          {loading && pacientes.length === 0 ? (
            <p className="empty-message">Cargando pacientes...</p>
          ) : (
            <ul className="inline-list">
              {recentPacientes.map(paciente => (
                <li key={paciente.id}>
                  <p>
                    <strong>
                      {paciente.nombre} {paciente.apellidos}
                    </strong>
                  </p>
                  <p>{paciente.email || 'Email no disponible'}</p>
                  <p>{paciente.telefono || 'Teléfono no disponible'}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="section-header">
            <h2>Materiales recientes</h2>
            <Link to="/materiales" className="btn btn-link">
              Ir a materiales
            </Link>
          </div>
          {loading && materiales.length === 0 ? (
            <p className="empty-message">Cargando materiales...</p>
          ) : (
            <ul className="inline-list">
              {materialHighlights.map(material => (
                <li key={material.id}>
                  <p className="material-title">{material.titulo}</p>
                  <p className="material-sub">{material.descripcion}</p>
                  <div className="material-tags">
                    <span>{material.categoria}</span>
                    <span>{material.visiblePublico ? 'Público' : 'Privado'}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteMaterial(material.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="dashboard-section upload-section">
        <div className="section-header">
          <h2>Subir material nuevo</h2>
        </div>
        <form onSubmit={handleUploadSubmit} className="upload-form">
          <div className="upload-row">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              value={uploadForm.titulo}
              onChange={(e) => setUploadForm({ ...uploadForm, titulo: e.target.value })}
              required
              placeholder="Título del material"
            />
          </div>

          <div className="upload-row">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={uploadForm.descripcion}
              onChange={(e) => setUploadForm({ ...uploadForm, descripcion: e.target.value })}
              rows="3"
              placeholder="Descripción del material"
            />
          </div>

          <div className="upload-row">
            <label htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              value={uploadForm.categoria}
              onChange={(e) => setUploadForm({ ...uploadForm, categoria: e.target.value })}
              required
            >
              <option value="EJERCICIOS">Ejercicios</option>
              <option value="GUIAS">Guías</option>
              <option value="ACTIVIDADES">Actividades</option>
              <option value="INFORMACION">Información</option>
              <option value="EVALUACIONES">Evaluaciones</option>
              <option value="OTROS">Otros</option>
            </select>
          </div>

          <div className="upload-row checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={uploadForm.visiblePublico}
                onChange={(e) => setUploadForm({ ...uploadForm, visiblePublico: e.target.checked })}
              />
              Visible para el público
            </label>
          </div>

          <div className="upload-row">
            <label htmlFor="file-upload">Archivo *</label>
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
              required
            />
            <small>PDF, Word, Excel, imágenes (máx. 10MB)</small>
          </div>

          <button type="submit" className="btn btn-primary">
            Subir material
          </button>
        </form>
      </section>
    </div>
  )
}

export default AdminPanel

