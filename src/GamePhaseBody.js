import React from 'react'
import { observer } from 'mobx-react'
import InitiativePhase from './InitiativePhase'
import HumanActionPhase from './HumanActionPhase'
import ThreatPhase from './ThreatPhase'
import DemonActionPhase from './DemonActionPhase'

const PHASES = {
  INITIATIVE: InitiativePhase,
  HUMAN_ACTION: HumanActionPhase,
  THREAT: ThreatPhase,
  DEMON_ACTION: DemonActionPhase,
}

const GamePhaseBody = ({ game }) => {
  const BodyComponent = PHASES[game.phase]
  return <BodyComponent game={game} />
}

export default observer(GamePhaseBody)
