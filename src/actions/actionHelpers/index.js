import { THREAT_PHASE, DEMON_ACTION_PHASE, EVENTS } from '../../config'

// Threat phase steps
const THREAT_EVENT_STEP = 'THREAT_EVENT'

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

const drawEvent = (
  state,
  _getRandomNumber = getRandomNumber,
  ignoreFirst = false,
) => {
  const keys = Object.keys(EVENTS)
  const key = keys[_getRandomNumber(0, keys.length - 1)]
  const eventConfig = EVENTS[key]
  if (
    (eventConfig.checkRelevent && !eventConfig.checkRelevent(state)) ||
    ignoreFirst
  ) {
    return drawEvent(state, _getRandomNumber)
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

const getCompleteThreatPhase = (state, _getRandomNumber = getRandomNumber) => {
  const payload = {
    phase: DEMON_ACTION_PHASE,
    threatStep: null,
    threatDice: state.threatDice,
    ...getEventResult(state, THREAT_PHASE),
  }
  if (payload.threatDice >= 1 && state.trogsFar) {
    payload.trogsSupernaturalSpeed = true
    payload.threatDice -= 2
  }
  if (state.scenarioKey === 'THE_RITUAL' && state.demonsInPlay) {
    payload.trogsSharpenedClaws = true
  } else if (payload.threatDice >= 1 && state.trogsClose) {
    payload.trogsSharpenedClaws = true
    payload.threatDice -= 1
  }
  if (payload.threatDice < 1) {
    payload.threatDice = _getRandomNumber()
  }
  return payload
}

const getEventOrCompleteThreatPhase = (
  state,
  _drawEvent = drawEvent,
  _getCompleteThreatPhase = getCompleteThreatPhase,
) => {
  let upcomingEvent
  if (state.eventRequired) {
    upcomingEvent = _drawEvent(state)
  }
  if (upcomingEvent && upcomingEvent.phase === THREAT_PHASE) {
    return {
      threatStep: THREAT_EVENT_STEP,
      eventRequired: false,
      upcomingEvent,
    }
  }
  return _getCompleteThreatPhase(state)
}

export {
  getRandomNumber,
  getEventResult,
  drawEvent,
  getCompleteThreatPhase,
  getEventOrCompleteThreatPhase,
}
