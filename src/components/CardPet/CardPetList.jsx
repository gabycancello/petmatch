import React from 'react';
import styles from './CardPet.module.css';
import pawFilled from '/assets/icons/paw-filled.jpg';
import pawOutline from '/assets/icons/paw-outline.jpg';

const CardPetList = ({ pet, isFavorite, onToggleFavorite }) => {
  return (
    <div className={styles.card}>
      <img src={pet.image} alt={pet.name} className={styles.image} />
      <div className={styles.info}>
        <h3>{pet.name}</h3>
        <p>{pet.age} anos • {pet.breed}</p>
        <button
          className={styles.favoriteButton}
          onClick={onToggleFavorite}
          aria-label="Favoritar pet"
        >
          <img
           className={isFavorite ? styles.animatedPaw : ''}
           src={isFavorite ? pawFilled : pawOutline}
           alt="ícone de favorito"
          />
        </button>
      </div>
    </div>
  );
};

export default CardPetList;