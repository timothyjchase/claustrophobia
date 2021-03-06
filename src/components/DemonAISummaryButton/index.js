import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, Header, Modal, Portal } from 'semantic-ui-react'

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
              <Header as="h4">
                <Header.Content>
                  <span style={{ color: 'red' }}>Demon Die</span>
                  <Header.Subheader>
                    Determines when a Demon will be added
                  </Header.Subheader>
                </Header.Content>
              </Header>
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
              <Header as="h4">
                <Header.Content>
                  <span style={{ color: 'blue' }}>Threat Die</span>
                  <Header.Subheader>
                    Determines when Troglodytes will be added
                    <br />
                    (also Supernatural Speed or Sharpened Claws)
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <p>
                During the Threat phase, if no demon has just been added, and
                the number of Troglodytes in play is less than the Threat Die,
                then Troglodytes will be added and the Threat Die is reduced by
                1.
              </p>
              <p>
                All Troglodytes may gain
                <strong> Supernatural Speed </strong>
                and/or
                <strong> Sharpened Claws </strong>
                depending on their proximity to Human warriors, further reducing
                the Threat Die (by 2 and 1 respectively). When the Threat Die
                reaches 0, it is rolled again.
              </p>
              <p>
                Where the Troglodytes are added will depend on the scenario and
                the situation.
              </p>
              <Divider />
              <Header as="h4">
                <Header.Content>
                  Events
                  <Header.Subheader>
                    Removing Troglogytes increases the chance that the Demon AI
                    will draw an Event during the next Threat phase.
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <p>
                The odds of drawing a card increase, the more Troglodytes that
                are removed and the fewer that remain (percent of drawing an
                Event = 1 / total number of Troglodytes before removal). For
                example, removing 1 Troglodye, when there are 5 remaining,
                results in 20% chance of drawing an Event. Removing the last
                Troglodyte will guarantee that an event will be drawn.
              </p>
              <p>A maximum of 1 Event can be drawn per turn.</p>
              <p>The text of an Event may change depending on the scenario.</p>
              <p>
                The
                <strong> Trap </strong>
                and
                <strong> They Are Legion </strong>
                actions from the Board of Destiny have been converted into
                Events.
              </p>
              <p>
                Events may be cancelled with no effect, by using the upper right
                menu in the Event message (like when using
                <strong> Our Faith Will Protect Us</strong>
                ).
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

DemonAISummaryButton.defaultProps = {
  as: Button,
}

DemonAISummaryButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default DemonAISummaryButton
