import React, { useState } from 'react';
import PropTypes from 'prop-types';
import handSvg from '../../../assets/hand.svg';
import styles from './Hand.module.css';

const WheelHand = ({ onRotateStart, onRotateEnd, disabled }) => {
  const [buttonStyle, setButtonStyle] = useState({});
  const [degree, setDegree] = useState(0);
  const [rotating, setRotating] = useState(false);
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
    if (disabled) {
      onRotateEnd(degree % 360);
      return;
    }
    if (!rotating) {
      setDegree(degree + Math.round(Math.random() * 360) + 1440);
      setRotating(true);
      onRotateStart();
    }
  }

  function onTranstionEnd() {
    setRotating(false);
    onRotateEnd(degree % 360);
  }

  return (
    <div
      className={styles.wrapper}
      style={handStyle}
      onTransitionEnd={onTranstionEnd}
    >
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

WheelHand.propTypes = {
  onRotateStart: PropTypes.func,
  onRotateEnd: PropTypes.func,
  disabled: PropTypes.bool
};

WheelHand.defaultProps = {
  onRotateStart: f => f,
  onRotateEnd: f => f,
  disabled: false
};

export default WheelHand;
