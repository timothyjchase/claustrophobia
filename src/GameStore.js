import { decorate, observable } from 'mobx'
import {
  DEMON_WARRIORS,
  SCENARIOS,
  PHASES,
  THREAT_PHASE_STEPS,
  EVENTS,
} from './config'

class GameStore {
  scenario = null
  turn = 1
  phase = PHASES.INITIATIVE
  demonsInPlay = 0
  demonsAdded = 0
  trogsInPlay = 0
  trogsAdded = 0
  toughTrogsInPlay = 0
  toughTrogsAdded = 0
  demonDice = 6
  threatDice = 6
  threatRoll = 0
  threatStep = null
  eventCount = 0
  eventRequired = false
  legalPlacement = false
  trogsFar = false
  trogsClose = false
  trogsSupernaturalSpeed = false
  trogsSharpenedClaws = false
  oilForYourLamp = false
  event = null

  startGame(scenario) {
    this.scenario = scenario
    this.startPhase(PHASES.INITIATIVE)
  }

  startPhase(phase) {
    this.checkEventPlays(phase)
    this.phase = phase
  }

  completePhase(phase) {
    this.maybeRemoveEvent(phase)
  }

  maybeRequireEvent() {
    if (
      !this.oilForYourLamp &&
      !this.event &&
      this.getRandomNumber(1, this.trogsInPlay) === this.trogsInPlay
    ) {
      this.eventRequired = true
    }
  }

  drawEvent() {
    const keys = Object.keys(EVENTS)
    const key = keys[this.getRandomNumber(0, keys.length - 1)]
    const eventConfig = EVENTS[key]
    this.event = {
      key,
      name: eventConfig.name,
      description: eventConfig.getDescription
        ? eventConfig.getDescription(this)
        : eventConfig.description,
      phase: eventConfig.phase,
    }
    this.eventRequired = false
  }

  checkEventPlays(phase) {
    if (
      this.event &&
      this.event.phase === phase &&
      EVENTS[this.event.key].checkRelevent &&
      !EVENTS[this.event.key].checkRelevent(this)
    ) {
      this.removeEvent(true)
    }
  }

  maybeRemoveEvent(phase) {
    if (this.event && this.event.phase === phase) {
      this.removeEvent()
    }
  }

  removeEvent(skip = false) {
    if (!skip) {
      this.eventCount = this.eventCount + 1
      if (this.event.complete) {
        this.event.complete(this)
      }
    }
    this.event = null
  }

  completeInitiativePhase() {
    this.completePhase(PHASES.INITIATIVE)
    this.startPhase(PHASES.HUMAN_ACTION)
  }

  addDemon() {
    this.demonsInPlay = this.demonsInPlay + 1
  }

  removeDemon() {
    this.demonsInPlay = this.demonsInPlay - 1
  }

  removeTrog() {
    this.maybeRequireEvent()
    this.trogsInPlay = this.trogsInPlay - 1
  }

  removeToughTrog() {
    this.toughTrogsInPlay = this.toughTrogsInPlay - 1
  }

  addToughTrog() {
    this.toughTrogsInPlay = this.toughTrogsInPlay + 1
    this.toughTrogsAdded = this.toughTrogsAdded + 1
  }

  auraOfBlessing() {
    this.threatDice = Math.max(0, this.threatDice - 2)
  }

  setOilForYourLamp() {
    this.oilForYourLamp = true
  }

  demonicMechanismTile() {
    this.threatDice = Math.min(6, this.threatDice + 2)
  }

  anyOtherTile() {
    if (this.scenario === 'HIT_THEM_WHERE_IT_HURTS' && this.threatDice >= 3) {
      this.threatDice = Math.max(0, this.threatDice - 2)
      this.trogsInPlay = this.trogsInPlay + 2
      this.trogsAdded = this.trogsAdded + 2
    }
  }

  completeHumanActionPhase() {
    this.completePhase(PHASES.HUMAN_ACTION)
    this.startPhase(PHASES.THREAT)
    this.threatRoll = this.getRandomNumber()
    this.initThreatPhase()
  }

  initThreatPhase() {
    let lowerDemonDie = false

    if (this.eventRequired) {
      this.drawEvent()
      this.checkEventPlays(PHASES.THREAT)
    }
    if (this.event && this.event.phase === PHASES.THREAT) {
      this.threatStep = THREAT_PHASE_STEPS.THREAT_EVENT
      return
    }
    if (
      !this.demonsInPlay &&
      this.demonsAdded < SCENARIOS[this.scenario].demonLimit
    ) {
      if (this.threatRoll > this.demonDice) {
        this.threatStep = THREAT_PHASE_STEPS.CHECK_LEGAL_PLACEMENT
        return
      }
      lowerDemonDie = true
    }
    if (this.trogsInPlay < this.threatDice) {
      this.threatStep = THREAT_PHASE_STEPS.CHECK_LEGAL_PLACEMENT
      return
    }
    if (lowerDemonDie) {
      this.demonDice = this.demonDice - 1
    }
    this.threatStep = THREAT_PHASE_STEPS.CHECK_TROGS_DISTANCE
  }

  completeThreatLegalPlacementStep() {
    if (
      !this.demonsInPlay &&
      this.demonsAdded < SCENARIOS[this.scenario].demonLimit
    ) {
      if (this.threatRoll > this.demonDice) {
        this.threatStep = THREAT_PHASE_STEPS.SPAWN_DEMON
        return
      }
      this.demonDice = this.demonDice - 1
    }
    this.threatStep = THREAT_PHASE_STEPS.SPAWN_TROGS
  }

  completeThreatEventStep() {
    this.removeEvent()
    this.initThreatPhase()
  }

  completeThreatSpawnDemonStep() {
    this.demonsInPlay = 1
    this.demonsAdded = this.demonsAdded + 1
    this.demonDice = 6
    this.completeThreatPhase()
  }

  completeThreatSpawnTrogsStep(trogs) {
    this.threatDice = this.threatDice - 1
    this.trogsInPlay = this.trogsInPlay + trogs
    this.trogsAdded = this.trogsAdded + trogs
    this.threatStep = THREAT_PHASE_STEPS.CHECK_TROGS_DISTANCE
  }

  completeThreatPhase() {
    this.completePhase(PHASES.THREAT)
    this.threatStep = null
    if (this.threatDice >= 1 && this.trogsFar) {
      this.trogsSupernaturalSpeed = true
      this.threatDice = this.threatDice - 2
    }
    if (this.scenario === 'THE_RITUAL' && this.demonsInPlay) {
      this.trogsSharpenedClaws = true
    } else if (this.threatDice >= 1 && this.trogsClose) {
      this.trogsSharpenedClaws = true
      this.threatDice = this.threatDice - 1
    }
    if (this.threatDice < 1) {
      this.threatDice = this.getRandomNumber()
    }
    this.startPhase(PHASES.DEMON_ACTION)
  }

  completeDemonActionPhase() {
    this.completePhase(PHASES.DEMON_ACTION)
    this.legalPlacement = false
    this.trogsFar = false
    this.trogsClose = false
    this.trogsSupernaturalSpeed = false
    this.trogsSharpenedClaws = false
    this.oilForYourLamp = false
    this.startPhase(PHASES.INITIATIVE)
    this.turn = this.turn + 1
  }

  getRandomNumber(min = 1, max = 6) {
    return Math.floor(Math.random() * max) + min
  }

  getDemon() {
    return DEMON_WARRIORS[SCENARIOS[this.scenario].demon] || {}
  }
}

export default decorate(GameStore, {
  scenario: observable,
  turn: observable,
  phase: observable,
  demonsInPlay: observable,
  trogsInPlay: observable,
  toughTrogsInPlay: observable,
  demonDice: observable,
  threatDice: observable,
  threatRoll: observable,
  threatStep: observable,
  legalPlacement: observable,
  trogsFar: observable,
  trogsClose: observable,
  trogsSupernaturalSpeed: observable,
  trogsSharpenedClaws: observable,
  oilForYourLamp: observable,
  event: observable,
})
