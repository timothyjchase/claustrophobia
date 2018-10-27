import React from 'react'
import EventMessage from './index'

describe('<EventMessage />', () => {
  const commonProps = {
    removeEvent: jest.fn(),
  }
  describe('with test event', () => {
    const component = shallow(
      <EventMessage
        {...commonProps}
        upcomingEvent={{ name: 'Test event', description: 'Test description' }}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with event no description', () => {
    const component = shallow(
      <EventMessage {...commonProps} upcomingEvent={{ name: 'Test event' }} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
