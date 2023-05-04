import { render } from './renderer.js';

type Loc = [number, number];
type State = Map<EncodedLoc, null>;

type EncodedLoc = `${number},${number}`;
const encode = ([x, y]: Loc): EncodedLoc => `${x},${y}`;
const decode = (xy: EncodedLoc): Loc => {
  const [x, y] = xy.split(',');
  return [Number(x), Number(y)];
};

const getNeighborLocs = (encodedLoc: EncodedLoc): EncodedLoc[] => {
  const [x, y] = decode(encodedLoc);
  return [
    [x + 1, y + 1],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ].map(encode);
};
const survives = (loc: EncodedLoc, state: State) => {
  const neighbors = getNeighborLocs(loc);
  let aliveNeighbors = 0;
  neighbors.forEach((loc) => {
    if (state.has(loc)) aliveNeighbors++;
  });
  return 1 < aliveNeighbors && aliveNeighbors < 4;
};
const repopulates = (loc: EncodedLoc, state: State) => {
  const neighbors = getNeighborLocs(loc);
  let aliveNeighbors = 0;
  neighbors.forEach((loc) => {
    if (state.has(loc)) aliveNeighbors++;
  });
  return aliveNeighbors === 3;
};

const nextState = (currentState: Loc[]) => {
  const state = new Map<EncodedLoc, null>(
    currentState.map((loc) => [encode(loc), null]),
  );

  const survivors: State = new Map();
  state.forEach((_, key) => {
    if (survives(key, state)) {
      survivors.set(key, null);
    }
  });

  const repopulated = new Map();
  state.forEach((_, key) => {
    const neighbors = getNeighborLocs(key);
    neighbors.forEach((loc) => {
      if (!state.has(loc) && repopulates(loc, state)) {
        repopulated.set(loc, null);
      }
    });
  });

  repopulated.forEach((_, loc) => {
    survivors.set(loc, null);
  });

  return Array.from(survivors.keys()).map(decode);
};

const initial: Loc[] = [
  [1, 1],
  [1, 0],
  [1, 2],
];
let counter = 0;
const iterations = 30;

const play = (state: Loc[]) => {
  if (counter < iterations) {
    render(state);
    const next = nextState(state);
    counter++;
    setTimeout(() => play(next), 300);
  }
};
play(initial);
// render(initial);
// const a = nextState(initial);
//
// render(a);
// const b = nextState(a);
// render(b);
// console.log(b);
// const c = nextState(b);
// render(c);
// console.log(c);

// [
//   [1, 1],
//   [1, 2],
//   [2, 2],
//   [4, 4],
//   [1, 3],
//   [1, 4],
// ]

//[
//   [1, 0],
//   [0, 1],
//   [-1, 0],
//   [0, -1],
// ]

//[
//   [1, 1],
//   [1, 2],
//   [2, 1],
//   [2, 2],
//   [3, 3],
//   [3, 4],
//   [4, 3],
//   [4, 4],
// ]
