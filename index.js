import prompt from 'prompt'
import regent from 'regent'
import assign from 'lodash.assign'
import gameRules from './game'

const { findFirst, rule } = regent.init()
const parseResult = (data, state) => typeof data === 'function' ? data(state) : data
const failState = (action) => {
  console.log(parseResult(action.failResponse, state))
  state = assign({}, state, parseResult(action.failState, state))
}
const successState = (action) => {
  console.log(parseResult(action.response, state))
  state = assign({}, state, parseResult(action.successState, state))
}

let state = {
  name: '',
  level: 0,
  printLevelDescription: true,
  gear: ['glasses'],
  visibleItems: []
}

const parseInput = (err, result) => {
  // blank line for readability
  console.log('')
  const level = findFirst(state, gameRules)
  if (level) {
    if (state.printLevelDescription) {
      const levelDescription = parseResult(level.location, state)
      console.log(levelDescription)
      state.printLevelDescription = false
    }

    prompt.get(['action'], (err, result) => {
      if (result.action !== 'quit') {
        const action = level.actions.find(action => action.verb === result.action)
        if (action) {
          // blank line for readability
          console.log('')

          // check for action rules
          if (action.rules) {
            const success = action.rules.every(single => rule(state, single))
            if (success) {
              successState(action)
            } else {
              failState(action)
            }
          } else {
            successState(action)
          }
        } else {
          // blank line for readability
          console.log('')
          console.log('Sorry, you cannot do that')
        }

        parseInput()
      }

      if (err) {
        throw new Error('Eh, something went wrong')
      }
    })
  }

  if (err) {
    throw new Error('Eh, something went wrong')
  }
}

prompt.start()

prompt.get(['name'], (err, result) => {
  state.name = result.name
  parseInput()

  if (err) {
    throw new Error('Eh, something went wrong')
  }
})
