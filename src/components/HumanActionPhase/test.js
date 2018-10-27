import React from 'react'
import HumanActionPhase from './index'

describe('<HumanActionPhase />', () => {
  const commonProps = {
    oilForYourLamp: false,
    demonsInPlay: 0,
    threatDice: 6,
    addDemon: jest.fn(),
    placeDemonicMechanismTile: jest.fn(),
    placeTile: jest.fn(),
    completeHumanActionPhase: jest.fn(),
  }
  describe('with scenario = THE_POSSESSED, oilForYourLamp = true', () => {
    const component = shallow(
      <HumanActionPhase
        {...commonProps}
        scenarioKey="THE_POSSESSED"
        oilForYourLamp
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenario = THE_POSSESSED, oilForYourLamp = false', () => {
    const component = shallow(
      <HumanActionPhase {...commonProps} scenarioKey="THE_POSSESSED" />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenario = THE_RITUAL, oilForYourLamp = false', () => {
    const component = shallow(
      <HumanActionPhase {...commonProps} scenarioKey="THE_RITUAL" />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenario = HIT_THEM_WHERE_IT_HURTS, demonsInPlay = 0, threatDice = 2', () => {
    const component = shallow(
      <HumanActionPhase
        {...commonProps}
        scenarioKey="HIT_THEM_WHERE_IT_HURTS"
        threatDice={2}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenario = HIT_THEM_WHERE_IT_HURTS, demonsInPlay = 1, threatDice = 3', () => {
    const component = shallow(
      <HumanActionPhase
        {...commonProps}
        scenarioKey="HIT_THEM_WHERE_IT_HURTS"
        demonsInPlay={1}
        threatDice={3}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
