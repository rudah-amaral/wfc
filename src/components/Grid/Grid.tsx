import Tile from "../Tile";
import { tile } from "../../wfc-core";
import styles from "./Grid.module.scss";

interface GridProps {
  columns: number;
  grid: tile[][];
}

export default function Grid({ columns, grid }: GridProps) {
  const cells = grid.map((tileOptions, index) => {
    const rowStart = Math.floor(index / columns) + 1;
    const rowEnd = rowStart + 1;
    const colStart = (index % columns) + 1;
    const colEnd = colStart + 1;
    const cellStyle: React.CSSProperties = {
      gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
    };

    return (
      <span style={cellStyle} className={styles.cell} key={index}>
        {tileOptions.length === 1 ? (
          <Tile id={tileOptions[0].id} />
        ) : (
          tileOptions.length
        )}
      </span>
    );
  });

  return <div className={styles.grid}>{cells}</div>;
}
