import React, { useState } from "react";
import '../styles/main.css';
import { fetchLogin } from '../Service/api-clients';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFail } from '../redux/actions/auth.actions';
import InputField from '../components/inputField'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false); // Ajoutez l'état pour le "Remember me"

  // Fonction pour gérer le formulaire de connexion
  async function formLogin(event) {
    event.preventDefault(); // Empêcher le rechargement de la page par défaut du formulaire    

    // Créer un objet utilisateur avec email et mot de passe
    const user = { email, password };

    // Options de la requête fetch
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) // Convertir l'objet utilisateur en chaîne JSON
    };

    try {
      const req = await fetchLogin('login', options); // Effectuer la requête de connexion

      if (req && req.body && req.body.token) { // Vérifier que la réponse contient un token
        // Rediriger vers la page User après une connexion réussie
        dispatch(loginSuccess(req.body.token));
        navigate('/profile');
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect");
        dispatch(loginFail(error));
      }
    } catch (error) {
      console.error('Erreur lors de la tentative de connexion:', error);
      setError("Erreur lors de la tentative de connexion.");
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={formLogin}>
          <InputField
            label="Username"
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Composant InputField pour "Remember me" avec reverseOrder */}
          <InputField
            label="Remember me"
            type="checkbox"
            id="remember-me"
            value={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)} // Utilisez checked pour les checkboxes
            reverseOrder={true} // Inverser l'ordre
            className="input-remember" // Classe spécifique pour le remember me
            noWrapper={true} // Empêche l'ajout de la classe input-wrapper
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit"className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;