import React from 'react'
import { HumanActionPhaseContainer, mapStateToProps } from './index'

describe('<HumanActionPhaseContainer />', () => {
  describe('with scenarioKey = TEST_SCENARIO', () => {
    const props = {
      currentState: {
        scenarioKey: 'TEST_SCENARIO',
        oilForYourLamp: false,
        threatDice: 1,
        demonsInPlay: 2,
      },
      addDemon: jest.fn(),
      placeDemonicMechanismTile: jest.fn(),
      placeTile: jest.fn(),
      completeHumanActionPhase: jest.fn(),
    }
    const component = shallow(<HumanActionPhaseContainer {...props} />)

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
