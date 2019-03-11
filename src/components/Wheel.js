import React from 'react';
import styles from './Wheel.module.css';
import Pie from './Pie';
import PieHand from './PieHand';

const Wheel = () => {
  const datas = [
    {
      text: 'Movie',
      mdIconName: 'MdMovieFilter'
    },
    {
      text: 'Wish',
      mdIconName: 'MdCake'
    },
    {
      text: 'Anything',
      mdIconName: 'MdStars'
    },
    {
      text: 'Child',
      mdIconName: 'MdChildCare'
    },
    {
      text: 'Flight',
      mdIconName: 'MdFlight'
    },
    {
      text: 'Wifi',
      mdIconName: 'MdWifi'
    }
  ];
  const degree = 360 / datas.length;

  return (
    <div className={styles.circleOutside}>
      <div className={styles.circleInside}>
        <PieHand />
        {datas.map(({ text, mdIconName }, idx) => {
          const bgColor = idx % 2 === 0 ? '#F0BEFF' : '#343BAA';
          const textColor = idx % 2 === 1 ? '#F0BEFF' : '#343BAA';
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

export default Wheel;
