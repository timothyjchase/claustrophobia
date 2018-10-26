import {
  CHANGE_GAME_STATE,
  RESET_GAME_STATE,
  UNDO_LAST_CHANGE,
} from '../actions'

const initialState = {
  current: {
    scenario: null,
    turn: 0,
    phase: null,
    demonsInPlay: 0,
    demonsAdded: 0,
    trogsInPlay: 0,
    trogsAdded: 0,
    toughTrogsInPlay: 0,
    toughTrogsAdded: 0,
    demonDice: 6,
    threatDice: 6,
    threatRoll: 0,
    threatStep: null,
    eventCount: 0,
    eventRequired: false,
    legalPlacement: false,
    trogsFar: false,
    trogsClose: false,
    trogsSupernaturalSpeed: false,
    trogsSharpenedClaws: false,
    oilForYourLamp: false,
    upcomingEvent: null,
  },
  history: [],
}

const reducer = (state = initialState, action) => {
  const { current, history } = state

  switch (action.type) {
    case CHANGE_GAME_STATE:
      return {
        current: { ...current, ...action.payload },
        history: [...history, current],
      }
    case RESET_GAME_STATE:
      return {
        current: initialState.current,
        history: [...history, current],
      }
    case UNDO_LAST_CHANGE:
      return {
        current: history[history.length - 1],
        history: history.slice(0, history.length - 1),
      }
    default:
      return state
  }
}

export { initialState }
export default reducer
