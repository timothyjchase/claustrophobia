import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  useAuraOfBlessing,
  useOilForYourLamp,
  completeInitiativePhase,
} from '../../actions'
import InitiativePhase from '../../components/InitiativePhase'

const mapStateToProps = state => ({
  currentState: state.current,
})

const InitiativePhaseContainer = ({
  currentState,
  useAuraOfBlessing,
  useOilForYourLamp,
  completeInitiativePhase,
}) => (
  <InitiativePhase
    currentState={currentState}
    useAuraOfBlessing={useAuraOfBlessing}
    useOilForYourLamp={useOilForYourLamp}
    completeInitiativePhase={completeInitiativePhase}
  />
)

InitiativePhaseContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  useAuraOfBlessing: PropTypes.func.isRequired,
  useOilForYourLamp: PropTypes.func.isRequired,
  completeInitiativePhase: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { useAuraOfBlessing, useOilForYourLamp, completeInitiativePhase }
)(InitiativePhaseContainer)
