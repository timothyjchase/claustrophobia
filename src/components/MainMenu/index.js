import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import RulesSummaryButton from '../RulesSummaryButton'
import DemonAISummaryButton from '../DemonAISummaryButton'
import GameResultButton from '../GameResultButton'

const MainMenu = ({
  currentState,
  scenarioName,
  resetGame,
  undoLastChange,
  ...divProps
}) => (
  <div {...divProps}>
    <div style={{ float: 'right' }}>
      <Dropdown icon="bars" direction="left" style={{ color: 'white' }}>
        <Dropdown.Menu>
          <Dropdown.Item icon="refresh" text="Restart" onClick={resetGame} />
          <Dropdown.Item icon="undo" text="Undo" onClick={undoLastChange} />
          <Dropdown.Divider />
          <RulesSummaryButton icon="book" text="Rules" as={Dropdown.Item} />
          <DemonAISummaryButton icon="bug" text="Demon AI" as={Dropdown.Item} />
          <Dropdown.Divider />
          <GameResultButton
            icon="thumbs up outline"
            text="Victory"
            as={Dropdown.Item}
            currentState={currentState}
            scenarioName={scenarioName}
            result="Victory"
          />
          <GameResultButton
            icon="thumbs down outline"
            text="Defeat"
            as={Dropdown.Item}
            currentState={currentState}
            scenarioName={scenarioName}
            result="Defeat"
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </div>
)

MainMenu.propTypes = {
  currentState: PropTypes.object.isRequired,
  scenarioName: PropTypes.string, // eslint-disable-line react/require-default-props
  resetGame: PropTypes.func.isRequired,
  undoLastChange: PropTypes.func.isRequired,
}

export default MainMenu
