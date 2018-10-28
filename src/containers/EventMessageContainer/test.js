import React from 'react'
import { EventMessageContainer, mapStateToProps } from './index'

describe('<EventMessageContainer />', () => {
  describe('with event matching current phase', () => {
    const props = {
      currentState: {
        phase: 'Test Phase',
        upcomingEvent: { phase: 'Test Phase' },
      },
      removeEvent: jest.fn(),
    }
    const component = shallow(<EventMessageContainer {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with event matching not current phase', () => {
    const props = {
      currentState: {
        phase: 'Test Phase 1',
        upcomingEvent: { phase: 'Test Phase 2' },
      },
      removeEvent: jest.fn(),
    }
    const component = shallow(<EventMessageContainer {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with no event', () => {
    const props = {
      currentState: {
        phase: 'Test Phase',
        upcomingEvent: null,
      },
      removeEvent: jest.fn(),
    }
    const component = shallow(<EventMessageContainer {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})

describe('mapStateToProps', () => {
  describe('with basic state', () => {
    const state = { current: {} }
    it('should return currentState', () => {
      expect(mapStateToProps(state)).toEqual({ currentState: {} })
    })
  })
})
