import { useState } from "react";
import Tile from "./Tile";

interface MosaicProps {
  cols: number;
  rows: number;
  tileSize: number;
}

export default function Mosaic({ cols, rows, tileSize }: MosaicProps) {
  let [grid, setGrid] = useState(Array<number | null>(cols * rows).fill(null));

  let emptyCells: Array<number> = [];
  grid.forEach((cell, index) => {
    if (cell === null) {
      emptyCells.push(index);
    }
  });

  function getNeighborsId(cellIndex: number) {
    const rowOffset = Math.floor(cellIndex / cols) * columns;
    const tilesAmount = rows * cols;

    const rightId = grid[((cellIndex + 1) % cols) + rowOffset];
    const topId = grid[(cellIndex - cols + tilesAmount) % tilesAmount];
    const leftId = grid[((cellIndex + cols - 1) % columns) + rowOffset];
    const bottomId = grid[(cellIndex + cols) % tilesAmount];

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
    gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
  };

  return (
    <>
      <div style={gridStyle} onClick={handleClick}>
        {grid.map((tileId, index) => {
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
              {tileId === null ? null : <Tile id={tileId} size={tileSize} />}
            </span>
          );
        })}
      </div>
    </>
  );
}
