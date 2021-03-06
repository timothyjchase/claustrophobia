import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  useAuraOfBlessing,
  useOilForYourLamp,
  completeInitiativePhase,
} from '../../actions'
import InitiativePhase from '../../components/InitiativePhase'

export const mapStateToProps = state => ({
  currentState: state.current,
})

export const InitiativePhaseContainer = ({
  currentState,
  useAuraOfBlessing,
  useOilForYourLamp,
  completeInitiativePhase,
}) => {
  const { oilForYourLamp } = currentState
  return (
    <InitiativePhase
      oilForYourLamp={oilForYourLamp}
      useAuraOfBlessing={useAuraOfBlessing}
      useOilForYourLamp={useOilForYourLamp}
      completeInitiativePhase={completeInitiativePhase}
    />
  )
}

InitiativePhaseContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  useAuraOfBlessing: PropTypes.func.isRequired,
  useOilForYourLamp: PropTypes.func.isRequired,
  completeInitiativePhase: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { useAuraOfBlessing, useOilForYourLamp, completeInitiativePhase },
)(InitiativePhaseContainer)
