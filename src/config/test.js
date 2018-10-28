import { EVENTS } from './index'

describe('EVENTS', () => {
  describe('CAVE_IN', () => {
    const event = EVENTS.CAVE_IN
    it('getDescription for THE_SURVIVORS and THE_RITUAL do not match', () => {
      expect(event.getDescription({ scenarioKey: 'THE_SURVIVORS' })).not.toBe(
        event.getDescription({ scenarioKey: 'THE_RITUAL' }),
      )
    })
  })
  describe('DEMONIC_RAGE', () => {
    const event = EVENTS.DEMONIC_RAGE
    it('checkRelevent with demonsInPlay = 1 returns true', () => {
      expect(event.checkRelevent({ demonsInPlay: 1 })).toBe(true)
    })
    it('checkRelevent with demonsInPlay = 0 returns false', () => {
      expect(event.checkRelevent({ demonsInPlay: 0 })).toBe(false)
    })
  })
  describe('SUICIDE_ATTACK', () => {
    const event = EVENTS.SUICIDE_ATTACK
    it('checkRelevent with trogsInPlay = 1 returns true', () => {
      expect(event.checkRelevent({ trogsInPlay: 1 })).toBe(true)
    })
    it('checkRelevent with trogsInPlay = 0 returns false', () => {
      expect(event.checkRelevent({ trogsInPlay: 0 })).toBe(false)
    })
  })
  describe('TERROR', () => {
    const event = EVENTS.TERROR
    it('getDescription for THE_SURVIVORS and THE_RITUAL do not match', () => {
      expect(event.getDescription({ scenarioKey: 'THE_SURVIVORS' })).not.toBe(
        event.getDescription({ scenarioKey: 'THE_RITUAL' }),
      )
    })
  })
  describe('TOUGH_TROGLODYTE', () => {
    const event = EVENTS.TOUGH_TROGLODYTE
    it('getDescription for THE_SURVIVORS and THE_RITUAL do not match', () => {
      expect(event.getDescription({ scenarioKey: 'THE_SURVIVORS' })).not.toBe(
        event.getDescription({ scenarioKey: 'THE_RITUAL' }),
      )
    })
    it('checkRelevent with scenarioKey = THE_SURVIVORS returns true', () => {
      expect(event.checkRelevent({ scenarioKey: 'THE_SURVIVORS' })).toBe(true)
    })
    it('checkRelevent with scenarioKey = THE_RITUAL returns false', () => {
      expect(event.checkRelevent({ scenarioKey: 'THE_RITUAL' })).toBe(false)
    })
    it('getResult adds to toughTrogsInPlay and toughTrogsAdded', () => {
      expect(
        event.getResult({ toughTrogsInPlay: 0, toughTrogsAdded: 1 }),
      ).toEqual({ toughTrogsInPlay: 1, toughTrogsAdded: 2 })
    })
  })
  describe('UNDER_THE_SIGN_OF_SATAN', () => {
    const event = EVENTS.UNDER_THE_SIGN_OF_SATAN
    it('checkRelevent with demonsInPlay = 1 returns true', () => {
      expect(event.checkRelevent({ demonsInPlay: 1 })).toBe(true)
    })
    it('checkRelevent with demonsInPlay = 0 returns false', () => {
      expect(event.checkRelevent({ demonsInPlay: 0 })).toBe(false)
    })
  })
})
