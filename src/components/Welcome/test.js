import React from 'react'
import Welcome from './index'

describe('<Welcome />', () => {
  describe('with basic props', () => {
    const props = {
      startGame: jest.fn(),
    }
    const component = shallow(<Welcome {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
