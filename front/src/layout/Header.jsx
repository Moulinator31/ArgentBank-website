import '../styles/main.css'
import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/img/argentBankLogo-.webp';
import { logout } from '../redux/actions/auth.actions'; // Importer l'action de déconnexion
import { fetchUserProfile } from '../Service/api-clients';
import { updateUsername } from '../redux/actions/profile.actions';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Récupérer l'état de connexion et le token depuis Redux
  const isConnected = useSelector((state) => state.auth.isConnected);
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.user.userData.username) // Accès direct au userName depuis Redux

  // Fonction pour gérer la déconnexion
  const handleSignOut = () => {
    dispatch(logout()); // Déclencher l'action de déconnexion
    navigate('/'); // Rediriger vers la page d'accueil après la déconnexion
  };

  useEffect(() => {
    if (token && isConnected) {
      fetchUserProfile(token)
        .then((data) => {
          if (data && data.body) {
            // Mettre à jour le username dans Redux
            dispatch(updateUsername(data.body.userName));
          }
        })
        .catch((error) => {
          console.error('Erreur lors du chargement du profil:', error);
        });
    }
  }, [token, isConnected, dispatch]); // Ajouter token et isConnected comme dépendances

  return (
    <header>
      <div className='main-nav'>
        <Link to="/">
          <img src={logo} alt="ArgentBank" className="main-nav-logo-image" />
        </Link>

        <nav className="main-nav-item">
          {isConnected && token ? (
            // Si l'utilisateur est connecté, afficher "Sign Out" avec userName
            <NavLink onClick={handleSignOut} className="main-nav-item">
              <span className="username">{userName}</span>
              <i className="fa fa-user-circle"></i>
              Sign Out
            </NavLink>
          ) : (
            // Sinon, afficher "Sign In"
            <NavLink
              to="/Login"
              className={({ isActive }) =>
                isActive ? "main-nav-item" : "main-nav-item"
              }
            >
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
