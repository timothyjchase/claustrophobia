import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Message } from 'semantic-ui-react'

const DemonActionPhase = ({ currentState, completeDemonActionPhase }) => (
  <div>
    {currentState.trogsSupernaturalSpeed && (
      <Message negative>
        <Message.Header>Supernatural Speed</Message.Header>
        <Message.Content>
          All Troglodytes gain <strong>+1 MVT</strong>.
        </Message.Content>
      </Message>
    )}
    {currentState.trogsSharpenedClaws && (
      <Message negative>
        <Message.Header>Sharpened Claws</Message.Header>
        <Message.Content>
          All Troglodytes are <strong>Frantic</strong>.
        </Message.Content>
      </Message>
    )}

    {currentState.scenario !== 'THE_RITUAL' && (
      <div>
        <p>
          <strong>Activation order</strong>: proximity to Human warriors
          (closest first).
        </p>
        <p>
          <strong>Action order</strong>: if starting activation on a tile with a
          Human warrior, attack then move. Otherwise, move then attack.
        </p>
        <p>
          <strong>Move</strong>: towards the closest Human warrior (largest
          group if tied).
        </p>
        <p>
          <strong>Attack</strong>: most wounded Human warrior (lowest defense if
          tied).
        </p>
      </div>
    )}

    {currentState.scenario === 'THE_RITUAL' && (
      <div>
        <p>
          <strong>Activation order</strong>: proximity to the Pentacle Room
          (closest first).
        </p>
        <p>
          <strong>Action order</strong>: if starting activation on a tile with a
          Human warrior, attack then move. Otherwise, move then attack.
        </p>
        <p>
          <strong>Move</strong>: Troglodytes move towards the Pentacle Room.
          {!!currentState.demonsInPlay && (
            <span>
              The <strong>Demon of Cruelty</strong> will not move.
            </span>
          )}
        </p>
        <p>
          <strong>Attack</strong>: most wounded Human warrior (lowest defense if
          tied).
        </p>
      </div>
    )}
    <br />
    <Button.Group vertical fluid>
      <Button primary onClick={completeDemonActionPhase}>
        <Icon name="play" /> Next Phase
      </Button>
    </Button.Group>
  </div>
)

DemonActionPhase.propTypes = {
  currentState: PropTypes.object.isRequired,
  completeDemonActionPhase: PropTypes.func.isRequired,
}

export default DemonActionPhase
