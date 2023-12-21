import Tile from "@/components/Tile";
import styles from "./Grid.module.scss";
import { useLoaderData } from "react-router-dom";
import { getCellEntropy } from "@/wfc-core";
import type { Tile as TileData } from "@/tilesets";
import type { ReturnOfGeneratorLoader } from "@/pages/Generator";
import { useEffect, useRef } from "react";

interface GridProps {
  grid: TileData[][];
  mosaicStatus: "idle" | "generating" | "done" | "no solution";
}

export default function Grid({ grid, mosaicStatus }: GridProps) {
  const mosaicDivRef = useRef<HTMLDivElement>(null);

  const { columns } = useLoaderData() as ReturnOfGeneratorLoader;
  const cells = grid.map((tileOptions, index) => {
    const rowStart = Math.floor(index / columns) + 1;
    const rowEnd = rowStart + 1;
    const colStart = (index % columns) + 1;
    const colEnd = colStart + 1;
    const cellStyle: React.CSSProperties = {
      gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
    };

    let cellEntropy = getCellEntropy(tileOptions).toFixed(3);
    cellEntropy.substring(0, 1) === "1"
      ? (cellEntropy = cellEntropy.substring(0, 1))
      : (cellEntropy = cellEntropy.substring(1));

    return (
      <span style={cellStyle} className={styles.cell} key={index}>
        {tileOptions.length === 1 ? (
          <Tile path={tileOptions[0].path} />
        ) : (
          cellEntropy
        )}
      </span>
    );
  });

  useEffect(() => {
    const mosaicDiv = mosaicDivRef.current;
    if (!mosaicDiv) return;

    // Reset offset position before each generation
    if (mosaicStatus === "idle" || mosaicStatus === "generating") {
      mosaicDiv.style.left = "";
      mosaicDiv.style.top = "";
    }

    if (mosaicStatus !== "done") return;

    mosaicDiv.addEventListener("pointerdown", startDrag);
    mosaicDiv.classList.add(styles.done);

    let initialScreenX: number;
    let initialScreenY: number;
    function startDrag(e: PointerEvent) {
      e.preventDefault();
      initialScreenX = e.screenX;
      initialScreenY = e.screenY;
      document.documentElement.style.cursor = "move";
      document.addEventListener("pointermove", drag);
      document.addEventListener("pointerup", stopDrag);
    }

    function stopDrag(e: PointerEvent) {
      e.preventDefault();
      document.documentElement.style.cursor = "auto";
      document.removeEventListener("pointermove", drag);
      document.removeEventListener("pointerup", stopDrag);
    }

    function drag(e: PointerEvent) {
      e.preventDefault();
      if (!mosaicDivRef.current) return;
      const mosaicDiv = mosaicDivRef.current;

      const oldLeft =
        mosaicDiv.style.left === "" ? 0 : parseInt(mosaicDiv.style.left);
      const oldTop =
        mosaicDiv.style.top === "" ? 0 : parseInt(mosaicDiv.style.top);

      const movementX = e.screenX - initialScreenX;
      const movementY = e.screenY - initialScreenY;
      initialScreenX = e.screenX;
      initialScreenY = e.screenY;

      const newLeft =
        (oldLeft - mosaicDiv.clientWidth + movementX) %
        (mosaicDiv.clientWidth / 2);
      const newTop =
        (oldTop - mosaicDiv.clientHeight + movementY) %
        (mosaicDiv.clientHeight / 2);

      mosaicDiv.style.left = `${newLeft}px`;
      mosaicDiv.style.top = `${newTop}px`;
    }

    return () => {
      mosaicDiv.removeEventListener("pointerdown", startDrag);
      mosaicDiv.classList.remove(styles.done);
    };
  }, [mosaicStatus]);

  return (
    <div className={styles.scrollingImageWrapper}>
      <div className={styles.scrollingImage} ref={mosaicDivRef}>
        <div className={styles.grid}>{cells}</div>
        {mosaicStatus === "done" && (
          <>
            <div className={styles.grid}>{cells}</div>
            <div className={styles.grid}>{cells}</div>
            <div className={styles.grid}>{cells}</div>
          </>
        )}
      </div>
    </div>
  );
}
