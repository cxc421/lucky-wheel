//
//  App: connect all components
//
import React from 'react';
import produce from 'immer';

import './global.css';
import styles from './App.module.css';
import Wheel from './components/Wheel';
import ResultBanner from './components/ResultBanner';

const config20 = [
  {
    text: 'Movie',
    mdIconName: 'MdMovieFilter',
    total: 5
  },
  {
    text: 'Wish',
    mdIconName: 'MdCake',
    total: 5
  },
  {
    text: 'Anything',
    mdIconName: 'MdStars',
    total: 5
  },
  {
    text: 'Child',
    mdIconName: 'MdChildCare',
    total: 4
  },
  {
    text: 'Flight',
    mdIconName: 'MdFlight',
    total: 1
  },
  {
    text: 'Wifi',
    mdIconName: 'MdWifi',
    total: 5
  }
];

const MODE_WHEEL = 'mode-wheel';
const MODE_SETTING = 'mode-setting';

class App extends React.Component {
  state = {
    prizes: this.initPrizes(),
    resultText: '',
    isShowResult: false,
    mode: MODE_WHEEL
  };

  initPrizes() {
    return [...config20];
  }

  onPressStart = () => {
    this.setState({ isShowResult: false, resultText: '' });
    this.setState(
      produce(draft => {
        let newPrizes = draft.prizes.filter(prize => prize.total > 0);
        draft.prizes = newPrizes;
      })
    );
  };

  onPressEnd = ({ text }) => {
    this.setState({ isShowResult: true, resultText: text });
    this.setState(
      produce(draft => {
        let targetPrize = draft.prizes.find(prize => prize.text === text);
        if (targetPrize.total > 0) {
          targetPrize.total--;
        }
      })
    );
  };

  render() {
    if (this.state.mode === MODE_WHEEL) {
      return (
        <div className={styles.app}>
          <ResultBanner
            text={this.state.resultText}
            show={this.state.isShowResult}
          />
          <Wheel
            prizes={this.state.prizes}
            resultText={this.state.resultText}
            onPressStart={this.onPressStart}
            onPressEnd={this.onPressEnd}
          />
        </div>
      );
    }

    if (this.state.mode === MODE_SETTING) {
      return null;
    }

    return null;
  }
}

export default App;
