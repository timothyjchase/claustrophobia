import React from 'react'
import CheckTrogsDistanceStep from './index'

describe('<CheckTrogsDistanceStep />', () => {
  describe('with basic props', () => {
    const props = {
      completeThreatTrogsDistanceStep: jest.fn(),
    }
    const component = shallow(<CheckTrogsDistanceStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
