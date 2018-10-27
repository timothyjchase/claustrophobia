import React from 'react'
import CheckDemonPlacementStep from './index'

describe('<CheckDemonPlacementStep />', () => {
  describe('with basic props', () => {
    const props = {
      completeThreatDemonPlacementStep: jest.fn(),
    }
    const component = shallow(<CheckDemonPlacementStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
