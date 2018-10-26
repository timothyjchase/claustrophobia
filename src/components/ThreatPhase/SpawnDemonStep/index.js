import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Message } from 'semantic-ui-react'
import { DEMON_WARRIORS, SCENARIOS } from '../../../config'

const SpawnDemonStep = ({
  scenario,
  legalPlacement,
  completeThreatSpawnDemonStep,
}) => {
  const demon = DEMON_WARRIORS[(SCENARIOS[scenario] || {}).demon] || {}
  return (
    <div>
      {!legalPlacement && (
        <Message negative>
          <Message.Header>A Taste for Blood</Message.Header>
          <Message.Content>
            Human warriors cannot prevent the appearance of Demons.
          </Message.Content>
        </Message>
      )}
      {scenario !== 'THE_SURVIVORS' &&
        scenario !== 'THE_RITUAL' && (
          <p>
            Add the <strong>{demon.name}</strong> to the unexplored opening
            closest to the tile with the largest group of humans.
          </p>
        )}
      {scenario === 'THE_SURVIVORS' && (
        <p>
          Add the <strong>{demon.name}</strong> to the unexplored opening
          closest to the tile with Fresh Air.
        </p>
      )}
      {scenario === 'THE_RITUAL' && (
        <p>
          Add the <strong>{demon.name}</strong> to the unexplored opening
          farthest from a Human warrior.
        </p>
      )}
      {legalPlacement && (
        <p>
          <i>Reminder: Human warriors block tiles</i>
        </p>
      )}
      <Button.Group vertical fluid>
        <Button primary onClick={completeThreatSpawnDemonStep}>
          <Icon name="play" /> Next Phase
        </Button>
      </Button.Group>
    </div>
  )
}

SpawnDemonStep.propTypes = {
  scenario: PropTypes.string.isRequired,
  legalPlacement: PropTypes.bool,
  completeThreatSpawnDemonStep: PropTypes.func.isRequired,
}

export default SpawnDemonStep
