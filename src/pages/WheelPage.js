import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';

import styles from './WheelPage.module.css';
import Wheel from '../components/Wheel';
import ResultBanner from '../components/ResultBanner';

class WheelPage extends Component {
  state = {
    resultText: '',
    isShowResult: false
  };

  onPressStart = () => {
    this.setState({ isShowResult: false, resultText: '' });

    const { prizes, setPrizes } = this.props;
    setPrizes(prizes.filter(prize => prize.total > 0));
  };

  onPressEnd = ({ text }) => {
    this.setState({ isShowResult: true, resultText: text });

    const { prizes, setPrizes } = this.props;
    setPrizes(
      produce(prizes, draftPrizes => {
        const targetPrize = draftPrizes.find(prize => prize.text === text);
        if (targetPrize && targetPrize.total > 0) {
          targetPrize.total--;
        }
      })
    );
  };

  render() {
    const { prizes } = this.props;
    const { resultText, isShowResult } = this.state;

    return (
      <div className={styles.page}>
        <ResultBanner text={resultText} show={isShowResult} />
        <Wheel
          prizes={prizes}
          resultText={resultText}
          onPressStart={this.onPressStart}
          onPressEnd={this.onPressEnd}
        />
      </div>
    );
  }
}

WheelPage.propTypes = {
  prizes: PropTypes.array.isRequired,
  setPrizes: PropTypes.func.isRequired
};

export default WheelPage;
