import Tile from "../Tile";
import { tile } from "../../wfc-core";
import styles from "./Grid.module.scss";

interface GridProps {
  columns: number;
  rows: number;
  grid: tile[][];
}

export default function Grid({ columns, rows, grid }: GridProps) {
  const tileSize = Math.floor(
    Math.min(1200, 0.9 * window.innerWidth) / columns
  );

  const cells = grid.map((tileOptions, index) => {
    const rowStart = Math.floor(index / columns) + 1;
    const rowEnd = rowStart + 1;
    const colStart = (index % columns) + 1;
    const colEnd = colStart + 1;
    const cellStyle: React.CSSProperties = {
      fontSize: `${Math.floor(tileSize * 0.8)}px`,
      gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
    };

    return (
      <span style={cellStyle} className={styles.cell} key={index}>
        {tileOptions.length === 1 ? (
          <Tile id={tileOptions[0].id} size={tileSize} />
        ) : (
          tileOptions.length
        )}
      </span>
    );
  });

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
  };
  return (
    <div className={styles.grid} style={gridStyle}>
      {cells}
    </div>
  );
}
