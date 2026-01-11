import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import './Contacto.css'

function Contacto() {
  const { success, error: showError } = useToast()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  })
  const [fieldErrors, setFieldErrors] = useState({})

  // Validar email
  const validateEmail = (email) => {
    if (!email) return true // Email es opcional si no es requerido
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
    if (name === 'telefono') {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar email si está presente
    if (formData.email && !validateEmail(formData.email)) {
      setFieldErrors(prev => ({
        ...prev,
        email: 'Por favor ingresa un correo electrónico válido'
      }))
      showError('Por favor corrige el correo electrónico')
      return
    }

    // Aquí puedes agregar la lógica para enviar el formulario
    success('Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.')
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    })
  }

  return (
    <div className="contacto-container">
      <div className="contacto-header card">
        <h1>Contáctanos</h1>
        <p>Estamos aquí para ayudarte. No dudes en comunicarte con nosotros</p>
      </div>

      <div className="contacto-content">
        <div className="contacto-info card">
          <h2>Información de Contacto</h2>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-details">
              <h3>Dirección</h3>
              <p>Diagonal 2 Luis E Vasquez No 224, San Salvador.</p>
              <p>Local # 303</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-details">
              <h3>Teléfonos</h3>
              <p>Principal: 7062-9993</p>
              <p>WhatsApp: 7062-9993</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-details">
              <h3>Email</h3>
              <p>contacto.tokids@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🕐</div>
            <div className="info-details">
              <h3>Horario de Atención</h3>
              <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
              <p>Sábados: 8:00 AM - 3:00 PM</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        <div className="contacto-form-wrapper card">
          <h2>Envíanos un Mensaje</h2>
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
              {fieldErrors.email && (
                <span className="field-error">{fieldErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                pattern="[0-9\s\-()+]*"
              />
              {fieldErrors.telefono && (
                <span className="field-error">{fieldErrors.telefono}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>

      <div className="mision-vision card">
        <div className="mv-item">
          <h2> Misión</h2>
          <p>
            Proporcionar servicios terapéuticos de excelencia para niños, promoviendo su 
            desarrollo integral y mejorando su calidad de vida a través de intervenciones 
            personalizadas y basadas en evidencia científica.
          </p>
        </div>

        <div className="mv-item">
          <h2> Visión</h2>
          <p>
            Ser el centro de referencia en terapia infantil, reconocido por nuestra 
            excelencia profesional, compromiso con las familias y contribución al 
            desarrollo de cada niño que confía en nosotros.
          </p>
        </div>

        <div className="mv-item">
          <h2> Valores</h2>
          <ul>
            <li>✓ Compromiso con la excelencia</li>
            <li>✓ Empatía y respeto</li>
            <li>✓ Trabajo en equipo</li>
            <li>✓ Actualización constante</li>
            <li>✓ Enfoque en la familia</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Contacto

