import React from 'react'
import ThreatEventStep from './index'

describe('<ViewDocumentPage />', () => {
  describe('with document', () => {
    const props = {
      completeThreatEventStep: jest.fn(),
    }
    const component = shallow(<ThreatEventStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
