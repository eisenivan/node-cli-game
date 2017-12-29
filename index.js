import prompt from 'prompt'
import regent from 'regent'
import assign from 'lodash.assign'
import gameRules from './game'

const king = regent.init()
const parseResult = (data, state) => typeof data === 'function' ? data(state) : data

let state = {
  name: '',
  level: 0
}

const parseInput = (err, result) => {
  const level = king.findFirst(state, gameRules)
  if (level) {
    const levelDescription = parseResult(level.location)
    console.log(levelDescription)
    prompt.get(['action'], (err, result) => {
      if (result.action !== 'quit') {
        const action = level.actions.find(action => action.verb === result.action)
        if (action) {
          console.log(action.response)
          state = assign({}, state, action.newState)
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
