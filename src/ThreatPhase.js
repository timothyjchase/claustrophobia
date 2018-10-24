import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Button, Checkbox, Icon, Input, Message } from 'semantic-ui-react'
import EventMessage from './EventMessage'

const ThreatEventStep = ({ game }) => (
  <div>
    <EventMessage game={game} />
    <Button.Group vertical fluid>
      <Button primary onClick={() => game.completeThreatEventStep()}>
        <Icon name="play" /> Next
      </Button>
    </Button.Group>
  </div>
)

const CheckLegalPlacementStep = ({ game }) => (
  <div>
    <Checkbox
      label={`At least 1 legal placement for Demon warriors within 4 tiles of
        a Human warrior?`}
      onChange={() => (game.legalPlacement = !game.legalPlacement)}
      checked={game.legalPlacement}
    />
    <br />
    <br />
    <Button.Group vertical fluid>
      <Button primary onClick={() => game.completeThreatLegalPlacementStep()}>
        <Icon name="play" /> Next
      </Button>
    </Button.Group>
  </div>
)

const SpawnDemonStep = ({ game }) => (
  <div>
    {!game.legalPlacement && (
      <Message negative>
        <Message.Header>A Taste for Blood</Message.Header>
        <Message.Content>
          Human warriors cannot prevent the appearance of Demons.
        </Message.Content>
      </Message>
    )}
    {game.scenario !== 'THE_SURVIVORS' &&
      game.scenario !== 'THE_RITUAL' && (
        <p>
          Add the <strong>{game.getDemon().name}</strong> to the unexplored
          opening closest to the tile with the largest group of humans.
        </p>
      )}
    {game.scenario === 'THE_SURVIVORS' && (
      <p>
        Add the <strong>{game.getDemon().name}</strong> to the unexplored
        opening closest to the tile with Fresh Air.
      </p>
    )}
    {game.scenario === 'THE_RITUAL' && (
      <p>
        Add the <strong>{game.getDemon().name}</strong> to the unexplored
        opening farthest from a Human warrior.
      </p>
    )}
    {game.legalPlacement && (
      <p>
        <i>Reminder: Human warriors block tiles</i>
      </p>
    )}
    <Button.Group vertical fluid>
      <Button primary onClick={() => game.completeThreatSpawnDemonStep()}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

class SpawnTrogsStep extends Component {
  constructor(props) {
    super(props)
    const maxTrogs = props.game.legalPlacement
      ? props.game.threatDice
      : Math.min(props.game.threatDice, 3)
    this.state = { trogsAdded: maxTrogs, maxTrogs }
  }

  render = () => {
    const { game } = this.props
    const { trogsAdded, maxTrogs } = this.state
    return (
      <div>
        {!game.legalPlacement && (
          <Message negative>
            <Message.Header>A Taste for Blood</Message.Header>
            <Message.Content>
              Human warriors cannot prevent the appearance of Troglodytes.
            </Message.Content>
          </Message>
        )}
        {game.scenario !== 'THE_SURVIVORS' &&
          game.scenario !== 'THE_RITUAL' && (
            <p>
              Add up to <strong>{maxTrogs}</strong> Troglogytes to unexplored
              openings closest to the tile with the largest group of humans.
            </p>
          )}
        {game.scenario === 'THE_SURVIVORS' && (
          <p>
            Add up to <strong>{maxTrogs}</strong> Troglogytes to unexplored
            openings closest to the tile with Fresh Air.
          </p>
        )}
        {game.scenario === 'THE_RITUAL' && (
          <p>
            Add up to <strong>{maxTrogs}</strong> Troglogytes to unexplored
            openings with the following priority:
          </p>
        )}
        {game.scenario === 'THE_RITUAL' && (
          <ul>
            <li>Seal of Protection on its path to the Pentacle Room</li>
            <li>Fewest Human warriors on its path to the Pentacle Room </li>
          </ul>
        )}
        {game.legalPlacement && (
          <p>
            <i>Reminder: Human warriors block tiles</i>
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
            onClick={() =>
              game.completeThreatSpawnTrogsStep(parseInt(trogsAdded))
            }
          >
            <Icon name="play" /> Next
          </Button>
        </Button.Group>
      </div>
    )
  }
}

const CheckTrogsDistanceStep = ({ game }) => (
  <div>
    <Checkbox
      label="Any Troglogytes 2 or more tiles away from the closest human?"
      onChange={() => (game.trogsFar = !game.trogsFar)}
      checked={game.trogsFar}
    />
    <br />
    <br />
    <Checkbox
      label="Any Troglogytes adjacent to or on the same tile as a human?"
      onChange={() => (game.trogsClose = !game.trogsClose)}
      checked={game.trogsClose}
    />
    <br />
    <br />
    <Button.Group vertical fluid>
      <Button primary onClick={() => game.completeThreatPhase()}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

const STEPS_CONFIG = {
  THREAT_EVENT: { component: observer(ThreatEventStep) },
  CHECK_LEGAL_PLACEMENT: { component: observer(CheckLegalPlacementStep) },
  SPAWN_DEMON: { component: observer(SpawnDemonStep) },
  SPAWN_TROGS: { component: observer(SpawnTrogsStep) },
  CHECK_TROGS_DISTANCE: { component: observer(CheckTrogsDistanceStep) },
}

const ThreatPhase = ({ game }) => {
  const StepComponent = STEPS_CONFIG[game.threatStep].component
  return (
    <div>
      <StepComponent game={game} />
    </div>
  )
}

export default observer(ThreatPhase)
