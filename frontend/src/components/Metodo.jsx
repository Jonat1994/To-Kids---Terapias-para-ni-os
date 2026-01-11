import './Metodo.css'

function Metodo() {
  const metodoPilares = [
    { titulo: 'Integral', icono: '🎯', desc: 'Abordaje completo del desarrollo infantil' },
    { titulo: 'Integradora', icono: '🔗', desc: 'Conexión entre todas las áreas de trabajo' },
    { titulo: 'Preventiva', icono: '🛡️', desc: 'Prevención de futuras dificultades' },
    { titulo: 'Vivenciada', icono: '✨', desc: 'Aprendizaje a través de la experiencia' },
    { titulo: 'Sistemática', icono: '📋', desc: 'Organización y estructura en el proceso' },
    { titulo: 'Generalizable', icono: '🌍', desc: 'Transferencia de habilidades a otros contextos' },
    { titulo: 'Sostenible', icono: '💪', desc: 'Resultados duraderos en el tiempo' },
    { titulo: 'Adaptable', icono: '🔄', desc: 'Personalización según necesidades individuales' }
  ]

  const pilaresTrabajo = [
    { titulo: 'Equipo Transdisciplinar', icono: '👥', desc: 'Profesionales especializados trabajando juntos' },
    { titulo: 'Certificación ISO 9001', icono: '✅', desc: 'Garantía de calidad en nuestros servicios' },
    { titulo: 'Comunicación Constante', icono: '💬', desc: 'Conexión permanente con familias y educadores' },
    { titulo: 'Seguimiento Individualizado', icono: '📊', desc: 'Monitoreo personalizado de cada terapia' },
    { titulo: 'Terapias Individuales', icono: '👤', desc: 'Atención personalizada para cada niño' },
    { titulo: 'Ambiente Lúdico', icono: '🎨', desc: 'Aprendizaje a través del juego y diversión' },
    { titulo: 'Innovación Constante', icono: '💡', desc: 'Actualización continua de técnicas' },
    { titulo: 'Controles de Calidad', icono: '🔍', desc: 'Auditorías periódicas de nuestro trabajo' },
    { titulo: 'Acompañamiento a Familias', icono: '❤️', desc: 'Apoyo integral a todo el núcleo familiar' }
  ]

  return (
    <div className="metodo-container">
      {/* Header */}
      <div className="metodo-header card">
        <h1> Nuestro Método </h1>
        <p className="metodo-intro">
          Un enfoque integral, transdisciplinar y centrado en el desarrollo evolutivo de cada niño
        </p>
      </div>

      {/* Filosofía */}
      <div className="metodo-section card">
        <h2> Filosofía de Nuestro Método</h2>
        <div className="metodo-content">
          <p>
            Se basa en <strong>centralizar la necesidad específica de cada niño</strong>, siguiendo una metodología de intervención integral y transdisciplinar. Un programa personalizado, creativo y comunicativo con los distintos actores que participan en el avance del niño: su familia, terapeutas, centros educativos y hospitales.
          </p>
          <p>
            Esto permite una <strong>rehabilitación de sus necesidades más efectiva</strong>, evitando la pérdida de la visión global que otros centros pueden ofrecer.
          </p>
          <p>
            <strong>Nuestro método está validado por ISO 9001</strong>, certificando la calidad de nuestro servicio terapéutico.
          </p>
        </div>
      </div>

      {/* Principios Sanitarios y Educativos */}
      <div className="metodo-section card">
        <h2> Nuestros Principios: Sanitarios y Educativos</h2>
        <div className="principios-grid">
          {metodoPilares.map((pilar, index) => (
            <div key={index} className="pilar-card">
              <div className="pilar-icono">{pilar.icono}</div>
              <h3>{pilar.titulo}</h3>
              <p>{pilar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Método de Trabajo */}
      <div className="metodo-section card">
        <h2> Método de Trabajo</h2>
        <p className="metodo-subtitle">
          Basado en 9 pilares fundamentales que garantizan la excelencia en nuestras terapias
        </p>
        <div className="trabajo-grid">
          {pilaresTrabajo.map((pilar, index) => (
            <div key={index} className="trabajo-card">
              <div className="trabajo-icono">{pilar.icono}</div>
              <h3>{pilar.titulo}</h3>
              <p>{pilar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cómo Funciona */}
      <div className="metodo-section card">
        <h2> ¿Cómo Funciona Nuestro Método?</h2>
        <div className="proceso-steps">
          <div className="paso">
            <div className="paso-numero">1</div>
            <h4>Evaluación Integral</h4>
            <p>Análisis completo de las necesidades del niño</p>
          </div>
          <div className="paso-flecha">→</div>
          <div className="paso">
            <div className="paso-numero">2</div>
            <h4>Plan Personalizado</h4>
            <p>Diseño de programa adaptado a cada caso</p>
          </div>
          <div className="paso-flecha">→</div>
          <div className="paso">
            <div className="paso-numero">3</div>
            <h4>Intervención Coordinada</h4>
            <p>Trabajo en equipo transdisciplinar</p>
          </div>
          <div className="paso-flecha">→</div>
          <div className="paso">
            <div className="paso-numero">4</div>
            <h4>Seguimiento y Ajuste</h4>
            <p>Monitoreo continuo y adaptación del plan</p>
          </div>
        </div>
      </div>

      {/* Sobre Nuestros Terapeutas */}
      <div className="metodo-section card">
        <h2>👨‍⚕️ Sobre Nuestros Terapeutas</h2>
        <div className="terapeutas-content">
          <div className="terapeutas-item">
            <h4>🎯 Proceso de Selección</h4>
            <p>Todos nuestros terapeutas superan un proceso de selección de tres niveles, donde el director del centro y la central evalúan la capacidad de cada profesional.</p>
          </div>
          <div className="terapeutas-item">
            <h4>📚 Metodología</h4>
            <p>Nuestros terapeutas deben seguir las pautas metodológicas de nuestro centro. Conocer y amar nuestro método es amar a nuestros niños.</p>
          </div>
          <div className="terapeutas-item">
            <h4>🔄 Formación Continua</h4>
            <p>La formación continuada trimestral permite que desarrollen todas sus capacidades y una visión global de todas las áreas, potenciando su conocimiento terapéutico.</p>
          </div>
          <div className="terapeutas-item">
            <h4>✅ Auditorías de Calidad</h4>
            <p>Realizamos auditorías periódicas que aseguren la correcta calidad del método de trabajo y su implementación, con total confidencialidad.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="metodo-cta card">
        <h3>¿Quieres conocer más sobre nuestro método?</h3>
        <a href="/agendar-cita" className="btn btn-primary">
          📅 Agenda una Evaluación
        </a>
      </div>
    </div>
  )
}

export default Metodo
