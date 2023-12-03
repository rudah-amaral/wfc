import Tile from "@/components/Tile";
import styles from "./Grid.module.scss";
import { useLoaderData } from "react-router-dom";
import type { Tile as TileData } from "@/circuit-tileset/tileset";
import type { ReturnOfGeneratorLoader } from "@/pages/Generator";

interface GridProps {
  grid: TileData[][];
}

export default function Grid({ grid }: GridProps) {
  const { columns } = useLoaderData() as ReturnOfGeneratorLoader;
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
          <Tile path={tileOptions[0].path} />
        ) : (
          tileOptions.length
        )}
      </span>
    );
  });

  return <div className={styles.grid}>{cells}</div>;
}
