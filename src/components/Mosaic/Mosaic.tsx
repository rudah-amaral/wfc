import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./Mosaic.module.scss";
import WrappingImage from "../WrappingImage";
import Grid from "../Grid";
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

  useLayoutEffect(() => {
    setMosaicStatus("idle");
    resetHistory();
  }, [columns, rows, setMosaicStatus, resetHistory]);

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
  }, [grid, history, mosaicStatus, setHistory, setMosaicStatus]);

  if (!mosaicHasSolution) return <p>No solution</p>;

  return (
    <div className={styles.mosaicContainer}>
      {mosaicStatus === "done" && (
        <WrappingImage
          gridTilesIds={grid.map((cell) => cell[0].id)}
          columns={columns}
          rows={rows}
        />
      )}
      <Grid grid={grid} columns={columns} rows={rows} />
    </div>
  );
}
