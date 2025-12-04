import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { citaService, pacienteService } from '../services/api'
import { useToast } from '../context/ToastContext'
import './AgendarCita.css'

function AgendarCita() {
  const navigate = useNavigate()
  const { success, error: showError } = useToast()
  
  const [step, setStep] = useState(1) // Paso del formulario
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  // Estados para manejo de fecha y hora
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [occupiedTimes, setOccupiedTimes] = useState([])

  const [formData, setFormData] = useState({
    // Datos del paciente (si es nuevo)
    nombrePaciente: '',
    apellidosPaciente: '',
    fechaNacimiento: '',
    nombreTutor: '',
    telefonoTutor: '',
    emailConfirmacion: '',
    
    // Datos de la cita
    fechaHora: '',
    motivo: '',
    duracionMinutos: 60, // Fijo a 60 minutos
    observaciones: ''
  })

  // Sincronizar fecha y hora seleccionadas con formData
  useEffect(() => {
    if (selectedDate && selectedTime) {
      setFormData(prev => ({
        ...prev,
        fechaHora: `${selectedDate}T${selectedTime}`
      }))
    }
  }, [selectedDate, selectedTime])

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validar que solo contenga números y 8 dígitos
  const handlePhoneChange = (e) => {
    const { name, value } = e.target
    // Permitir solo números y limitar a 8 dígitos
    const phoneValue = value.replace(/\D/g, '').slice(0, 8)
    
    setFormData(prev => ({
      ...prev,
      [name]: phoneValue
    }))

    // Limpiar error si existe, o validar longitud si es necesario en tiempo real
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
    if (name === 'telefonoTutor') {
      handlePhoneChange(e)
      return
    }

    // Si es email, validar
    if (name === 'emailConfirmacion') {
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

  // Generar horarios basado en el día de la semana
  const getSlotsForDate = (dateString) => {
    // Crear fecha usando strings para evitar problemas de zona horaria local
    const [year, month, dayStr] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, dayStr);
    const day = date.getDay(); // 0=Dom, 1=Lun...
    
    const slots = [];
    
    if (day === 0) return []; // Domingo cerrado

    let startHour, endHour; // endHour exclusivo para el inicio del último slot
    
    if (day === 6) { // Sábado 8am - 3pm (última cita empieza a las 2pm)
       startHour = 8;
       endHour = 14; 
    } else { // Lunes-Viernes 9am - 5pm (última cita empieza a las 4pm)
       startHour = 9;
       endHour = 16;
    }

    for (let h = startHour; h <= endHour; h++) {
        slots.push(`${h.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }

  const handleDateChange = async (e) => {
    const date = e.target.value
    setSelectedDate(date)
    setSelectedTime('') // Resetear hora al cambiar fecha
    setOccupiedTimes([]) 
    
    if (!date) {
        setAvailableSlots([])
        return
    }

    // Calcular slots estáticos disponibles
    const slots = getSlotsForDate(date)
    setAvailableSlots(slots)

    // Obtener citas ocupadas del backend
    try {
        const start = `${date}T00:00:00`
        const end = `${date}T23:59:59`
        const citas = await citaService.getByRango(start, end)
        
        const occupied = citas.map(c => {
            const d = new Date(c.fechaHora)
            return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
        })
        setOccupiedTimes(occupied)
    } catch (err) {
        console.error("Error al obtener citas ocupadas", err)
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar email si está presente
    if (formData.emailConfirmacion && !validateEmail(formData.emailConfirmacion)) {
      setFieldErrors(prev => ({
        ...prev,
        emailConfirmacion: 'Por favor ingresa un correo electrónico válido'
      }))
      showError('Por favor corrige el correo electrónico')
      return
    }
    
    try {
      setLoading(true)
      
      const nuevoPaciente = await pacienteService.create({
        nombre: formData.nombrePaciente,
        apellidos: formData.apellidosPaciente,
        fechaNacimiento: formData.fechaNacimiento,
        nombreTutor: formData.nombreTutor,
        telefonoTutor: formData.telefonoTutor,
        email: formData.emailConfirmacion
      })

      const cita = {
        paciente: { id: nuevoPaciente.id },
        fechaHora: formData.fechaHora,
        duracionMinutos: 60, // Siempre 60 min
        motivo: formData.motivo,
        observaciones: formData.observaciones,
        emailConfirmacion: formData.emailConfirmacion,
        estado: 'PENDIENTE'
      }

      await citaService.create(cita)
      
      success('¡Cita agendada exitosamente! Recibirás un email de confirmación.')
      setTimeout(() => navigate('/'), 1500)
    } catch (error) {
      console.error('Error al agendar cita:', error)
      showError('Error al agendar la cita. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const validateStep1 = () => {
      const errors = {}
      if (!formData.nombrePaciente.trim()) errors.nombrePaciente = "Campo requerido"
      if (!formData.apellidosPaciente.trim()) errors.apellidosPaciente = "Campo requerido"
      if (!formData.nombreTutor.trim()) errors.nombreTutor = "Campo requerido"
      
      if (!formData.telefonoTutor) {
          errors.telefonoTutor = "Campo requerido"
      } else if (formData.telefonoTutor.length !== 8) {
          errors.telefonoTutor = "El teléfono debe tener 8 dígitos numéricos"
      }
      
      if (!formData.emailConfirmacion) {
          errors.emailConfirmacion = "Campo requerido"
      } else if (!validateEmail(formData.emailConfirmacion)) {
          errors.emailConfirmacion = "Por favor ingresa un correo electrónico válido"
      }
      
      setFieldErrors(errors)
      return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (step === 1) {
        if (!validateStep1()) {
            showError('Por favor completa todos los campos correctamente')
            return
        }
    }
    setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  return (
    <div className="agendar-cita-container">
      <div className="agendar-header card">
        <h1>Agendar Cita</h1>
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
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombrePaciente">Nombre del Niño/a *</label>
                <input
                  type="text"
                  id="nombrePaciente"
                  name="nombrePaciente"
                  value={formData.nombrePaciente}
                  onChange={handleChange}
                  required
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
                  required
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
                  required
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
                  required
                  placeholder="70001111"
                  pattern="[0-9]{8}"
                  maxLength={8}
                  title="Ingresa 8 dígitos numéricos"
                />
                {fieldErrors.telefonoTutor && (
                  <span className="field-error">{fieldErrors.telefonoTutor}</span>
                )}
              </div>
            </div>

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
              {fieldErrors.emailConfirmacion && (
                <span className="field-error">{fieldErrors.emailConfirmacion}</span>
              )}
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
              <label htmlFor="fecha">Fecha de la Cita *</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={selectedDate}
                onChange={handleDateChange}
                required
                min={new Date().toISOString().slice(0, 10)}
                className="date-input"
              />
            </div>

            <div className="horarios-disponibles">
              <h3>Horarios Disponibles ({availableSlots.length})</h3>
              <p className="info-text" style={{marginBottom: '1rem'}}>
                Selecciona un horario para tu cita de 1 hora.
              </p>
              
              {selectedDate ? (
                availableSlots.length > 0 ? (
                  <div className="time-slots-grid">
                    {availableSlots.map(slot => {
                      const isOccupied = occupiedTimes.includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={isOccupied}
                          title={isOccupied ? 'Horario ocupado' : 'Disponible'}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="no-slots-message">
                    No hay horarios disponibles para este día (Domingo cerrado).
                  </div>
                )
              ) : (
                <div className="no-slots-message">
                  Por favor selecciona una fecha primero.
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                ← Anterior
              </button>
              <button 
                type="button" 
                onClick={nextStep} 
                className="btn btn-primary"
                disabled={!selectedDate || !selectedTime}
              >
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
                <strong>Fecha:</strong> {selectedDate}
              </div>
              <div className="resumen-item">
                <strong>Hora:</strong> {selectedTime}
              </div>
              <div className="resumen-item">
                <strong>Duración:</strong> 60 minutos
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