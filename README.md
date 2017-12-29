# node-cli-game
A super simple node.js command line text based game that uses regent as a logic engine.

## Why?

I recently open sourced a simple javascript logic engine we developed for an internal project at Northwestern Mutual (https://github.com/northwesternmutual/regent). I have been looking for ways to demonstrate it's value and thought a simple text based cli game would be a great use case.

If you take a look at `game.js` you will see all the stages of the game. You will notice that each one has an array of rules in a rules property. This is how we are telling the game engine which state is active. Basically, regent allows you to define the logic that tends to get scattered around in `if` statements and helper functions. Defining your "rules" in a single file and giving them human readable names helps makes the actual business logic part of your application more accessible to non-technical project contributors.

Ideally a non-technical person could look at `game.js` and understand how this game works. They don't need to care about the actual application state that make the rope visible, they just need to worry about it being visible or not.

This is a working demo, and I'm hoping to add more games to it to show off some of the more advanced features of `regent`. I will happily accept pull requests that improve or add new games as well. Hope this helps.

## Installation and setup

```bash
git clone https://github.com/eisenivan/computer-escape.git
cd computer-escape
npm install
npm run play
```

## Gameplay Tips

To quit the game type `quit` as your action.

## Development / Contribution

The game logic all lives inside of `game.js`. The progression is handled as an array of game stages, each one with actions. This game uses `regent` as the logic engine to select the correct game level.

I've chosen to format this project using Standard.js, so it would be super rad if you used the same if you choose to contribute :)
