import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeEvent } from '../../actions'
import EventMessage from '../../components/EventMessage'

export const mapStateToProps = state => ({
  currentState: state.current,
})

export const EventMessageContainer = ({ currentState, removeEvent }) => {
  const { upcomingEvent } = currentState
  if (!!upcomingEvent && upcomingEvent.phase === currentState.phase) {
    return (
      <EventMessage upcomingEvent={upcomingEvent} removeEvent={removeEvent} />
    )
  }
  return null
}

EventMessageContainer.propTypes = {
  currentState: PropTypes.object.isRequired,
  removeEvent: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { removeEvent },
)(EventMessageContainer)
