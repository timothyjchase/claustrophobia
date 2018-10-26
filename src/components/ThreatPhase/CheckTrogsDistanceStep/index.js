import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Icon } from 'semantic-ui-react'

class CheckTrogsDistanceStep extends Component {
  constructor(props) {
    super(props)
    this.state = { trogsFar: false, trogsClose: false }
  }

  render() {
    const { completeThreatTrogsDistanceStep } = this.props
    const { trogsFar, trogsClose } = this.state

    return (
      <div>
        <Checkbox
          label="Any Troglogytes 2 or more tiles away from the closest human?"
          onChange={() => this.setState({ trogsFar: !trogsFar })}
          checked={trogsFar}
        />
        <br />
        <br />
        <Checkbox
          label="Any Troglogytes adjacent to or on the same tile as a human?"
          onChange={() => this.setState({ trogsClose: !trogsClose })}
          checked={trogsClose}
        />
        <br />
        <br />
        <Button.Group vertical fluid>
          <Button
            primary
            onClick={() =>
              completeThreatTrogsDistanceStep(trogsFar, trogsClose)
            }
          >
            <Icon name="play" /> Next Phase
          </Button>
        </Button.Group>
      </div>
    )
  }
}

CheckTrogsDistanceStep.propTypes = {
  completeThreatTrogsDistanceStep: PropTypes.func.isRequired,
}

export default CheckTrogsDistanceStep
