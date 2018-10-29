import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const HumanActionPhase = ({
  scenarioKey,
  oilForYourLamp,
  demonsInPlay,
  threatDice,
  addDemon,
  placeDemonicMechanismTile,
  placeTile,
  completeHumanActionPhase,
}) => (
  <div>
    <p>Record removed warriors and the following actions below:</p>
    <Button.Group vertical fluid>
      {scenarioKey !== 'THE_RITUAL' && (
        <Button
          disabled={oilForYourLamp}
          icon="cog"
          content="Demonic Mechanism tile (+2 Threat)"
          onClick={placeDemonicMechanismTile}
        />
      )}
      {scenarioKey === 'THE_POSSESSED' && (
        <Button
          icon="box"
          content="Stash tile (+1 Possessed One)"
          onClick={addDemon}
        />
      )}
      {scenarioKey === 'HIT_THEM_WHERE_IT_HURTS' &&
        !demonsInPlay && (
          <Button
            icon="star outline"
            content="Pentacle Room tile (+1 Master of Souls)"
            onClick={addDemon}
          />
        )}
      {scenarioKey === 'HIT_THEM_WHERE_IT_HURTS' && (
        <Button
          disabled={threatDice < 3}
          icon="square plus outline"
          content="Any other tile (+2 Troglodytes)"
          onClick={placeTile}
        />
      )}
      <Button
        primary
        icon="play"
        content="Next Phase"
        onClick={completeHumanActionPhase}
      />
    </Button.Group>
  </div>
)

HumanActionPhase.propTypes = {
  scenarioKey: PropTypes.string.isRequired,
  oilForYourLamp: PropTypes.bool.isRequired,
  demonsInPlay: PropTypes.number.isRequired,
  threatDice: PropTypes.number.isRequired,
  addDemon: PropTypes.func.isRequired,
  placeDemonicMechanismTile: PropTypes.func.isRequired,
  placeTile: PropTypes.func.isRequired,
  completeHumanActionPhase: PropTypes.func.isRequired,
}

export default HumanActionPhase
