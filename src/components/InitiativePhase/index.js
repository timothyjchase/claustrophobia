import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const InitiativePhase = ({
  oilForYourLamp,
  useAuraOfBlessing,
  useOilForYourLamp,
  completeInitiativePhase,
}) => (
  <div>
    <p>Play this phase normally.</p>
    <Button.Group vertical fluid>
      <Button
        icon="heart"
        content="Aura of Blessing (-2 Threat)"
        onClick={useAuraOfBlessing}
      />
      {!oilForYourLamp && (
        <Button
          icon="tint"
          content="Oil For Your Lamp (No Events)"
          onClick={useOilForYourLamp}
        />
      )}
      <Button
        primary
        fluid
        icon="play"
        content="Next Phase"
        onClick={completeInitiativePhase}
      />
    </Button.Group>
  </div>
)

InitiativePhase.propTypes = {
  oilForYourLamp: PropTypes.bool.isRequired,
  useAuraOfBlessing: PropTypes.func.isRequired,
  useOilForYourLamp: PropTypes.func.isRequired,
  completeInitiativePhase: PropTypes.func.isRequired,
}

export default InitiativePhase
