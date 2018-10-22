import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Container, Dropdown } from 'semantic-ui-react'
import Welcome from './Welcome'
import GameStateSummary from './GameStateSummary'
import GamePhaseHeader from './GamePhaseHeader'
import GamePhaseBody from './GamePhaseBody'
import RulesSummaryButton from './RulesSummaryButton'
import DemonAISummaryButton from './DemonAISummaryButton'
import { SCENARIOS } from './config'

const MainMenu = ({ top, width }) => (
  <div
    style={{
      position: 'absolute',
      zIndex: '1000',
      top: `${top}px`,
      width: `${width}px`,
    }}
  >
    <div style={{ float: 'right' }}>
      <Dropdown icon="bars" direction="left" style={{ color: 'white' }}>
        <Dropdown.Menu>
          <Dropdown.Item
            icon="refresh"
            text="Restart"
            onClick={() => window.location.reload()}
          />
          <RulesSummaryButton icon="book" text="Rules" as={Dropdown.Item} />
          <DemonAISummaryButton icon="bug" text="Demon AI" as={Dropdown.Item} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </div>
)

const ScenarioTitle = ({ scenario, top }) => {
  if (scenario) {
    return (
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
          <strong>{SCENARIOS[scenario].name}</strong>
        </div>
      </div>
    )
  }
  return null
}

class App extends Component {
  render() {
    const { game } = this.props
    return (
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

          <MainMenu top={110} width={352} />
          <ScenarioTitle top={115} scenario={game.scenario} />

          <div style={{ padding: '5px 10px 10px 10px' }}>
            {!game.scenario && <Welcome game={game} />}
            {!!game.scenario && (
              <div>
                <GamePhaseHeader game={game} />
                <GamePhaseBody game={game} />
                <GameStateSummary game={game} />
              </div>
            )}
          </div>
        </div>
      </Container>
    )
  }
}

export default observer(App)
