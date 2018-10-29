import * as helpers from './index'
import { THREAT_PHASE, DEMON_ACTION_PHASE } from '../../config'

// Threat phase steps
const THREAT_EVENT_STEP = 'THREAT_EVENT'

describe('getRandomNumber', () => {
  describe('with 1, 1', () => {
    it('should return 1', () => {
      expect(helpers.getRandomNumber(1, 1)).toBe(1)
    })
  })
  describe('with no args', () => {
    it('should return between 1 and 6', () => {
      const result = helpers.getRandomNumber()
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(6)
    })
  })
})

describe('getEventResult', () => {
  describe('with TEST_EVENT for mismatching phase', () => {
    const state = {
      upcomingEvent: { key: 'TEST_EVENT', phase: 'phase 1' },
      eventCount: 0,
    }
    it('should return {}', () => {
      expect(helpers.getEventResult(state, 'phase 2')).toEqual({})
    })
  })
  describe('with TEST_EVENT for matching phase', () => {
    const state = {
      upcomingEvent: { key: 'TEST_EVENT', phase: 'phase' },
      eventCount: 0,
    }
    it('should clear event', () => {
      expect(helpers.getEventResult(state, 'phase')).toEqual({
        upcomingEvent: null,
        eventCount: 1,
      })
    })
  })
  describe('with SIMPLE_EVENT for matching phase', () => {
    const state = {
      upcomingEvent: { key: 'SIMPLE_EVENT', phase: 'phase' },
      eventCount: 0,
    }
    it('should clear event', () => {
      expect(helpers.getEventResult(state, 'phase')).toEqual({
        upcomingEvent: null,
        eventCount: 1,
      })
    })
  })
})

describe('drawEvent', () => {
  describe('with any event', () => {
    it('should return an event', () => {
      expect(helpers.drawEvent({})).toMatchObject({
        description: 'description',
        phase: THREAT_PHASE,
      })
    })
  })
  describe('with test event', () => {
    it('should return TEST_EVENT', () => {
      expect(helpers.drawEvent({}, () => 0)).toEqual({
        key: 'TEST_EVENT',
        name: 'Test Event',
        description: 'description',
        phase: THREAT_PHASE,
      })
    })
  })
  describe('with simple event', () => {
    it('should return TEST_EVENT', () => {
      expect(helpers.drawEvent({}, () => 1)).toEqual({
        key: 'SIMPLE_EVENT',
        name: 'Simple Event',
        description: 'description',
        phase: THREAT_PHASE,
      })
    })
  })
  describe('with ignore first', () => {
    it('should return TEST_EVENT', () => {
      expect(helpers.drawEvent({}, () => 0, true)).toEqual({
        key: 'TEST_EVENT',
        name: 'Test Event',
        description: 'description',
        phase: THREAT_PHASE,
      })
    })
  })
})

describe('getCompleteThreatPhase', () => {
  describe('with TEST_SCENARIO and no trogs', () => {
    const state = {
      scenarioKey: 'TEST_SCENARIO',
      threatDice: 5,
      trogsFar: false,
      trogsClose: false,
    }
    it('should advance to action phase', () => {
      expect(helpers.getCompleteThreatPhase(state)).toEqual({
        phase: DEMON_ACTION_PHASE,
        threatStep: null,
        threatDice: 5,
      })
    })
  })
  describe('with TEST_SCENARIO and trogsFar', () => {
    const state = {
      scenarioKey: 'TEST_SCENARIO',
      threatDice: 3,
      trogsFar: true,
      trogsClose: false,
    }
    it('should advance to action phase with upgrade', () => {
      expect(helpers.getCompleteThreatPhase(state)).toEqual({
        phase: DEMON_ACTION_PHASE,
        threatStep: null,
        threatDice: 1,
        trogsSupernaturalSpeed: true,
      })
    })
  })
  describe('with TEST_SCENARIO and trogsClose', () => {
    const state = {
      scenarioKey: 'TEST_SCENARIO',
      threatDice: 3,
      trogsFar: false,
      trogsClose: true,
    }
    it('should advance to action phase with upgrade', () => {
      expect(helpers.getCompleteThreatPhase(state)).toEqual({
        phase: DEMON_ACTION_PHASE,
        threatStep: null,
        threatDice: 2,
        trogsSharpenedClaws: true,
      })
    })
  })
  describe('with TEST_SCENARIO, trogsFar and trogsClose', () => {
    const state = {
      scenarioKey: 'TEST_SCENARIO',
      threatDice: 3,
      trogsFar: true,
      trogsClose: true,
    }
    it('should advance to action phase with upgrades', () => {
      expect(helpers.getCompleteThreatPhase(state, () => 6)).toEqual({
        phase: DEMON_ACTION_PHASE,
        threatStep: null,
        threatDice: 6,
        trogsSupernaturalSpeed: true,
        trogsSharpenedClaws: true,
      })
    })
  })
  describe('with THE_RITUAL and demonsInPlay', () => {
    const state = {
      scenarioKey: 'THE_RITUAL',
      threatDice: 3,
      trogsFar: false,
      trogsClose: true,
      demonsInPlay: 1,
    }
    it('should advance to action phase with free upgrade', () => {
      expect(helpers.getCompleteThreatPhase(state)).toEqual({
        phase: DEMON_ACTION_PHASE,
        threatStep: null,
        threatDice: 3,
        trogsSharpenedClaws: true,
      })
    })
  })
})

describe('getEventOrCompleteThreatPhase', () => {
  const getCompleteThreatPhase = () => ({ phase: DEMON_ACTION_PHASE })
  const drawEvent = () => ({ phase: THREAT_PHASE })
  describe('with no event required', () => {
    const state = {
      eventRequired: false,
    }
    it('should complete the threat phase', () => {
      expect(
        helpers.getEventOrCompleteThreatPhase(
          state,
          undefined,
          getCompleteThreatPhase,
        ),
      ).toEqual({ phase: DEMON_ACTION_PHASE })
    })
  })
  describe('with event required', () => {
    const state = {
      eventRequired: true,
    }
    it('should draw event', () => {
      expect(helpers.getEventOrCompleteThreatPhase(state, drawEvent)).toEqual({
        threatStep: THREAT_EVENT_STEP,
        eventRequired: false,
        upcomingEvent: { phase: THREAT_PHASE },
      })
    })
  })
})
