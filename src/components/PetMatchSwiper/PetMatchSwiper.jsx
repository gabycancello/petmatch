import React, { useContext, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import styles from './PetMatchSwiper.module.css';
import { FavoritesContext } from '../../context/FavoritesContext';
import ModalPetProfile from '../ModalPetProfile/ModalPetProfile';
import pawFilled from '/assets/icons/paw-filled.jpg';
import pawOutline from '/assets/icons/paw-outline.jpg';

const likePhrases = [
  'Tem meu coração!', 'Match peludinho!', 'Quero pra ontem!', 'Amor à primeira lambida!',
  'Fofura aprovada!', 'Tô apaixonada(o)!', 'Vem comigo, nenê!', 'Awnnn, sim!', 'Meu novo parceiro!',
  'Match no meu coração!', 'Te escolho, sempre!', 'Alma pet-gêmea?', 'Vem ser meu!',
  'É você!', 'É ele(a)!', 'Me adota, pet!', 'Tá na minha!', 'Conexão real!',
  'Coração bateu forte!', 'Imaginei a gente junto!'
];

const nopePhrases = [
  'Próximo fofuxo!', 'Ainda não...', 'A busca continua!', 'Próximo match!',
  'Não rolou.', 'Tchauzinho!', 'Outros?', 'Quase...',
  'Amigos?', 'Sigo procurando!', 'Fofura demais, mas...',
  'Não senti o clique!', 'Fofo, mas passo!', 'Tem outros esperando',
  'Obrigada, próximo!', 'Coração indeciso...', 'Não dessa vez',
  'A fila anda... de patas!', 'Deslizo pro lado!', 'Hoje não, bebê!'
];

const PetMatchSwiper = ({ pets }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const [currentIndex, setCurrentIndex] = useState(pets.length - 1);
  const [lastDirection, setLastDirection] = useState(null);
  const [likePhraseIndex, setLikePhraseIndex] = useState(0);
  const [nopePhraseIndex, setNopePhraseIndex] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);

  const swipe = (direction) => {
    setLastDirection(direction);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    if (direction === 'direita') {
      setLikePhraseIndex((prev) => (prev + 1) % likePhrases.length);
    } else {
      setNopePhraseIndex((prev) => (prev + 1) % nopePhrases.length);
    }
  };

  const openModal = (pet) => setSelectedPet(pet);
  const closeModal = () => setSelectedPet(null);

  return (
    <div className={styles.matchContainer}>
      <h2 className={styles.title}>Um deslize e... PETMATCH!</h2>

      <p className={styles.swipeHint}>
        Arraste para a direita se seu coração der um pulinho ou para a esquerda se não sentiu conexão.
      </p>

      <div className={styles.cardContainer}>
        <AnimatePresence>
          {pets.map((pet, index) => {
            if (index < currentIndex - 2 || index > currentIndex) return null;
            const isTop = index === currentIndex;
            const stackOffset = currentIndex - index;

            return (
              <motion.div
                key={pet.id}
                className={styles.cardWrapper}
                style={{
                  zIndex: index,
                  transform: `scale(${1 - stackOffset * 0.05}) translateY(${stackOffset * 10}px)`
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isTop ? (
                  <SwipeableCard
                    pet={pet}
                    onSwipe={swipe}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                    onImageClick={() => openModal(pet)}
                    likePhraseIndex={likePhraseIndex}
                    nopePhraseIndex={nopePhraseIndex}
                  />
                ) : (
                  <div className={styles.card}>
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className={styles.image}
                      onClick={() => openModal(pet)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className={styles.info}>
                      <h3>{pet.name}</h3>
                      <p>{pet.age} anos • {pet.breed} • {pet.size}</p>
                      <p className={styles.location}>{pet.location}</p>
                      <p>{pet.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {selectedPet && (
        <ModalPetProfile pet={selectedPet} onClose={closeModal} />
      )}
    </div>
  );
};

const SwipeableCard = ({
  pet,
  onSwipe,
  isFavorite,
  toggleFavorite,
  onImageClick,
  likePhraseIndex,
  nopePhraseIndex
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacityLike = useTransform(x, [0, 100], [0, 1]);
  const opacityNope = useTransform(x, [-100, 0], [1, 0]);

  return (
    <motion.div
      className={styles.swipe}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 100) onSwipe('direita');
        else if (info.offset.x < -100) onSwipe('esquerda');
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0, x: 1000 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div className={styles.likeBadge} style={{ opacity: opacityLike }}>
        LIKE
      </motion.div>
      <motion.div className={styles.nopeBadge} style={{ opacity: opacityNope }}>
        NOPE
      </motion.div>

      <div className={styles.card}>
        <img
          src={pet.image}
          alt={pet.name}
          className={styles.image}
          onClick={onImageClick}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.info}>
          <h3>{pet.name}</h3>
          <p>{pet.age} anos • {pet.breed} • {pet.size}</p>
          <p className={styles.location}>{pet.location}</p>
          <p>{pet.description}</p>
        </div>

        <div className={styles.buttonContainer}>
          <span className={styles.buttonText}>{nopePhrases[nopePhraseIndex]}</span>
          <span className={styles.buttonText}>{likePhrases[likePhraseIndex]}</span>
        </div>

        <button
          className={styles.favoriteButton}
          onClick={() => toggleFavorite(pet.id)}
          aria-label="Favoritar pet"
        >
          <img
            src={isFavorite(pet.id) ? pawFilled : pawOutline}
            alt="ícone de favorito"
          />
        </button>
      </div>

      {/* BOTÕES DE AÇÃO NOS CANTOS */}
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionButton} ${styles.nopeAction}`}
          onClick={(e) => {
            e.stopPropagation();
            onSwipe('esquerda');
          }}
          aria-label="Pular pet"
        >
          <img src="/assets/icons/nope-icon.png" alt="Ícone de pular" />
        </button>
        <button
          className={`${styles.actionButton} ${styles.likeAction}`}
          onClick={(e) => {
            e.stopPropagation();
            onSwipe('direita');
          }}
          aria-label="Dar match com pet"
        >
          <img src="/assets/icons/like-icon.png" alt="Ícone de like" />
        </button>
      </div>
    </motion.div>
  );
};

export default PetMatchSwiper;
