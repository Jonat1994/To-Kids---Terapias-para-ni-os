import './Servicios.css'
import terapias from '../data/terapiasData'
import { FALLBACK_THERAPY_IMAGE } from '../constants/imageFallback'

function Servicios() {
  const handleImageError = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = FALLBACK_THERAPY_IMAGE
  }

  return (
    <div className="servicios-container">
      <div className="servicios-header card">
        <h1>⭐ Nuestros Servicios ⭐</h1>
        <p className="servicios-intro">
          Ofrecemos una amplia gama de servicios especializados para el desarrollo integral de los niños,
          adaptados a las necesidades únicas de cada paciente.
        </p>
      </div>

      <div className="servicios-grid">
        {terapias.map((servicio) => (
          <article key={servicio.id} className="servicio-card card">
            <div className="servicio-image">
              <img
                src={servicio.imagen}
                alt={servicio.titulo}
                loading="lazy"
                onError={handleImageError}
              />
            </div>
            <div className="servicio-body">
              <div className="servicio-top-row">
                <span className="servicio-icono">{servicio.icono}</span>
                <h2>{servicio.titulo}</h2>
              </div>
              <p className="servicio-descripcion">{servicio.descripcion}</p>
              <div className="servicio-beneficios">
                <h4>Beneficios:</h4>
                <ul>
                  {servicio.beneficios.map((beneficio) => (
                    <li key={beneficio}>{beneficio}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
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

