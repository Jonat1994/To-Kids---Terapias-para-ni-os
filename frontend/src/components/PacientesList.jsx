import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { pacienteService } from '../services/api'
import './PacientesList.css'

function PacientesList() {
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPacientes()
  }, [])

  const loadPacientes = async () => {
    try {
      setLoading(true)
      const data = await pacienteService.getAll()
      setPacientes(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los pacientes. Asegúrate de que el servidor esté corriendo.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
      try {
        await pacienteService.delete(id)
        loadPacientes() // Recargar la lista
      } catch (err) {
        alert('Error al eliminar el paciente')
        console.error('Error:', err)
      }
    }
  }

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'N/A'
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return `${edad} años`
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando pacientes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card error-card">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button onClick={loadPacientes} className="btn btn-primary">
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="pacientes-container">
      <div className="pacientes-header">
        <h1>Lista de Pacientes</h1>
        <Link to="/nuevo-paciente" className="btn btn-primary">
          ➕ Nuevo Paciente
        </Link>
      </div>

      {pacientes.length === 0 ? (
        <div className="card empty-state">
          <h2>No hay pacientes registrados</h2>
          <p>Comienza agregando tu primer paciente</p>
          <Link to="/nuevo-paciente" className="btn btn-primary">
            Agregar Paciente
          </Link>
        </div>
      ) : (
        <div className="card table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Edad</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Tutor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.id}</td>
                  <td>
                    <strong>{paciente.nombre} {paciente.apellidos}</strong>
                  </td>
                  <td>{calcularEdad(paciente.fechaNacimiento)}</td>
                  <td>{paciente.telefono || 'N/A'}</td>
                  <td>{paciente.email || 'N/A'}</td>
                  <td>{paciente.nombreTutor || 'N/A'}</td>
                  <td className="actions">
                    <Link
                      to={`/editar-paciente/${paciente.id}`}
                      className="btn-icon btn-edit"
                      title="Editar"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(paciente.id)}
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
  )
}

export default PacientesList

