import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Input, Message } from 'semantic-ui-react'

class SpawnTrogsStep extends Component {
  constructor(props) {
    super(props)
    const maxTrogs = props.legalPlacement
      ? props.threatDice
      : Math.min(props.threatDice, 3)
    this.state = { trogsAdded: maxTrogs, maxTrogs }
  }

  render = () => {
    const {
      scenario,
      legalPlacement,
      completeThreatSpawnTrogsStep,
    } = this.props
    const { trogsAdded, maxTrogs } = this.state
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
        {scenario !== 'THE_SURVIVORS' &&
          scenario !== 'THE_RITUAL' && (
            <p>
              Add up to <strong>{maxTrogs}</strong> Troglogytes to unexplored
              openings closest to the tile with the largest group of humans.
            </p>
          )}
        {scenario === 'THE_SURVIVORS' && (
          <p>
            Add up to <strong>{maxTrogs}</strong> Troglogytes to unexplored
            openings closest to the tile with Fresh Air.
          </p>
        )}
        {scenario === 'THE_RITUAL' && (
          <p>
            Add up to <strong>{maxTrogs}</strong> Troglogytes to unexplored
            openings with the following priority:
          </p>
        )}
        {scenario === 'THE_RITUAL' && (
          <ul>
            <li>Seal of Protection on its path to the Pentacle Room</li>
            <li>Fewest Human warriors on its path to the Pentacle Room </li>
          </ul>
        )}
        {legalPlacement && (
          <p>
            <i>
              Reminder: Human warriors prevent the appearance of Troglodytes
            </i>
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
            onClick={() => completeThreatSpawnTrogsStep(parseInt(trogsAdded))}
          >
            <Icon name="play" /> Next
          </Button>
        </Button.Group>
      </div>
    )
  }
}

SpawnTrogsStep.propTypes = {
  scenario: PropTypes.string.isRequired,
  legalPlacement: PropTypes.bool,
  threatDice: PropTypes.number.isRequired,
  completeThreatSpawnTrogsStep: PropTypes.func.isRequired,
}

export default SpawnTrogsStep
