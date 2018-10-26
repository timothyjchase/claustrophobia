import React from 'react'
import PropTypes from 'prop-types'
import InitiativePhaseContainer from '../../containers/InitiativePhaseContainer'
import HumanActionPhaseContainer from '../../containers/HumanActionPhaseContainer'
import ThreatPhaseContainer from '../../containers/ThreatPhaseContainer'
import DemonActionPhaseContainer from '../../containers/DemonActionPhaseContainer'

const PHASES = {
  INITIATIVE: InitiativePhaseContainer,
  HUMAN_ACTION: HumanActionPhaseContainer,
  THREAT: ThreatPhaseContainer,
  DEMON_ACTION: DemonActionPhaseContainer,
}

const PhaseBody = ({ phase }) => {
  const BodyComponent = PHASES[phase]
  return <BodyComponent />
}

PhaseBody.propTypes = {
  phase: PropTypes.string.isRequired,
}

export default PhaseBody
