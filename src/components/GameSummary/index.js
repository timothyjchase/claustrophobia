import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import {
  Button,
  Grid,
  Label,
  List,
  Popup,
  Rating,
  Segment,
} from 'semantic-ui-react'
import DieImage from '../DieImage'
import { DEMON_WARRIORS, SCENARIOS } from '../../config'

const DemonWarriorItem = ({ numberInPlay, onRemove, warrior }) => {
  if (numberInPlay)
    return (
      <List.Item>
        <List.Content>
          <Button
            icon="remove"
            floated="right"
            size="tiny"
            onClick={onRemove}
            compact
            basic
          />
          <List.Header as="a">
            <Label circular horizontal>
              {numberInPlay}
            </Label>
            <Popup
              inverted
              trigger={
                <span>{`${warrior.name}${numberInPlay > 1 ? 's' : ''}`}</span>
              }
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
  numberInPlay: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  warrior: PropTypes.object.isRequired,
}

const GameSummary = ({
  currentState,
  removeDemon,
  removeToughTrog,
  removeTrog,
}) => {
  const demonWarriors =
    currentState.demonsInPlay +
    currentState.toughTrogsInPlay +
    currentState.trogsInPlay
  return (
    <Segment style={{ padding: '10px 10px 10px 10px' }}>
      <Grid stackable={false}>
        <Grid.Row stretched>
          <Grid.Column width={5} verticalAlign="middle">
            <div>
              <strong>
                Turn:
                {currentState.turn}
              </strong>
              <br />
              <DieImage
                style={{
                  display: 'inline',
                  width: '30px',
                  height: '30px',
                  margin: '5px 4px 0px 0px',
                }}
                type="DEMON"
                value={currentState.demonDice}
              />
              <DieImage
                style={{
                  display: 'inline',
                  width: '30px',
                  height: '30px',
                  margin: '5px 0px 0px 4px',
                }}
                type="THREAT"
                value={currentState.threatDice}
              />
            </div>
          </Grid.Column>
          <Grid.Column
            width={11}
            verticalAlign="middle"
            style={{ paddingLeft: '0px' }}
          >
            {!!demonWarriors && (
              <List>
                <DemonWarriorItem
                  numberInPlay={currentState.demonsInPlay}
                  onRemove={removeDemon}
                  warrior={
                    DEMON_WARRIORS[
                      (SCENARIOS[currentState.scenario] || {}).demon
                    ]
                  }
                />
                <DemonWarriorItem
                  numberInPlay={currentState.toughTrogsInPlay}
                  onRemove={removeToughTrog}
                  warrior={DEMON_WARRIORS.TOUGH_TROGLODYTE}
                />
                <DemonWarriorItem
                  numberInPlay={currentState.trogsInPlay}
                  onRemove={removeTrog}
                  warrior={DEMON_WARRIORS.TROGLODYTE}
                />
              </List>
            )}
            {!demonWarriors && <span>No Demon warriors in play</span>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

GameSummary.propTypes = {
  currentState: PropTypes.object.isRequired,
  removeDemon: PropTypes.func.isRequired,
  removeToughTrog: PropTypes.func.isRequired,
  removeTrog: PropTypes.func.isRequired,
}

export default GameSummary
