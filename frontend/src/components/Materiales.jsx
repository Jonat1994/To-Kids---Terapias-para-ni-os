import { useState, useEffect } from 'react'
import { materialService } from '../services/api'
import './Materiales.css'

const actividades = [
  {
    id: 'memoria',
    titulo: 'Juego de memoria visual',
    descripcion: 'Parejas de imágenes y sonidos pensados para reforzar la atención sostenida.',
    link: 'https://wordwall.net/es/resource/16914724/juegos-del-jardin-de-infantes/juegos-del-jard%C3%ADn'
  },
  {
    id: 'colores',
    titulo: 'Clasifica colores y formas',
    descripcion: 'Actividad interactiva que combina reconocimiento visual y destreza motora.',
    link: 'https://www.educaenvivo.com/juegos-educativos-online/clasificar-colores/'
  },
  {
    id: 'relajacion',
    titulo: 'Respira con la tortuga',
    descripcion: 'Respiraciones guiadas y visualizaciones antes o después de la terapia.',
    link: 'https://www.doctorhappiness.com/happygames/turtle-breathing/'
  },
  {
    id: 'historias',
    titulo: 'Cuentos interactivos',
    descripcion: 'Historias narradas con pictogramas que fortalecen la comprensión auditiva.',
    link: 'https://logiclike.com/es-mx/start?course=child&utm_source=google&utm_medium=cpc&utm_campaign=esgames&utm_term=juegos%20para%20ni%C3%B1os&campaignid=21853255911&group={groupid}&channel=g&gad_source=1&gad_campaignid=21853255911&gbraid=0AAAAApQMzt-jYvl3_ujRht-4cKeF8uaax&gclid=Cj0KCQiA_8TJBhDNARIsAPX5qxR54Lb_isHjXFW404iQpJ7u2cXAj3RUEcJazB857-T2NLaNFsv5VowaAg8WEALw_wcB'
  }
]

function Materiales() {
  const [materiales, setMateriales] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODOS')

  const categorias = [
    { value: 'TODOS', label: 'Todos', icono: '📚' },
    { value: 'EJERCICIOS', label: 'Ejercicios', icono: '✏️' },
    { value: 'GUIAS', label: 'Guías', icono: '📖' },
    { value: 'ACTIVIDADES', label: 'Actividades', icono: '🎨' },
    { value: 'INFORMACION', label: 'Información', icono: '📋' },
    { value: 'EVALUACIONES', label: 'Evaluaciones', icono: '📊' },
    { value: 'OTROS', label: 'Otros', icono: '📁' }
  ]

  useEffect(() => {
    loadMateriales()
  }, [categoriaFiltro])

  const loadMateriales = async () => {
    try {
      setLoading(true)
      let data
      if (categoriaFiltro === 'TODOS') {
        data = await materialService.getPublicos()
      } else {
        data = await materialService.getByCategoria(categoriaFiltro)
      }
      setMateriales(data)
    } catch (error) {
      console.error('Error al cargar materiales:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDescargar = (id, nombre) => {
    const url = materialService.descargar(id)
    const link = document.createElement('a')
    link.href = url
    link.download = nombre
    link.click()
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="materiales-container">
      <div className="materiales-header card">
        <h1>📚 Materiales Descargables</h1>
        <p>Recursos educativos y terapéuticos para apoyar el desarrollo de tu hijo/a</p>
      </div>

      <div className="categorias-filtro">
        {categorias.map(cat => (
          <button
            key={cat.value}
            className={`categoria-btn ${categoriaFiltro === cat.value ? 'active' : ''}`}
            onClick={() => setCategoriaFiltro(cat.value)}
          >
            <span className="categoria-icono">{cat.icono}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando materiales...</p>
        </div>
      ) : materiales.length === 0 ? (
        <div className="card empty-state">
          <h2>No hay materiales disponibles</h2>
          <p>Pronto agregaremos nuevos recursos</p>
        </div>
      ) : (
        <div className="materiales-grid">
          {materiales.map(material => (
            <div key={material.id} className="material-card card">
              <div className="material-header">
                <div className="material-icono">
                  {material.tipoArchivo?.includes('pdf') ? '📄' : 
                   material.tipoArchivo?.includes('image') ? '🖼️' :
                   material.tipoArchivo?.includes('video') ? '🎥' :
                   material.tipoArchivo?.includes('word') ? '📝' : '📎'}
                </div>
                <div className="material-categoria-badge">
                  {categorias.find(c => c.value === material.categoria)?.label || material.categoria}
                </div>
              </div>

              <h3 className="material-titulo">{material.titulo}</h3>
              
              {material.descripcion && (
                <p className="material-descripcion">{material.descripcion}</p>
              )}

              <div className="material-info">
                <span className="material-tamano">
                  {formatBytes(material.tamanoBytes)}
                </span>
                <span className="material-fecha">
                  {new Date(material.createdAt).toLocaleDateString('es-ES')}
                </span>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleDescargar(material.id, material.nombreArchivo)}
              >
                ⬇️ Descargar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="actividades-section card">
        <div className="actividades-header">
          <div>
            <h2>Actividades interactivas</h2>
            <p>Juegos y cuentos seguros que apoyan la atención, el lenguaje y la regulación.</p>
          </div>
        </div>
        <div className="actividades-grid">
          {actividades.map((actividad) => (
            <article key={actividad.id} className="actividad-card">
              <h3>{actividad.titulo}</h3>
              <p>{actividad.descripcion}</p>
              <a href={actividad.link} target="_blank" rel="noreferrer" className="btn btn-secondary">
                Abrir actividad
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Materiales

