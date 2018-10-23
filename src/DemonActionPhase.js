import React from 'react'
import { Button, Icon, Message } from 'semantic-ui-react'
import EventMessage from './EventMessage'

const DemonActionPhase = ({ game }) => (
  <div>
    {!!game.event &&
      game.event.phase === 'DEMON_ACTION' && <EventMessage game={game} />}
    {game.trogsSupernaturalSpeed && (
      <Message negative>
        <Message.Header>Supernatural Speed</Message.Header>
        <Message.Content>
          All Troglodytes gain <strong>+1 MVT</strong>.
        </Message.Content>
      </Message>
    )}
    {game.trogsSharpenedClaws && (
      <Message negative>
        <Message.Header>Sharpened Claws</Message.Header>
        <Message.Content>
          All Troglodytes are <strong>Frantic</strong>.
        </Message.Content>
      </Message>
    )}
    {game.scenario === 'THE_RITUAL' &&
      !!game.demonsInPlay && (
        <p>
          The <strong>Demon of Cruelty</strong> will not move.
        </p>
      )}
    {game.scenario === 'THE_RITUAL' && (
      <p>
        All Troglodytes will attempt to move towards the Redeemer in the
        Pentacle Room. If they are forced to stop by any human warriors they
        will attack.
      </p>
    )}
    {game.scenario !== 'THE_RITUAL' && (
      <p>
        All Demon warriors move towards the closest human group (largest group
        if tied).
      </p>
    )}
    <p>
      All Demon warriors attack the most wounded member of the group (lowest
      defense if tied).
    </p>
    <p>
      <i>Obey limit: 3 Demon warriors per tile, 1 per corridor</i>
    </p>
    <Button.Group vertical fluid>
      <Button primary onClick={() => game.completeDemonActionPhase()}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

export default DemonActionPhase
