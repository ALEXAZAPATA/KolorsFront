const nombres = ['Buscar', 'Asiento', 'Pasajeros', 'Pago', 'Boleto']

export default function Pasos({ actual }: { actual: number }) {
  return (
    <div className="pasos">
      {nombres.map((nombre, i) => (
        <div key={nombre} className="paso-item">
          <span className={i + 1 <= actual ? 'paso-num activo' : 'paso-num'}>
            {i + 1 < actual ? '✓' : i + 1}
          </span>
          <span className={i + 1 <= actual ? 'paso-nombre activo' : 'paso-nombre'}>{nombre}</span>
          {i < nombres.length - 1 && (
            <span className={i + 1 <= actual ? 'paso-linea activa' : 'paso-linea'}></span>
          )}
        </div>
      ))}
    </div>
  )
}