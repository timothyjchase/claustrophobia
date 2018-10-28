import React from 'react'
import { ThreatPhaseContainer, mapStateToProps } from './index'

describe('<ThreatPhaseContainer />', () => {
  const commonProps = {
    completeThreatDemonPlacementStep: jest.fn(),
    completeThreatTrogsDistanceStep: jest.fn(),
    completeThreatTrogsPlacementStep: jest.fn(),
    completeThreatSpawnDemonStep: jest.fn(),
    completeThreatSpawnTrogsStep: jest.fn(),
    completeThreatEventStep: jest.fn(),
  }
  describe('with scenarioKey = TEST_SCENARIO', () => {
    const currentState = {
      scenarioKey: 'TEST_SCENARIO',
      threatStep: 'STEP',
      legalPlacement: true,
      threatDice: 6,
    }
    const component = shallow(
      <ThreatPhaseContainer {...commonProps} currentState={currentState} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
  describe('with scenarioKey = null', () => {
    const currentState = {
      scenarioKey: null,
      threatStep: 'STEP',
      legalPlacement: true,
      threatDice: 6,
    }
    const component = shallow(
      <ThreatPhaseContainer {...commonProps} currentState={currentState} />,
    )
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot()
    })
  })
})

describe('mapStateToProps', () => {
  describe('with basic state', () => {
    const state = { current: {} }
    it('should return currentState', () => {
      expect(mapStateToProps(state)).toEqual({ currentState: {} })
    })
  })
})
