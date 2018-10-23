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
          <strong>Claustrophobia</strong> board game (by CROC) solo.
        </p>
        <p>
          Please start be reading the short{' '}
          <RulesSummaryButton as="a" style={{ cursor: 'pointer' }}>
            rules summary
          </RulesSummaryButton>
          .
        </p>
        <p>
          It may be helpful to read the{' '}
          <DemonAISummaryButton as="a" style={{ cursor: 'pointer' }}>
            Demon AI summary
          </DemonAISummaryButton>{' '}
          to understand how it plays.
        </p>
        <p>Now you&apos;re ready to pick a scenario and start playing!</p>
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
        <br />
        <p>
          <i>
            This app is based on a solo variant written by Reverend Uncle
            Bastard (on BGG), with several changes (mainly to introduce events).
            If you want to play without the app, or you&apos;re just curious,
            check out the{' '}
            <a
              target="_"
              href="https://www.boardgamegeek.com/thread/1307964/claustrophobia-solo-variant-demon-ai-now-hellhound"
            >
              original variant
            </a>{' '}
            .
          </i>
        </p>
      </div>
    )
  }
}

export default Welcome
