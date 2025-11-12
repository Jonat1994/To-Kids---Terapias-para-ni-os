import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { citaService, pacienteService, horarioService } from '../services/api'
import './AgendarCita.css'

function AgendarCita() {
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1) // Paso del formulario
  const [pacientes, setPacientes] = useState([])
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Datos del paciente (si es nuevo)
    nombrePaciente: '',
    apellidosPaciente: '',
    fechaNacimiento: '',
    nombreTutor: '',
    telefonoTutor: '',
    emailConfirmacion: '',
    
    // Datos de la cita
    pacienteId: '',
    fechaHora: '',
    motivo: '',
    duracionMinutos: 60,
    observaciones: ''
  })

  const [esNuevoPaciente, setEsNuevoPaciente] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const pacientesData = await pacienteService.getAll()
      setPacientes(pacientesData)
      
      const horariosData = await horarioService.getDisponibles()
      setHorarios(horariosData)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      let pacienteId = formData.pacienteId

      // Si es nuevo paciente, crear primero el paciente
      if (esNuevoPaciente) {
        const nuevoPaciente = await pacienteService.create({
          nombre: formData.nombrePaciente,
          apellidos: formData.apellidosPaciente,
          fechaNacimiento: formData.fechaNacimiento,
          nombreTutor: formData.nombreTutor,
          telefonoTutor: formData.telefonoTutor,
          email: formData.emailConfirmacion
        })
        pacienteId = nuevoPaciente.id
      }

      // Crear la cita
      const cita = {
        paciente: { id: pacienteId },
        fechaHora: formData.fechaHora,
        duracionMinutos: parseInt(formData.duracionMinutos),
        motivo: formData.motivo,
        observaciones: formData.observaciones,
        emailConfirmacion: formData.emailConfirmacion,
        estado: 'PENDIENTE'
      }

      await citaService.create(cita)
      
      alert('¡Cita agendada exitosamente! Recibirás un email de confirmación.')
      navigate('/')
    } catch (error) {
      console.error('Error al agendar cita:', error)
      alert('Error al agendar la cita. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === 1 && !esNuevoPaciente && !formData.pacienteId) {
      alert('Por favor selecciona un paciente o marca "Nuevo Paciente"')
      return
    }
    setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  return (
    <div className="agendar-cita-container">
      <div className="agendar-header card">
        <h1>📅 Agendar Cita</h1>
        <p>Completa el formulario para reservar tu cita</p>
        
        <div className="steps-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Paciente</div>
          </div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Fecha y Hora</div>
          </div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Detalles</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="agendar-form card">
        {/* Paso 1: Seleccionar o crear paciente */}
        {step === 1 && (
          <div className="form-step">
            <h2>Información del Paciente</h2>
            
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={esNuevoPaciente}
                  onChange={(e) => setEsNuevoPaciente(e.target.checked)}
                />
                Soy un nuevo paciente
              </label>
            </div>

            {!esNuevoPaciente ? (
              <div className="form-group">
                <label htmlFor="pacienteId">Selecciona el Paciente *</label>
                <select
                  id="pacienteId"
                  name="pacienteId"
                  value={formData.pacienteId}
                  onChange={handleChange}
                  required={!esNuevoPaciente}
                >
                  <option value="">-- Selecciona un paciente --</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nombre} {paciente.apellidos}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombrePaciente">Nombre del Niño/a *</label>
                    <input
                      type="text"
                      id="nombrePaciente"
                      name="nombrePaciente"
                      value={formData.nombrePaciente}
                      onChange={handleChange}
                      required={esNuevoPaciente}
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellidosPaciente">Apellidos *</label>
                    <input
                      type="text"
                      id="apellidosPaciente"
                      name="apellidosPaciente"
                      value={formData.apellidosPaciente}
                      onChange={handleChange}
                      required={esNuevoPaciente}
                      placeholder="Apellidos"
                    />
                  </div>
                </div>

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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombreTutor">Nombre del Tutor/Responsable *</label>
                    <input
                      type="text"
                      id="nombreTutor"
                      name="nombreTutor"
                      value={formData.nombreTutor}
                      onChange={handleChange}
                      required={esNuevoPaciente}
                      placeholder="Nombre del tutor"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefonoTutor">Teléfono del Tutor *</label>
                    <input
                      type="tel"
                      id="telefonoTutor"
                      name="telefonoTutor"
                      value={formData.telefonoTutor}
                      onChange={handleChange}
                      required={esNuevoPaciente}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="emailConfirmacion">Email para Confirmación *</label>
              <input
                type="email"
                id="emailConfirmacion"
                name="emailConfirmacion"
                value={formData.emailConfirmacion}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
              <small>Enviaremos la confirmación a este correo</small>
            </div>

            <div className="form-actions">
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Fecha y hora */}
        {step === 2 && (
          <div className="form-step">
            <h2>Selecciona Fecha y Hora</h2>
            
            <div className="form-group">
              <label htmlFor="fechaHora">Fecha y Hora de la Cita *</label>
              <input
                type="datetime-local"
                id="fechaHora"
                name="fechaHora"
                value={formData.fechaHora}
                onChange={handleChange}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="duracionMinutos">Duración de la Sesión *</label>
              <select
                id="duracionMinutos"
                name="duracionMinutos"
                value={formData.duracionMinutos}
                onChange={handleChange}
                required
              >
                <option value="30">30 minutos</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
                <option value="120">120 minutos</option>
              </select>
            </div>

            <div className="horarios-disponibles">
              <h3>Horarios Sugeridos</h3>
              <p className="info-text">
                Atendemos de lunes a viernes de 8:00 AM a 6:00 PM, 
                y sábados de 9:00 AM a 2:00 PM
              </p>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                ← Anterior
              </button>
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Detalles adicionales */}
        {step === 3 && (
          <div className="form-step">
            <h2>Detalles de la Consulta</h2>
            
            <div className="form-group">
              <label htmlFor="motivo">Motivo de la Consulta *</label>
              <textarea
                id="motivo"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Describe brevemente el motivo de la consulta..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="observaciones">Observaciones Adicionales</label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="3"
                placeholder="Información adicional que consideres importante..."
              />
            </div>

            <div className="resumen-cita">
              <h3>Resumen de tu Cita</h3>
              <div className="resumen-item">
                <strong>Email:</strong> {formData.emailConfirmacion}
              </div>
              <div className="resumen-item">
                <strong>Fecha y Hora:</strong> {formData.fechaHora ? new Date(formData.fechaHora).toLocaleString('es-ES') : 'No seleccionada'}
              </div>
              <div className="resumen-item">
                <strong>Duración:</strong> {formData.duracionMinutos} minutos
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                ← Anterior
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Agendando...' : '✓ Confirmar Cita'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default AgendarCita

