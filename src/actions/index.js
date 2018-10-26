import { SCENARIOS, PHASES, THREAT_PHASE_STEPS, EVENTS } from '../config'

const CHANGE_GAME_STATE = 'CHANGE_GAME_STATE'
const RESET_GAME_STATE = 'RESET_GAME_STATE'
const UNDO_LAST_CHANGE = 'UNDO_LAST_CHANGE'

const getRandomNumber = (min = 1, max = 6) =>
  Math.floor(Math.random() * max) + min

const getEventResult = (state, phase) => {
  const { upcomingEvent, eventCount } = state
  if (upcomingEvent && upcomingEvent.phase === phase) {
    let result = {}
    if (EVENTS[upcomingEvent.key].getResult) {
      result = EVENTS[upcomingEvent.key].getResult(state)
    }
    return {
      upcomingEvent: null,
      eventCount: eventCount + 1,
      ...result,
    }
  }
  return {}
}

const startGame = scenario => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: { scenario, turn: 1, phase: PHASES.INITIATIVE },
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
      phase: PHASES.HUMAN_ACTION,
      ...getEventResult(state, PHASES.INITIATIVE),
    },
  })
}

const completeHumanActionPhase = () => (dispatch, getState) => {
  const state = getState().current
  const payload = {
    phase: PHASES.THREAT,
    threatRoll: getRandomNumber(),
    ...getEventResult(state, PHASES.HUMAN_ACTION),
  }
  // Add to Threat Die for The Ritual scenario
  if (
    state.scenario === 'THE_RITUAL' &&
    state.demonsInPlay &&
    state.threatDice < 6
  ) {
    payload.threatDice = state.threatDice + 1
  }
  // Check for adding a Demon
  if (
    !state.demonsInPlay &&
    state.demonsAdded < SCENARIOS[state.scenario].demonLimit
  ) {
    if (state.threatRoll > state.demonDice) {
      payload.threatStep = THREAT_PHASE_STEPS.CHECK_DEMON_PLACEMENT
    } else {
      payload.demonDice = state.demonDice - 1
    }
  }
  // Check for adding Trogs
  if (!payload.threatStep && state.trogsInPlay < state.threatDice) {
    payload.threatStep = THREAT_PHASE_STEPS.CHECK_TROGS_PLACEMENT
  }
  // Default next step
  if (!payload.threatStep) {
    payload.threatStep = THREAT_PHASE_STEPS.CHECK_TROGS_DISTANCE
  }

  dispatch({
    type: CHANGE_GAME_STATE,
    payload,
  })
}

const getCompleteThreatPhase = state => {
  const payload = {
    phase: PHASES.DEMON_ACTION,
    threatStep: null,
    threatDice: state.threatDice,
    ...getEventResult(state, PHASES.THREAT),
  }
  if (payload.threatDice >= 1 && state.trogsFar) {
    payload.trogsSupernaturalSpeed = true
    payload.threatDice -= 2
  }
  if (state.scenario === 'THE_RITUAL' && state.demonsInPlay) {
    payload.trogsSharpenedClaws = true
  } else if (payload.threatDice >= 1 && state.trogsClose) {
    payload.trogsSharpenedClaws = true
    payload.threatDice -= 1
  }
  if (payload.threatDice < 1) {
    payload.threatDice = getRandomNumber()
  }
  return payload
}

const drawEvent = state => {
  const keys = Object.keys(EVENTS)
  const key = keys[getRandomNumber(0, keys.length - 1)]
  const eventConfig = EVENTS[key]
  if (eventConfig.checkRelevent && !eventConfig.checkRelevent(state)) {
    return drawEvent(state)
  }
  return {
    key,
    name: eventConfig.name,
    description: eventConfig.getDescription
      ? eventConfig.getDescription(state)
      : eventConfig.description,
    phase: eventConfig.phase,
  }
}

const getEventOrCompleteThreatPhase = state => {
  let upcomingEvent
  if (state.eventRequired) {
    upcomingEvent = drawEvent(state)
  }
  if (upcomingEvent && upcomingEvent.phase === PHASES.THREAT) {
    return {
      threatStep: THREAT_PHASE_STEPS.THREAT_EVENT,
      eventRequired: false,
      upcomingEvent,
    }
  }
  return getCompleteThreatPhase(state)
}

const completeThreatDemonPlacementStep = legalPlacement => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      legalPlacement,
      threatStep: THREAT_PHASE_STEPS.SPAWN_DEMON,
    },
  })
}

const completeThreatTrogsPlacementStep = legalPlacement => dispatch => {
  dispatch({
    type: CHANGE_GAME_STATE,
    payload: {
      legalPlacement,
      threatStep: THREAT_PHASE_STEPS.SPAWN_TROGS,
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
      threatStep: THREAT_PHASE_STEPS.CHECK_TROGS_DISTANCE,
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
    phase: PHASES.INITIATIVE,
    legalPlacement: false,
    trogsFar: false,
    trogsClose: false,
    trogsSupernaturalSpeed: false,
    trogsSharpenedClaws: false,
    oilForYourLamp: false,
    ...getEventResult(state, PHASES.DEMON_ACTION),
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
  if (state.scenario === 'HIT_THEM_WHERE_IT_HURTS' && state.threatDice >= 3) {
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
