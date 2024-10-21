import '../styles/main.css';
import BankAccountCard from '../components/BankAccountCard';
import accountUser from '../data/accountUser.json';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../components/EditUser';
import { fetchUserProfile } from '../Service/api-clients';
import { useNavigate } from "react-router-dom";
import { updateUsername } from '../redux/actions/profile.actions';

const Profile = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [,setUserName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      fetchUserProfile(token)
        .then((data) => {
          if (data && data.body) {
            setFirstName(data.body.firstName);
            setLastName(data.body.lastName);
            dispatch(updateUsername(data.body.userName));
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Erreur lors du chargement du profil.');
        });
    } else {
      setError("Token manquant, veuillez vous reconnecter");
      navigate('/');
    }
  }, [token, navigate, dispatch]);

  const handleUsernameChange = (newUserName) => {
    setUserName(newUserName); 
  };

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br /> {firstName} {lastName}!</h1>
          <User onUsernameChange={handleUsernameChange} />
        </div>
        {accountUser.map((data) => (
          <BankAccountCard
            key={data.id}
            tittle={data.tittle}
            amount={data.amount}
            description={data.description}
          />
        ))}
      </main>

  ;
}

export default Profile;