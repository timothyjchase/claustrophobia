import React from 'react'
import ThreatEventStep from './index'

describe('<ThreatEventStep />', () => {
  describe('with basic props', () => {
    const props = {
      completeThreatEventStep: jest.fn(),
    }
    const component = shallow(<ThreatEventStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
