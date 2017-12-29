import {
  levelOne,
  levelTwo,
  winner
} from './rules'

export default [
  {
    location: (state) => `Welcome ${state.name}. You open your eyes... squint into the light. Where are you? You look around. Hard drive, processor, graphics card. You must be inside a computer`,
    actions: [
      {
        verb: 'look around',
        response: 'Not much to see, but it looks like there is a disc eject button. Funny that it would be on the inside.',
        newState: {}
      },
      {
        verb: 'push disc eject',
        response: 'You hear the sound of gears whirling. A shaft of daylight shines down on you. Huzzah you think. A way out. Now, I just need to find away up there.',
        newState: {
          printLevelDescription: true,
          level: 1
        }
      }
    ],
    rules: [levelOne]
  },
  {
    location: 'Now that you see some light it looks like you could probably climb that optical drive serial cable. Give it a try?',
    actions: [
      {
        verb: 'climb',
        response: 'It would obviously be better if you were in better shape, but you made it! You got out of the computer',
        newState: {
          printLevelDescription: true,
          level: 2
        }
      }
    ],
    rules: [levelTwo]
  },
  {
    location: 'Well, now what? Seems like we\'re done here. The cake is a lie',
    actions: [],
    rules: [winner]
  }
]
