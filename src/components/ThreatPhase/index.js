import React from 'react'
import PropTypes from 'prop-types'
import ThreatEventStep from './ThreatEventStep'
import CheckDemonPlacementStep from './CheckDemonPlacementStep'
import CheckTrogsPlacementStep from './CheckTrogsPlacementStep'
import SpawnDemonStep from './SpawnDemonStep'
import SpawnTrogsStep from './SpawnTrogsStep'
import CheckTrogsDistanceStep from './CheckTrogsDistanceStep'

const STEPS_CONFIG = {
  CHECK_DEMON_PLACEMENT: CheckDemonPlacementStep,
  CHECK_TROGS_DISTANCE: CheckTrogsDistanceStep,
  CHECK_TROGS_PLACEMENT: CheckTrogsPlacementStep,
  SPAWN_DEMON: SpawnDemonStep,
  SPAWN_TROGS: SpawnTrogsStep,
  THREAT_EVENT: ThreatEventStep,
}

const ThreatPhase = ({
  scenario,
  threatStep,
  legalPlacement,
  threatDice,
  completeThreatDemonPlacementStep,
  completeThreatTrogsDistanceStep,
  completeThreatTrogsPlacementStep,
  completeThreatSpawnDemonStep,
  completeThreatSpawnTrogsStep,
  completeThreatEventStep,
}) => {
  let StepCompoonent = STEPS_CONFIG[threatStep]
  let stepProps = {}
  if (threatStep === 'CHECK_DEMON_PLACEMENT') {
    stepProps = { completeThreatDemonPlacementStep }
  } else if (threatStep === 'CHECK_TROGS_DISTANCE') {
    stepProps = { completeThreatTrogsDistanceStep }
  } else if (threatStep === 'CHECK_TROGS_PLACEMENT') {
    stepProps = { completeThreatTrogsPlacementStep }
  } else if (threatStep === 'SPAWN_DEMON') {
    stepProps = { scenario, legalPlacement, completeThreatSpawnDemonStep }
  } else if (threatStep === 'SPAWN_TROGS') {
    stepProps = {
      scenario,
      legalPlacement,
      threatDice,
      completeThreatSpawnTrogsStep,
    }
  } else if (threatStep === 'THREAT_EVENT') {
    stepProps = { completeThreatEventStep }
  }
  return <StepCompoonent {...stepProps} />
}

ThreatPhase.propTypes = {
  scenario: PropTypes.string.isRequired,
  threatStep: PropTypes.string.isRequired,
  legalPlacement: PropTypes.bool,
  threatDice: PropTypes.number.isRequired,
  completeThreatDemonPlacementStep: PropTypes.func.isRequired,
  completeThreatTrogsDistanceStep: PropTypes.func.isRequired,
  completeThreatTrogsPlacementStep: PropTypes.func.isRequired,
  completeThreatSpawnDemonStep: PropTypes.func.isRequired,
  completeThreatSpawnTrogsStep: PropTypes.func.isRequired,
  completeThreatEventStep: PropTypes.func.isRequired,
}

export default ThreatPhase
