import React from 'react'
import { observer } from 'mobx-react'
import { Dropdown, Message } from 'semantic-ui-react'
import renderHTML from 'react-render-html'

const EventMessage = ({ game }) => {
  if (game.event) {
    return (
      <Message negative>
        <div style={{ float: 'right' }}>
          <Dropdown text="" error>
            <Dropdown.Menu direction="left">
              <Dropdown.Item
                text="Cancel Event"
                onClick={() => game.removeEvent(true)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Message.Header>{game.event.name}</Message.Header>
        <Message.Content>
          {renderHTML(game.event.description || '')}
        </Message.Content>
      </Message>
    )
  }
  return (
    <Message negative>
      <Message.Content>Event cancelled</Message.Content>
    </Message>
  )
}

export default observer(EventMessage)
