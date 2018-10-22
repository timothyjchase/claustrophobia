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
import { DEMON_WARRIORS } from './config'

const DemonWarriorItem = ({ numberInPlay, onRemove, warrior }) => {
  if (numberInPlay)
    return (
      <List.Item>
        <List.Content>
          <Popup
            inverted
            trigger={
              <Button
                icon="remove"
                floated="right"
                size="tiny"
                onClick={onRemove}
                compact
                basic
              />
            }
          >
            {`Remove 1 ${warrior.name}`}.
          </Popup>

          <Popup
            inverted
            trigger={
              <List.Header as="a">
                <Label circular horizontal>
                  {numberInPlay}
                </Label>
                {`${warrior.name}${numberInPlay > 1 ? 's' : ''}`}
                {warrior.health > 1 && (
                  <Rating
                    icon="heart"
                    defaultRating={0}
                    maxRating={warrior.health}
                    size="tiny"
                  />
                )}
              </List.Header>
            }
          >
            <div>
              <Label content={`${warrior.movement} MVT`} />{' '}
              <Label content={`${warrior.combat} CBT`} />{' '}
              <Label content={`${warrior.defense} DEF`} />
              {!!warrior.rules && <div>{renderHTML(warrior.rules)}</div>}
            </div>
          </Popup>
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
              <Popup
                inverted
                trigger={
                  <Label color="red" size="large" content={game.demonDice} />
                }
              >
                <strong>Demon Die</strong>: During the Threat phase, if a d6
                roll exeeds this value, a Demon will be added. Otherwise, this
                value is reduced by 1.
              </Popup>
              <Popup
                inverted
                trigger={
                  <Label color="blue" size="large" content={game.threatDice} />
                }
              >
                <strong>Threat Die</strong>: If no Demon is added during the
                Threat phase, and there are fewer Troglodytes in play than this
                value, then Troglodytes will be added.
              </Popup>
            </div>
          </Grid.Column>
          <Grid.Column width={11} verticalAlign="middle">
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
