import React from 'react';
import styles from './Home.module.css';
import { petsData } from '../../services/data';
import PetMatchSwiper from '../../components/PetMatchSwiper/PetMatchSwiper';

const Home = () => {
  return (
    <main className={styles.home}>
      <section className={styles.swiperSection}>
        <PetMatchSwiper pets={petsData} />
      </section>
    </main>
  );
};

export default Home;