import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';

import styles from './WheelPage.module.css';
import Wheel from '../../components/Wheel/Wheel';
import ResultBanner from '../../components/ResultBanner/ResultBanner';

class WheelPage extends Component {
  state = {
    resultId: null,
    isShowResult: false
  };

  onPressStart = () => {
    const { prizes, setPrizes } = this.props;
    const { resultId } = this.state;

    if (resultId) {
      setPrizes(
        produce(prizes, draftPrizes => {
          const targetPrize = draftPrizes.find(
            draftPrize => draftPrize.id === resultId
          );

          if (!targetPrize) {
            throw new Error('Can not find prize with id = ' + resultId);
          }

          if (targetPrize.total > 1) {
            targetPrize.total--;
          } else {
            return draftPrizes.filter(prize => prize.id !== targetPrize.id);
          }
        })
      );
    }

    this.setState({ isShowResult: false, resultId: null });

    // const { prizes, setPrizes } = this.props;
    // const newPrizes = prizes.filter(prize => prize.total > 0);
    // setPrizes(newPrizes);
  };

  onPressEnd = prize => {
    // const { prizes, setPrizes } = this.props;
    this.setState({ isShowResult: true, resultId: prize.id });

    // setPrizes(
    //   produce(prizes, draftPrizes => {
    //     // const targetPrize = draftPrizes.find(prize => prize.text === text);
    //     // if (targetPrize && targetPrize.total > 0) {
    //     //   targetPrize.total--;
    //     // }
    //     const targetPrize = draftPrizes.find(
    //       draftPrize => draftPrize.id === prize.id
    //     );
    //     if (!targetPrize) {
    //       console.error({ prize, prizes });
    //     }
    //     if (targetPrize && targetPrize.total > 0) {
    //       targetPrize.total--;
    //     }
    //   })
    // );
  };

  render() {
    const { prizes, displayText, iconSize } = this.props;
    const { resultId, isShowResult } = this.state;
    const resultPrize = prizes.find(prize => prize.id === resultId);
    const resultText = resultPrize ? resultPrize.text : '';

    return (
      <div className={styles.page}>
        <ResultBanner text={resultText} show={isShowResult} />
        <Wheel
          prizes={prizes}
          resultText={resultText}
          displayText={displayText}
          iconSize={iconSize}
          onPressStart={this.onPressStart}
          onPressEnd={this.onPressEnd}
        />
      </div>
    );
  }
}

WheelPage.defaultProps = {
  displayText: true,
  iconSize: 64
};

WheelPage.propTypes = {
  prizes: PropTypes.array.isRequired,
  setPrizes: PropTypes.func.isRequired,
  displayText: PropTypes.bool,
  iconSize: PropTypes.number
};

export default WheelPage;
