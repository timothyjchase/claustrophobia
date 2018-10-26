import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Icon } from 'semantic-ui-react'

class CheckTrogsPlacementStep extends Component {
  constructor(props) {
    super(props)
    this.state = { legalPlacement: false }
  }

  render() {
    const { completeThreatTrogsPlacementStep } = this.props
    const { legalPlacement } = this.state

    return (
      <div>
        <Checkbox
          label={`At least 1 legal placement for Troglodytes within 4 tiles of
        a Human warrior?`}
          onChange={() => this.setState({ legalPlacement: !legalPlacement })}
          checked={legalPlacement}
        />
        <br />
        <br />
        <Button.Group vertical fluid>
          <Button
            primary
            onClick={() => completeThreatTrogsPlacementStep(legalPlacement)}
          >
            <Icon name="play" /> Next
          </Button>
        </Button.Group>
      </div>
    )
  }
}

CheckTrogsPlacementStep.propTypes = {
  completeThreatTrogsPlacementStep: PropTypes.func.isRequired,
}

export default CheckTrogsPlacementStep
