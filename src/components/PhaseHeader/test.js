import React from 'react'
import PhaseHeader from './index'

describe('<PhaseHeader />', () => {
  describe('with phase = INITIATIVE', () => {
    const component = shallow(<PhaseHeader phase="INITIATIVE" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with phase = HUMAN_ACTION', () => {
    const component = shallow(<PhaseHeader phase="HUMAN_ACTION" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with phase = THREAT', () => {
    const component = shallow(<PhaseHeader phase="THREAT" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with phase = DEMON_ACTION', () => {
    const component = shallow(<PhaseHeader phase="DEMON_ACTION" />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
