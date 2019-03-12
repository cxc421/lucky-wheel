import React from 'react';
import produce from 'immer';
import { Container, Col, Row, Button, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

import styles from './SetupPage.module.css';
import config_5 from '../configs/default_config_5.json';
import config_20 from '../configs/default_config_20.json';

const SetupPage = ({
  prizes,
  setPrizes,
  displayText,
  setDisplayText,
  iconSize,
  setIconSize
}) => {
  function onInputChange(e, id) {
    const input = e.target;
    const val = input.value;
    const prop = input.name;
    setPrizes(
      produce(prizes, draftPrizes => {
        draftPrizes.find(prize => prize.id === id)[prop] = val;
      })
    );
  }

  function onNumberBlur(e, id) {
    const input = e.target;
    const val = parseInt(input.value, 10);
    const prop = input.name;
    if (isNaN(val) || val < 1) {
      return setPrizes(
        produce(prizes, draftPrizes => {
          draftPrizes.find(prize => prize.id === id)[prop] = 1;
        })
      );
    }
    setPrizes(
      produce(prizes, draftPrizes => {
        draftPrizes.find(prize => prize.id === id)[prop] = val;
      })
    );
  }

  function loadConfig(config) {
    setPrizes(config.prizes);
    setDisplayText(config.displayText);
    setIconSize(config.iconSize);
  }

  function onIconSizeChange(e) {
    setIconSize(e.target.value);
  }

  function onIconSizeBlur(e) {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      return setIconSize(44);
    }
    if (val < 8) {
      return setIconSize(8);
    }
    setIconSize(val);
  }

  function removePrize(id) {
    setPrizes(prizes.filter(prize => prize.id !== id));
  }

  function addNewPrize() {
    let beforePrize = prizes[0];
    let idx = 0;
    for (let i = 1; i < prizes.length; i++) {
      const prize = prizes[i];
      if (prize.id === beforePrize.id + 1) {
        beforePrize = prize;
        idx = i;
      } else {
        break;
      }
    }
    setPrizes(
      produce(prizes, draftPrizes => {
        const newId = beforePrize.id + 1;
        draftPrizes.splice(idx + 1, 0, {
          text: 'Prize#' + newId,
          mdIconName: 'MdCardGiftcard',
          total: 5,
          id: newId
        });
      })
    );
  }

  return (
    <div className={styles.page}>
      <Container>
        <Row>
          <Col>
            <Button
              variant="secondary"
              className={styles.loadConfigBtn}
              onClick={() => loadConfig(config_5)}
            >
              Load Default Config 1 (5 prizes)
            </Button>
            <Button
              variant="secondary"
              className={styles.loadConfigBtn}
              onClick={() => loadConfig(config_20)}
            >
              Load Default Config 2 (20 prizes)
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr className={styles.hr} />
          </Col>
        </Row>
        <Row>
          <Col>
            <span className={styles.title1}>Display:</span>
            <label className={styles.labelRadioGroup}>
              <input
                type="radio"
                name="display"
                value={true}
                checked={displayText}
                onChange={() => setDisplayText(true)}
              />
              <span>Show prize name</span>
            </label>
            <label className={styles.labelRadioGroup}>
              <input
                type="radio"
                name="display"
                value={false}
                checked={!displayText}
                onChange={() => setDisplayText(false)}
              />
              <span>Show prize number</span>
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className={styles.title1}>Icon Size:</span>
            <input
              type="number"
              min="8"
              max="70"
              step="1"
              value={iconSize}
              onChange={onIconSizeChange}
              onBlur={onIconSizeBlur}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingTop: 5 }}>
            <span className={styles.title1}>Total Prizes:</span>
            <span>{prizes.reduce((acc, prize) => acc + prize.total, 0)}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" className={styles.addPrizeBtn}>
              <FaPlus />
              <span onClick={addNewPrize}>Add new prize</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              striped
              hover
              size="sm"
              className={styles.table}
              style={{
                background: 'white'
              }}
            >
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Prize Name</th>
                  <th>Prize Total</th>
                  <th>Material Icon Name</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {prizes.map(prize => (
                  <tr key={prize.id}>
                    <td>{prize.id}</td>
                    <td>
                      <input
                        type="text"
                        name="text"
                        value={prize.text}
                        onChange={e => onInputChange(e, prize.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        name="total"
                        value={prize.total}
                        onChange={e => onInputChange(e, prize.id)}
                        onBlur={e => onNumberBlur(e, prize.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="mdIconName"
                        value={prize.mdIconName}
                        onChange={e => onInputChange(e, prize.id)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        block
                        className={styles.deleteBtn}
                        onClick={() => removePrize(prize.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

SetupPage.propTypes = {
  prizes: PropTypes.array.isRequired,
  setPrizes: PropTypes.func.isRequired,
  displayText: PropTypes.bool.isRequired,
  setDisplayText: PropTypes.func.isRequired,
  iconSize: PropTypes.number.isRequired,
  setIconSize: PropTypes.func.isRequired
};

export default SetupPage;
