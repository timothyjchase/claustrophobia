const INITIATIVE_PHASE = 'INITIATIVE'
const HUMAN_ACTION_PHASE = 'HUMAN_ACTION'
const THREAT_PHASE = 'THREAT'
const DEMON_ACTION_PHASE = 'DEMON_ACTION'

const SCENARIOS = {
  TEST_SCENARIO: {
    name: 'Test Scenario',
    demon: 'TEST_DEMON',
    demonLimit: 1,
  },
}

const DEMON_WARRIORS = {
  TEST_DEMON: {
    name: 'Test Demon',
  },
  TOUGH_TROGLODYTE: {
    name: 'Tough Troglodyte',
  },
  TROGLODYTE: {
    name: 'Troglodyte',
  },
}

const EVENTS = {
  TEST_EVENT: {
    name: 'Test Event',
    phase: THREAT_PHASE,
    getDescription: () => 'description',
    checkRelevent: () => true,
    getResult: () => {},
  },
  SIMPLE_EVENT: {
    name: 'Simple Event',
    phase: THREAT_PHASE,
    description: 'description',
  },
}

export {
  INITIATIVE_PHASE,
  HUMAN_ACTION_PHASE,
  THREAT_PHASE,
  DEMON_ACTION_PHASE,
  SCENARIOS,
  DEMON_WARRIORS,
  EVENTS,
}
