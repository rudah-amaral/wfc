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

  grid.forEach((tileOptions, cellIndex) => {
    if (tileOptions.length !== 1) return;
    limitNeighborsOptions(cellIndex);
  });

  function limitNeighborsOptions(cellIndex: number) {
    const currentTileIndex = grid[cellIndex][0];
    const currentTile = tiles[currentTileIndex];
    const neighborsIndexes = getNeighborsIndexes(cellIndex);

    for (let neighborWay = 0; neighborWay < 4; neighborWay++) {
      let neighborIndex = neighborsIndexes[neighborWay];
      let neighborOptions = grid[neighborIndex];
      if (neighborOptions.length <= 1) continue;

      const currentEdge = currentTile.edges[neighborWay];
      limitCellsOptions(neighborIndex, neighborWay, currentEdge);
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

  function limitCellsOptions(cellIndex: number, cellWay: number, edge: string) {
    edge = reverseString(edge);
    const targetWay = (cellWay + 2) % 4;
    grid[cellIndex].forEach((tileOption) => {
      const possibleTile = tiles[tileOption];
      const possibleEdge = possibleTile.edges[targetWay];
      const edgesNotCompatible = edge !== possibleEdge;

      if (edgesNotCompatible) rejectTile(cellIndex, tileOption);
    });
  }

  function reverseString(string: string) {
    let stringArray = string.split("");
    stringArray.reverse();
    return stringArray.join("");
  }

  function rejectTile(cellIndex: number, rejectedTile: number) {
    const tileOptions = grid[cellIndex].slice();
    const rejectedTileIndex = tileOptions.indexOf(rejectedTile);

    tileOptions.splice(rejectedTileIndex, 1);
    grid[cellIndex] = tileOptions;
  }

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

    let nextGrid = grid.slice();
    const randomTile = Math.floor(Math.random() * selectedCell.options.length);
    nextGrid[selectedCell.index] = [selectedCell.options[randomTile]];
    setGrid(nextGrid);
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
