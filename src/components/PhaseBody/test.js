import React from 'react'
import PhaseBody from './index'

describe('<PhaseBody />', () => {
  describe('with phase = INITIATIVE', () => {
    const component = shallow(<PhaseBody phase="INITIATIVE" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with phase = HUMAN_ACTION', () => {
    const component = shallow(<PhaseBody phase="HUMAN_ACTION" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with phase = THREAT', () => {
    const component = shallow(<PhaseBody phase="THREAT" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with phase = DEMON_ACTION', () => {
    const component = shallow(<PhaseBody phase="DEMON_ACTION" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
