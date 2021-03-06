import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown } from 'semantic-ui-react'
import RulesSummaryButton from '../RulesSummaryButton'
import DemonAISummaryButton from '../DemonAISummaryButton'
import { SCENARIOS } from '../../config'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = { scenarioKey: undefined }
  }

  render() {
    const { startGame } = this.props
    const { scenarioKey } = this.state
    const options = Object.keys(SCENARIOS).map(key => ({
      key,
      value: key,
      text: SCENARIOS[key].name,
    }))

    return (
      <div>
        <p>
          Welcome to the
          <strong> Demon AI </strong>
          app for playing the
          <strong> Claustrophobia </strong>
          board game (by CROC) solo.
        </p>
        <p>
          Please start by reading the short
          {' '}
          <RulesSummaryButton as="a" style={{ cursor: 'pointer' }}>
            rules summary
          </RulesSummaryButton>
          .
        </p>
        <p>
          It may be helpful to read the
          {' '}
          <DemonAISummaryButton as="a" style={{ cursor: 'pointer' }}>
            Demon AI summary
          </DemonAISummaryButton>
          {' '}
          to understand how it plays.
        </p>
        <p>Now you&apos;re ready to pick a scenario and start playing!</p>
        <Dropdown
          placeholder="Pick a Scenario..."
          search
          selection
          options={options}
          onChange={(event, { value }) => this.setState({ scenarioKey: value })}
          fluid
        />
        <br />
        <Button.Group vertical fluid>
          <Button
            primary
            fluid
            disabled={!scenarioKey}
            content="Start Game"
            onClick={() => startGame(scenarioKey)}
          />
        </Button.Group>
        <br />
        <p>
          <i>
            This app is based on a solo variant written by Reverend Uncle
            Bastard (on BGG), with several changes (mainly to introduce events).
            If you want to play without the app, or you&apos;re just curious,
            check out the
            {' '}
            <a
              target="_"
              href="https://www.boardgamegeek.com/thread/1307964/claustrophobia-solo-variant-demon-ai-now-hellhound"
            >
              original variant
            </a>
            .
          </i>
        </p>
      </div>
    )
  }
}

Welcome.propTypes = {
  startGame: PropTypes.func.isRequired,
}

export default Welcome
