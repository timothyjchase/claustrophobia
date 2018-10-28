import React from 'react'
import { DemonActionPhaseContainer, mapStateToProps } from './index'

describe('<DemonActionPhaseContainer />', () => {
  describe('with basic props', () => {
    const props = {
      currentState: { scenarioKey: 'Test Scenario', demonsInPlay: 0 },
      completeDemonActionPhase: jest.fn(),
    }
    const component = shallow(<DemonActionPhaseContainer {...props} />)

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
