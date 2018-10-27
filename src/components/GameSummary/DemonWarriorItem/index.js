import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Button, Label, List, Popup, Rating } from 'semantic-ui-react'

const DemonWarriorItem = ({ warrior }) => {
  if (warrior.numberInPlay)
    return (
      <List.Item>
        <List.Content>
          <Button
            icon="remove"
            floated="right"
            size="tiny"
            onClick={warrior.onRemove}
            compact
            basic
          />
          <List.Header as="a">
            <Label circular horizontal>
              {warrior.numberInPlay}
            </Label>
            <Popup
              inverted
              trigger={(
                <span>
                  {`${warrior.name}${warrior.numberInPlay > 1 ? 's' : ''}`}
                </span>
)}
            >
              <div>
                <Label content={`${warrior.movement} MVT`} />
                {' '}
                <Label content={`${warrior.combat} CBT`} />
                {' '}
                <Label content={`${warrior.defense} DEF`} />
                {!!warrior.rules && <div>{renderHTML(warrior.rules)}</div>}
              </div>
            </Popup>
            {warrior.health > 1 && (
              <div style={{ paddingLeft: '30px' }}>
                <Rating
                  icon="heart"
                  defaultRating={0}
                  maxRating={warrior.health}
                  size="tiny"
                />
              </div>
            )}
          </List.Header>
        </List.Content>
      </List.Item>
    )
  return null
}

DemonWarriorItem.propTypes = {
  warrior: PropTypes.object.isRequired,
}

export default DemonWarriorItem
