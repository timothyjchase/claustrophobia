import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

const ThreatEventStep = ({ completeThreatEventStep }) => (
  <div>
    <Button.Group vertical fluid>
      <Button primary onClick={completeThreatEventStep}>
        <Icon name="play" /> Next
      </Button>
    </Button.Group>
  </div>
)

ThreatEventStep.propTypes = {
  completeThreatEventStep: PropTypes.func.isRequired,
}

export default ThreatEventStep
