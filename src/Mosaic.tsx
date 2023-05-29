import { useState } from "react";
import Tile, { tilesetProperties } from "./Tile";

interface MosaicProps {
  cols: number;
  rows: number;
  tileSize: number;
}

interface tileData {
  edges: string[];
  baseTileId: number;
  rotations: number;
}

let tiles: tileData[] = [];
tilesetProperties.forEach((baseTile, baseTileId) => {
  for (let rotations = 0; rotations <= baseTile.maxRotations; rotations++) {
    const rotatedTile = rotateTile(baseTile.edges, rotations);
    tiles.push({ edges: rotatedTile, baseTileId, rotations });
  }
});

function rotateTile(tile: string[], rotations: number) {
  rotations = rotations % 4;
  let rotatedTile = tile.slice();
  for (let i = 0; i < rotations; i++) {
    rotatedTile.unshift(rotatedTile.pop() as string);
  }

  return rotatedTile;
}

const cellOptions = tiles.map((_, tileIndex) => tileIndex);

export default function Mosaic({ cols, rows, tileSize }: MosaicProps) {
  const gridOptions = Array(cols * rows)
    .fill(null)
    .map(() => [...cellOptions]);
  let [grid, setGrid] = useState(gridOptions.slice());

  function handleClick() {
    let leastOptions = tiles.length;
    grid.forEach((tileOptions) => {
      if (tileOptions.length > 1 && tileOptions.length < leastOptions) {
        leastOptions = tileOptions.length;
      }
    });

    interface cellData {
      index: number;
      options: number[];
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
    setGrid(nextGrid);

    nextGrid.forEach((tileOptions, cellIndex, grid) => {
      if (tileOptions.length !== 1) return;

      const currentTileIndex = tileOptions[0];
      const currentTile = tiles[currentTileIndex];
      limitNeighborsOptions(grid, cellIndex, currentTile);
    });
  }

  function limitNeighborsOptions(
    grid: number[][],
    cellIndex: number,
    currentTile: tileData
  ) {
    const neighborsIndexes = getNeighborsIndexes(cellIndex);
    for (let neighborWay = 0; neighborWay < 4; neighborWay++) {
      let neighborIndex = neighborsIndexes[neighborWay];
      let neighborOptions = grid[neighborIndex];
      if (neighborOptions.length <= 1) continue;

      const currentEdge = currentTile.edges[neighborWay];
      limitCellsOptions(
        neighborOptions,
        neighborIndex,
        neighborWay,
        currentEdge
      );
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
    tileOptions: number[],
    cellIndex: number,
    comparatorToCellWay: number,
    comparatorsEdge: string
  ) {
    comparatorsEdge = reverseString(comparatorsEdge);
    const cellToComparatorWay = (comparatorToCellWay + 2) % 4;
    tileOptions.forEach((tileOption) => {
      const possibleTile = tiles[tileOption];
      const possibleEdge = possibleTile.edges[cellToComparatorWay];
      const edgesNotCompatible = comparatorsEdge !== possibleEdge;

      if (edgesNotCompatible) rejectTile(cellIndex, tileOption);
    });
  }

  function reverseString(string: string) {
    let stringArray = string.split("");
    stringArray.reverse();
    return stringArray.join("");
  }

  function rejectTile(cellIndex: number, rejectedTile: number) {
    setGrid((prevGrid) => {
      const nextGrid = prevGrid.slice();
      let tileOptions = nextGrid[cellIndex].slice();
      const rejectedTileIndex = tileOptions.indexOf(rejectedTile);

      if (rejectedTileIndex === -1) return prevGrid;

      tileOptions.splice(rejectedTileIndex, 1);
      nextGrid[cellIndex] = tileOptions;

      // TODO: After this state update some tiles will be consired collapsed but
      // it's neighbors won't have it's entropy re-calculated. Implement
      // recusive entropy propagation here

      return nextGrid;
    });
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
                  id={tiles[tileOptions[0]].baseTileId}
                  rotations={tiles[tileOptions[0]].rotations}
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
