//
//  App: connect all components
//
import React from 'react';

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

class App extends React.Component {
  state = {
    prizes: this.initPrizes(),
    resultText: '',
    isShowResult: false
  };

  initPrizes() {
    return [...config20];
  }

  onPressStart = () => {
    this.setState({ isShowResult: false });
  };

  onPressEnd = () => {
    this.setState({ isShowResult: true, resultText: 'Prize' });
  };

  render() {
    return (
      <div className={styles.app}>
        <ResultBanner
          text={this.state.resultText}
          show={this.state.isShowResult}
        />
        <Wheel
          prizes={this.state.prizes}
          onPressStart={this.onPressStart}
          onPressEnd={this.onPressEnd}
        />
      </div>
    );
  }
}

export default App;
