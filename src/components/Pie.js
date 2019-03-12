import React from 'react';
import PropTypes from 'prop-types';
import * as MdIcons from 'react-icons/md';

import styles from './Pie.module.css';
import PieStarIcon from './PieStarIcon';

class Pie extends React.Component {
  canvasRef = React.createRef();
  canvas = null;
  ctx = null;
  degToRdg(degree) {
    return (degree * Math.PI) / 180;
  }
  draw() {
    const { canvas, ctx, degToRdg } = this;
    const { startDeg, endDeg, bgColor } = this.props;
    const size = Math.min(canvas.clientHeight, canvas.clientWidth);
    const radius = size / 2;
    canvas.width = size;
    canvas.height = size;
    const halfPieDeg = (endDeg - startDeg) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.translate(radius, radius);
    ctx.rotate(degToRdg(-90));
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, degToRdg(-halfPieDeg), degToRdg(halfPieDeg));
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#1F1172';
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
  componentDidMount() {
    this.canvas = this.canvasRef.current;
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.draw();
    }
  }
  componentDidUpdate() {
    this.draw();
  }
  render() {
    const {
      mdIconName,
      textColor,
      startDeg,
      endDeg,
      total,
      text,
      iconSize
    } = this.props;

    const Icon = MdIcons[mdIconName] || MdIcons['MdCardGiftcard'];

    return (
      <div
        className={styles.pie}
        style={{
          transformOrigin: 'center center',
          transform: `rotate(${startDeg + (endDeg - startDeg) / 2}deg)`,
          color: textColor
        }}
      >
        <canvas className={styles.canvas} ref={this.canvasRef} />
        <div className={styles.centerBlock}>
          <Icon size={iconSize} />
          <div className={styles.text}>
            {text}
            {/* <span>({total})</span> */}
          </div>
          <div>({total})</div>
        </div>
        <div className={styles.starBlock}>
          <PieStarIcon
            width={21}
            height={21}
            offset={3}
            className={styles.star}
          />
          <div className={styles.starCircle} />
        </div>
      </div>
    );
  }
}

Pie.defaultProps = {
  mdIconName: 'MdCardGiftcard',
  textColor: 'black',
  bgColor: 'white',
  total: 0,
  text: '?',
  iconSize: 64
};

Pie.propTypes = {
  mdIconName: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  total: PropTypes.number,
  text: PropTypes.string,
  startDeg: PropTypes.number.isRequired,
  endDeg: PropTypes.number.isRequired,
  iconSize: PropTypes.number
};

export default Pie;
