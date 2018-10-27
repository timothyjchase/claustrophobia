import React from 'react'
import InitiativePhase from './index'

describe('<InitiativePhase />', () => {
  const commonProps = {
    useAuraOfBlessing: jest.fn(),
    useOilForYourLamp: jest.fn(),
    completeInitiativePhase: jest.fn(),
  }
  describe('with oilForYourLamp = true', () => {
    const component = shallow(
      <InitiativePhase oilForYourLamp {...commonProps} />,
    )

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with oilForYourLamp = false', () => {
    const component = shallow(
      <InitiativePhase oilForYourLamp={false} {...commonProps} />,
    )

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
