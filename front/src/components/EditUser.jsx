import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../redux/actions/profile.actions.js';
import { isValidName } from "../utils/regex.jsx";
import '../styles/edite.css';
import { handleSubmitUsername } from '../Service/api-clients.js';

function User ({onUsernameChange}) { // Ajout de la prop onUsernameChange
    const userData = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.auth.token); // Assurez-vous de récupérer le token ici
    const [display, setDisplay] = useState(true);
    const [userName, setUserName] = useState(userData?.username || ''); // Initialiser avec le nom d'utilisateur actuel
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleSave = async (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page

        if (!isValidName(userName)) {
            setErrorMessage("Nom d'utilisateur invalide");
            return;
        }

        try {
            const updatedUser = await handleSubmitUsername(userName, token); // Utiliser le bon nom et token
            
            if (updatedUser && updatedUser.userName) {
                dispatch(updateUsername(updatedUser.userName)); // Mettre à jour dans le store Redux
                setDisplay(true); // Revenir à l'affichage initial après la sauvegarde
                if (onUsernameChange) {
                    onUsernameChange(updatedUser.userName); // Notifie le parent du changement
                }
            } else {
                setErrorMessage("Erreur lors de la mise à jour du nom d'utilisateur");
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            setErrorMessage("Erreur lors de la mise à jour du profil");
        }
    };

    return (
        <div className="header">
            { display ? 
                <div>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                value={userName} // Utiliser la valeur contrôlée
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">First name:</label>
                            <input
                                type="text"
                                id="firstname" 
                                value={userData.firstname}
                                disabled={true}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Last name:</label>
                            <input
                                type="text"
                                id="lastname" 
                                value={userData.lastname}
                                disabled={true}
                            />
                        </div>
                        <div className="buttons">
                            <button className="edit-username-button" onClick={handleSave}>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default User;