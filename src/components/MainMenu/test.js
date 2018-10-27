import React from 'react'
import MainMenu from './index'

describe('<MainMenu />', () => {
  const commonProps = {
    currentState: {},
    scenarioName: 'Test scenario',
    resetGame: jest.fn(),
    undoLastChange: jest.fn(),
  }
  describe('with basic props', () => {
    const component = shallow(<MainMenu {...commonProps} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
