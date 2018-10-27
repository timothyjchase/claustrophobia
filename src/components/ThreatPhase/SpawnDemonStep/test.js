import React from 'react'
import SpawnDemonStep from './index'

describe('<SpawnDemonStep />', () => {
  describe('with location, legal placement', () => {
    const props = {
      scenario: { demonSpawnLocation: 'custom location' },
      legalPlacement: true,
      completeThreatSpawnDemonStep: jest.fn(),
    }
    const component = shallow(<SpawnDemonStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with no location, no legal placement', () => {
    const props = {
      scenario: {},
      legalPlacement: false,
      completeThreatSpawnDemonStep: jest.fn(),
    }
    const component = shallow(<SpawnDemonStep {...props} />)

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
