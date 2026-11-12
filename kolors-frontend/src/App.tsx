import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Resultados from './pages/Resultados'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </>
  )
}