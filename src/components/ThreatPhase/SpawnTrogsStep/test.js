import React from 'react'
import SpawnTrogsStep from './index'

describe('<SpawnTrogsStep />', () => {
  describe('with location, legal placement, threat 6', () => {
    const props = {
      scenario: { trogsSpawnLocation: 'custom location' },
      legalPlacement: true,
      threatDice: 6,
      completeThreatSpawnTrogsStep: jest.fn(),
    }
    const component = shallow(<SpawnTrogsStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('have max trogs = 6', () => {
      expect(component.state().maxTrogs).toEqual(6)
    })
    it('default trogs added = 6', () => {
      expect(component.state().trogsAdded).toEqual(6)
    })
  })
  describe('with no location, no legal placement, threat 2', () => {
    const props = {
      scenario: {},
      legalPlacement: false,
      threatDice: 2,
      completeThreatSpawnTrogsStep: jest.fn(),
    }
    const component = shallow(<SpawnTrogsStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
    it('have max trogs = 2', () => {
      expect(component.state().maxTrogs).toEqual(2)
    })
    it('default trogs added = 2', () => {
      expect(component.state().trogsAdded).toEqual(2)
    })
  })
  describe('with no location, no legal placement, threat 4', () => {
    const props = {
      scenario: {},
      legalPlacement: false,
      threatDice: 4,
      completeThreatSpawnTrogsStep: jest.fn(),
    }
    const component = shallow(<SpawnTrogsStep {...props} />)

    it('have max trogs = 3', () => {
      expect(component.state().maxTrogs).toEqual(3)
    })
    it('default trogs added = 3', () => {
      expect(component.state().trogsAdded).toEqual(3)
    })
  })
})
