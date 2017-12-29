import {
  levelOne,
  levelTwo,
  winner,
  lostGame,
  hasClimbingGear,
  ropeIsVisible,
  harnessIsVisible
} from './rules'

const firstRoom = {
  location: (state) => `Welcome ${state.name}. You open your eyes... squint into the light. Where are you? You look around. Hard drive, processor, graphics card. You must be inside a computer`,
  actions: [
    {
      verb: 'look around',
      response: 'Not much to see, but it looks like there is a disc eject button. Funny that it would be on the inside.',
      successState: {}
    },
    {
      verb: 'push disc eject',
      response: 'You hear the sound of gears whirling. A shaft of daylight shines down on you. Huzzah you think. A way out. Now, I just need to find away up there.',
      successState: {
        printLevelDescription: true,
        level: 1
      }
    }
  ],
  rules: [levelOne]
}

const secondRoom = {
  location: 'Now that you see some light it looks like you could probably climb that optical drive serial cable if you had some climbing gear.',
  actions: [
    {
      verb: 'look around',
      response: 'Hmmm... it looks like a normal computer mostly, but there is a lot of dust on the processor heat sink.'
    },
    {
      verb: 'dust',
      response: 'Excellent. Of course someone left some climbing gear in this dusty old heat sink. You now see a rope and a climbing harness.',
      successState: (state) => ({
        visibleItems: [...state.visibleItems, 'harness', 'rope']
      })
    },
    {
      verb: 'pick up rope',
      response: 'You examine the rope, it is a fine rope, and now it belongs to you.',
      successState: (state) => ({
        gear: [...state.gear, 'rope']
      }),
      rules: [ropeIsVisible],
      failResponse: 'There is no rope to be found'
    },
    {
      verb: 'pick up harness',
      response: 'This sturdy harness will prove to be most valuable on your climb.',
      successState: (state) => ({
        gear: [...state.gear, 'harness']
      }),
      rules: [harnessIsVisible],
      failResponse: 'You do not see a harness, why do you think you can pick one up?'
    },
    {
      verb: 'climb',
      response: 'It would obviously be better if you were in better shape, but you made it! You got out of the computer',
      successState: {
        printLevelDescription: true,
        level: 2
      },
      failResponse: 'You bravely start to climb the cable with no safety equipment, at first this proves to be an easy task, but the wire insulation proves to be slippery. You are about 3/4 of the way to the top when your grip begins to give way. Your fingers are numb and you just cannot... hold... on. With a gasp you fall.',
      failState: {
        level: 3,
        printLevelDescription: true
      },
      rules: [hasClimbingGear]
    }
  ],
  rules: [levelTwo]
}

const winnersPlatform = {
  location: 'Well, now what? Seems like we\'re done here. Good job. The cake is a lie.',
  actions: [],
  rules: [winner]
}

const gameOver = {
  location: 'You do not survive the fall. Maybe next time you can look around and find some safety gear to make your climb less dangerous ಠ_ಠ. I bet you need a rope and a harness',
  rules: [lostGame]
}

export default [
  firstRoom,
  secondRoom,
  winnersPlatform,
  gameOver
]
