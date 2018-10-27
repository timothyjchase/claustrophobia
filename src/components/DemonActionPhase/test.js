import React from 'react'
import DemonActionPhase from './index'

describe('<DemonActionPhase />', () => {
  const commonProps = {
    demonsInPlay: 0,
    completeDemonActionPhase: jest.fn(),
  }
  describe('with scenario = THE_POSSESSED', () => {
    const component = shallow(
      <DemonActionPhase {...commonProps} scenarioKey="THE_POSSESSED" />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenario = THE_POSSESSED, trogsSupernaturalSpeed = true, trogsSharpenedClaws = true', () => {
    const component = shallow(
      <DemonActionPhase
        {...commonProps}
        scenarioKey="THE_POSSESSED"
        trogsSupernaturalSpeed
        trogsSharpenedClaws
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenario = THE_RITUAL, demonsInPlay=0', () => {
    const component = shallow(
      <DemonActionPhase {...commonProps} scenarioKey="THE_RITUAL" />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenario = THE_RITUAL, demonsInPlay=1', () => {
    const component = shallow(
      <DemonActionPhase
        {...commonProps}
        scenarioKey="THE_RITUAL"
        demonsInPlay={1}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
