import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Modal, Portal } from 'semantic-ui-react'
import { SCENARIOS } from './config'

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
    const { as: ButtonComponent, game, result, ...buttonProps } = this.props
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
          <Modal.Header>Game Results</Modal.Header>
          <Modal.Content>
            <div>
              {result === 'Defeat' && (
                <Header as="h4">
                  <Header.Content>
                    <span style={{ color: 'red' }}>
                      Better luck next time...
                    </span>
                  </Header.Content>
                </Header>
              )}
              {result === 'Victory' && (
                <Header as="h4">
                  <Header.Content>
                    <span style={{ color: 'blue' }}>Congratulations!</span>
                  </Header.Content>
                </Header>
              )}
              <p>
                <strong>Result</strong>: {result}
              </p>
              <p>
                <strong>Scenario</strong>:{' '}
                {(SCENARIOS[game.scenario] || {}).name}
              </p>
              <p>
                <strong>Turn</strong>: {game.turn}
              </p>
              <p>
                <strong>Demons</strong>: {game.demonsInPlay} /{' '}
                {game.demonsAdded}
              </p>
              <p>
                <strong>Troglodytes</strong>: {game.trogsInPlay} /{' '}
                {game.trogsAdded}
              </p>
              <p>
                <strong>Tough Troglodytes</strong>: {game.toughTrogsInPlay} /{' '}
                {game.toughTrogsAdded}
              </p>
              <p>
                <strong>Events</strong>: {game.eventCount}
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
  game: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
}

export default GameOverButton
