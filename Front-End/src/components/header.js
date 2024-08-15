import '../styles/main.css'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../assets/img/argentBankLogo.png'




function Header() {

    return  <header className='main-nav'>
      <div className='position-header'>
    <Link to="/">
    <img src={logo} alt="Kasa" className="main-nav-logo-image" />
    </Link>

    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav_link" : "nav_link"
        }
      >
        Accueil
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "nav_link" : "nav_link"
        }
      >
        A Propos
      </NavLink>
    </nav>
    </div>
  </header>
;
}


export default Header