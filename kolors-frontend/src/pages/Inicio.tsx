import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ciudad from '../components/Ciudad'

const ciudades = [
  'Coatzacoalcos',
  'Veracruz',
  'Xalapa',
  'Córdoba',
  'Poza Rica',
  'Puebla',
  'Ciudad de México',
]

export default function Inicio() {
  const navigate = useNavigate()
  const [origen, setOrigen] = useState('Coatzacoalcos')
  const [destino, setDestino] = useState('Ciudad de México')
  const [fecha, setFecha] = useState('')
  const [pasajeros, setPasajeros] = useState(1)

  function buscar() {
    if (origen === destino) {
      alert('El origen y el destino no pueden ser iguales')
      return
    }
    navigate('/resultados', { state: { origen, destino, fecha, pasajeros } })
  }

  return (
    <main>
      <div className="hero">
        <h1>Reinventando la forma de viajar en autobús</h1>

        <div className="buscador-borde">
          <div className="buscador-campos">
            <div className="campo">
              <label>Origen</label>
              <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
                {ciudades.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label>Destino</label>
              <select value={destino} onChange={(e) => setDestino(e.target.value)}>
                {ciudades.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label>Salida</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>

            <div className="campo">
              <label>Pasajeros</label>
              <input
                type="number"
                min={1}
                max={4}
                value={pasajeros}
                onChange={(e) => setPasajeros(Number(e.target.value))}
              />
            </div>

            <button className="btn-buscar" onClick={buscar}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      <Ciudad />
    </main>
  )
}