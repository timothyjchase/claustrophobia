import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Portal } from 'semantic-ui-react'

class RulesSummaryButton extends PureComponent {
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
    const { as: ButtonComponent, ...buttonProps } = this.props
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
          <Modal.Header>Rules Summary</Modal.Header>
          <Modal.Content>
            <div>
              <p>
                <strong>General</strong>: Play using the rules from the{' '}
                Claustrophbia board game, unless stated otherwise here. Follow
                the instructions for each phase and track your progress when you
                complete each phase.
              </p>
              <p>
                <strong>Setup</strong>: Event cards, Demon cards, Threat Point
                tokens and the Board of Destiny are not needed, as they will be
                replaced by this app.
              </p>
              <p>
                <strong>Tile Placement</strong>: The Human player decides the
                orientation when placing tiles.
              </p>
              <p>
                <strong>Hole in the Ground</strong>: This tile should be treated
                as a <strong>Lair</strong> tile instead.
              </p>
              <p>
                <strong>Demonic Mechanism*</strong>: This tile has changed to
                increase the Threat Die by 2, when placed.
              </p>
              <p>
                <strong>Oil for your lamp*</strong>: This advantage has been
                modified to prevent an event card from being drawn on that turn,
                in addition to cancelling the effect of the{' '}
                <strong>Demonic Mechanism</strong> tile.
              </p>
              <p>
                <strong>Aura of Blessing*</strong>: This gift has changed to
                reduce the Threat Die by 2.
              </p>
              <p>
                <strong>*</strong> Click the button corresponding to each
                action, and the results will be applied automatically.
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

RulesSummaryButton.defaultProps = {
  as: Button,
}

RulesSummaryButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default RulesSummaryButton
