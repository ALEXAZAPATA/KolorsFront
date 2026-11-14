import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pasos from '../components/Pasos'
import { viajes, formatoHora, sumarMinutos } from '../data/viajes'

const ocupados = [2, 5, 9, 14, 18, 23, 27, 32]
const filas = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export default function Asientos() {
  const navigate = useNavigate()
  const location = useLocation()
  const datos = location.state || {}

  const origen = datos.origen || 'Coatzacoalcos'
  const destino = datos.destino || 'Ciudad de México'
  const pasajeros = datos.pasajeros || 1
  const fechaCorta = datos.fechaCorta || ''
  const viaje = viajes.find((v) => v.id === datos.viajeId) || viajes[0]
  const llegada = sumarMinutos(viaje.salida, viaje.minutos)
  const total = viaje.precio * pasajeros

  const [seleccionados, setSeleccionados] = useState<number[]>([])
  const [segundos, setSegundos] = useState(600)

  const hayAsientos = seleccionados.length > 0
  const expirado = segundos <= 0

  useEffect(() => {
    if (!hayAsientos || expirado) return
    const reloj = setInterval(() => {
      setSegundos((s) => s - 1)
    }, 1000)
    return () => clearInterval(reloj)
  }, [hayAsientos, expirado])

  const restante = Math.max(segundos, 0)
  const minutosTexto = String(Math.floor(restante / 60)).padStart(2, '0')
  const segundosTexto = String(restante % 60).padStart(2, '0')
  const textoTiempo = `${minutosTexto}:${segundosTexto} min`

  function elegirAsiento(n: number) {
    if (expirado || ocupados.includes(n)) return

    if (seleccionados.includes(n)) {
      const resto = seleccionados.filter((s) => s !== n)
      setSeleccionados(resto)
      if (resto.length === 0) setSegundos(600)
      return
    }

    if (seleccionados.length === 0) setSegundos(600)

    if (seleccionados.length >= pasajeros) {
      setSeleccionados([...seleccionados.slice(1), n])
    } else {
      setSeleccionados([...seleccionados, n])
    }
  }

  function reiniciar() {
    setSeleccionados([])
    setSegundos(600)
  }

  function continuar() {
    navigate('/pasajeros', { state: { ...datos, seleccionados, total } })
  }

  function boton(n: number) {
    const esOcupado = ocupados.includes(n)
    const esSeleccionado = seleccionados.includes(n)
    let clase = 'asiento'
    if (esOcupado) clase += ' ocupado'
    if (esSeleccionado) clase += ' sel'
    return (
      <button
        key={n}
        className={clase}
        disabled={esOcupado || expirado}
        onClick={() => elegirAsiento(n)}
      >
        {n}
      </button>
    )
  }

  const asientosTexto = [...seleccionados].sort((a, b) => a - b).join(', ')

  return (
    <div>
      <Pasos actual={2} />

      <div className="contenido">
        <div className="titulo-viaje">
          <button className="btn-volver" onClick={() => navigate(-1)}>
            ←
          </button>
          <div>
            <small className="viaje-ida">
              {origen} → {destino}
            </small>
            <h1>Elige tu asiento</h1>
          </div>
          <div className="chip-tiempo">
            <span className="chip-icono">⏱</span>
            <div>
              <small>Tiempo restante</small>
              <b>{textoTiempo}</b>
            </div>
          </div>
        </div>

        <div className="columnas">
          <section className="col-asientos">
            <div className="leyenda">
              <span>
                <i className="cuadro libre"></i> Libre
              </span>
              <span>
                <i className="cuadro sel"></i> Seleccionado
              </span>
              <span>
                <i className="cuadro ocu"></i> Ocupado
              </span>
            </div>

            {expirado && (
              <div className="aviso-expiro">
                Se acabó tu tiempo y liberamos tus asientos.
                <button onClick={reiniciar}>Elegir de nuevo</button>
              </div>
            )}

            <div className="bus-forma">
              <div className="bus-frente">
                <span>Frente del autobús</span>
                <span className="volante">×</span>
              </div>
              <div className="linea-punteada"></div>

              {filas.map((f) => (
                <div key={f} className="fila-asientos">
                  <div className="par">
                    {boton(f * 4 + 1)}
                    {boton(f * 4 + 2)}
                  </div>
                  <div className="par">
                    {boton(f * 4 + 3)}
                    {boton(f * 4 + 4)}
                  </div>
                </div>
              ))}

              <div className="linea-punteada abajo"></div>
              <div className="bus-bano">
                <span>Baño</span>
                <span className="wc">WC</span>
              </div>
            </div>
          </section>

          <aside className="col-resumen">
            <h3>Tu viaje</h3>
            <div className="resumen-viaje">
              <small className="resumen-fecha">{fechaCorta}</small>
              <div className="resumen-horas">
                <b>{formatoHora(viaje.salida)}</b>
                <span className="resumen-linea"></span>
                <b>{formatoHora(llegada)}</b>
              </div>
              <div className="resumen-ciudades">
                <small>{origen}</small>
                <small>{destino}</small>
              </div>
            </div>

            <div className="fila-resumen">
              <span>Asiento</span>
              <b>{hayAsientos ? asientosTexto : '—'}</b>
            </div>
            <div className="fila-resumen">
              <span>
                {pasajeros} Adulto{pasajeros > 1 ? 's' : ''}
              </span>
              <b>${total} MXN</b>
            </div>

            <div className="total-resumen">
              <span>Total</span>
              <div className="precio">
                ${total} <span>MXN</span>
              </div>
            </div>

            <button
              className="btn-continuar"
              disabled={seleccionados.length !== pasajeros || expirado}
              onClick={continuar}
            >
              Continuar →
            </button>
            <p className="pago-seguro">Compra protegida y pago seguro</p>
          </aside>
        </div>
      </div>
    </div>
  )
}