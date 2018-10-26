import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Message } from 'semantic-ui-react'
import renderHTML from 'react-render-html'

const EventMessage = ({ upcomingEvent, removeEvent }) => (
  <Message negative>
    <div style={{ float: 'right' }}>
      <Dropdown text="" error>
        <Dropdown.Menu direction="left">
          <Dropdown.Item text="Cancel Event" onClick={removeEvent} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <Message.Header>{upcomingEvent.name}</Message.Header>
    <Message.Content>
      {renderHTML(upcomingEvent.description || '')}
    </Message.Content>
  </Message>
)

EventMessage.propTypes = {
  upcomingEvent: PropTypes.object.isRequired,
  removeEvent: PropTypes.func.isRequired,
}

export default EventMessage
