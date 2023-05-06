import { render } from './renderer';
import { Coords, nextGameState } from './core';

export const templates: { [key: string]: Coords[] } = {
  blinker: [
    [1, 1],
    [1, 0],
    [1, 2],
  ],
  beacon: [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
    [3, 3],
    [3, 4],
    [4, 3],
    [4, 4],
  ],
  tub: [
    [1, 0],
    [0, 1],
    [1, 2],
    [2, 1],
  ],
};

let counter = 0;
const iterations = 30;

const play = (state: Coords[]) => {
  if (counter < iterations) {
    render(state);
    const next = nextGameState(state);
    counter++;
    setTimeout(() => play(next), 300);
  }
};
// render(templates.blinker);
play(templates.beacon);
