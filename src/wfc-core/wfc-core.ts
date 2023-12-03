import tileset from "@/circuit-tileset/tileset";
import type { tile } from "@/circuit-tileset/tileset";

interface cellData {
  index: number;
  options: tile[];
}

interface CollapsedCell {
  index: number;
  tile: tile;
}

export interface GridStep {
  grid: tile[][];
  collapsedCell: null | CollapsedCell;
}

interface propagationStep {
  path: number;
  neighbors: (number | null)[];
}

let columns: number, rows: number;
export function generateInitialHistory(gridColumns: number, gridRows: number) {
  columns = gridColumns;
  rows = gridRows;
  const gridOptions = Array(gridColumns * gridRows)
    .fill(null)
    .map(() => [...tileset]);

  gridOptions.forEach((_, cellIndex) => {
    getNeighborsIndexes(cellIndex).forEach((neighborIndex, neighborWay) => {
      if (cellIndex !== neighborIndex) return;

      const validTiles: tile[] = [];
      gridOptions[cellIndex].forEach((tile) => {
        if (getCongruentTiles([tile], [tile], neighborWay).length > 0) {
          validTiles.push(tile);
        }
      });
      gridOptions[cellIndex] = validTiles;
    });
  });

  const initialHistory: GridStep[] = [
    {
      grid: gridOptions,
      collapsedCell: null,
    },
  ];
  return initialHistory;
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

export function collapseCellWithLeastEntropy(history: GridStep[]) {
  const grid = history[history.length - 1].grid;

  let leastOptions = tileset.length;
  grid.forEach((tileOptions) => {
    if (tileOptions.length > 1 && tileOptions.length < leastOptions) {
      leastOptions = tileOptions.length;
    }
  });

  const cellsLeastOptions: cellData[] = [];
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

function propagateEntropy(grid: tile[][], selectedCellIndex: number) {
  const propagationStack: propagationStep[] = [];
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

    const neighborOptions = grid[neighborIndex];
    const newNeighborOptions = getCongruentTiles(
      neighborOptions,
      grid[stackTop.path],
      neighborWay
    );

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
  propagationStack: propagationStep[],
  grid: tile[][]
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

function getCongruentTiles(tiles: tile[], pattern: tile[], tilesWay: number) {
  const patternWay = (tilesWay + 2) % 4;
  const tilesWithSameEdge: tile[] = [];

  tiles.forEach((tile) => {
    const tileEdge = reverseString(tile.edges[patternWay]);

    for (const comparator of pattern) {
      const comparatorEdge = comparator.edges[tilesWay];
      if (tileEdge === comparatorEdge) {
        tilesWithSameEdge.push(tile);
        break;
      }
    }
  });
  return tilesWithSameEdge;
}

function reverseString(string: string) {
  const stringArray = string.split("");
  stringArray.reverse();
  return stringArray.join("");
}
