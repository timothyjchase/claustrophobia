import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

const HumanActionPhase = ({
  currentState,
  addDemon,
  placeDemonicMechanismTile,
  placeTile,
  completeHumanActionPhase,
}) => (
  <div>
    <p>Record removed warriors and the following actions below:</p>
    <Button.Group vertical fluid>
      {!currentState.oilForYourLamp &&
        currentState.scenario !== 'THE_RITUAL' && (
          <Button onClick={placeDemonicMechanismTile}>
            <Icon name="cog" /> Demonic Mechanism tile
          </Button>
        )}
      {currentState.scenario === 'THE_POSSESSED' && (
        <Button onClick={addDemon}>
          <Icon name="box" /> Stash tile (Add Possessed One)
        </Button>
      )}
      {currentState.scenario === 'HIT_THEM_WHERE_IT_HURTS' &&
        !currentState.demonsInPlay && (
          <Button onClick={addDemon}>
            <Icon name="star outline" /> Pentacle Room tile (Add Master of
            Souls)
          </Button>
        )}
      {currentState.scenario === 'HIT_THEM_WHERE_IT_HURTS' &&
        currentState.threatDice >= 3 && (
          <Button onClick={placeTile}>
            <Icon name="square plus outline" /> Any other tile (Add 2
            Troglodytes)
          </Button>
        )}
      <Button primary onClick={completeHumanActionPhase}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

HumanActionPhase.propTypes = {
  currentState: PropTypes.object.isRequired,
  addDemon: PropTypes.func.isRequired,
  placeDemonicMechanismTile: PropTypes.func.isRequired,
  placeTile: PropTypes.func.isRequired,
  completeHumanActionPhase: PropTypes.func.isRequired,
}

export default HumanActionPhase
