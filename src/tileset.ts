const tilesetProperties = [
  // Tile 0
  {
    edges: ["ABA", "ACA", "ABA", "ACA"],
    maxRotations: 1,
  },
  // Tile 1
  {
    edges: ["DDD", "DDD", "DDD", "DDD"],
    maxRotations: 0,
  },
  // Tile 2
  {
    edges: ["ABA", "AAD", "DDD", "DAA"],
    maxRotations: 3,
  },
  // Tile 3
  {
    edges: ["AAA", "AAA", "AAD", "DAA"],
    maxRotations: 3,
  },
  // Tile 4
  {
    edges: ["ABA", "ABA", "ABA", "ABA"],
    maxRotations: 1,
  },
  // Tile 5
  {
    edges: ["ABA", "ABA", "AAA", "AAA"],
    maxRotations: 3,
  },
  // Tile 6
  {
    edges: ["AAA", "AAA", "AAA", "AAA"],
    maxRotations: 0,
  },
  // Tile 7
  {
    edges: ["AAA", "ABA", "ABA", "ABA"],
    maxRotations: 3,
  },
  // Tile 8
  {
    edges: ["ABA", "AAA", "ABA", "AAA"],
    maxRotations: 1,
  },
  // Tile 9
  {
    edges: ["ACA", "AAA", "ABA", "AAA"],
    maxRotations: 3,
  },
  // Tile 10
  {
    edges: ["ABA", "ABA", "AAA", "AAA"],
    maxRotations: 3,
  },
  // Tile 11
  {
    edges: ["AAA", "ABA", "AAA", "ABA"],
    maxRotations: 1,
  },
  // Tile 12
  {
    edges: ["ABA", "AAA", "AAA", "AAA"],
    maxRotations: 3,
  },
  // Tile 13
  {
    edges: ["AAA", "ACA", "AAA", "ACA"],
    maxRotations: 1,
  },
];

function rotateTile(tile: string[]) {
  const nextTile = [...tile];
  nextTile.unshift(nextTile.pop() as string);
  return nextTile;
}

interface tile {
  edges: string[];
  tileId: number;
  rotations: number;
}

let tileset: tile[] = [];
tilesetProperties.forEach((baseTile, tileId) => {
  let tile = baseTile.edges;
  tileset.push({ edges: tile, rotations: 0, tileId });
  for (let rotations = 1; rotations <= baseTile.maxRotations; rotations++) {
    tile = rotateTile(tile);
    tileset.push({ edges: tile, rotations, tileId });
  }
});

export default tileset;
