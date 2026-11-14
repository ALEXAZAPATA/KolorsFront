import { useState } from 'react'
import type { Viaje } from '../data/viajes'
import { formatoHora, formatoDuracion, sumarMinutos } from '../data/viajes'

type Props = {
  viaje: Viaje
  origen: string
  destino: string
  onElegir: () => void
}

const nombresParadas = ['Puebla · Terminal CAP', 'CDMX · Santa Martha', 'CDMX · Oceanía']

export default function TarjetaViaje({ viaje, origen, destino, onElegir }: Props) {
  const [abierto, setAbierto] = useState(false)
  const llegada = sumarMinutos(viaje.salida, viaje.minutos)
  const esLocal = viaje.tipo === 'Local'

  return (
    <div className="tarjeta">
      <div className="tarjeta-top">
        <span className={esLocal ? 'etiqueta local' : 'etiqueta depaso'}>{viaje.tipo}</span>
        {viaje.pocosLugares && <span className="pocos">Quedan pocos lugares</span>}
      </div>

      <div className="tarjeta-main">
        <div className="hora-bloque">
          <div className="hora">{formatoHora(viaje.salida)}</div>
          <div className="ciudad-chica">{origen}</div>
        </div>

        <div className="trayecto">
          <span className="punto-ruta"></span>
          <span className="linea-ruta"></span>
          <div className="bus-icono">
            🚌
            <small>{formatoDuracion(viaje.minutos)}</small>
          </div>
          <span className="linea-ruta"></span>
          <span className="punto-ruta"></span>
        </div>

        <div className="hora-bloque">
          <div className="hora">{formatoHora(llegada)}</div>
          <div className="ciudad-chica">{destino}</div>
        </div>

        <div className="tipo-viaje">
          <small>Tipo de viaje</small>
          <b>{viaje.paradas === 0 ? 'Directo' : `${viaje.paradas} paradas`}</b>
        </div>

        <div className="precio-bloque">
          <small>Desde</small>
          <div className="precio">
            ${viaje.precio} <span>MXN</span>
          </div>
        </div>

        <button className="btn-elegir" onClick={onElegir}>
          Elegir ›
        </button>
      </div>

      <button className="ver-detalles" onClick={() => setAbierto(!abierto)}>
        Ver detalles y paradas {abierto ? '˄' : '˅'}
      </button>

      {abierto && (
        <div className="detalles">
          <p>
            Sale de <b>{origen}</b> a las {formatoHora(viaje.salida)}
          </p>
          {viaje.paradas === 0 && <p>Sin paradas intermedias.</p>}
          {nombresParadas.slice(0, viaje.paradas).map((p) => (
            <p key={p}>• {p}</p>
          ))}
          <p>
            Llega a <b>{destino}</b> a las {formatoHora(llegada)}
          </p>
        </div>
      )}
    </div>
  )
}