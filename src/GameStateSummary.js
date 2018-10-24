import React from 'react'
import { observer } from 'mobx-react'
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
import DemonDice from './DemonDice'
import ThreatDice from './ThreatDice'
import { DEMON_WARRIORS } from './config'

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
                <Label content={`${warrior.movement} MVT`} />{' '}
                <Label content={`${warrior.combat} CBT`} />{' '}
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

const GameStateSummary = ({ game }) => {
  const demonWarriors =
    game.demonsInPlay + game.toughTrogsInPlay + game.trogsInPlay
  return (
    <Segment style={{ padding: '10px 10px 10px 10px' }}>
      <Grid stackable={false}>
        <Grid.Row stretched>
          <Grid.Column width={5} verticalAlign="middle">
            <div>
              <strong>Turn: {game.turn}</strong>
              <br />
              <DemonDice game={game} />
              <ThreatDice game={game} />
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
                  numberInPlay={game.demonsInPlay}
                  onRemove={() => game.removeDemon()}
                  warrior={game.getDemon()}
                />
                <DemonWarriorItem
                  numberInPlay={game.toughTrogsInPlay}
                  onRemove={() => game.removeToughTrog()}
                  warrior={DEMON_WARRIORS['TOUGH_TROGLODYTE']}
                />
                <DemonWarriorItem
                  numberInPlay={game.trogsInPlay}
                  onRemove={() => game.removeTrog()}
                  warrior={DEMON_WARRIORS['TROGLODYTE']}
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

export default observer(GameStateSummary)
