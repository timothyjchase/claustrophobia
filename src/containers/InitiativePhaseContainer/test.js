import React from 'react'
import { InitiativePhaseContainer, mapStateToProps } from './index'

describe('<InitiativePhaseContainer />', () => {
  describe('with scenarioKey = TEST_SCENARIO', () => {
    const props = {
      currentState: {
        oilForYourLamp: false,
      },
      useAuraOfBlessing: jest.fn(),
      useOilForYourLamp: jest.fn(),
      completeInitiativePhase: jest.fn(),
    }
    const component = shallow(<InitiativePhaseContainer {...props} />)

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
