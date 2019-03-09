import React from 'react';
import PropTypes from 'prop-types';

const PieStarIcon = ({ width, height, offset, className }) => {
  const w = width;
  const h = height;
  const o = offset;
  const p = 1; // padding

  return (
    <svg
      width={w}
      height={h}
      // transform={`rotate(45,${w / 2},${h / 2})`}
      className={className}
      style={{
        transformOrigin: 'center center',
        transform: 'rotate(45deg)'
      }}
    >
      <polygon
        // points="1,1 12,5 23,1 19,12 23,23 12,19 1,23 5,12"
        points={`${p},${p} ${w / 2},${p + o} ${w - p},${p} ${w - p - o},${h /
          2} ${w - p},${h - p} ${w / 2},${h - p - o} ${p},${h - p} ${p +
          o},${h / 2}`}
        style={{ fill: '#FF00BA', stroke: '#1F1172', strokeWidth: 2 }}
      />
    </svg>
  );
};

PieStarIcon.defaultProps = {
  width: 24,
  height: 24,
  offset: 4
};

PieStarIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  offset: PropTypes.number,
  className: PropTypes.string
};

export default PieStarIcon;
