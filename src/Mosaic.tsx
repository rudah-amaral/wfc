import { useState } from "react";
import Tile from "./Tile";
import tileset from "./tileset";

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
  type tile = (typeof tileset)[number];

  function handleClick() {
    let leastOptions = tileset.length;
    grid.forEach((tileOptions) => {
      if (tileOptions.length > 1 && tileOptions.length < leastOptions) {
        leastOptions = tileOptions.length;
      }
    });

    interface cellData {
      index: number;
      options: tile[];
    }
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

    nextGrid.forEach((tileOptions, cellIndex) => {
      if (tileOptions.length !== 1) return;

      const currentTile = tileOptions[0];
      limitNeighborsOptions(nextGrid, cellIndex, currentTile);
    });

    setGrid(nextGrid);
  }

  function limitNeighborsOptions(
    grid: tile[][],
    cellIndex: number,
    currentTile: tile
  ) {
    const neighborsIndexes = getNeighborsIndexes(cellIndex);
    for (let neighborWay = 0; neighborWay < 4; neighborWay++) {
      let neighborIndex = neighborsIndexes[neighborWay];
      let neighborOptions = grid[neighborIndex];
      if (neighborOptions.length <= 1) continue;

      const currentEdge = currentTile.edges[neighborWay];
      grid[neighborIndex] = limitCellsOptions(
        neighborOptions,
        neighborWay,
        currentEdge
      );
      // TODO: After this state update some tiles will be consired collapsed but
      // it's neighbors won't have it's entropy re-calculated. This can lead to
      // tiles being collapsed in ways that put the mosaic in a paradox state.
      // Implement recusive entropy propagation here
    }
  }

  function getNeighborsIndexes(cellIndex: number) {
    const rowOffset = Math.floor(cellIndex / cols) * cols;
    const rightIndex = ((cellIndex + 1) % cols) + rowOffset;
    const leftIndex = ((cellIndex + cols - 1) % cols) + rowOffset;

    const tilesAmount = rows * cols;
    const bottomIndex = (cellIndex + cols) % tilesAmount;
    const topIndex = (cellIndex - cols + tilesAmount) % tilesAmount;

    return [rightIndex, topIndex, leftIndex, bottomIndex];
  }

  function limitCellsOptions(
    tileOptions: tile[],
    comparatorToCellWay: number,
    comparatorsEdge: string
  ) {
    comparatorsEdge = reverseString(comparatorsEdge);
    const cellToComparatorWay = (comparatorToCellWay + 2) % 4;
    return tileOptions.filter((possibleTile) => {
      const possibleEdge = possibleTile.edges[cellToComparatorWay];
      return comparatorsEdge === possibleEdge;
    });
  }

  function reverseString(string: string) {
    let stringArray = string.split("");
    stringArray.reverse();
    return stringArray.join("");
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    width: "min-content",
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
  };

  return (
    <>
      <div style={gridStyle} onClick={handleClick}>
        {grid.map((tileOptions, index) => {
          const rowStart = Math.floor(index / cols) + 1;
          const colStart = (index % cols) + 1;

          const cellStyle: React.CSSProperties = {
            backgroundColor: "lightgray",
            gridArea: `${rowStart} / ${colStart} / ${rowStart + 1} / ${
              colStart + 1
            }`,
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
