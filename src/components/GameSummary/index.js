import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List, Segment } from 'semantic-ui-react'
import DieImage from '../DieImage'
import DemonWarriorItem from './DemonWarriorItem'

const GameSummary = ({ turn, demonDice, threatDice, warriors }) => {
  const demonWarriorCount = warriors.reduce(
    (result, warrior) => result + warrior.numberInPlay,
    0,
  )
  return (
    <Segment style={{ padding: '10px 10px 10px 10px' }}>
      <Grid stackable={false}>
        <Grid.Row stretched>
          <Grid.Column width={5} verticalAlign="middle">
            <div>
              <strong>
                Turn:
                {turn}
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
                value={demonDice}
              />
              <DieImage
                style={{
                  display: 'inline',
                  width: '30px',
                  height: '30px',
                  margin: '5px 0px 0px 4px',
                }}
                type="THREAT"
                value={threatDice}
              />
            </div>
          </Grid.Column>
          <Grid.Column
            width={11}
            verticalAlign="middle"
            style={{ paddingLeft: '0px' }}
          >
            {!!demonWarriorCount && (
              <List>
                {warriors.map((warrior, index) => (
                  <DemonWarriorItem key={index} warrior={warrior} />
                ))}
              </List>
            )}
            {!demonWarriorCount && <span>No Demon warriors in play</span>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

GameSummary.propTypes = {
  turn: PropTypes.number.isRequired,
  demonDice: PropTypes.number.isRequired,
  threatDice: PropTypes.number.isRequired,
  warriors: PropTypes.array.isRequired,
}

export default GameSummary
