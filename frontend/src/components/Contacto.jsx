import './Contacto.css'

function Contacto() {
  return (
    <div className="contacto-container">
      <div className="contacto-header card">
        <h1>📞 Contáctanos</h1>
        <p>Estamos aquí para ayudarte. No dudes en comunicarte con nosotros</p>
      </div>

      <div className="contacto-content">
        <div className="contacto-info card">
          <h2>Información de Contacto</h2>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-details">
              <h3>Dirección</h3>
              <p>Av. Principal #123, Centro</p>
              <p>Ciudad, País</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-details">
              <h3>Teléfonos</h3>
              <p>Principal: (123) 456-7890</p>
              <p>WhatsApp: (123) 456-7891</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-details">
              <h3>Email</h3>
              <p>info@centroterapiainfantil.com</p>
              <p>consultas@centroterapiainfantil.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🕐</div>
            <div className="info-details">
              <h3>Horario de Atención</h3>
              <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 2:00 PM</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        <div className="contacto-form-wrapper card">
          <h2>Envíanos un Mensaje</h2>
          <form className="contacto-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
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
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="(123) 456-7890"
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                required
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
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
          <h2>🎯 Misión</h2>
          <p>
            Proporcionar servicios terapéuticos de excelencia para niños, promoviendo su 
            desarrollo integral y mejorando su calidad de vida a través de intervenciones 
            personalizadas y basadas en evidencia científica.
          </p>
        </div>

        <div className="mv-item">
          <h2>👁️ Visión</h2>
          <p>
            Ser el centro de referencia en terapia infantil, reconocido por nuestra 
            excelencia profesional, compromiso con las familias y contribución al 
            desarrollo de cada niño que confía en nosotros.
          </p>
        </div>

        <div className="mv-item">
          <h2>💝 Valores</h2>
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

