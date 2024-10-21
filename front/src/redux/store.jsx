import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth.reducer.jsx';
import { profileReducer } from './reducers/profile.reducer.jsx';

// Combinaison des réducteurs en un réducteur racine
const rootReducer = combineReducers({
   auth: authReducer, // Réducteur d'authentification
   user: profileReducer, // Réducteur d'utilisateur
})

// Configuration du magasin Redux
const store = configureStore({
    reducer: rootReducer, // Réducteur racine
    devTools: true // Activation des outils de développement Redux
})


export default store;
