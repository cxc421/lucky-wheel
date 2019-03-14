import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResultBanner.module.css';

const ResultBanner = ({ text, mdIconName, show }) => {
  const style = {
    opacity: show ? 1 : 0
  };

  return (
    <div className={styles.wrapper} style={style}>
      <p className={styles.textLeft}>
        WELL
        <br />
        DONE!
      </p>
      <div className={styles.textRight}>
        <p>YOU GET A FREE...</p>
        <h2>{text}</h2>
      </div>
      <div className={styles.background} />
    </div>
  );
};

ResultBanner.defaultProps = {
  mdIconName: '',
  show: false
};

ResultBanner.propTypes = {
  text: PropTypes.string.isRequired,
  mdIconName: PropTypes.string,
  show: PropTypes.bool
};

export default ResultBanner;
