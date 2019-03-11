//
//  App: connect all components
//
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MdSettings } from 'react-icons/md';

import './global.css';
import styles from './App.module.css';
import WheelPage from './pages/WheelPage';
import SetupPage from './pages/SetupPage';

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
    total: 2
  }
];

const MODE_WHEEL = 'mode-wheel';
const MODE_SETTING = 'mode-setting';

const App = () => {
  const [prizes, setPrizes] = useState([...config20]);
  const [mode, setMode] = useState(MODE_SETTING);

  return (
    <div className={styles.app}>
      <Dropdown>
        <Dropdown.Toggle
          variant="info"
          id="dropdown-basic"
          className={styles.dropDown}
        >
          <MdSettings size={36} style={{ paddingRight: 10 }} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {[
            { mode: MODE_WHEEL, text: 'Lucky Wheel' },
            { mode: MODE_SETTING, text: 'Edit Config' }
          ].map((item, idx) => (
            <Dropdown.Item
              href="#"
              key={idx}
              style={mode === item.mode ? { background: 'lightgrey' } : null}
              onClick={() => setMode(item.mode)}
            >
              {item.text}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {mode === MODE_WHEEL ? (
        <WheelPage prizes={prizes} setPrizes={setPrizes} />
      ) : (
        <SetupPage />
      )}
    </div>
  );
};

export default App;
