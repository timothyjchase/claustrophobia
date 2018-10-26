import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const ThreatEventStep = ({ completeThreatEventStep }) => (
  <div>
    <Button.Group vertical fluid>
      <Button
        primary
        icon="play"
        content="Next"
        onClick={completeThreatEventStep}
      />
    </Button.Group>
  </div>
)

ThreatEventStep.propTypes = {
  completeThreatEventStep: PropTypes.func.isRequired,
}

export default ThreatEventStep
