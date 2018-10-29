import {
  INITIATIVE_PHASE,
  HUMAN_ACTION_PHASE,
  THREAT_PHASE,
  DEMON_ACTION_PHASE,
  SCENARIOS,
} from '../config'
import {
  getRandomNumber,
  getEventResult,
  getCompleteThreatPhase,
  getEventOrCompleteThreatPhase,
} from './actionHelpers'

// Threat phase steps
const CHECK_DEMON_PLACEMENT_STEP = 'CHECK_DEMON_PLACEMENT'
const CHECK_TROGS_PLACEMENT_STEP = 'CHECK_TROGS_PLACEMENT'
const SPAWN_DEMON_STEP = 'SPAWN_DEMON'
const SPAWN_TROGS_STEP = 'SPAWN_TROGS'
const CHECK_TROGS_DISTANCE_STEP = 'CHECK_TROGS_DISTANCE'

// Dispatch event types
const CHANGE_GAME_STATE = 'CHANGE_GAME_STATE'
const RESET_GAME_STATE = 'RESET_GAME_STATE'
const UNDO_LAST_CHANGE = 'UNDO_LAST_CHANGE'

const startGame = scenarioKey => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: { scenarioKey, turn: 1, phase: INITIATIVE_PHASE },
  })
}

const resetGame = () => dispatch => {
  dispatch({
    type: RESET_GAME_STATE,
  })
}

const undoLastChange = () => (dispatch, getState) => {
  const { history } = getState()
  if (history.length) {
    dispatch({
      type: UNDO_LAST_CHANGE,
    })
  }
}

const completeInitiativePhase = () => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      phase: HUMAN_ACTION_PHASE,
      ...getEventResult(state, INITIATIVE_PHASE),
    },
  })
}

const completeHumanActionPhase = () => (dispatch, getState) => {
  const state = getState().current
  const payload = {
    phase: THREAT_PHASE,
    threatRoll: getRandomNumber(),
    threatDice: state.threatDice,
    ...getEventResult(state, HUMAN_ACTION_PHASE),
  }
  // Add to Threat Die for The Ritual scenario
  if (
    state.scenarioKey === 'THE_RITUAL' &&
    state.demonsInPlay &&
    state.threatDice < 6
  ) {
    payload.threatDice = state.threatDice + 1
  }
  // Check for adding a Demon
  if (
    !state.demonsInPlay &&
    state.demonsAdded < (SCENARIOS[state.scenarioKey] || {}).demonLimit
  ) {
    if (payload.threatRoll > state.demonDice) {
      payload.threatStep = CHECK_DEMON_PLACEMENT_STEP
    } else {
      payload.demonDice = state.demonDice - 1
    }
  }
  // Check for adding Trogs
  if (!payload.threatStep && state.trogsInPlay < payload.threatDice) {
    payload.threatStep = CHECK_TROGS_PLACEMENT_STEP
  }
  // Default next step
  if (!payload.threatStep) {
    payload.threatStep = CHECK_TROGS_DISTANCE_STEP
  }

  dispatch({
    type: CHANGE_GAME_STATE,
    payload,
  })
}

const completeThreatDemonPlacementStep = legalPlacement => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      legalPlacement,
      threatStep: SPAWN_DEMON_STEP,
    },
  })
}

const completeThreatTrogsPlacementStep = legalPlacement => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      legalPlacement,
      threatStep: SPAWN_TROGS_STEP,
    },
  })
}

const completeThreatSpawnDemonStep = () => (dispatch, getState) => {
  const state = getState().current
  const demonsInPlay = state.demonsInPlay + 1
  const demonsAdded = state.demonsAdded + 1
  const demonDice = 6
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      demonsInPlay,
      demonsAdded,
      demonDice,
      ...getEventOrCompleteThreatPhase({
        ...state,
        demonsInPlay,
        demonsAdded,
        demonDice,
      }),
    },
  })
}

const completeThreatSpawnTrogsStep = trogs => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      threatDice: Math.max(state.threatDice - 1, 1),
      trogsInPlay: state.trogsInPlay + trogs,
      trogsAdded: state.trogsAdded + trogs,
      threatStep: CHECK_TROGS_DISTANCE_STEP,
    },
  })
}

const completeThreatTrogsDistanceStep = (trogsFar, trogsClose) => (
  dispatch,
  getState,
) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      trogsFar,
      trogsClose,
      ...getEventOrCompleteThreatPhase({ ...state, trogsFar, trogsClose }),
    },
  })
}

const completeThreatEventStep = () => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: getCompleteThreatPhase(state),
  })
}

const completeDemonActionPhase = () => (dispatch, getState) => {
  const state = getState().current
  const payload = {
    turn: state.turn + 1,
    phase: INITIATIVE_PHASE,
    legalPlacement: false,
    trogsFar: false,
    trogsClose: false,
    trogsSupernaturalSpeed: false,
    trogsSharpenedClaws: false,
    oilForYourLamp: false,
    ...getEventResult(state, DEMON_ACTION_PHASE),
  }
  dispatch({
    type: CHANGE_GAME_STATE,
    payload,
  })
}

const removeEvent = () => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      upcomingEvent: null,
    },
  })
}

const addDemon = () => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      demonsInPlay: state.demonsInPlay + 1,
      demonsAdded: state.demonsAdded + 1,
    },
  })
}

const removeDemon = () => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      demonsInPlay: state.demonsInPlay - 1,
    },
  })
}

const removeTrog = () => (dispatch, getState) => {
  const state = getState().current
  const payload = { trogsInPlay: state.trogsInPlay - 1 }
  if (
    !state.oilForYourLamp &&
    getRandomNumber(1, state.trogsInPlay) === state.trogsInPlay
  ) {
    payload.eventRequired = true
  }
  dispatch({
    type: CHANGE_GAME_STATE,
    payload,
  })
}

const removeToughTrog = () => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      toughTrogsInPlay: state.toughTrogsInPlay - 1,
    },
  })
}

const useAuraOfBlessing = () => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      threatDice: Math.max(0, state.threatDice - 2),
    },
  })
}

const useOilForYourLamp = () => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      oilForYourLamp: true,
    },
  })
}

const placeDemonicMechanismTile = () => (dispatch, getState) => {
  const state = getState().current
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      threatDice: Math.min(6, state.threatDice + 2),
    },
  })
}

const placeTile = () => (dispatch, getState) => {
  const state = getState().current
  if (
    state.scenarioKey === 'HIT_THEM_WHERE_IT_HURTS' &&
    state.threatDice >= 3
  ) {
    dispatch({
      type: CHANGE_GAME_STATE,
      payload: {
        threatDice: Math.max(0, state.threatDice - 2),
        trogsInPlay: state.trogsInPlay + 2,
        trogsAdded: state.trogsAdded + 2,
      },
    })
  }
}

export {
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
}
