import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../redux/actions/profile.actions.js';
import { isValidName } from "../utils/regex.jsx";
import '../styles/edite.css';
import { handleSubmitUsername } from '../Service/api-clients.js';
import { fetchUserProfile } from '../Service/api-clients';

function User({ onUsernameChange }) {
    const userData = useSelector((state) => state.user.userData);  // Données de l'utilisateur récupérées du store Redux
    const token = useSelector((state) => state.auth.token);
    const [display, setDisplay] = useState(true);
    const [userName, setUserName] = useState('');   
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    // Charger les données utilisateur
    useEffect(() => {
        if (token) {
            fetchUserProfile(token)
                .then((data) => {
                    if (data && data.body) {
                        setFirstName(data.body.firstName);
                        setLastName(data.body.lastName);
                        setUserName(data.body.userName);  // Initialiser UserName avec les données récupérées
                        dispatch(updateUsername(data.body.userName)); // Mettre à jour dans le store Redux
                    }
                })
                .catch((err) => {
                    console.error("Erreur lors du chargement du profil:", err);
                    setErrorMessage('Erreur lors du chargement du profil.');
                });
        }
    }, [token, dispatch]);

    const handleSave = async (event) => {
        event.preventDefault();

        if (!isValidName(userName)) {
            setErrorMessage("Nom d'utilisateur invalide");
            return;
        }

        try {
            const updatedUser = await handleSubmitUsername(userName, token);
            
            if (updatedUser && updatedUser.userName) {
                dispatch(updateUsername(updatedUser.userName));
                setDisplay(true);  // Revenir à l'affichage initial après la sauvegarde
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
            {display ? (
                <div>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
            ) : (
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                value={userName}  // Rempli avec la donnée récupérée
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">First name:</label>
                            <input
                                type="text"
                                id="firstname"
                                value={firstName} // Rempli avec la donnée récupérée
                                disabled={true}   // Désactivé pour ne pas être modifiable
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Last name:</label>
                            <input
                                type="text"
                                id="lastname"
                                value={lastName}  // Rempli avec la donnée récupérée
                                disabled={true}   // Désactivé pour ne pas être modifiable
                            />
                        </div>
                        <div className="buttons">
                            <button className="edit-username-button" onClick={handleSave}>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default User;
