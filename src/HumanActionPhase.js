import React from 'react'
import { observer } from 'mobx-react'
import { Button, Icon } from 'semantic-ui-react'
import EventMessage from './EventMessage'

const HumanActionPhase = ({ game }) => (
  <div>
    {!!game.event &&
      game.event.phase === 'HUMAN_ACTION' && <EventMessage game={game} />}
    <p>Record removed warriors and the following actions below:</p>
    <Button.Group vertical fluid>
      <Button onClick={() => game.auraOfBlessing()}>
        <Icon name="heart" /> Aura of Blessing
      </Button>
      {!game.oilForYourLamp && (
        <Button onClick={() => game.demonicMechanismTile()}>
          <Icon name="cog" /> Demonic Mechanism tile
        </Button>
      )}
      {game.scenario === 'HIT_THEM_WHERE_IT_HURTS' &&
        !game.demonsInPlay && (
          <Button onClick={() => game.addDemon()}>
            <Icon name="star outline" /> Pentacle Room tile
          </Button>
        )}
      {game.scenario === 'HIT_THEM_WHERE_IT_HURTS' &&
        game.threatDice >= 3 && (
          <Button onClick={() => game.anyOtherTile()}>
            <Icon name="square plus outline" /> Any other tile
          </Button>
        )}
      <Button primary onClick={() => game.completeHumanActionPhase()}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

export default observer(HumanActionPhase)
