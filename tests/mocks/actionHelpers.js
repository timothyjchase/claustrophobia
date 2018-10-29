import { DEMON_ACTION_PHASE } from './config'

const getRandomNumber = (min, max = 6) => max

const getEventResult = () => ({})

const drawEvent = () => ({})

const getCompleteThreatPhase = () => ({
  phase: DEMON_ACTION_PHASE,
})

const getEventOrCompleteThreatPhase = () => ({
  phase: DEMON_ACTION_PHASE,
})

export {
  getRandomNumber,
  getEventResult,
  drawEvent,
  getCompleteThreatPhase,
  getEventOrCompleteThreatPhase,
}
