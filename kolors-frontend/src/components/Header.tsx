import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-izq">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          kolors<span className="punto">.</span>
        </Link>
        <nav className="nav-links">
          <a href="#">Ubicaciones</a>
          <a href="#">Mis boletos</a>
        </nav>
      </div>
      <div className="header-der">
        <span className="idioma">ES ˅</span>
        <button className="btn-contorno">Espacio Kolors</button>
      </div>
    </header>
  )
}