//
//  App: connect all components
//
import React from 'react';

import './global.css';
import styles from './App.module.css';
import Wheel from './components/Wheel';

const App = () => {
  return (
    <div className={styles.app}>
      <Wheel />
    </div>
  );
};

export default App;
