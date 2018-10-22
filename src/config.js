const SCENARIOS = {
  THE_SURVIVORS: {
    name: 'The Survivors',
    demon: 'UNDERGROUND_HUNTER',
    demonLimit: 2,
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
  },
  THE_POSSESSED: {
    name: 'The Possessed',
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
  CHECK_LEGAL_PLACEMENT: 'CHECK_LEGAL_PLACEMENT',
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
        An additional Troglodyte will be added during the Threat phase.`,
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
    getDescription: game => {
      if (game.scenario === 'THE_SURVIVORS') {
        return `Place a cave-in token on the tile opening with Fresh Air.
          If the Exit tile is already in play, place the token on an opening of
          the Exit tile connected to another tile.<br><br>
          Until the cave-in is cleared, no warrior can cross this opening.<br><br>
          Clearing the cave-in requires a combat action with at least CBT 2 from
          a tile adjacent to the blocked opening. Remove the token once the
          cave-in is cleared.`
      }
      return `Place a cave-in token on a tile opening separating
        Human warriors on adjacent tiles. Ignore this event, if there are no
        humans on adjacent tiles.<br><br>
        Until the cave-in is cleared, no warrior can cross this opening.<br><br>
        Clearing the cave-in requires a combat action with at least CBT 2 from
        a tile adjacent to the blocked opening. Remove the token once the
        cave-in is cleared.`
    },
    phase: PHASES.THREAT,
  },
  CRISIS_OF_FAITH: {
    name: 'Crisis of Faith',
    description: 'Gifts are cancelled this phase.',
    phase: PHASES.HUMAN_ACTION,
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
    checkRelevent: game => game.demonsInPlay > 0,
  },
  DEMONIC_POSSESSION: {
    name: 'Demonic Possession',
    description: `The Condemned warrior with the highest CBT and is on a tile
      with at least 1 other Human warrior attacks another Human warrior on that
      tile (lowest DEF if multiple to choose from).
      He cannot use a Grenade, or his Bodyguard Talent.`,
    phase: PHASES.THREAT,
  },
  PANIC: {
    name: 'Panic!',
    description: `Assign Action Dice to Human warriors randomly.<br><br>
      If the assigned Line of Action is cancelled, the Action Dice may be
      rerolled once.`,
    phase: PHASES.INITIATIVE,
  },
  SUICIDE_ATTACK: {
    name: 'Suicide Attack',
    description: `Choose 1 Troglodyte attacking this phase.
      It will gain <strong>+2 CBT</strong> for the attack.<br><br>
      Then remove the Troglodyte from the game.`,
    phase: PHASES.DEMON_ACTION,
    checkRelevent: game => game.trogsInPlay > 0,
  },
  TERROR: {
    name: 'Terror',
    getDescription: game => {
      if (game.scenario === 'THE_SURVIVORS') {
        return `Pick a Human warrior closest to the tile with Fresh Air (or
          closest to the Exit tile if it has already been placed) and move him
          to an adjacent tile away from the Fresh Air (or Exit tile),
          connected by an opening, without exceeding the tile limit.
          Ignore the Blocking rule`
      }
      return `Pick a random Human warrior and move him to a random adjacent
        tile, connected by an opening, without exceeding the tile limit.
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
    getDescription: game => {
      if (game.scenario === 'THE_SURVIVORS') {
        return `Place a Tough Troglodyte on the tile with the Fresh Air (or
          closest to the Exit tile if it has already been placed).<br><br>
          This Troglodyte will have the following stats: <strong>MVT 2, CBT 1,
          DEF 5</strong> and is <strong>Frantic</strong>.<br><br>
          This Troglodyte must be considered individually during combat
          (like a Demon). It is represented by placing the relevant token next
          to a regular Troglodyte miniature.`
      }
      return `Place a Tough Troglodyte on the tile with the most Human
        warriors.<br><br>
        This Troglodyte will have the following stats: <strong>MVT 2, CBT 1,
        DEF 5</strong> and is <strong>Frantic</strong>.<br><br>
        This Troglodyte must be considered individually during combat
        (like a Demon). It is represented by placing the relevant token next
        to a regular Troglodyte miniature.`
    },
    phase: PHASES.THREAT,
    complete: game => (game.toughTrogsInPlay = game.toughTrogsInPlay + 1),
  },
  TOXIC_FUMES: {
    name: 'Toxic Fumes',
    description: `Roll a die for each Human warrior on the tile with the most
      human warriors. The Human warriors suffer a hit on a die result of 3 or
      more.`,
    phase: PHASES.THREAT,
  },
  TRAP: {
    name: 'Trap',
    description: `Apply 1 hit to the Human warrior with the most hits
      (you may choose if tied).`,
    phase: PHASES.THREAT,
  },
  UNDER_THE_SIGN_OF_SATAN: {
    name: 'Under the Sign of Satan',
    description: `The Demon gains <strong>+1 MVT</strong>,
      <strong>+1 CBT</strong> and <strong>+1 DEF</strong> until the beginning
      of the next Threat Phase. Place the appropriate token on their reference
      card.`,
    phase: PHASES.THREAT,
    checkRelevent: game => game.demonsInPlay > 0,
  },
}

export { SCENARIOS, PHASES, THREAT_PHASE_STEPS, DEMON_WARRIORS, EVENTS }