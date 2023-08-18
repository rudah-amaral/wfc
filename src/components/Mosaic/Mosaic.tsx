import { useEffect, useState } from "react";
import Tile from "../Tile";
import styles from "./Mosaic.module.scss";
import WrappingImage from "../WrappingImage";
import {
  collapseCellWithLeastEntropy,
  undoLastGuess,
  GridStep,
} from "../../wfc-core";

interface MosaicProps {
  columns: number;
  rows: number;
  mosaicStatus: "idle" | "generating" | "done";
  setMosaicStatus: React.Dispatch<
    React.SetStateAction<MosaicProps["mosaicStatus"]>
  >;
  history: GridStep[];
  setHistory: React.Dispatch<React.SetStateAction<GridStep[]>>;
  resetHistory: () => void;
}

export default function Mosaic({
  columns,
  rows,
  mosaicStatus,
  setMosaicStatus,
  history,
  setHistory,
  resetHistory,
}: MosaicProps) {
  const [mosaicHasSolution, setMosaicHasSolution] = useState(true);
  const grid = history[history.length - 1].grid;

  useEffect(() => {
    setMosaicStatus("idle");
    resetHistory();
  }, [columns, rows]);

  useEffect(() => {
    if (mosaicStatus !== "generating") return;

    const reachedDeadEnd = grid.some((tileOptions) => {
      return tileOptions.length === 0;
    });
    if (reachedDeadEnd) {
      const previousHistory = undoLastGuess(history);
      if (previousHistory) {
        setHistory(previousHistory);
      } else {
        setMosaicHasSolution(false);
      }
      return;
    }

    const nextHistory = collapseCellWithLeastEntropy(history);
    if (nextHistory) {
      setHistory(nextHistory);
    } else {
      // Wait for last animation before declaring the mosaic as done
      setTimeout(() => setMosaicStatus("done"), 200);
    }
  });

  const tileSize = Math.floor(
    Math.min(1200, 0.9 * window.innerWidth) / columns
  );
  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
  };

  if (mosaicHasSolution) {
    return (
      <div className={styles.gridWrapper}>
        {mosaicStatus === "done" && (
          <WrappingImage
            gridTilesIds={grid.map((cell) => cell[0].id)}
            columns={columns}
            rows={rows}
          />
        )}
        <div className={styles.grid} style={gridStyle}>
          {grid.map((tileOptions, index) => {
            const rowStart = Math.floor(index / columns) + 1;
            const rowEnd = rowStart + 1;
            const colStart = (index % columns) + 1;
            const colEnd = colStart + 1;

            const cellStyle: React.CSSProperties = {
              fontSize: `${Math.floor(tileSize * 0.8)}px`,
              gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
            };

            return (
              <span style={cellStyle} className={styles.cell}>
                {tileOptions.length !== 1 ? (
                  tileOptions.length
                ) : (
                  <Tile id={tileOptions[0].id} size={tileSize} />
                )}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
  return <p>No solution</p>;
}
