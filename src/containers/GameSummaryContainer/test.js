import React from 'react'
import { GameSummaryContainer, mapStateToProps } from './index'

describe('<GameSummaryContainer />', () => {
  describe('with scenarioKey = TEST_SCENARIO', () => {
    const props = {
      currentState: {
        scenarioKey: 'TEST_SCENARIO',
        turn: 1,
        demonDice: 2,
        threatDice: 3,
        demonsInPlay: 4,
        toughTrogsInPlay: 5,
        trogsInPlay: 6,
      },
      removeDemon: jest.fn(),
      removeToughTrog: jest.fn(),
      removeTrog: jest.fn(),
    }
    const component = shallow(<GameSummaryContainer {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenarioKey = null', () => {
    const props = {
      currentState: {
        scenarioKey: null,
        turn: 1,
        demonDice: 2,
        threatDice: 3,
        demonsInPlay: 4,
        toughTrogsInPlay: 5,
        trogsInPlay: 6,
      },
      removeDemon: jest.fn(),
      removeToughTrog: jest.fn(),
      removeTrog: jest.fn(),
    }
    const component = shallow(<GameSummaryContainer {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})

describe('mapStateToProps', () => {
  describe('with basic state', () => {
    const state = { current: {} }
    it('should return currentState', () => {
      expect(mapStateToProps(state)).toEqual({ currentState: {} })
    })
  })
})
