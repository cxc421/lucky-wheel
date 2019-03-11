import React, { useState } from 'react';
import handSvg from '../assets/hand.svg';
import styles from './PieHand.module.css';

const PieHand = () => {
  const [buttonStyle, setButtonStyle] = useState({});
  const [degree, setDegree] = useState(0);
  const handStyle = {
    transform: `translate(-50%, -50%) rotate(${degree}deg)`
  };

  function setHoverStyle() {
    setButtonStyle({
      background: '#343BAA'
    });
  }

  function clearHoverStyle() {
    setButtonStyle({});
  }

  function rotate() {
    setDegree(degree + Math.round(Math.random() * 360) + 1440);
  }

  return (
    <div className={styles.wrapper} style={handStyle}>
      <img className={styles.handImg} src={handSvg} alt="hand-svg" />
      <div className={styles.button} style={buttonStyle}>
        press
      </div>
      <div
        className={styles.buttonMask}
        onMouseEnter={setHoverStyle}
        onMouseLeave={clearHoverStyle}
        onClick={rotate}
      />
    </div>
  );
};

export default PieHand;
