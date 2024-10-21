import { LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT } from "../actions/type.actions";

/* Actions d'authentification */

// Action pour la connexion réussie
export const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS, // Type d'action: LOGIN_SUCCESS
        payload: token, // Jeton en tant que charge utile
    }
}

// Action pour une tentative de connexion échouée
export const loginFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error
});

// Action pour la déconnexion
export const logout = () => ({
    type: LOGOUT
});