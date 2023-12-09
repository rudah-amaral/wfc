import baseTileset from "@/circuit-tileset/tileset";
import type { BaseTile } from "@/circuit-tileset/tileset";

type ExpandedTile = Omit<BaseTile, "timesCanBeRotated">;
export interface Tile extends Omit<ExpandedTile, "edges"> {
  validNeighbors: Set<string>[];
}
let tileset: Tile[];
export async function getTileset() {
  const expandedTileset = await expandTileset(baseTileset);
  tileset = calculateValidNeighbors(expandedTileset);
  return tileset;
}

async function expandTileset(tileset: BaseTile[]) {
  const rotationableTiles = tileset.filter((tile) => tile.timesCanBeRotated);
  const tileImg = await loadTileImg(tileset[0].path);

  const canvas = document.createElement("canvas");
  const tileWidth = tileImg.width;
  const tileHeight = tileImg.height;

  canvas.width = tileWidth;
  canvas.height = tileHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw "canvas not generated";

  const expandedTileset = tileset.map<ExpandedTile>((tile) => {
    return {
      path: tile.path,
      edges: tile.edges,
    };
  });
  for (const rotationableTile of rotationableTiles) {
    const rotationableTileImg = await loadTileImg(rotationableTile.path);
    const timesCanBeRotated = rotationableTile.timesCanBeRotated!;

    let rotatedTileEdges = rotationableTile.edges;
    for (const timesRotated of timesCanBeRotated) {
      ctx.translate(tileWidth / 2, tileHeight / 2);
      ctx.rotate((timesRotated * Math.PI) / 2);
      ctx.translate(-tileWidth / 2, -tileHeight / 2);
      ctx.drawImage(rotationableTileImg, 0, 0, tileWidth, tileHeight);
      const rotatedTilePath = canvas.toDataURL();
      rotatedTileEdges = [...rotatedTileEdges];
      rotatedTileEdges.unshift(rotatedTileEdges.pop()!);

      expandedTileset.push({
        path: rotatedTilePath,
        edges: rotatedTileEdges,
      });

      ctx.resetTransform();
    }
  }
  return expandedTileset;
}

async function loadTileImg(tilePath: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = tilePath;
  });
}

function calculateValidNeighbors(expandedTileset: ExpandedTile[]) {
  const tilesetWithSets = expandedTileset.map<Tile>((tile) => {
    return {
      path: tile.path,
      validNeighbors: [
        new Set<string>(),
        new Set<string>(),
        new Set<string>(),
        new Set<string>(),
      ],
    };
  });

  for (let aTile = 0; aTile < expandedTileset.length; aTile++) {
    for (let bTile = aTile; bTile < expandedTileset.length; bTile++) {
      for (let way = 0; way < 4; way++) {
        const oppositeWay = (way + 2) % 4;

        const baseTile = expandedTileset[aTile];
        const tileEdge = baseTile.edges[way];

        const comparatorTile = expandedTileset[bTile];
        const comparatorEdge = reverseString(comparatorTile.edges[oppositeWay]);

        if (tileEdge === comparatorEdge) {
          tilesetWithSets[aTile].validNeighbors[way].add(comparatorTile.path);
          tilesetWithSets[bTile].validNeighbors[oppositeWay].add(baseTile.path);
        }
      }
    }
  }

  return tilesetWithSets;
}

function reverseString(string: string) {
  const stringArray = string.split("");
  stringArray.reverse();
  return stringArray.join("");
}

interface CollapsedCell {
  index: number;
  tile: Tile;
}
export interface GridStep {
  grid: Tile[][];
  collapsedCell: null | CollapsedCell;
}
let columns: number, rows: number;
export function getInitialHistory(gridColumns: number, gridRows: number) {
  columns = gridColumns;
  rows = gridRows;

  let validTiles = [...tileset];
  if (columns === 1) {
    validTiles = validTiles.filter((tile) =>
      tile.validNeighbors[1].has(tile.path)
    );
  }

  if (rows === 1) {
    validTiles = validTiles.filter((tile) =>
      tile.validNeighbors[0].has(tile.path)
    );
  }

  const gridOptions = Array<Tile[]>(columns * rows).fill([...validTiles]);
  const initialHistory: GridStep[] = [
    {
      grid: gridOptions,
      collapsedCell: null,
    },
  ];

  return initialHistory;
}

interface CellData {
  index: number;
  options: Tile[];
}
export function collapseCellWithLeastEntropy(history: GridStep[]) {
  const grid = history[history.length - 1].grid;

  let leastOptions = tileset.length;
  grid.forEach((tileOptions) => {
    if (tileOptions.length > 1 && tileOptions.length < leastOptions) {
      leastOptions = tileOptions.length;
    }
  });

  const cellsLeastOptions: CellData[] = [];
  grid.forEach((tileOptions, index) => {
    if (tileOptions.length === leastOptions) {
      cellsLeastOptions.push({ index, options: tileOptions });
    }
  });

  if (cellsLeastOptions.length === 0) return;

  const randomCell = Math.floor(Math.random() * cellsLeastOptions.length);
  const selectedCell = cellsLeastOptions[randomCell];

  const randomTile = Math.floor(Math.random() * selectedCell.options.length);
  const selectedTile = selectedCell.options[randomTile];
  let nextGrid = grid.slice();
  nextGrid[selectedCell.index] = [selectedTile];
  nextGrid = propagateEntropy(nextGrid, selectedCell.index);

  const nextHistory = [
    ...history,
    {
      grid: nextGrid,
      collapsedCell: {
        index: selectedCell.index,
        tile: selectedTile,
      },
    },
  ];
  return nextHistory;
}

interface PropagationStep {
  path: number;
  neighbors: (number | null)[];
}
function propagateEntropy(grid: Tile[][], selectedCellIndex: number) {
  const propagationStack: PropagationStep[] = [];
  pushToPropagationStack(selectedCellIndex, propagationStack, grid);

  while (propagationStack.length > 0) {
    const stackTop = propagationStack[propagationStack.length - 1];

    let neighborWay = stackTop.neighbors.length - 1;
    let neighborIndex = stackTop.neighbors.pop();
    while (neighborIndex === null) {
      neighborIndex = stackTop.neighbors.pop();
      neighborWay -= 1;
    }
    if (neighborIndex === undefined) {
      propagationStack.pop();
      continue;
    }

    const pathOptions = grid[stackTop.path];
    const neighborOptions = grid[neighborIndex];

    const newNeighborOptions = neighborOptions.filter((neighborOption) => {
      for (const pathOption of pathOptions) {
        if (pathOption.validNeighbors[neighborWay].has(neighborOption.path))
          return true;
      }
    });

    const entropyReduced = newNeighborOptions.length < neighborOptions.length;
    if (entropyReduced) {
      grid[neighborIndex] = newNeighborOptions;
      pushToPropagationStack(neighborIndex, propagationStack, grid);
    }
  }

  return grid;
}

function pushToPropagationStack(
  cellIndex: number,
  propagationStack: PropagationStep[],
  grid: Tile[][]
) {
  if (grid[cellIndex].length === 0) return;

  const neighborsToPropagate = getNeighborsIndexes(cellIndex).map(
    (neighborIndex) => {
      const neighborIsInCurrentPath = propagationStack.some((stackItem) => {
        return stackItem.path === cellIndex;
      });
      const neighborAlreadyCollapsed = grid[neighborIndex].length <= 1;

      if (neighborIsInCurrentPath || neighborAlreadyCollapsed) return null;
      return neighborIndex;
    }
  );
  propagationStack.push({ path: cellIndex, neighbors: neighborsToPropagate });
}

function getNeighborsIndexes(cellIndex: number) {
  const rowOffset = Math.floor(cellIndex / columns) * columns;
  const rightIndex = ((cellIndex + 1) % columns) + rowOffset;
  const leftIndex = ((cellIndex + columns - 1) % columns) + rowOffset;

  const tilesAmount = rows * columns;
  const bottomIndex = (cellIndex + columns) % tilesAmount;
  const topIndex = (cellIndex - columns + tilesAmount) % tilesAmount;

  return [topIndex, rightIndex, bottomIndex, leftIndex];
}

export function undoLastGuess(history: GridStep[]) {
  const nextHistory = [...history];
  const lastStep = nextHistory.length - 1;
  const failedGuess = nextHistory[lastStep].collapsedCell;
  // Base case representing having a cell with zero entropy in the first
  // step of the history, which only happens when the tileset has no
  // solution whatsoever with this combination of rows and columns
  if (failedGuess === null) return;

  nextHistory.splice(lastStep);

  // To fix the previous step, remove the failed guess from the pool of
  // possible tiles
  const previousStep = nextHistory.length - 1;
  const previousGrid = nextHistory[previousStep].grid;
  const fixedCell = previousGrid[failedGuess.index].filter((tileOption) => {
    return tileOption !== failedGuess.tile;
  });
  previousGrid[failedGuess.index] = fixedCell;

  // And then recalculate the entropy propagated from that cell
  nextHistory[previousStep].grid = propagateEntropy(
    previousGrid,
    failedGuess.index
  );

  return nextHistory;
}
