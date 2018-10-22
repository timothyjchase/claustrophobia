import React from 'react'
import { observer } from 'mobx-react'
import { Step } from 'semantic-ui-react'

const PHASES = [
  { name: 'INITIATIVE', text: 'Initiative' },
  { name: 'HUMAN_ACTION', text: 'Human', text2: 'Actions' },
  { name: 'THREAT', text: 'Threat' },
  { name: 'DEMON_ACTION', text: 'Demon', text2: 'Actions' },
]

const GamePhaseHeader = ({ game }) => (
  <Step.Group unstackable fluid>
    {PHASES.map(phase => (
      <Step
        key={phase.name}
        active={game.phase === phase.name}
        disabled={game.phase !== phase.name}
        style={{ padding: '5px 0px 5px 0px' }}
      >
        <Step.Content>
          <Step.Description>{phase.text}</Step.Description>
          {!!phase.text2 && <Step.Description>{phase.text2}</Step.Description>}
        </Step.Content>
      </Step>
    ))}
  </Step.Group>
)

export default observer(GamePhaseHeader)
