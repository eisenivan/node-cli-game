# computer-escape
A super simple node.js command line text based game that uses regent as a logic engine

## Installation and setup

```bash
git clone https://github.com/eisenivan/computer-escape.git
cd computer-escape
npm install
npm run play
```

## Gameplay

To quit the game type `quit` as your action.

## Development

The game logic all lives inside of `game.js`. The progression is handled as an array of game stages, each one with actions. This game uses `regent` as the logic engine to select the correct game level.
