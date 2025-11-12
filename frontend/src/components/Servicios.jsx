import './Servicios.css'

function Servicios() {
  const servicios = [
    {
      id: 1,
      icono: '🗣️',
      titulo: 'Terapia del Lenguaje',
      descripcion: 'Evaluación y tratamiento de trastornos del habla, lenguaje y comunicación en niños.',
      beneficios: ['Mejora en la articulación', 'Desarrollo del vocabulario', 'Comprensión lectora']
    },
    {
      id: 2,
      icono: '🧠',
      titulo: 'Terapia Ocupacional',
      descripcion: 'Ayudamos a los niños a desarrollar habilidades necesarias para las actividades diarias.',
      beneficios: ['Motricidad fina', 'Integración sensorial', 'Autonomía personal']
    },
    {
      id: 3,
      icono: '🏃',
      titulo: 'Fisioterapia Infantil',
      descripcion: 'Tratamiento físico para mejorar el movimiento y la función corporal.',
      beneficios: ['Desarrollo motor', 'Fortalecimiento', 'Coordinación']
    },
    {
      id: 4,
      icono: '👨‍👩‍👧',
      titulo: 'Terapia Familiar',
      descripcion: 'Apoyo integral para toda la familia en el proceso terapéutico del niño.',
      beneficios: ['Comunicación familiar', 'Estrategias de crianza', 'Apoyo emocional']
    },
    {
      id: 5,
      icono: '🎨',
      titulo: 'Terapia de Juego',
      descripcion: 'Utilización del juego como herramienta terapéutica para el desarrollo infantil.',
      beneficios: ['Expresión emocional', 'Habilidades sociales', 'Creatividad']
    },
    {
      id: 6,
      icono: '📚',
      titulo: 'Apoyo Escolar',
      descripcion: 'Refuerzo académico y estrategias de aprendizaje personalizadas.',
      beneficios: ['Técnicas de estudio', 'Concentración', 'Rendimiento académico']
    }
  ]

  return (
    <div className="servicios-container">
      <div className="servicios-header card">
        <h1>⭐ Nuestros Servicios ⭐</h1>
        <p className="servicios-intro">
          Ofrecemos una amplia gama de servicios especializados para el desarrollo integral 
          de los niños, adaptados a las necesidades únicas de cada paciente.
        </p>
      </div>

      <div className="servicios-grid">
        {servicios.map(servicio => (
          <div key={servicio.id} className="servicio-card card">
            <div className="servicio-icono">{servicio.icono}</div>
            <h2>{servicio.titulo}</h2>
            <p className="servicio-descripcion">{servicio.descripcion}</p>
            <div className="servicio-beneficios">
              <h4>Beneficios:</h4>
              <ul>
                {servicio.beneficios.map((beneficio, index) => (
                  <li key={index}>✓ {beneficio}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="servicios-cta card">
        <h2>¿Listo para comenzar?</h2>
        <p>Contáctanos para una evaluación inicial gratuita</p>
        <a href="/agendar-cita" className="btn btn-primary">
          Agendar Cita Ahora
        </a>
      </div>
    </div>
  )
}

export default Servicios

