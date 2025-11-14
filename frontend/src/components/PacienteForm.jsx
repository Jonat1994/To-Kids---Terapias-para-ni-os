import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pacienteService } from '../services/api'
import './PacienteForm.css'

function PacienteForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    diagnostico: '',
    nombreTutor: '',
    telefonoTutor: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    if (isEditMode) {
      loadPaciente()
    }
  }, [id])

  const loadPaciente = async () => {
    try {
      setLoading(true)
      const data = await pacienteService.getById(id)
      setFormData(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar el paciente')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Validar email
  const validateEmail = (email) => {
    if (!email) return true // Email es opcional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validar que solo contenga números (y permitir guiones, espacios, paréntesis para formato)
  const handlePhoneChange = (e) => {
    const { name, value } = e.target
    // Permitir solo números, guiones, espacios, paréntesis y el signo +
    const phoneValue = value.replace(/[^\d\s\-()+]/g, '')
    setFormData(prev => ({
      ...prev,
      [name]: phoneValue
    }))
    // Limpiar error si existe
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Si es un campo de teléfono, usar el handler especial
    if (name === 'telefono' || name === 'telefonoTutor') {
      handlePhoneChange(e)
      return
    }

    // Si es email, validar
    if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      
      if (value && !validateEmail(value)) {
        setFieldErrors(prev => ({
          ...prev,
          [name]: 'Por favor ingresa un correo electrónico válido'
        }))
      } else {
        setFieldErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
      return
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar campos obligatorios
    if (!formData.nombre || !formData.apellidos) {
      alert('Por favor completa los campos obligatorios')
      return
    }

    // Validar email si está presente
    if (formData.email && !validateEmail(formData.email)) {
      setFieldErrors(prev => ({
        ...prev,
        email: 'Por favor ingresa un correo electrónico válido'
      }))
      alert('Por favor corrige el correo electrónico')
      return
    }

    try {
      setLoading(true)
      if (isEditMode) {
        await pacienteService.update(id, formData)
      } else {
        await pacienteService.create(formData)
      }
      navigate('/pacientes')
    } catch (err) {
      setError('Error al guardar el paciente')
      console.error('Error:', err)
      alert('Error al guardar el paciente. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/pacientes')
  }

  if (loading && isEditMode) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando datos del paciente...</p>
      </div>
    )
  }

  return (
    <div className="form-container">
      <div className="card">
        <h1 className="form-title">
          {isEditMode ? '✏️ Editar Paciente' : '➕ Nuevo Paciente'}
        </h1>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Datos Personales</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellidos">Apellidos *</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese los apellidos"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: 555-1234"
                  pattern="[0-9\s\-()+]*"
                />
                {fieldErrors.telefono && (
                  <span className="field-error">{fieldErrors.telefono}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
              />
              {fieldErrors.email && (
                <span className="field-error">{fieldErrors.email}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Información Clínica</h2>
            
            <div className="form-group">
              <label htmlFor="diagnostico">Diagnóstico</label>
              <textarea
                id="diagnostico"
                name="diagnostico"
                value={formData.diagnostico}
                onChange={handleChange}
                rows="4"
                placeholder="Ingrese el diagnóstico o motivo de consulta"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Datos del Tutor</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombreTutor">Nombre del Tutor</label>
                <input
                  type="text"
                  id="nombreTutor"
                  name="nombreTutor"
                  value={formData.nombreTutor}
                  onChange={handleChange}
                  placeholder="Nombre completo del tutor"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefonoTutor">Teléfono del Tutor</label>
                <input
                  type="tel"
                  id="telefonoTutor"
                  name="telefonoTutor"
                  value={formData.telefonoTutor}
                  onChange={handleChange}
                  placeholder="Ej: 555-5678"
                  pattern="[0-9\s\-()+]*"
                />
                {fieldErrors.telefonoTutor && (
                  <span className="field-error">{fieldErrors.telefonoTutor}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Guardar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PacienteForm

