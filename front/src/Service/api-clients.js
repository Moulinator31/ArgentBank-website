// Définir une constante pour une URL de base

const BASE_URL = 'http://localhost:3001/api/v1';
// Définir une constante pour une URL spécifique
const USER_PROFILE_URL = `${BASE_URL}/user/`;
const USER_LOGIN_URL = `${USER_PROFILE_URL}profile`;

// Fonction pour effectuer la requête de connexion

export async function fetchLogin(type, options) {
    try {
        const response = await fetch(USER_PROFILE_URL + type, options);

        // Convertir la réponse en JSON
        const data = await response.json();
        return data;

    } catch (error) {
    }
}

export async function fetchUserProfile(token) {
    try {
        const response = await fetch(USER_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Utiliser le token passé en paramètre
            },
        });

        // Vérifier si la réponse est ok
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        throw error; // Laisser l'appelant gérer l'erreur
    }
}

export const handleSubmitUsername = async ( userName, token,) => {
    /*if (!isValidName(userName)) {
        setErrorMessage("UserName invalide");
        return;
    } else {
        setErrorMessage("");
    }*/
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ userName }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.body; // Retourner les données utilisateur mises à jour
        } else {
            throw new Error("Erreur lors de la mise à jour du nom d'utilisateur");
        }

    } catch (error) {
        console.error(error);
        throw error; // Relever l'erreur pour la gestion dans le composant
    }
}
