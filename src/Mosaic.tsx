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
  let [grid, setGrid] = useState(Array<number | null>(cols * rows).fill(null));
  let gridOptions: number[][] = grid.map(() => [...cellOptions]);

  grid.forEach((tileIndex, cellIndex) => {
    if (tileIndex === null) return;

    gridOptions[cellIndex] = [];
    limitNeighborsOptions(cellIndex);
  });

  function limitNeighborsOptions(cellIndex: number) {
    const tileIndex = grid[cellIndex] as number;
    const currentTile = tiles[tileIndex];
    const neighborsIndexes = getNeighborsIndexes(cellIndex);

    for (let neighborWay = 0; neighborWay < 4; neighborWay++) {
      let neighborIndex = neighborsIndexes[neighborWay];
      let neighborTileIndex = grid[neighborIndex];
      if (neighborTileIndex !== null) continue;

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
    gridOptions[cellIndex].forEach((cellOption) => {
      const possibleTile = tiles[cellOption];
      const possibleEdge = possibleTile.edges[targetWay];
      const edgesNotCompatible = edge !== possibleEdge;

      if (edgesNotCompatible) rejectTile(cellIndex, cellOption);
    });
  }

  function reverseString(string: string) {
    let stringArray = string.split("");
    stringArray.reverse();
    return stringArray.join("");
  }

  function rejectTile(cellIndex: number, rejectedTile: number) {
    const cellOptions = gridOptions[cellIndex].slice();
    const rejectedTileIndex = cellOptions.indexOf(rejectedTile);

    cellOptions.splice(rejectedTileIndex, 1);
    gridOptions[cellIndex] = cellOptions;
  }

  function handleClick() {
    let leastOptions = tiles.length;
    gridOptions.forEach((cellOptions) => {
      if (cellOptions.length !== 0 && cellOptions.length < leastOptions) {
        leastOptions = cellOptions.length;
      }
    });

    interface cellData {
      index: number;
      options: number[];
    }
    let cellsLeastOptions: cellData[] = [];
    gridOptions.forEach((options, index) => {
      if (options.length === leastOptions) {
        cellsLeastOptions.push({ index, options });
      }
    });

    const randomCell = Math.floor(Math.random() * cellsLeastOptions.length);
    const selectedCell = cellsLeastOptions[randomCell];

    if (selectedCell === undefined) {
      let nextGrid = grid.slice().fill(null);
      setGrid(nextGrid);
      return;
    }

    let nextGrid = grid.slice();
    const randomTile = Math.floor(Math.random() * selectedCell.options.length);
    nextGrid[selectedCell.index] = selectedCell.options[randomTile];
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
        {grid.map((tileIndex, index) => {
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
              {tileIndex === null ? (
                gridOptions[index].length
              ) : (
                <Tile
                  id={tiles[tileIndex].baseTileId}
                  rotations={tiles[tileIndex].rotations}
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
