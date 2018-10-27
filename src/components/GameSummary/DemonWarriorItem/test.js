import React from 'react'
import DemonWarriorItem from './index'

describe('<DemonWarriorItem />', () => {
  describe('with no warrior', () => {
    const component = shallow(
      <DemonWarriorItem
        warrior={{
          numberInPlay: 0,
          name: 'Test warrior',
          movement: 1,
          combat: 2,
          defense: 4,
          health: 5,
          rules: '',
          onRemove: jest.fn(),
        }}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with warrior, number in play=1, health = 5, rules', () => {
    const component = shallow(
      <DemonWarriorItem
        warrior={{
          numberInPlay: 1,
          name: 'Test warrior',
          movement: 1,
          combat: 2,
          defense: 4,
          health: 5,
          rules: 'custom',
          onRemove: jest.fn(),
        }}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with warrior, number in play=2, health = 1, no rules', () => {
    const component = shallow(
      <DemonWarriorItem
        warrior={{
          numberInPlay: 2,
          name: 'Test warrior',
          movement: 1,
          combat: 2,
          defense: 4,
          health: 1,
          onRemove: jest.fn(),
        }}
      />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
