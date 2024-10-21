import '../styles/main.css'
import React from 'react';
import Banner from "../components/Banner"
import FeatureCard from '../components/FeatureCard';
import FeatureItem from '../data/FeatureItem.json';
import iconChat from '../assets/img/icon-chat.webp';
import iconMoney from '../assets/img/icon-money.webp';
import iconSecurity from '../assets/img/icon-security.webp';

function Home() {
  const picturesData = {
    "icon-chat.webp": iconChat,
    "icon-money.webp": iconMoney,
    "icon-security.webp": iconSecurity
  }

  return <main>
    <section className='hero'>
      <Banner />
    </section>
    <section className="features">
      <h2 className="sr-only">Features</h2>


      {FeatureItem.map((data) => (

        <FeatureCard
          key={data.id}
          tittle={data.tittle}
          picture={picturesData[data.picture]}
          descriptionPicture={data.descriptionPicture}
          description={data.description}
        />
      ))},
    </section>
  </main>
    ;
}

export default Home;