import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
        kolors
      </Link>
      <nav className="nav-links">
        <a href="#">Ubicaciones</a>
        <a href="#">Mis boletos</a>
      </nav>
      <button className="btn-contorno">Espacio Kolors</button>
    </header>
  )
}