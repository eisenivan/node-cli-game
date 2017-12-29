import prompt from 'prompt'
import regent from 'regent'
import assign from 'lodash.assign'
import gameRules from './game';

const king = regent.init()

let state = {
  name: '',
  level: 0,
}

const parseInput = (err, result) => {
  const level = king.findFirst(state, gameRules);
  console.log(level.location);
  prompt.get(['action'], (err, result) => {
    if (result.action !== 'quit') {
      const action = level.actions.find(action => action.verb === result.action)
      if (action) {
        console.log(action.response)
        state = assign({}, state, action.newState)
      }

      parseInput()
    }
  });
};

prompt.start()

prompt.get(['name'], (err, result) => {
  state.name = result.name
  parseInput()
});
