import type { Tile } from "@/tilesets";

interface CollapsedCell {
  index: number;
  tile: Tile;
}
export interface GridStep {
  grid: Tile[][];
  collapsedCell: null | CollapsedCell;
}
let columns: number, rows: number;
export function getInitialHistory(
  gridColumns: number,
  gridRows: number,
  tileset: Tile[]
) {
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

  const cellsNotCollapsed = grid.reduce<CellData[]>((acc, options, index) => {
    if (options.length > 1) acc.push({ options, index });
    return acc;
  }, []);

  if (cellsNotCollapsed.length === 0) return;

  let cellsLeastEntropy: CellData[] = [];
  let leastEntropy = getCellEntropy(grid[cellsNotCollapsed[0].index]);
  for (const cellNotCollapsed of cellsNotCollapsed) {
    const cell = grid[cellNotCollapsed.index];
    const cellEntropy = getCellEntropy(cell);

    if (cellEntropy === leastEntropy) {
      cellsLeastEntropy.push(cellNotCollapsed);
    } else if (cellEntropy < leastEntropy) {
      cellsLeastEntropy = [cellNotCollapsed];
      leastEntropy = cellEntropy;
    }
  }

  const randomCell = Math.floor(Math.random() * cellsLeastEntropy.length);
  const selectedCell = cellsLeastEntropy[randomCell];
  const selectedTile = collapseCell(selectedCell.options);

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

export function getCellEntropy(cell: Tile[]) {
  const sumOfWeights = cell.reduce((sumOfWeights, tile) => {
    sumOfWeights += tile.weight;
    return sumOfWeights;
  }, 0);

  const cellEntropy =
    cell.reduce((summation, tile) => {
      const tileProbability = tile.weight / sumOfWeights;
      const log2TileProbability = Math.log2(tileProbability);
      return summation + tileProbability * log2TileProbability;
    }, 0) * -1;

  // Scale it down between 0 and 1
  return cellEntropy / Math.log2(cell.length);
}

function collapseCell(cell: Tile[]) {
  const weights = [cell[0].weight];
  for (let i = 1; i < cell.length; i++) {
    weights[i] = cell[i].weight + weights[i - 1];
  }

  const random = Math.random() * weights[weights.length - 1];
  let weightIndex;
  for (weightIndex = 0; weightIndex < weights.length; weightIndex++) {
    if (weights[weightIndex] > random) break;
  }

  return cell[weightIndex];
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
      if (neighborIsInCurrentPath) return null;
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

  return [bottomIndex, rightIndex, topIndex, leftIndex];
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
