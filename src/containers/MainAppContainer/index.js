import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startGame, resetGame, undoLastChange } from '../../actions'
import MainApp from '../../components/MainApp'
import { SCENARIOS } from '../../config'

const mapStateToProps = state => ({
  currentState: state.current,
})

const MainAppContainer = ({
  currentState,
  startGame,
  resetGame,
  undoLastChange,
}) => {
  const scenarioName = (SCENARIOS[currentState.scenarioKey] || {}).name
  return (
    <MainApp
      currentState={currentState}
      scenarioName={scenarioName}
      startGame={startGame}
      resetGame={resetGame}
      undoLastChange={undoLastChange}
    />
  )
}

MainAppContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  startGame: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  undoLastChange: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { startGame, resetGame, undoLastChange },
)(MainAppContainer)
