export type Coords = [number, number];
type GameState = Map<EncodedCoords, null>;

type EncodedCoords = `${number},${number}`;
const encode = ([x, y]: Coords): EncodedCoords => `${x},${y}`;
const decode = (xy: EncodedCoords): Coords => {
  const [x, y] = xy.split(',');
  return [Number(x), Number(y)];
};

const getNeighborLocs = (coords: EncodedCoords): EncodedCoords[] => {
  const [x, y] = decode(coords);
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
const survives = (coords: EncodedCoords, gameState: GameState) => {
  const neighbors = getNeighborLocs(coords);
  let aliveNeighbors = 0;
  neighbors.forEach((coords) => {
    if (gameState.has(coords)) aliveNeighbors++;
  });
  return 1 < aliveNeighbors && aliveNeighbors < 4;
};
const repopulates = (coords: EncodedCoords, gameState: GameState) => {
  const neighbors = getNeighborLocs(coords);
  let aliveNeighbors = 0;
  neighbors.forEach((coords) => {
    if (gameState.has(coords)) aliveNeighbors++;
  });
  return aliveNeighbors === 3;
};

export const nextGameState = (currentGameState: Coords[]) => {
  const gameState: GameState = new Map(
    currentGameState.map((coords) => [encode(coords), null]),
  );

  const survivors: GameState = new Map();
  gameState.forEach((_, key) => {
    if (survives(key, gameState)) {
      survivors.set(key, null);
    }
  });

  const repopulated = new Map();
  gameState.forEach((_, key) => {
    const neighbors = getNeighborLocs(key);
    neighbors.forEach((coords) => {
      if (!gameState.has(coords) && repopulates(coords, gameState)) {
        repopulated.set(coords, null);
      }
    });
  });

  repopulated.forEach((_, coords) => {
    survivors.set(coords, null);
  });

  return Array.from(survivors.keys()).map(decode);
};
