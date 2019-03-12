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
import defaultConfig from './configs/default_config_5.json';

const MODE_WHEEL = 'mode-wheel';
const MODE_SETTING = 'mode-setting';

const App = () => {
  const [prizes, setPrizes] = useState([...defaultConfig.prizes]);
  const [mode, setMode] = useState(MODE_SETTING);
  const [displayText, setDisplayText] = useState(defaultConfig.displayText);
  const [iconSize, setIconSize] = useState(defaultConfig.iconSize);

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
        <WheelPage
          prizes={prizes}
          setPrizes={setPrizes}
          displayText={displayText}
          iconSize={iconSize}
        />
      ) : (
        <SetupPage
          prizes={prizes}
          setPrizes={setPrizes}
          displayText={displayText}
          setDisplayText={setDisplayText}
          iconSize={iconSize}
          setIconSize={setIconSize}
        />
      )}
    </div>
  );
};

export default App;
