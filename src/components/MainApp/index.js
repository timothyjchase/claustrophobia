import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import GameSummaryContainer from '../../containers/GameSummaryContainer'
import EventMessageContainer from '../../containers/EventMessageContainer'
import Welcome from '../Welcome'
import PhaseHeader from '../PhaseHeader'
import PhaseBody from '../PhaseBody'
import MainMenu from '../MainMenu'
import { SCENARIOS } from '../../config'

const MainApp = ({ currentState, startGame, resetGame, undoLastChange }) => (
  <Container>
    <div
      style={{
        maxWidth: '352px',
        margin: '0 auto',
        background: 'white',
        marginTop: '10px',
      }}
    >
      <img
        src="images/title.png"
        alt="Claustrophobia"
        style={{ width: '352px', height: '128px' }}
      />

      <MainMenu
        style={{
          position: 'absolute',
          zIndex: '1000',
          top: '110px',
          width: '352px',
        }}
        currentState={currentState}
        resetGame={resetGame}
        undoLastChange={undoLastChange}
      />
      {!!currentState.scenario && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '115px',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              position: 'relative',
              left: '-50%',
            }}
          >
            <strong>{SCENARIOS[currentState.scenario].name}</strong>
          </div>
        </div>
      )}

      <div style={{ padding: '5px 10px 10px 10px' }}>
        {!currentState.scenario && <Welcome startGame={startGame} />}
        {!!currentState.scenario && (
          <div>
            <PhaseHeader phase={currentState.phase} />
            <EventMessageContainer />
            <PhaseBody phase={currentState.phase} />
            <GameSummaryContainer />
          </div>
        )}
      </div>
    </div>
  </Container>
)

MainApp.propTypes = {
  currentState: PropTypes.object.isRequired,
  startGame: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  undoLastChange: PropTypes.func.isRequired,
}

export default MainApp
