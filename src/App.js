//
//  App: connect all components
//
import React from 'react';

import './global.css';
// import WheelSvg from './components/WheelSvg';
import Wheel from './components/Wheel';

const App = () => {
  return (
    <>
      {/* <WheelSvg /> */}
      <Wheel />
    </>
  );
};

export default App;
