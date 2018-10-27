import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeDemon, removeToughTrog, removeTrog } from '../../actions'
import GameSummary from '../../components/GameSummary'
import { DEMON_WARRIORS, SCENARIOS } from '../../config'

const mapStateToProps = state => ({
  currentState: state.current,
})

const GameSummaryContainer = ({
  currentState,
  removeDemon,
  removeToughTrog,
  removeTrog,
}) => {
  const demon =
    DEMON_WARRIORS[(SCENARIOS[currentState.scenarioKey] || {}).demon] || {}
  const warriors = [
    {
      ...demon,
      numberInPlay: currentState.demonsInPlay,
      onRemove: removeDemon,
    },
    {
      ...DEMON_WARRIORS.TOUGH_TROGLODYTE,
      numberInPlay: currentState.toughTrogsInPlay,
      onRemove: removeToughTrog,
    },
    {
      ...DEMON_WARRIORS.TROGLODYTE,
      numberInPlay: currentState.trogsInPlay,
      onRemove: removeTrog,
    },
  ]
  return (
    <GameSummary
      turn={currentState.turn}
      demonDice={currentState.demonDice}
      threatDice={currentState.threatDice}
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
