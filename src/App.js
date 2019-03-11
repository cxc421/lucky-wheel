//
//  App: connect all components
//
import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import './global.css';
import styles from './App.module.css';
import WheelPage from './pages/WheelPage';

const config20 = [
  // {
  //   text: 'Movie',
  //   mdIconName: 'MdMovieFilter',
  //   total: 5
  // },
  // {
  //   text: 'Wish',
  //   mdIconName: 'MdCake',
  //   total: 5
  // },
  // {
  //   text: 'Anything',
  //   mdIconName: 'MdStars',
  //   total: 5
  // },
  // {
  //   text: 'Child',
  //   mdIconName: 'MdChildCare',
  //   total: 4
  // },
  {
    text: 'Flight',
    mdIconName: 'MdFlight',
    total: 1
  },
  {
    text: 'Wifi',
    mdIconName: 'MdWifi',
    total: 2
  }
];

const MODE_WHEEL = 'mode-wheel';
const MODE_SETTING = 'mode-setting';

const App = () => {
  const [prizes, setPrizes] = useState([...config20]);
  // const [mode, setMode] = useState(MODE_WHEEL);

  return (
    <div className={styles.app}>
      <DropdownButton
        id="dropdown-basic-button"
        title="Dropdown button"
        variant="info"
        className={styles.dropDown}
      >
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>

      <WheelPage prizes={prizes} setPrizes={setPrizes} />
    </div>
  );
};

export default App;
