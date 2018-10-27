import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { completeDemonActionPhase } from '../../actions'
import DemonActionPhase from '../../components/DemonActionPhase'

const mapStateToProps = state => ({
  currentState: state.current,
})

const InitiativePhaseContainer = ({
  currentState,
  completeDemonActionPhase,
}) => {
  const {
    scenarioKey,
    trogsSupernaturalSpeed,
    trogsSharpenedClaws,
    demonsInPlay,
  } = currentState
  return (
    <DemonActionPhase
      scenarioKey={scenarioKey}
      trogsSupernaturalSpeed={trogsSupernaturalSpeed}
      trogsSharpenedClaws={trogsSharpenedClaws}
      demonsInPlay={demonsInPlay}
      completeDemonActionPhase={completeDemonActionPhase}
    />
  )
}

InitiativePhaseContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  completeDemonActionPhase: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { completeDemonActionPhase },
)(InitiativePhaseContainer)
