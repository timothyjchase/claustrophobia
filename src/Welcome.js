import React, { Component } from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import RulesSummaryButton from './RulesSummaryButton'
import DemonAISummaryButton from './DemonAISummaryButton'
import { SCENARIOS } from './config'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = { scenario: undefined }
  }

  render() {
    const { game } = this.props
    const { scenario } = this.state

    return (
      <div>
        <p>
          Welcome to the <strong>Demon AI</strong> app for playing the{' '}
          <strong>Claustrophobia</strong> the board game (by CROC) with a single
          player.
        </p>
        <p>
          The rules for how to play using this app are{' '}
          <RulesSummaryButton as="a" style={{ cursor: 'pointer' }}>
            here
          </RulesSummaryButton>
          .
        </p>
        <p>
          A summary for how the Demon AI plays is{' '}
          <DemonAISummaryButton as="a" style={{ cursor: 'pointer' }}>
            here
          </DemonAISummaryButton>
          .
        </p>
        <p>
          This app is based on a solo variant written by Reverend Uncle Bastard
          (on BGG), but the app includes several changes (mainly to introduce
          events). The original variant can be found{' '}
          <a
            target="_"
            href="https://www.boardgamegeek.com/thread/1307964/claustrophobia-solo-variant-demon-ai-now-hellhound"
          >
            here
          </a>{' '}
          .
        </p>
        <p>To begin, pick a scenario below and start the game!</p>
        <Dropdown
          placeholder="Pick a Scenario..."
          search
          selection
          options={Object.keys(SCENARIOS).map(key => ({
            key,
            value: key,
            text: SCENARIOS[key].name,
          }))}
          onChange={(event, { value }) => this.setState({ scenario: value })}
          fluid
        />
        <br />
        <Button.Group vertical fluid>
          <Button
            primary
            fluid
            disabled={!scenario}
            onClick={() => game.startGame(scenario)}
          >
            Start Game
          </Button>
        </Button.Group>
      </div>
    )
  }
}

export default Welcome
