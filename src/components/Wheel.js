import React from 'react';
import PropTypes from 'prop-types';
import styles from './Wheel.module.css';
import Pie from './Pie';
import WheelHand from './WheelHand';

const Wheel = ({ prizes, onPressStart, onPressEnd }) => {
  const degree = 360 / prizes.length;

  function getColors(idx) {
    if (idx === prizes.length - 1 && prizes.length % 2 === 1) {
      return {
        bgColor: '#5858B9',
        textColor: '#fff'
      };
    }

    if (idx % 2 === 0) {
      return {
        bgColor: '#F0BEFF',
        textColor: '#343BAA'
      };
    } else {
      return {
        bgColor: '#343BAA',
        textColor: '#F0BEFF'
      };
    }
  }

  function onRotateEnd() {
    onPressEnd();
  }

  return (
    <div className={styles.circleOutside}>
      <div className={styles.circleInside}>
        <WheelHand onRotateStart={onPressStart} onRotateEnd={onRotateEnd} />
        {prizes.map(({ text, mdIconName }, idx) => {
          // const bgColor = idx % 2 === 0 ? '#F0BEFF' : '#343BAA';
          // const textColor = idx % 2 === 1 ? '#F0BEFF' : '#343BAA';
          const { bgColor, textColor } = getColors(idx);
          const startDeg = idx * degree - degree / 2;
          const endDeg = startDeg + degree;
          return (
            <Pie
              key={idx}
              text={text}
              startDeg={startDeg}
              endDeg={endDeg}
              bgColor={bgColor}
              textColor={textColor}
              mdIconName={mdIconName}
            />
          );
        })}
      </div>
    </div>
  );
};

Wheel.propTypes = {
  prizes: PropTypes.array.isRequired,
  onPressStart: PropTypes.func.isRequired,
  onPressEnd: PropTypes.func.isRequired
};

export default Wheel;
