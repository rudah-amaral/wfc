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

  function handleClick() {
    const pick = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (pick === undefined) return;

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
