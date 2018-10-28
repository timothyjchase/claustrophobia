import reducer, { initialState } from './index'
import {
  CHANGE_GAME_STATE,
  RESET_GAME_STATE,
  UNDO_LAST_CHANGE,
} from '../actions'

describe('reducer', () => {
  describe('no action', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })
  })
  describe('CHANGE_GAME_STATE', () => {
    it('should be handled', () => {
      const action = {
        type: CHANGE_GAME_STATE,
        payload: { scenarioKey: 'TEST_SCENARIO', turn: 1 },
      }
      expect(reducer(undefined, action)).toEqual({
        current: {
          ...initialState.current,
          ...action.payload,
        },
        history: [initialState.current],
      })
    })
  })
  describe('RESET_GAME_STATE', () => {
    it('should be handled', () => {
      const action = { type: RESET_GAME_STATE }
      expect(reducer({ current: {}, history: [] }, action)).toEqual({
        current: initialState.current,
        history: [{}],
      })
    })
  })
  describe('UNDO_LAST_CHANGE', () => {
    it('should be handled', () => {
      const action = { type: UNDO_LAST_CHANGE }
      expect(reducer({ history: [initialState.current] }, action)).toEqual(
        initialState,
      )
    })
  })
})
