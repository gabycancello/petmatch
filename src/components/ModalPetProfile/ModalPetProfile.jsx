import React, { useEffect } from 'react';
import styles from './ModalPetProfile.module.css';

const ModalPetProfile = ({ pet, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!pet) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={stopPropagation}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <div className={styles.imageSlider}>
          {pet.images?.map((src, idx) => (
            <img key={idx} src={src} alt={`${pet.name} ${idx}`} />
          ))}
        </div>

        <div className={styles.content}>
          <h2>{pet.name}</h2>
          <p><strong>Idade:</strong> {pet.age}</p>
          <p><strong>Raça:</strong> {pet.breed}</p>
          <p><strong>Porte:</strong> {pet.size}</p>
          <p className={styles.description}>{pet.description}</p>
          <p><strong>Local:</strong> {pet.location}</p>
          <p><strong>Abrigo:</strong> {pet.shelter}</p>
          <p><strong>Contato:</strong> {pet.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalPetProfile;