import React from 'react';
import PropTypes from 'prop-types';
import styles from './Wheel.module.css';
import Pie from './Pie/Pie';
import Hand from './Hand/Hand';

const Wheel = ({
  prizes,
  onPressStart,
  onPressEnd,
  resultText,
  displayText,
  iconSize
}) => {
  const degree = 360 / prizes.length;
  const pieDatas = prizes.map((prize, idx) => {
    const { bgColor, textColor } = getColors(idx, prize.text);
    const startDeg = idx * degree - degree / 2;
    const endDeg = startDeg + degree;
    return {
      ...prize,
      startDeg,
      endDeg,
      bgColor,
      textColor
    };
  });

  function getColors(idx, text) {
    if (text === resultText) {
      return {
        bgColor: '#FF00BA',
        textColor: '#fff'
      };
    }

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

  function findGift(degree) {
    return pieDatas.find(({ startDeg, endDeg }) => {
      if (startDeg > 0) {
        return degree >= startDeg && degree < endDeg;
      }
      return degree >= 360 + startDeg || degree < endDeg;
    });
  }

  function onRotateEnd(degree) {
    const gift = findGift(degree);
    onPressEnd(gift);
  }

  return (
    <div className={styles.circleOutside}>
      <div className={styles.circleInside}>
        <Hand
          onRotateStart={onPressStart}
          onRotateEnd={onRotateEnd}
          disabled={pieDatas.length < 2}
        />
        {pieDatas.map(
          ({
            text,
            mdIconName,
            startDeg,
            endDeg,
            bgColor,
            textColor,
            total,
            id
          }) => {
            return (
              <Pie
                key={id}
                text={displayText ? text : String(id)}
                total={total}
                startDeg={startDeg}
                endDeg={endDeg}
                bgColor={bgColor}
                textColor={textColor}
                mdIconName={mdIconName}
                iconSize={iconSize}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

Wheel.propTypes = {
  prizes: PropTypes.array.isRequired,
  onPressStart: PropTypes.func.isRequired,
  onPressEnd: PropTypes.func.isRequired,
  resultText: PropTypes.string,
  displayText: PropTypes.bool,
  iconSize: PropTypes.number
};

Wheel.defaultProps = {
  resultText: '',
  displayText: true,
  iconSize: 64
};

export default Wheel;
