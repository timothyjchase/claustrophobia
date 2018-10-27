import React from 'react'
import GameOverButton from './index'

describe('<GameOverButton />', () => {
  const commonProps = {
    currentState: {
      turn: 1,
      demonsInPlay: 2,
      demonsAdded: 3,
      trogsInPlay: 4,
      trogsAdded: 5,
      toughTrogsInPlay: 6,
      toughTrogsAdded: 7,
      eventCount: 8,
    },
  }
  describe('with result = Victory, scenario', () => {
    const component = shallow(
      <GameOverButton
        {...commonProps}
        result="Victory"
        scenarioName="Test scenario"
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('handleOpen changes state to open = true', () => {
      component.instance().handleOpen()
      expect(component.state().open).toEqual(true)
    })
    it('handleClose changes state to open = false', () => {
      component.instance().handleClose()
      expect(component.state().open).toEqual(false)
    })
  })
  describe('with result = Defeat, scenario', () => {
    const component = shallow(
      <GameOverButton
        {...commonProps}
        result="Defeat"
        scenarioName="Test scenario"
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with result = Victory, no scenario', () => {
    const component = shallow(
      <GameOverButton {...commonProps} result="Victory" />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
