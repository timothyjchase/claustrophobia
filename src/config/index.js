const SCENARIOS = {
  THE_SURVIVORS: {
    name: 'The Survivors',
    demon: 'UNDERGROUND_HUNTER',
    demonLimit: 2,
    demonSpawnLocation: `<li>the tile with <strong>Fresh Air</strong></li>
      <li>the <strong>Exit</strong> tile</li>`,
    trogsSpawnLocation: `<li>the tile with <strong>Fresh Air</strong></li>
      <li>the <strong>Exit</strong> tile</li>`,
  },
  HOLDING_BACK_THE_INVASION: {
    name: 'Holding Back The Invasion',
    demon: 'DEMON_OF_COMBAT',
    demonLimit: 2,
  },
  HIT_THEM_WHERE_IT_HURTS: {
    name: 'Hit Them Where It Hurts',
    demon: 'MASTER_OF_SOULS',
    demonLimit: 0,
  },
  THE_RITUAL: {
    name: 'The Ritual',
    demon: 'DEMON_OF_CRUELTY',
    demonLimit: 2,
    demonSpawnLocation: `<li>a path to the Pentacle Room with the <strong>fewest</strong> Human warriors</li>`,
    trogsSpawnLocation: `<li>a path to the Pentacle Room with a <strong>Seal of Protection</strong></li>
    <li>a path to the Pentacle Room with the <strong>fewest</strong> Human warriors</li>`,
  },
  THE_POSSESSED: {
    name: 'The Possessed',
    demon: 'POSSESSED_ONE',
    demonLimit: 0,
  },
  WHO_DARES_WINS: {
    name: 'Who Dares, Wins',
    demon: 'DEMON_OF_DESTRUCTION',
    demonLimit: 2,
  },
}

const PHASES = {
  INITIATIVE: 'INITIATIVE',
  HUMAN_ACTION: 'HUMAN_ACTION',
  THREAT: 'THREAT',
  DEMON_ACTION: 'DEMON_ACTION',
}

const THREAT_PHASE_STEPS = {
  THREAT_EVENT: 'THREAT_EVENT',
  CHECK_DEMON_PLACEMENT: 'CHECK_DEMON_PLACEMENT',
  CHECK_TROGS_PLACEMENT: 'CHECK_TROGS_PLACEMENT',
  SPAWN_DEMON: 'SPAWN_DEMON',
  SPAWN_TROGS: 'SPAWN_TROGS',
  CHECK_TROGS_DISTANCE: 'CHECK_TROGS_DISTANCE',
}

const DEMON_WARRIORS = {
  DEMON_OF_COMBAT: {
    name: 'Demon of Combat',
    health: 3,
    movement: 1,
    combat: 4,
    defense: 4,
    rules: `<strong>Impressive</strong> and <strong>Bodyguard</strong>`,
  },
  DEMON_OF_CRUELTY: {
    name: 'Demon of Cruelty',
    health: 3,
    movement: 1,
    combat: 0,
    defense: 4,
    rules: `All Troglodytes are <strong>Frantic</strong>.<br />
        Add 1 to Threat Die at start of Threat phase.`,
  },
  DEMON_OF_DESTRUCTION: {
    name: 'Demon of Desctruction',
    health: 4,
    movement: 2,
    combat: 1,
    defense: 4,
    rules: `Gain <strong>+3 CBT</strong> when sharing a tile with 2 or more Human
      warriors.`,
  },
  MASTER_OF_SOULS: {
    name: 'Master of Souls',
    health: 10,
    movement: 0,
    combat: 2,
    defense: 4,
    rules: `<strong>Blessed Hammer</strong> only causes 2 wounds per hit.<br />
        <strong>Blunderbuss</strong> cannot cause any wounds in ranged combat.`,
  },
  POSSESSED_ONE: {
    name: 'Possessed One',
    health: 4,
    movement: 2,
    combat: 2,
    defense: 4,
    rules: `<strong>Blessed Hammer</strong> only causes 2 wounds per hit.<br />
        All Troglodytes on the same tile are <strong>Bodyguards</strong>.<br />
        Becomes a Human warrior once exorcised (defeated).`,
  },
  TOUGH_TROGLODYTE: {
    name: 'Tough Troglodyte',
    health: 1,
    movement: 2,
    combat: 1,
    defense: 5,
    rules: `This Troglodyte is <strong>Frantic</strong>.`,
  },
  TROGLODYTE: {
    name: 'Troglodyte',
    health: 1,
    movement: 1,
    combat: 1,
    defense: 3,
  },
  UNDERGROUND_HUNTER: {
    name: 'Underground Hunter',
    health: 4,
    movement: 2,
    combat: 1,
    defense: 4,
    rules: `Gain <strong>+1 CBT</strong> per Line of Action canclled on the
      target.`,
  },
}

const EVENTS = {
  CAVE_IN: {
    name: 'Cave-In',
    getDescription: state => {
      if (state.scenarioKey === 'THE_SURVIVORS') {
        return `Place a cave-in token on the tile opening with Fresh Air.
          If the Exit tile is already in play, place the token on an opening of
          the Exit tile that is connected to another tile.<br><br>
          Until the cave-in is cleared, no warrior can cross this opening.<br><br>
          Clearing the cave-in requires a combat action with at least CBT 2 from
          a tile adjacent to the blocked opening. Remove the token once the
          cave-in is cleared.`
      }
      return `Place a cave-in token on a tile opening between
        Human warriors on adjacent tiles. Ignore this event, if there are no
        Human warriors on adjacent tiles.<br><br>
        Until the cave-in is cleared, no warrior can cross this opening.<br><br>
        Clearing the cave-in requires a combat action with at least CBT 2 from
        a tile adjacent to the blocked opening. Remove the token once the
        cave-in is cleared.`
    },
    phase: PHASES.THREAT,
  },
  CRISIS_OF_FAITH: {
    name: 'Crisis of Faith',
    description: 'Gifts may not be played this turn.',
    phase: PHASES.INITIATIVE,
  },
  DEFECT: {
    name: 'Defect',
    description: 'Discard an Object card of your choice.',
    phase: PHASES.THREAT,
  },
  DEMONIC_RAGE: {
    name: 'Demonic Rage',
    description: 'The Demon is <strong>Frantic</strong>.',
    phase: PHASES.THREAT,
    checkRelevent: state => state.demonsInPlay > 0,
  },
  DEMONIC_POSSESSION: {
    name: 'Demonic Possession',
    description: `The Condemned warrior with the highest CBT sharing a tile
      with at least 1 other Human warrior attacks a Human warrior on that
      tile (if multiple, choose lowest DEF then most wounds).
      He cannot use a Grenade or his Bodyguard Talent.`,
    phase: PHASES.THREAT,
  },
  PANIC: {
    name: 'Panic!',
    description: `Assign Action Dice to Human warriors randomly.<br><br>
      If the assigned Line of Action is cancelled, the Action Dice may be
      rerolled once per Human warrior.`,
    phase: PHASES.INITIATIVE,
  },
  SUICIDE_ATTACK: {
    name: 'Suicide Attack',
    description: `Choose 1 Troglodyte attacking this phase.
      It will gain <strong>+2 CBT</strong> for the attack.<br><br>
      Then remove the Troglodyte from the game.`,
    phase: PHASES.DEMON_ACTION,
    checkRelevent: state => state.trogsInPlay > 0,
  },
  TERROR: {
    name: 'Terror',
    getDescription: state => {
      if (state.scenarioKey === 'THE_SURVIVORS') {
        return `Pick a Human warrior closest to the tile with Fresh Air (or
          closest to the Exit tile if it has already been placed) and move him
          to an adjacent tile away from the Fresh Air (or Exit tile),
          connected by an opening, without exceeding the tile limit.
          Ignore the Blocking rule`
      }
      return `Using a die, pick a random Human warrior and move him to a
        random adjacent tile via an opening, without exceeding the tile limit.
        Ignore the Blocking rule.`
    },
    phase: PHASES.THREAT,
  },
  THEY_ARE_LEGION: {
    name: 'They Are Legion',
    description: `All Troglodytes gain +1 DEF during this phase.`,
    phase: PHASES.HUMAN_ACTION,
  },
  TOUGH_TROGLODYTE: {
    name: 'Tough Troglodyte',
    getDescription: state => {
      if (state.scenarioKey === 'THE_SURVIVORS') {
        return `Place a Tough Troglodyte on the tile with the Fresh Air (or
          closest to the Exit tile if it has already been placed).<br><br>
          This Troglodyte must be considered individually during combat
          (like a Demon). It is represented by placing the relevant token next
          to a regular Troglodyte miniature.`
      }
      return `Place a Tough Troglodyte on the tile with the most Human
        warriors.<br><br>
        This Troglodyte must be considered individually during combat
        (like a Demon). It is represented by placing the relevant token next
        to a regular Troglodyte miniature.`
    },
    phase: PHASES.THREAT,
    checkRelevent: state => state.scenarioKey !== SCENARIOS.THE_RITUAL,
    getResult: state => ({
      toughTrogsInPlay: state.toughTrogsInPlay + 1,
      toughTrogsAdded: state.toughTrogsAdded + 1,
    }),
  },
  TOXIC_FUMES: {
    name: 'Toxic Fumes',
    description: `Roll a die for each Human warrior on the tile with the most
      Human warriors. A Human warrior suffer a hit on a die result of 3 or
      more.`,
    phase: PHASES.THREAT,
  },
  TRAP: {
    name: 'Trap',
    description: `Apply 1 hit to the Human warrior with the most wounds
      (you may choose if tied).`,
    phase: PHASES.THREAT,
  },
  UNDER_THE_SIGN_OF_SATAN: {
    name: 'Under the Sign of Satan',
    description: `The Demon gains <strong>+1 MVT</strong>,
      <strong>+1 CBT</strong> and <strong>+1 DEF</strong> until the beginning
      of the next Threat Phase. Place the appropriate token to track this.`,
    phase: PHASES.THREAT,
    checkRelevent: state => state.demonsInPlay > 0,
  },
}

export { SCENARIOS, PHASES, THREAT_PHASE_STEPS, DEMON_WARRIORS, EVENTS }
