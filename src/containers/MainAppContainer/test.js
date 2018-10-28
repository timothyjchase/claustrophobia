import React from 'react'
import { MainAppContainer, mapStateToProps } from './index'

describe('<MainAppContainer />', () => {
  describe('with scenarioKey = TEST_SCENARIO', () => {
    const props = {
      currentState: {
        scenarioKey: 'TEST_SCENARIO',
      },
      startGame: jest.fn(),
      resetGame: jest.fn(),
      undoLastChange: jest.fn(),
    }
    const component = shallow(<MainAppContainer {...props} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenarioKey = null', () => {
    const props = {
      currentState: {
        scenarioKey: null,
      },
      startGame: jest.fn(),
      resetGame: jest.fn(),
      undoLastChange: jest.fn(),
    }
    const component = shallow(<MainAppContainer {...props} />)
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
