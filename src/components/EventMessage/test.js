import React from 'react'
import EventMessage from './index'

describe('<EventMessage />', () => {
  const commonProps = {
    upcomingEvent: { name: 'Test event', description: 'Test description' },
    removeEvent: jest.fn(),
  }
  describe('with test event', () => {
    const component = shallow(<EventMessage {...commonProps} />)
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
