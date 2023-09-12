import { useEffect, useLayoutEffect } from "react";
import styles from "./Mosaic.module.scss";
import WrappingImage from "../WrappingImage";
import Grid from "../Grid";
import {
  collapseCellWithLeastEntropy,
  undoLastGuess,
  GridStep,
} from "../../wfc-core";

interface MosaicProps {
  mosaicStatus: "idle" | "generating" | "done" | "no solution";
  setMosaicStatus: React.Dispatch<
    React.SetStateAction<MosaicProps["mosaicStatus"]>
  >;
  history: GridStep[];
  setHistory: React.Dispatch<React.SetStateAction<GridStep[]>>;
  resetHistory: () => void;
}

export default function Mosaic({
  mosaicStatus,
  setMosaicStatus,
  history,
  setHistory,
  resetHistory,
}: MosaicProps) {
  const grid = history[history.length - 1].grid;
  const tileAnimationDelay = 300;
  document.documentElement.style.setProperty(
    "--tile-animation-delay",
    `${tileAnimationDelay}ms`
  );

  useLayoutEffect(() => {
    setMosaicStatus("idle");
    resetHistory();
  }, [setMosaicStatus, resetHistory]);

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
        setMosaicStatus("no solution");
      }
      return;
    }

    const nextHistory = collapseCellWithLeastEntropy(history);
    if (nextHistory) {
      setHistory(nextHistory);
    } else {
      // Wait for last animation before declaring the mosaic as done
      setTimeout(() => setMosaicStatus("done"), tileAnimationDelay);
    }
  }, [grid, history, mosaicStatus, setHistory, setMosaicStatus]);

  if (mosaicStatus === "no solution") return <p>No solution</p>;

  return (
    <div className={styles.mosaicContainer}>
      {mosaicStatus === "done" && (
        <WrappingImage gridTilesIds={grid.map((cell) => cell[0].id)} />
      )}
      <Grid grid={grid} />
    </div>
  );
}
