import { useState } from "react";
import Tile from "./Tile";

interface MosaicProps {
  columns: number;
  rows: number;
  tileSize: number;
}

export default function Mosaic({ columns, rows, tileSize }: MosaicProps) {
  let [grid, setGrid] = useState(
    Array<number | null>(columns * rows).fill(null)
  );

  let emptyCells: Array<number> = [];
  grid.forEach((cell, index) => {
    if (cell === null) {
      emptyCells.push(index);
    }
  });

  function getNeighborsId(cellIndex: number) {
    const rowOffset = Math.floor(cellIndex / columns) * columns;
    const tilesAmount = rows * columns;

    const rightId = grid[((cellIndex + 1) % columns) + rowOffset];
    const topId = grid[(cellIndex - columns + tilesAmount) % tilesAmount];
    const leftId = grid[((cellIndex + columns - 1) % columns) + rowOffset];
    const bottomId = grid[(cellIndex + columns) % tilesAmount];

    return [rightId, topId, leftId, bottomId];
  }

  function handleClick() {
    const pick = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (pick === undefined) return;

    const [rightId, topId, leftId, bottomId] = getNeighborsId(pick);
    console.table({
      "Index of collapsed cell": pick,
      "Right Neighbor ID": rightId,
      "Top Neighbor ID": topId,
      "Left Neighbor ID": leftId,
      "Bottom Neighbor ID": bottomId,
    });

    const tileId = Math.floor(Math.random() * 14);

    let nextGrid = grid.slice();
    nextGrid[pick] = tileId;
    setGrid(nextGrid);
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    width: "min-content",
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
  };

  return (
    <>
      <div style={gridStyle} onClick={handleClick}>
        {grid.map((tileId, index) => {
          const rowStart = Math.floor(index / columns) + 1;
          const colStart = (index % columns) + 1;

          const cellStyle: React.CSSProperties = {
            backgroundColor: "lightgray",
            gridArea: `${rowStart} / ${colStart} / ${rowStart + 1} / ${
              colStart + 1
            }`,
          };

          return (
            <span style={cellStyle}>
              {tileId === null ? null : <Tile id={tileId} size={tileSize} />}
            </span>
          );
        })}
      </div>
    </>
  );
}
