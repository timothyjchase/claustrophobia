import React from 'react'
import GameSummary from './index'

describe('<GameSummary />', () => {
  const commonProps = {
    turn: 1,
    demonDice: 2,
    threatDice: 3,
  }
  describe('with a variety of warriors', () => {
    const component = shallow(
      <GameSummary
        {...commonProps}
        warriors={[
          { numberInPlay: 0 },
          { numberInPlay: 1 },
          { numberInPlay: 2 },
        ]}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with no warriors', () => {
    const component = shallow(
      <GameSummary {...commonProps} warriors={[{ numberInPlay: 0 }]} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
