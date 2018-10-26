import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox } from 'semantic-ui-react'

class CheckDemonPlacementStep extends Component {
  constructor(props) {
    super(props)
    this.state = { legalPlacement: false }
  }

  render() {
    const { completeThreatDemonPlacementStep } = this.props
    const { legalPlacement } = this.state

    return (
      <div>
        <Checkbox
          label="At least 1 legal placement for a Demon within 4 tiles of a Human warrior?"
          onChange={() => this.setState({ legalPlacement: !legalPlacement })}
          checked={legalPlacement}
        />
        <br />
        <br />
        <Button.Group vertical fluid>
          <Button
            primary
            icon="play"
            content="Next"
            onClick={() => completeThreatDemonPlacementStep(legalPlacement)}
          />
        </Button.Group>
      </div>
    )
  }
}

CheckDemonPlacementStep.propTypes = {
  completeThreatDemonPlacementStep: PropTypes.func.isRequired,
}

export default CheckDemonPlacementStep
