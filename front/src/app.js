import React from 'react'
import reportWebVitals from './reportWebVitals';
import './styles/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Layout from '../src/layout/Layout.jsx';



function App() {

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </Layout>

    </div>
  )
}
reportWebVitals();
export default App;