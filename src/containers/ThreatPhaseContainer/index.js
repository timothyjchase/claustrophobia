import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  completeThreatDemonPlacementStep,
  completeThreatTrogsDistanceStep,
  completeThreatTrogsPlacementStep,
  completeThreatSpawnDemonStep,
  completeThreatSpawnTrogsStep,
  completeThreatEventStep,
} from '../../actions'
import ThreatPhase from '../../components/ThreatPhase'

const mapStateToProps = state => ({
  currentState: state.current,
})

const ThreatPhaseContainer = ({
  currentState,
  completeThreatDemonPlacementStep,
  completeThreatTrogsDistanceStep,
  completeThreatTrogsPlacementStep,
  completeThreatSpawnDemonStep,
  completeThreatSpawnTrogsStep,
  completeThreatEventStep,
}) => {
  const { scenario, threatStep, legalPlacement, threatDice } = currentState

  return (
    <ThreatPhase
      scenario={scenario}
      threatStep={threatStep}
      legalPlacement={legalPlacement}
      threatDice={threatDice}
      completeThreatDemonPlacementStep={completeThreatDemonPlacementStep}
      completeThreatTrogsDistanceStep={completeThreatTrogsDistanceStep}
      completeThreatTrogsPlacementStep={completeThreatTrogsPlacementStep}
      completeThreatSpawnDemonStep={completeThreatSpawnDemonStep}
      completeThreatSpawnTrogsStep={completeThreatSpawnTrogsStep}
      completeThreatEventStep={completeThreatEventStep}
    />
  )
}

ThreatPhaseContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  completeThreatDemonPlacementStep: PropTypes.func.isRequired,
  completeThreatTrogsDistanceStep: PropTypes.func.isRequired,
  completeThreatTrogsPlacementStep: PropTypes.func.isRequired,
  completeThreatSpawnDemonStep: PropTypes.func.isRequired,
  completeThreatSpawnTrogsStep: PropTypes.func.isRequired,
  completeThreatEventStep: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    completeThreatDemonPlacementStep,
    completeThreatTrogsDistanceStep,
    completeThreatTrogsPlacementStep,
    completeThreatSpawnDemonStep,
    completeThreatSpawnTrogsStep,
    completeThreatEventStep,
  }
)(ThreatPhaseContainer)
