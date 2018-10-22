import React from 'react'
import { observer } from 'mobx-react'
import { Button, Icon } from 'semantic-ui-react'
import EventMessage from './EventMessage'

const InitiativePhase = ({ game }) => (
  <div>
    {!!game.event &&
      game.event.phase === 'INITIATIVE' && <EventMessage game={game} />}
    <p>Play this phase normally.</p>
    <Button.Group vertical fluid>
      {!game.oilForYourLamp && (
        <Button onClick={() => game.setOilForYourLamp()}>
          <Icon name="tint" /> Oil For Your Lamp
        </Button>
      )}
      <Button primary fluid onClick={() => game.completeInitiativePhase()}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

export default observer(InitiativePhase)
