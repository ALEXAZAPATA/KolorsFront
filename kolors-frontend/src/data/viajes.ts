export type Viaje = {
  id: number
  tipo: 'Local' | 'De paso'
  salida: string
  minutos: number
  paradas: number
  precio: number
  pocosLugares: boolean
}

export const viajes: Viaje[] = [
  { id: 1, tipo: 'Local', salida: '23:00', minutos: 525, paradas: 0, precio: 799, pocosLugares: true },
  { id: 2, tipo: 'De paso', salida: '23:45', minutos: 565, paradas: 2, precio: 749, pocosLugares: true },
  { id: 3, tipo: 'Local', salida: '06:30', minutos: 525, paradas: 0, precio: 829, pocosLugares: true },
  { id: 4, tipo: 'Local', salida: '09:00', minutos: 525, paradas: 0, precio: 779, pocosLugares: false },
  { id: 5, tipo: 'De paso', salida: '14:30', minutos: 580, paradas: 3, precio: 699, pocosLugares: false },
  { id: 6, tipo: 'Local', salida: '20:00', minutos: 540, paradas: 0, precio: 849, pocosLugares: false },
]

export function sumarMinutos(hora: string, minutos: number) {
  const partes = hora.split(':').map(Number)
  const total = (partes[0] * 60 + partes[1] + minutos) % 1440
  const hh = String(Math.floor(total / 60)).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

export function formatoHora(hora: string) {
  const partes = hora.split(':').map(Number)
  const sufijo = partes[0] >= 12 ? 'PM' : 'AM'
  const h12 = partes[0] % 12 === 0 ? 12 : partes[0] % 12
  return `${h12}:${String(partes[1]).padStart(2, '0')} ${sufijo}`
}

export function formatoDuracion(minutos: number) {
  return `${Math.floor(minutos / 60)} h ${minutos % 60} min`
}