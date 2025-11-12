import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { citaService, pacienteService, materialService } from '../services/api'
import './AdminPanel.css'

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('citas')
  const [citas, setCitas] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [materiales, setMateriales] = useState([])
  const [loading, setLoading] = useState(false)

  // Upload de material
  const [uploadForm, setUploadForm] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'EJERCICIOS',
    visiblePublico: true,
    file: null
  })

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'citas') {
        const citasData = await citaService.getAll()
        setCitas(citasData)
      } else if (activeTab === 'pacientes') {
        const pacientesData = await pacienteService.getAll()
        setPacientes(pacientesData)
      } else if (activeTab === 'materiales') {
        const materialesData = await materialService.getAll()
        setMateriales(materialesData)
      }
    } catch (error) {
      console.error('Error al cargar datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCitaEstadoChange = async (id, nuevoEstado) => {
    try {
      const cita = citas.find(c => c.id === id)
      await citaService.update(id, { ...cita, estado: nuevoEstado })
      loadData()
    } catch (error) {
      console.error('Error al actualizar cita:', error)
      alert('Error al actualizar el estado de la cita')
    }
  }

  const handleDeleteCita = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        await citaService.delete(id)
        loadData()
      } catch (error) {
        console.error('Error al eliminar cita:', error)
      }
    }
  }

  const handleDeleteMaterial = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este material?')) {
      try {
        await materialService.delete(id)
        loadData()
      } catch (error) {
        console.error('Error al eliminar material:', error)
      }
    }
  }

  const handleUploadSubmit = async (e) => {
    e.preventDefault()
    
    if (!uploadForm.file) {
      alert('Por favor selecciona un archivo')
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
      alert('Material subido exitosamente')
      setUploadForm({
        titulo: '',
        descripcion: '',
        categoria: 'EJERCICIOS',
        visiblePublico: true,
        file: null
      })
      document.getElementById('file-upload').value = ''
      loadData()
    } catch (error) {
      console.error('Error al subir material:', error)
      alert('Error al subir el material')
    }
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-header card">
        <h1>🔧 Panel Administrativo</h1>
        <p>Gestiona citas, pacientes y materiales</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'citas' ? 'active' : ''}`}
          onClick={() => setActiveTab('citas')}
        >
          📅 Citas
        </button>
        <button
          className={`tab-btn ${activeTab === 'pacientes' ? 'active' : ''}`}
          onClick={() => setActiveTab('pacientes')}
        >
          👶 Pacientes
        </button>
        <button
          className={`tab-btn ${activeTab === 'materiales' ? 'active' : ''}`}
          onClick={() => setActiveTab('materiales')}
        >
          📚 Materiales
        </button>
        <button
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          ⬆️ Subir Material
        </button>
      </div>

      <div className="admin-content card">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando...</p>
          </div>
        ) : (
          <>
            {/* Tab de Citas */}
            {activeTab === 'citas' && (
              <div className="tab-content">
                <h2>Gestión de Citas</h2>
                {citas.length === 0 ? (
                  <p className="empty-message">No hay citas registradas</p>
                ) : (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Paciente</th>
                          <th>Fecha y Hora</th>
                          <th>Duración</th>
                          <th>Estado</th>
                          <th>Motivo</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {citas.map(cita => (
                          <tr key={cita.id}>
                            <td>{cita.id}</td>
                            <td>
                              {cita.paciente?.nombre} {cita.paciente?.apellidos}
                            </td>
                            <td>
                              {new Date(cita.fechaHora).toLocaleString('es-ES')}
                            </td>
                            <td>{cita.duracionMinutos} min</td>
                            <td>
                              <select
                                value={cita.estado}
                                onChange={(e) => handleCitaEstadoChange(cita.id, e.target.value)}
                                className={`estado-select estado-${cita.estado.toLowerCase()}`}
                              >
                                <option value="PENDIENTE">Pendiente</option>
                                <option value="CONFIRMADA">Confirmada</option>
                                <option value="COMPLETADA">Completada</option>
                                <option value="CANCELADA">Cancelada</option>
                                <option value="NO_ASISTIO">No Asistió</option>
                              </select>
                            </td>
                            <td className="motivo-cell">{cita.motivo}</td>
                            <td>
                              <button
                                onClick={() => handleDeleteCita(cita.id)}
                                className="btn-icon btn-delete"
                                title="Eliminar"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab de Pacientes */}
            {activeTab === 'pacientes' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Gestión de Pacientes</h2>
                  <Link to="/nuevo-paciente" className="btn btn-primary">
                    ➕ Nuevo Paciente
                  </Link>
                </div>
                {pacientes.length === 0 ? (
                  <p className="empty-message">No hay pacientes registrados</p>
                ) : (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre Completo</th>
                          <th>Email</th>
                          <th>Teléfono</th>
                          <th>Tutor</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pacientes.map(paciente => (
                          <tr key={paciente.id}>
                            <td>{paciente.id}</td>
                            <td>
                              <strong>
                                {paciente.nombre} {paciente.apellidos}
                              </strong>
                            </td>
                            <td>{paciente.email || 'N/A'}</td>
                            <td>{paciente.telefono || 'N/A'}</td>
                            <td>{paciente.nombreTutor || 'N/A'}</td>
                            <td>
                              <Link
                                to={`/editar-paciente/${paciente.id}`}
                                className="btn-icon btn-edit"
                                title="Editar"
                              >
                                ✏️
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab de Materiales */}
            {activeTab === 'materiales' && (
              <div className="tab-content">
                <h2>Materiales Disponibles</h2>
                {materiales.length === 0 ? (
                  <p className="empty-message">No hay materiales subidos</p>
                ) : (
                  <div className="materiales-admin-list">
                    {materiales.map(material => (
                      <div key={material.id} className="material-admin-item">
                        <div className="material-admin-info">
                          <h3>{material.titulo}</h3>
                          <p>{material.descripcion}</p>
                          <div className="material-admin-meta">
                            <span className="badge">{material.categoria}</span>
                            <span className="badge">
                              {material.visiblePublico ? '👁️ Público' : '🔒 Privado'}
                            </span>
                            <span>{material.nombreArchivo}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteMaterial(material.id)}
                          className="btn-icon btn-delete"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab de Upload */}
            {activeTab === 'upload' && (
              <div className="tab-content">
                <h2>Subir Nuevo Material</h2>
                <form onSubmit={handleUploadSubmit} className="upload-form">
                  <div className="form-group">
                    <label htmlFor="titulo">Título *</label>
                    <input
                      type="text"
                      id="titulo"
                      value={uploadForm.titulo}
                      onChange={(e) => setUploadForm({...uploadForm, titulo: e.target.value})}
                      required
                      placeholder="Título del material"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      id="descripcion"
                      value={uploadForm.descripcion}
                      onChange={(e) => setUploadForm({...uploadForm, descripcion: e.target.value})}
                      rows="3"
                      placeholder="Descripción del material"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="categoria">Categoría *</label>
                    <select
                      id="categoria"
                      value={uploadForm.categoria}
                      onChange={(e) => setUploadForm({...uploadForm, categoria: e.target.value})}
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

                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={uploadForm.visiblePublico}
                        onChange={(e) => setUploadForm({...uploadForm, visiblePublico: e.target.checked})}
                      />
                      Visible para el público
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="file-upload">Archivo *</label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                      required
                    />
                    <small>Formatos soportados: PDF, Word, Excel, Imágenes, etc.</small>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    ⬆️ Subir Material
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminPanel

