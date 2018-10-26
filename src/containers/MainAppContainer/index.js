import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startGame, resetGame, undoLastChange } from '../../actions'
import MainApp from '../../components/MainApp'

const mapStateToProps = state => ({
  currentState: state.current,
})

const MainAppContainer = ({
  currentState,
  startGame,
  resetGame,
  undoLastChange,
}) => (
  <MainApp
    currentState={currentState}
    startGame={startGame}
    resetGame={resetGame}
    undoLastChange={undoLastChange}
  />
)

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
