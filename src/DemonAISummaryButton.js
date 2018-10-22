import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, Modal, Portal } from 'semantic-ui-react'

class DemonAISummaryButton extends PureComponent {
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
          <Modal.Header>Demon AI Summary</Modal.Header>
          <Modal.Content>
            <div>
              <p>
                <span style={{ color: 'red' }}>
                  <strong>Demon Die</strong>
                </span>
                : This die determines when a Demon will be added.
              </p>
              <p>
                During the Threat phase, if there is no demon in play, then a d6
                is rolled. If the result exceeds the Demon Die, then a demon is
                added and the Demon Die is reset to 6. If the result does not,
                then the Demon Die is reduced by 1.
              </p>
              <p>
                Where the Demon is added will depend on the scenario and the
                situation. The scenario will limit the number of times a Demon
                can be added.
              </p>
              <Divider />
              <p>
                <span style={{ color: 'blue' }}>
                  <strong>Theat Die</strong>
                </span>
                : This die primarily determines when Troglodytes will be added.
              </p>
              <p>
                During the Threat phase, if no demon has just been added, and
                the number of Troglodytes in play is less than the Threat Die,
                then Troglodytes will be added and then the Threat Die is
                reduced by 1.
              </p>
              <p>
                All Troglodytes may gain <strong>Supernatural Speed</strong>{' '}
                and/or <strong>Sharpened Claws</strong> depending on their
                proximity to Human warriors, further reducing the Threat Die.
                When the Threat Die reaches 0, it is rolled again.
              </p>
              <p>
                Where the Troglodytes are added will depend on the scenario and
                the situation.
              </p>
              <Divider />
              <p>
                <strong>Events</strong>: When a Troglogyte is removed, the Demon
                AI might draw an event card during the next Threat phase.
              </p>
              <p>
                The odds of drawing a card increase, the more Troglodytes are
                removed and the fewer that remain (1 / # of Troglodytes before
                removal). Removing a Troglodye, when there are 5 remaining,
                results in 20% chance of drawing an Event. Removing the last
                Troglodyte will guarantee that an event will be drawn.
              </p>
              <p>
                Only up to 1 Event will be drawn per turn. If the Event is not
                applicable, it will be discarded. For example, drawing{' '}
                <strong>Suicide Attack</strong>, when there are no Troglodytes
                in play, will be discarded.
              </p>
              <p>
                The <strong>Trap</strong> and <strong>They Are Legion</strong>{' '}
                actions from the Board of Destiny have been converted to Events.
              </p>
              <p />
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

DemonAISummaryButton.defaultProps = {
  as: Button,
}

DemonAISummaryButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default DemonAISummaryButton
