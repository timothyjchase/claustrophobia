import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

const InitiativePhase = ({
  currentState,
  useAuraOfBlessing,
  useOilForYourLamp,
  completeInitiativePhase,
}) => (
  <div>
    <p>Play this phase normally.</p>
    <Button.Group vertical fluid>
      <Button onClick={useAuraOfBlessing}>
        <Icon name="heart" /> Aura of Blessing
      </Button>
      {!currentState.oilForYourLamp && (
        <Button onClick={useOilForYourLamp}>
          <Icon name="tint" /> Oil For Your Lamp
        </Button>
      )}
      <Button primary fluid onClick={completeInitiativePhase}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

InitiativePhase.propTypes = {
  currentState: PropTypes.object.isRequired,
  useAuraOfBlessing: PropTypes.func.isRequired,
  useOilForYourLamp: PropTypes.func.isRequired,
  completeInitiativePhase: PropTypes.func.isRequired,
}

export default InitiativePhase
