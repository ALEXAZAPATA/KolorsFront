import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Resultados from './pages/Resultados'
import Asientos from './pages/Asientos'
import Pasajeros from './pages/Pasajeros'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/asientos" element={<Asientos />} />
        <Route path="/pasajeros" element={<Pasajeros />} />
      </Routes>
    </>
  )
}