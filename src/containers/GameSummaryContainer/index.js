import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeDemon, removeToughTrog, removeTrog } from '../../actions'
import GameSummary from '../../components/GameSummary'
import { DEMON_WARRIORS, SCENARIOS } from '../../config'

export const mapStateToProps = state => ({
  currentState: state.current,
})

export const GameSummaryContainer = ({
  currentState,
  removeDemon,
  removeToughTrog,
  removeTrog,
}) => {
  const {
    scenarioKey,
    turn,
    demonDice,
    threatDice,
    demonsInPlay,
    toughTrogsInPlay,
    trogsInPlay,
  } = currentState
  const demon = DEMON_WARRIORS[(SCENARIOS[scenarioKey] || {}).demon] || {}
  const warriors = [
    {
      ...demon,
      numberInPlay: demonsInPlay,
      onRemove: removeDemon,
    },
    {
      ...DEMON_WARRIORS.TOUGH_TROGLODYTE,
      numberInPlay: toughTrogsInPlay,
      onRemove: removeToughTrog,
    },
    {
      ...DEMON_WARRIORS.TROGLODYTE,
      numberInPlay: trogsInPlay,
      onRemove: removeTrog,
    },
  ]
  return (
    <GameSummary
      turn={turn}
      demonDice={demonDice}
      threatDice={threatDice}
      warriors={warriors}
    />
  )
}

GameSummaryContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  removeDemon: PropTypes.func.isRequired,
  removeToughTrog: PropTypes.func.isRequired,
  removeTrog: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { removeDemon, removeToughTrog, removeTrog },
)(GameSummaryContainer)
