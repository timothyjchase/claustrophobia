import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Button, Message } from 'semantic-ui-react'
import { DEMON_WARRIORS, SCENARIOS } from '../../../config'

const SpawnDemonStep = ({
  scenario,
  legalPlacement,
  completeThreatSpawnDemonStep,
}) => {
  const demon = DEMON_WARRIORS[(SCENARIOS[scenario] || {}).demon] || {}
  const spawnLocation =
    SCENARIOS[scenario].demonSpawnLocation ||
    '<li>the <strong>largest group</strong> of Human warriors</li>'
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
      <p>
        Add up the
        <strong>{` ${demon.name} `}</strong>
        to the tile closest to:
      </p>
      <ul>{renderHTML(spawnLocation)}</ul>
      {legalPlacement && (
        <p>
          <i>Reminder: Human warriors block tiles with unexplored openings</i>
        </p>
      )}
      <Button.Group vertical fluid>
        <Button
          primary
          icon="play"
          content="Next Phase"
          onClick={completeThreatSpawnDemonStep}
        />
      </Button.Group>
    </div>
  )
}

SpawnDemonStep.propTypes = {
  scenario: PropTypes.string.isRequired,
  legalPlacement: PropTypes.bool.isRequired,
  completeThreatSpawnDemonStep: PropTypes.func.isRequired,
}

export default SpawnDemonStep
