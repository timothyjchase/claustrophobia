import React from 'react'
import PropTypes from 'prop-types'
import { Button, Message } from 'semantic-ui-react'

const DemonActionPhase = ({
  scenarioKey,
  trogsSupernaturalSpeed,
  trogsSharpenedClaws,
  demonsInPlay,
  completeDemonActionPhase,
}) => (
  <div>
    {trogsSupernaturalSpeed && (
      <Message negative>
        <Message.Header>Supernatural Speed</Message.Header>
        <Message.Content>
          <span>All Troglodytes gain </span>
          <strong>+1 MVT</strong>
          <span>.</span>
        </Message.Content>
      </Message>
    )}
    {trogsSharpenedClaws && (
      <Message negative>
        <Message.Header>Sharpened Claws</Message.Header>
        <Message.Content>
          <span>All Troglodytes are </span>
          <strong>Frantic</strong>
          <span>.</span>
        </Message.Content>
      </Message>
    )}

    {scenarioKey !== 'THE_RITUAL' && (
      <div>
        <p>
          <strong>Activation order: </strong>
          <span>proximity to Human warriors (closest first).</span>
        </p>
        <p>
          <strong>Action order: </strong>
          if on a tile with a Human warrior, attack then move. Otherwise, move
          then attack.
        </p>
        <p>
          <strong>Move: </strong>
          towards the closest Human warrior (largest group if tied).
        </p>
        <p>
          <strong>Attack: </strong>
          most wounded Human warrior (lowest defense if tied).
        </p>
      </div>
    )}

    {scenarioKey === 'THE_RITUAL' && (
      <div>
        <p>
          <strong>Activation order: </strong>
          proximity to the Pentacle Room (closest first).
        </p>
        <p>
          <strong>Action order: </strong>
          if on a tile with a Human warrior, attack then move. Otherwise, move
          then attack.
        </p>
        <p>
          <strong>Move: </strong>
          Troglodytes move towards the Pentacle Room.
          {!!demonsInPlay && (
            <span>
              <span>The </span>
              <strong>Demon of Cruelty </strong>
              will not move.
            </span>
          )}
        </p>
        <p>
          <strong>Attack: </strong>
          most wounded Human warrior (lowest defense if tied).
        </p>
      </div>
    )}
    <br />
    <Button.Group vertical fluid>
      <Button
        primary
        icon="play"
        content="Next Phase"
        onClick={completeDemonActionPhase}
      />
    </Button.Group>
  </div>
)

DemonActionPhase.defaultProps = {
  trogsSupernaturalSpeed: false,
  trogsSharpenedClaws: false,
}

DemonActionPhase.propTypes = {
  scenarioKey: PropTypes.string.isRequired,
  trogsSupernaturalSpeed: PropTypes.bool,
  trogsSharpenedClaws: PropTypes.bool,
  demonsInPlay: PropTypes.number.isRequired,
  completeDemonActionPhase: PropTypes.func.isRequired,
}

export default DemonActionPhase
