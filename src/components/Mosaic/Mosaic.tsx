import { useEffect, useState } from "react";
import Tile from "../Tile";
import tileset from "../../circuit-tileset/tileset";
import styles from "./Mosaic.module.scss";

type tile = (typeof tileset)[number];
interface cellData {
  index: number;
  options: tile[];
}

interface MosaicProps {
  cols: number;
  rows: number;
}

interface CollapsedCell {
  index: number;
  tile: tile;
}
interface GridStep {
  grid: tile[][];
  collapsedCell: null | CollapsedCell;
}

export default function Mosaic({ cols, rows }: MosaicProps) {
  const gridOptions = Array(cols * rows)
    .fill(null)
    .map(() => [...tileset]);
  const initialHistory: GridStep[] = [
    {
      grid: gridOptions,
      collapsedCell: null,
    },
  ];
  let [history, setHistory] = useState(initialHistory);
  const [mosaicHasSolution, setMosaicHasSolution] = useState(true);
  const grid = history[history.length - 1].grid;

  useEffect(() => {
    setHistory(initialHistory);
  }, [cols, rows]);

  function handleClick() {
    const reachedDeadEnd = grid.some((tileOptions) => {
      return tileOptions.length === 0;
    });
    if (reachedDeadEnd) {
      undoLastGuess();
      return;
    }
    collapseCellWithLeastEntropy();
  }

  function undoLastGuess() {
    const nextHistory = [...history];
    const lastStep = nextHistory.length - 1;
    const failedGuess = nextHistory[lastStep].collapsedCell;
    // Base case representing having a cell with zero entropy in the first
    // step of the history, which only happens when the tileset has no
    // solution whatsoever with this combination of rows and columns
    if (failedGuess === null) {
      setMosaicHasSolution(false);
      return;
    }
    nextHistory.splice(lastStep);

    // To fix the previous step, remove the failed guess from the pool of
    // possible tiles
    const previousStep = nextHistory.length - 1;
    const previousGrid = nextHistory[previousStep].grid;
    let fixedCell = previousGrid[failedGuess.index].filter((tileOption) => {
      return tileOption !== failedGuess.tile;
    });
    previousGrid[failedGuess.index] = fixedCell;

    // And then recalculate the entropy propagated from that cell
    nextHistory[previousStep].grid = propagateEntropy(
      previousGrid,
      failedGuess.index
    );

    setHistory(nextHistory);
  }

  function collapseCellWithLeastEntropy() {
    let leastOptions = tileset.length;
    grid.forEach((tileOptions) => {
      if (tileOptions.length > 1 && tileOptions.length < leastOptions) {
        leastOptions = tileOptions.length;
      }
    });

    let cellsLeastOptions: cellData[] = [];
    grid.forEach((tileOptions, index) => {
      if (tileOptions.length === leastOptions) {
        cellsLeastOptions.push({ index, options: tileOptions });
      }
    });

    if (cellsLeastOptions.length === 0) {
      setHistory(initialHistory);
      return;
    }

    const randomCell = Math.floor(Math.random() * cellsLeastOptions.length);
    const selectedCell = cellsLeastOptions[randomCell];

    const randomTile = Math.floor(Math.random() * selectedCell.options.length);
    const selectedTile = selectedCell.options[randomTile];
    let nextGrid = grid.slice();
    nextGrid[selectedCell.index] = [selectedTile];
    nextGrid = propagateEntropy(nextGrid, selectedCell.index);

    setHistory([
      ...history,
      {
        grid: nextGrid,
        collapsedCell: {
          index: selectedCell.index,
          tile: selectedTile,
        },
      },
    ]);
  }

  interface propagationStep {
    path: number;
    neighbors: (number | null)[];
  }
  function propagateEntropy(grid: tile[][], selectedCellIndex: number) {
    let propagationStack: propagationStep[] = [];
    propagateToNeighbors(selectedCellIndex, propagationStack, grid);

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
        propagateToNeighbors(neighborIndex, propagationStack, grid);
      }
    }

    return grid;
  }

  function propagateToNeighbors(
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
    const rowOffset = Math.floor(cellIndex / cols) * cols;
    const rightIndex = ((cellIndex + 1) % cols) + rowOffset;
    const leftIndex = ((cellIndex + cols - 1) % cols) + rowOffset;

    const tilesAmount = rows * cols;
    const bottomIndex = (cellIndex + cols) % tilesAmount;
    const topIndex = (cellIndex - cols + tilesAmount) % tilesAmount;

    return [topIndex, rightIndex, bottomIndex, leftIndex];
  }

  function getCongruentTiles(tiles: tile[], pattern: tile[], tilesWay: number) {
    const patternWay = (tilesWay + 2) % 4;
    const tilesWithSameEdge: tile[] = [];

    tiles.forEach((tile) => {
      const tileEdge = reverseString(tile.edges[patternWay]);

      for (const comparator of pattern) {
        let comparatorEdge = comparator.edges[tilesWay];
        if (tileEdge === comparatorEdge) {
          tilesWithSameEdge.push(tile);
          break;
        }
      }
    });
    return tilesWithSameEdge;
  }

  function reverseString(string: string) {
    let stringArray = string.split("");
    stringArray.reverse();
    return stringArray.join("");
  }

  const tileSize = Math.min(1200, 0.9 * window.innerWidth) / cols;
  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
  };

  if (mosaicHasSolution) {
    return (
      <div className={styles.gridWrapper}>
        <div className={styles.grid} style={gridStyle} onClick={handleClick}>
          {grid.map((tileOptions, index) => {
            const rowStart = Math.floor(index / cols) + 1;
            const rowEnd = rowStart + 1;
            const colStart = (index % cols) + 1;
            const colEnd = colStart + 1;

            const cellStyle: React.CSSProperties = {
              fontSize: `${Math.floor(tileSize * 0.8)}px`,
              gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
            };

            return (
              <span style={cellStyle} className={styles.cell}>
                {tileOptions.length !== 1 ? (
                  tileOptions.length
                ) : (
                  <Tile id={tileOptions[0].id} size={tileSize} />
                )}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
  return <p>No solution</p>;
}
