import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Button, Input, Message } from 'semantic-ui-react'

class SpawnTrogsStep extends Component {
  constructor(props) {
    super(props)
    const { legalPlacement, threatDice } = props
    const maxTrogs = legalPlacement ? threatDice : Math.min(threatDice, 3)
    this.state = { trogsAdded: maxTrogs, maxTrogs }
  }

  render = () => {
    const {
      scenario,
      legalPlacement,
      completeThreatSpawnTrogsStep,
    } = this.props
    const { trogsAdded, maxTrogs } = this.state
    const spawnLocation =
      scenario.trogsSpawnLocation ||
      '<li>the <strong>largest group</strong> of Human warriors</li>'

    return (
      <div>
        {!legalPlacement && (
          <Message negative>
            <Message.Header>A Taste for Blood</Message.Header>
            <Message.Content>
              Human warriors cannot prevent the appearance of Troglodytes.
            </Message.Content>
          </Message>
        )}
        <p>
          Add up to
          <strong>{` ${maxTrogs} `}</strong>
          Troglogytes to tiles closest to:
        </p>
        <ul>{renderHTML(spawnLocation)}</ul>
        {legalPlacement && (
          <p>
            <i>Reminder: Human warriors block tiles with unexplored openings</i>
          </p>
        )}
        <Input
          label="Troglogytes added"
          placeholder="0"
          type="number"
          min={0}
          max={6}
          value={trogsAdded}
          onChange={(event, { value }) => this.setState({ trogsAdded: value })}
          fluid
        />
        <br />
        <Button.Group vertical fluid>
          <Button
            primary
            disabled={!trogsAdded}
            icon="play"
            content="Next"
            onClick={() =>
              completeThreatSpawnTrogsStep(parseInt(trogsAdded, 10))
            }
          />
        </Button.Group>
      </div>
    )
  }
}

SpawnTrogsStep.propTypes = {
  scenario: PropTypes.object.isRequired,
  legalPlacement: PropTypes.bool.isRequired,
  threatDice: PropTypes.number.isRequired,
  completeThreatSpawnTrogsStep: PropTypes.func.isRequired,
}

export default SpawnTrogsStep
