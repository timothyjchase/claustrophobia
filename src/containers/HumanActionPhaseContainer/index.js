import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addDemon,
  placeDemonicMechanismTile,
  placeTile,
  completeHumanActionPhase,
} from '../../actions'
import HumanActionPhase from '../../components/HumanActionPhase'

export const mapStateToProps = state => ({
  currentState: state.current,
})

export const HumanActionPhaseContainer = ({
  currentState,
  addDemon,
  placeDemonicMechanismTile,
  placeTile,
  completeHumanActionPhase,
}) => {
  const { scenarioKey, oilForYourLamp, demonsInPlay, threatDice } = currentState
  return (
    <HumanActionPhase
      scenarioKey={scenarioKey}
      oilForYourLamp={oilForYourLamp}
      demonsInPlay={demonsInPlay}
      threatDice={threatDice}
      addDemon={addDemon}
      placeDemonicMechanismTile={placeDemonicMechanismTile}
      placeTile={placeTile}
      completeHumanActionPhase={completeHumanActionPhase}
    />
  )
}

HumanActionPhaseContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  addDemon: PropTypes.func.isRequired,
  placeDemonicMechanismTile: PropTypes.func.isRequired,
  placeTile: PropTypes.func.isRequired,
  completeHumanActionPhase: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { addDemon, placeDemonicMechanismTile, placeTile, completeHumanActionPhase },
)(HumanActionPhaseContainer)
