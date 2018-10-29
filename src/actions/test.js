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
