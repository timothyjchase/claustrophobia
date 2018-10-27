import React from 'react'
import CheckTrogsPlacementStep from './index'

describe('<CheckTrogsPlacementStep />', () => {
  describe('with basic props', () => {
    const props = {
      completeThreatTrogsPlacementStep: jest.fn(),
    }
    const component = shallow(<CheckTrogsPlacementStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
