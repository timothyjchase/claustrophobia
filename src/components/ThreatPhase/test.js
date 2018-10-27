import React from 'react'
import ThreatPhase from './index'

describe('<ThreatPhase />', () => {
  const commonProps = {
    scenario: {},
    threatDice: 6,
    legalPlacement: true,
    completeThreatDemonPlacementStep: jest.fn(),
    completeThreatTrogsDistanceStep: jest.fn(),
    completeThreatTrogsPlacementStep: jest.fn(),
    completeThreatSpawnDemonStep: jest.fn(),
    completeThreatSpawnTrogsStep: jest.fn(),
    completeThreatEventStep: jest.fn(),
  }
  describe('with step = CHECK_DEMON_PLACEMENT', () => {
    const component = shallow(
      <ThreatPhase threatStep="CHECK_DEMON_PLACEMENT" {...commonProps} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with step = CHECK_TROGS_DISTANCE', () => {
    const component = shallow(
      <ThreatPhase threatStep="CHECK_TROGS_DISTANCE" {...commonProps} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with step = CHECK_TROGS_PLACEMENT', () => {
    const component = shallow(
      <ThreatPhase threatStep="CHECK_TROGS_PLACEMENT" {...commonProps} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with step = SPAWN_DEMON', () => {
    const component = shallow(
      <ThreatPhase threatStep="SPAWN_DEMON" {...commonProps} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with step = SPAWN_TROGS', () => {
    const component = shallow(
      <ThreatPhase threatStep="SPAWN_TROGS" {...commonProps} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with step = THREAT_EVENT', () => {
    const component = shallow(
      <ThreatPhase threatStep="THREAT_EVENT" {...commonProps} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
