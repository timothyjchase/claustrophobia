import React from 'react'
import MainApp from './index'

describe('<MainApp />', () => {
  const commonProps = {
    currentState: { phase: 'test phase' },
    startGame: jest.fn(),
    resetGame: jest.fn(),
    undoLastChange: jest.fn(),
  }
  describe('with scenarioName', () => {
    const component = shallow(
      <MainApp {...commonProps} scenarioName="Test scenario" />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with no scenarioName', () => {
    const component = shallow(<MainApp {...commonProps} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
