import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Portal } from 'semantic-ui-react'
import { SCENARIOS } from '../../config'

class GameOverButton extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open || false,
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      as: ButtonComponent,
      currentState,
      result,
      ...buttonProps
    } = this.props
    const { open } = this.state

    // use a Portal in order to support a Dropdown.Item trigger component
    return (
      <Portal
        open={open}
        closeOnTriggerClickk={false}
        openOnTriggerClick
        trigger={<ButtonComponent {...buttonProps} />}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <Modal open closeOnDimmerClick={false}>
          <Modal.Header>
            {result === 'Defeat' && (
              <span style={{ color: 'red' }}>Maybe next time...</span>
            )}
            {result === 'Victory' && (
              <span style={{ color: 'blue' }}>Congratulations!</span>
            )}
          </Modal.Header>
          <Modal.Content>
            <div>
              <p>
                <strong>Result</strong>: {result}
              </p>
              <p>
                <strong>Scenario</strong>:{' '}
                {(SCENARIOS[currentState.scenario] || {}).name}
              </p>
              <p>
                <strong>Turn</strong>: {currentState.turn}
              </p>
              <p>
                <strong>Demons</strong>: {currentState.demonsInPlay} /{' '}
                {currentState.demonsAdded}
              </p>
              <p>
                <strong>Troglodytes</strong>: {currentState.trogsInPlay} /{' '}
                {currentState.trogsAdded}
              </p>
              <p>
                <strong>Tough Troglodytes</strong>:{' '}
                {currentState.toughTrogsInPlay} / {currentState.toughTrogsAdded}
              </p>
              <p>
                <strong>Events</strong>: {currentState.eventCount}
              </p>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button content="Close" onClick={this.handleClose} />
          </Modal.Actions>
        </Modal>
      </Portal>
    )
  }
}

GameOverButton.defaultProps = {
  as: Button,
}

GameOverButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  currentState: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
}

export default GameOverButton
