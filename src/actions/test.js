import {
  CHANGE_GAME_STATE,
  RESET_GAME_STATE,
  UNDO_LAST_CHANGE,
  startGame,
  resetGame,
  undoLastChange,
  completeInitiativePhase,
  completeHumanActionPhase,
  completeThreatDemonPlacementStep,
  completeThreatTrogsPlacementStep,
  completeThreatSpawnDemonStep,
  completeThreatSpawnTrogsStep,
  completeThreatTrogsDistanceStep,
  completeThreatEventStep,
  completeDemonActionPhase,
  removeEvent,
  addDemon,
  removeDemon,
  removeTrog,
  removeToughTrog,
  useAuraOfBlessing,
  useOilForYourLamp,
  placeDemonicMechanismTile,
  placeTile,
} from './index'
import {
  INITIATIVE_PHASE,
  HUMAN_ACTION_PHASE,
  THREAT_PHASE,
  DEMON_ACTION_PHASE,
} from '../config'

// Threat phase steps
const CHECK_DEMON_PLACEMENT_STEP = 'CHECK_DEMON_PLACEMENT'
const CHECK_TROGS_PLACEMENT_STEP = 'CHECK_TROGS_PLACEMENT'
const SPAWN_DEMON_STEP = 'SPAWN_DEMON'
const SPAWN_TROGS_STEP = 'SPAWN_TROGS'
const CHECK_TROGS_DISTANCE_STEP = 'CHECK_TROGS_DISTANCE'

describe('startGame', () => {
  describe('with TEST_SCENARIO', () => {
    const dispatch = jest.fn()
    startGame('TEST_SCENARIO')(dispatch)
    it('should dispatch new game', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          scenarioKey: 'TEST_SCENARIO',
          turn: 1,
          phase: INITIATIVE_PHASE,
        },
      })
    })
  })
})

describe('resetGame', () => {
  describe('with no args', () => {
    const dispatch = jest.fn()
    resetGame()(dispatch)
    it('should dispatch reset', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({ type: RESET_GAME_STATE })
    })
  })
})

describe('undoLastChange', () => {
  describe('with no history', () => {
    const dispatch = jest.fn()
    undoLastChange()(dispatch, () => ({ history: [] }))
    it('should not dispatch', () => {
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
  describe('with history', () => {
    const dispatch = jest.fn()
    undoLastChange()(dispatch, () => ({ history: [{}] }))
    it('should dispatch undo', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({ type: UNDO_LAST_CHANGE })
    })
  })
})

describe('completeInitiativePhase', () => {
  describe('with no args', () => {
    const dispatch = jest.fn()
    completeInitiativePhase()(dispatch, () => ({ current: {} }))
    it('should dispatch advance phase', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          phase: HUMAN_ACTION_PHASE,
        },
      })
    })
  })
})

describe('completeHumanActionPhase', () => {
  describe('with TEST_SCENARIO and demon required', () => {
    const dispatch = jest.fn()
    completeHumanActionPhase()(dispatch, () => ({
      current: {
        scenarioKey: 'TEST_SCENARIO',
        demonDice: 5,
        threatDice: 6,
        demonsInPlay: 0,
        demonsAdded: 0,
      },
    }))
    it('should advance to add demon', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          phase: THREAT_PHASE,
          threatRoll: 6,
          threatDice: 6,
          threatStep: CHECK_DEMON_PLACEMENT_STEP,
        },
      })
    })
  })
  describe('with TEST_SCENARIO and trogs required', () => {
    const dispatch = jest.fn()
    completeHumanActionPhase()(dispatch, () => ({
      current: {
        scenarioKey: 'TEST_SCENARIO',
        demonDice: 7,
        threatDice: 5,
        demonsInPlay: 0,
        demonsAdded: 0,
        trogsInPlay: 4,
      },
    }))
    it('should advance to add trogs', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          phase: THREAT_PHASE,
          threatRoll: 6,
          threatDice: 5,
          demonDice: 6,
          threatStep: CHECK_TROGS_PLACEMENT_STEP,
        },
      })
    })
  })
  describe('with TEST_SCENARIO and nothing required', () => {
    const dispatch = jest.fn()
    completeHumanActionPhase()(dispatch, () => ({
      current: {
        scenarioKey: 'TEST_SCENARIO',
        demonDice: 7,
        threatDice: 3,
        demonsInPlay: 0,
        demonsAdded: 0,
        trogsInPlay: 4,
      },
    }))
    it('should advance to add trogs', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          phase: THREAT_PHASE,
          threatRoll: 6,
          threatDice: 3,
          demonDice: 6,
          threatStep: CHECK_TROGS_DISTANCE_STEP,
        },
      })
    })
  })
  describe('with THE_RITUAL, demonsInPlay and trogs required', () => {
    const dispatch = jest.fn()
    completeHumanActionPhase()(dispatch, () => ({
      current: {
        scenarioKey: 'THE_RITUAL',
        demonDice: 6,
        threatDice: 5,
        demonsInPlay: 1,
        demonsAdded: 0,
        trogsInPlay: 5,
      },
    }))
    it('should advance to add trogs', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          phase: THREAT_PHASE,
          threatRoll: 6,
          threatDice: 6,
          threatStep: CHECK_TROGS_PLACEMENT_STEP,
        },
      })
    })
  })
  describe('with THE_RITUAL, no demonsInPlay and no trogs required', () => {
    const dispatch = jest.fn()
    completeHumanActionPhase()(dispatch, () => ({
      current: {
        scenarioKey: 'THE_RITUAL',
        demonDice: 6,
        threatDice: 5,
        demonsInPlay: 0,
        demonsAdded: 0,
        trogsInPlay: 5,
      },
    }))
    it('should advance to add trogs', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          phase: THREAT_PHASE,
          threatRoll: 6,
          threatDice: 5,
          threatStep: CHECK_TROGS_DISTANCE_STEP,
        },
      })
    })
  })
})

describe('completeThreatDemonPlacementStep', () => {
  describe('with legalPlacement', () => {
    const dispatch = jest.fn()
    completeThreatDemonPlacementStep(true)(dispatch)
    it('should dispatch advance step', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          legalPlacement: true,
          threatStep: SPAWN_DEMON_STEP,
        },
      })
    })
  })
})

describe('completeThreatTrogsPlacementStep', () => {
  describe('with legalPlacement', () => {
    const dispatch = jest.fn()
    completeThreatTrogsPlacementStep(true)(dispatch)
    it('should dispatch advance step', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          legalPlacement: true,
          threatStep: SPAWN_TROGS_STEP,
        },
      })
    })
  })
})

describe('completeThreatSpawnDemonStep', () => {
  describe('with legalPlacement', () => {
    const dispatch = jest.fn()
    completeThreatSpawnDemonStep(true)(dispatch, () => ({
      current: {
        demonsInPlay: 0,
        demonsAdded: 0,
        demonDice: 1,
      },
    }))
    it('should dispatch add demon and advance', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          demonsInPlay: 1,
          demonsAdded: 1,
          demonDice: 6,
          phase: DEMON_ACTION_PHASE,
        },
      })
    })
  })
})

describe('completeThreatSpawnTrogsStep', () => {
  describe('with 4 trogs', () => {
    const dispatch = jest.fn()
    completeThreatSpawnTrogsStep(4)(dispatch, () => ({
      current: {
        trogsInPlay: 1,
        trogsAdded: 2,
        threatDice: 3,
      },
    }))
    it('should dispatch add trogs and advance', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          trogsInPlay: 5,
          trogsAdded: 6,
          threatDice: 2,
          threatStep: CHECK_TROGS_DISTANCE_STEP,
        },
      })
    })
  })
})

describe('completeThreatTrogsDistanceStep', () => {
  describe('with trogsFar and trogsClose', () => {
    const dispatch = jest.fn()
    completeThreatTrogsDistanceStep(true, true)(dispatch, () => ({
      current: {},
    }))
    it('should dispatch distance and advance', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          trogsFar: true,
          trogsClose: true,
          phase: DEMON_ACTION_PHASE,
        },
      })
    })
  })
})

describe('completeThreatEventStep', () => {
  describe('with no args', () => {
    const dispatch = jest.fn()
    completeThreatEventStep()(dispatch, () => ({
      current: {},
    }))
    it('should dispatch advance', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          phase: DEMON_ACTION_PHASE,
        },
      })
    })
  })
})

describe('completeDemonActionPhase', () => {
  describe('with turn = 1', () => {
    const dispatch = jest.fn()
    completeDemonActionPhase()(dispatch, () => ({
      current: { turn: 1 },
    }))
    it('should dispatch advance to turn 2', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          turn: 2,
          phase: INITIATIVE_PHASE,
          legalPlacement: false,
          trogsFar: false,
          trogsClose: false,
          trogsSupernaturalSpeed: false,
          trogsSharpenedClaws: false,
          oilForYourLamp: false,
        },
      })
    })
  })
})

describe('removeEvent', () => {
  describe('with no args', () => {
    const dispatch = jest.fn()
    removeEvent()(dispatch)
    it('should dispatch clear upcomingEvent', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          upcomingEvent: null,
        },
      })
    })
  })
})

describe('addDemon', () => {
  describe('with no demons', () => {
    const dispatch = jest.fn()
    addDemon()(dispatch, () => ({
      current: { demonsInPlay: 0, demonsAdded: 0 },
    }))
    it('should dispatch add demon', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          demonsInPlay: 1,
          demonsAdded: 1,
        },
      })
    })
  })
})

describe('removeDemon', () => {
  describe('with 1 demon', () => {
    const dispatch = jest.fn()
    removeDemon()(dispatch, () => ({
      current: { demonsInPlay: 1 },
    }))
    it('should dispatch remove demon', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          demonsInPlay: 0,
        },
      })
    })
  })
})

describe('removeTrog', () => {
  describe('with 1 trog, oilForYourLamp = false ', () => {
    const dispatch = jest.fn()
    removeTrog()(dispatch, () => ({
      current: { trogsInPlay: 1, oilForYourLamp: false },
    }))
    it('should dispatch remove trog and require event', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          trogsInPlay: 0,
          eventRequired: true,
        },
      })
    })
  })
  describe('with 1 trog, oilForYourLamp = true', () => {
    const dispatch = jest.fn()
    removeTrog()(dispatch, () => ({
      current: { trogsInPlay: 1, oilForYourLamp: true },
    }))
    it('should dispatch remove trog and no require event', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          trogsInPlay: 0,
        },
      })
    })
  })
})

describe('removeToughTrog', () => {
  describe('with 1 tough trog', () => {
    const dispatch = jest.fn()
    removeToughTrog()(dispatch, () => ({
      current: { toughTrogsInPlay: 1 },
    }))
    it('should dispatch remove tough trog', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          toughTrogsInPlay: 0,
        },
      })
    })
  })
})

describe('useAuraOfBlessing', () => {
  describe('with threatDice = 6', () => {
    const dispatch = jest.fn()
    useAuraOfBlessing()(dispatch, () => ({
      current: { threatDice: 6 },
    }))
    it('should dispatch threatDice = 6', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          threatDice: 4,
        },
      })
    })
  })
})

describe('useOilForYourLamp', () => {
  describe('with no args', () => {
    const dispatch = jest.fn()
    useOilForYourLamp()(dispatch)
    it('should dispatch oilForYourLamp', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          oilForYourLamp: true,
        },
      })
    })
  })
})

describe('placeDemonicMechanismTile', () => {
  describe('with threatDice = 4', () => {
    const dispatch = jest.fn()
    placeDemonicMechanismTile()(dispatch, () => ({
      current: { threatDice: 4 },
    }))
    it('should dispatch threadDice = 6', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          threatDice: 6,
        },
      })
    })
  })
})

describe('placeTile', () => {
  describe('with TEST_SCENARIO', () => {
    const dispatch = jest.fn()
    placeTile()(dispatch, () => ({
      current: { scenarioKey: 'TEST_SCENARIO' },
    }))
    it('should do nothing', () => {
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
  describe('with HIT_THEM_WHERE_IT_HURTS, threatDice = 3', () => {
    const dispatch = jest.fn()
    placeTile()(dispatch, () => ({
      current: {
        scenarioKey: 'HIT_THEM_WHERE_IT_HURTS',
        trogsInPlay: 0,
        trogsAdded: 1,
        threatDice: 3,
      },
    }))
    it('should dispatch add trogs', () => {
      expect(dispatch).toBeCalled()
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: CHANGE_GAME_STATE,
        payload: {
          threatDice: 1,
          trogsInPlay: 2,
          trogsAdded: 3,
        },
      })
    })
  })
})
