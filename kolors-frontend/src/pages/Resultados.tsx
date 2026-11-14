import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pasos from '../components/Pasos'
import TarjetaViaje from '../components/TarjetaViaje'
import { viajes } from '../data/viajes'

const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const meses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

const rangos = [
  { texto: '00:00 — 06:00', desde: 0, hasta: 6 },
  { texto: '06:00 — 12:00', desde: 6, hasta: 12 },
  { texto: '12:00 — 18:00', desde: 12, hasta: 18 },
  { texto: '18:00 — 00:00', desde: 18, hasta: 24 },
]

export default function Resultados() {
  const navigate = useNavigate()
  const location = useLocation()
  const datos = location.state || {}

  const [origen, setOrigen] = useState(datos.origen || 'Coatzacoalcos')
  const [destino, setDestino] = useState(datos.destino || 'Ciudad de México')
  const pasajeros = datos.pasajeros || 1
  const fecha = datos.fecha ? new Date(datos.fecha + 'T00:00:00') : new Date()

  const [horas, setHoras] = useState([true, true, true, true])
  const [local, setLocal] = useState(true)
  const [dePaso, setDePaso] = useState(true)
  const [precioMax, setPrecioMax] = useState(850)
  const [orden, setOrden] = useState('temprano')

  const diaSemana = dias[fecha.getDay()]
  const mes = meses[fecha.getMonth()]
  const mesCorto = mes.charAt(0).toUpperCase() + mes.slice(1, 3)
  const textoLargo = `${diaSemana}, ${fecha.getDate()} de ${mes}`
  const textoCorto = `${diaSemana.slice(0, 3)}, ${fecha.getDate()} ${mesCorto}`
  const textoPasajeros = `${pasajeros} pasajero${pasajeros > 1 ? 's' : ''}`

  function intercambiar() {
    setOrigen(destino)
    setDestino(origen)
  }

  function cambiarHora(i: number) {
    const copia = [...horas]
    copia[i] = !copia[i]
    setHoras(copia)
  }

  function limpiar() {
    setHoras([true, true, true, true])
    setLocal(true)
    setDePaso(true)
    setPrecioMax(850)
    setOrden('temprano')
  }

  function elegir(id: number) {
    navigate('/asientos', {
     state: { viajeId: id, origen, destino, pasajeros, fecha: textoLargo, fechaCorta: textoCorto },
    })
  }

  const filtrados = viajes
    .filter((v) => {
      const hora = Number(v.salida.split(':')[0])
      const enRango = rangos.some((r, i) => horas[i] && hora >= r.desde && hora < r.hasta)
      const tipoOk = (v.tipo === 'Local' && local) || (v.tipo === 'De paso' && dePaso)
      return enRango && tipoOk && v.precio <= precioMax
    })
    .sort((a, b) => {
      if (orden === 'barato') return a.precio - b.precio
      if (orden === 'rapido') return a.minutos - b.minutos
      return a.salida.localeCompare(b.salida)
    })

  return (
    <div>
      <Pasos actual={1} />

      <div className="busqueda-mini">
        <div className="mini-campo">
          <span className="mini-icono">📍</span>
          <div>
            <small>Origen</small>
            <b>{origen}</b>
          </div>
        </div>
        <button className="mini-swap" onClick={intercambiar}>
          ⇄
        </button>
        <div className="mini-campo">
          <span className="mini-icono">📍</span>
          <div>
            <small>Destino</small>
            <b>{destino}</b>
          </div>
        </div>
        <div className="mini-campo">
          <span className="mini-icono">📅</span>
          <div>
            <small>Salida</small>
            <b>{textoCorto}</b>
          </div>
        </div>
        <div className="mini-campo">
          <span className="mini-icono">📅</span>
          <div>
            <small>Regreso</small>
            <b>Solo ida</b>
          </div>
        </div>
        <div className="mini-campo">
          <span className="mini-icono">👤</span>
          <div>
            <small>Pasajeros</small>
            <b>{pasajeros} Adulto{pasajeros > 1 ? 's' : ''}</b>
          </div>
        </div>
        <button className="btn-buscar mini-buscar" onClick={limpiar}>
          Buscar →
        </button>
      </div>

      <div className="contenido">
        <div className="titulo-viaje">
          <button className="btn-volver" onClick={() => navigate('/')}>
            ←
          </button>
          <div>
            <small className="viaje-ida">Viaje de ida</small>
            <h1>
              {origen} <span className="flecha">→</span> {destino}
            </h1>
          </div>
          <span className="fecha-texto">
            {textoLargo} · {textoPasajeros}
          </span>
        </div>

        <div className="columnas">
          <aside className="filtros">
            <div className="filtros-titulo">
              <span>☰ Filtros</span>
              <button className="link-limpiar" onClick={limpiar}>
                Limpiar
              </button>
            </div>

            <h4>Hora de salida</h4>
            {rangos.map((r, i) => (
              <label key={r.texto} className="check">
                <input type="checkbox" checked={horas[i]} onChange={() => cambiarHora(i)} />
                {r.texto}
              </label>
            ))}

            <h4>Tipo de servicio</h4>
            <label className="check">
              <input type="checkbox" checked={local} onChange={() => setLocal(!local)} />
              Local
            </label>
            <label className="check">
              <input type="checkbox" checked={dePaso} onChange={() => setDePaso(!dePaso)} />
              De paso
            </label>

            <h4>Precio máximo</h4>
            <input
              type="range"
              className="slider"
              min={600}
              max={900}
              step={10}
              value={precioMax}
              onChange={(e) => setPrecioMax(Number(e.target.value))}
            />
            <div className="precio-valor">${precioMax} MXN</div>
          </aside>

          <section className="lista">
            <div className="lista-top">
              <span>
                <b>{filtrados.length}</b> viaje{filtrados.length !== 1 && 's'} encontrado
                {filtrados.length !== 1 && 's'}
              </span>
              <label className="ordenar">
                Ordenar:{' '}
                <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                  <option value="temprano">Más temprano</option>
                  <option value="barato">Más barato</option>
                  <option value="rapido">Más rápido</option>
                </select>
              </label>
            </div>

            {filtrados.length === 0 && (
              <p className="sin-resultados">No hay viajes con esos filtros.</p>
            )}

            {filtrados.map((v) => (
              <TarjetaViaje
                key={v.id}
                viaje={v}
                origen={origen}
                destino={destino}
                onElegir={() => elegir(v.id)}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}