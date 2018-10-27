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
import { DEMON_WARRIORS, SCENARIOS } from '../../config'

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
  const { scenarioKey, threatStep, legalPlacement, threatDice } = currentState
  const scenario = SCENARIOS[scenarioKey] || {}
  const demonName = (DEMON_WARRIORS[scenario.demon] || {}).name

  return (
    <ThreatPhase
      scenario={scenario}
      threatStep={threatStep}
      demonName={demonName}
      threatDice={threatDice}
      legalPlacement={legalPlacement}
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
  },
)(ThreatPhaseContainer)
