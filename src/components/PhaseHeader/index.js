import React from 'react'
import PropTypes from 'prop-types'
import { Step } from 'semantic-ui-react'

const PHASES = [
  { key: 'INITIATIVE', text: 'Initiative' },
  { key: 'HUMAN_ACTION', text: 'Human', text2: 'Actions' },
  { key: 'THREAT', text: 'Threat' },
  { key: 'DEMON_ACTION', text: 'Demon', text2: 'Actions' },
]

const PhaseHeader = ({ phase }) => (
  <Step.Group unstackable fluid>
    {PHASES.map(phaseConfig => (
      <Step
        key={phaseConfig.key}
        active={phase === phaseConfig.key}
        disabled={phase !== phaseConfig.key}
        style={{ padding: '5px 0px 5px 0px' }}
      >
        <Step.Content>
          <Step.Description>{phaseConfig.text}</Step.Description>
          {!!phaseConfig.text2 && (
            <Step.Description>{phaseConfig.text2}</Step.Description>
          )}
        </Step.Content>
      </Step>
    ))}
  </Step.Group>
)

PhaseHeader.propTypes = {
  phase: PropTypes.string.isRequired,
}

export default PhaseHeader
