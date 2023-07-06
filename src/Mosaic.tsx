import { useState } from "react";
import Tile from "./Tile";
import tileset from "./tileset";
import styles from "./Mosaic.module.scss";

type tile = (typeof tileset)[number];
interface cellData {
  index: number;
  options: tile[];
}

interface MosaicProps {
  cols: number;
  rows: number;
  tileSize: number;
}

export default function Mosaic({ cols, rows, tileSize }: MosaicProps) {
  const gridOptions = Array(cols * rows)
    .fill(null)
    .map(() => [...tileset]);
  let [grid, setGrid] = useState(gridOptions);

  function handleClick() {
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
      setGrid(gridOptions.slice());
      return;
    }

    const randomCell = Math.floor(Math.random() * cellsLeastOptions.length);
    const selectedCell = cellsLeastOptions[randomCell];

    const nextGrid = grid.slice();
    const randomTile = Math.floor(Math.random() * selectedCell.options.length);
    nextGrid[selectedCell.index] = [selectedCell.options[randomTile]];

    propagateEntropy(nextGrid, selectedCell);
  }

  interface propagationStep {
    path: number;
    neighbors: (number | null)[];
  }
  function propagateEntropy(grid: tile[][], selectedCell: cellData) {
    let propagationStack: propagationStep[] = [];
    propagateToNeighbors(selectedCell.index, propagationStack, grid);

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

    setGrid(grid);
  }

  function propagateToNeighbors(
    cellIndex: number,
    propagationStack: propagationStep[],
    grid: tile[][]
  ) {
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

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
  };

  return (
    <>
      <div className={styles.grid} style={gridStyle} onClick={handleClick}>
        {grid.map((tileOptions, index) => {
          const rowStart = Math.floor(index / cols) + 1;
          const rowEnd = rowStart + 1;
          const colStart = (index % cols) + 1;
          const colEnd = colStart + 1;

          const cellStyle: React.CSSProperties = {
            gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
          };

          return (
            <span style={cellStyle}>
              {tileOptions.length !== 1 ? (
                tileOptions.length
              ) : (
                <Tile
                  id={tileOptions[0].tileId}
                  rotations={tileOptions[0].rotations}
                  size={tileSize}
                />
              )}
            </span>
          );
        })}
      </div>
    </>
  );
}
