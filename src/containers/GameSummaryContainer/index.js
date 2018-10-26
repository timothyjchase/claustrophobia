import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeDemon, removeToughTrog, removeTrog } from '../../actions'
import GameSummary from '../../components/GameSummary'

const mapStateToProps = state => ({
  currentState: state.current,
})

const GameSummaryContainer = ({
  currentState,
  removeDemon,
  removeToughTrog,
  removeTrog,
}) => (
  <GameSummary
    currentState={currentState}
    removeDemon={removeDemon}
    removeToughTrog={removeToughTrog}
    removeTrog={removeTrog}
  />
)

GameSummaryContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  removeDemon: PropTypes.func.isRequired,
  removeToughTrog: PropTypes.func.isRequired,
  removeTrog: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { removeDemon, removeToughTrog, removeTrog },
)(GameSummaryContainer)
