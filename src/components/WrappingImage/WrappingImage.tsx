import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./WrappingImage.module.scss";
import type { ReturnOfGeneratorLoader } from "@/pages/Generator";

interface WrappingImageProps {
  gridTilesPaths: string[];
}

export default function WrappingImage({ gridTilesPaths }: WrappingImageProps) {
  const mosaicDivRef = useRef<HTMLDivElement>(null);
  const { rows, columns } = useLoaderData() as ReturnOfGeneratorLoader;

  useEffect(() => {
    getBackgroundImage().then((blobUrl) => {
      if (!mosaicDivRef.current) return;

      mosaicDivRef.current.style.backgroundImage = `url(${blobUrl})`;
    });

    async function getBackgroundImage() {
      const tileImg = await loadTileImg(gridTilesPaths[0]);
      const tileWidth = tileImg.width;
      const tileHeight = tileImg.height;

      const canvas = document.createElement("canvas");
      canvas.width = tileWidth * columns;
      canvas.height = tileHeight * rows;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let offsetY = 0;
      for (let row = 0; row < rows; row++) {
        let offsetX = 0;
        for (let column = 0; column < columns; column++) {
          const tilePath = gridTilesPaths[column + row * columns];
          const tileImg = await loadTileImg(tilePath);
          ctx.drawImage(tileImg, offsetX, offsetY, tileWidth, tileHeight);
          offsetX += tileWidth;
        }
        offsetY += tileHeight;
      }

      return new Promise<string>((resolve, reject) => {
        canvas.toBlob((imgBlob) => {
          if (imgBlob) resolve(URL.createObjectURL(imgBlob));
          else reject("Couldn't convert canvas to blob");
        });
      });
    }

    function loadTileImg(tilePath: string) {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const tile = new Image();
        tile.src = tilePath;
        tile.addEventListener("load", () => resolve(tile));
        tile.addEventListener("error", (err) => reject(err));
      });
    }
  }, [columns, rows, gridTilesPaths]);

  useEffect(() => {
    if (!mosaicDivRef.current) return;
    const mosaicDiv = mosaicDivRef.current;
    mosaicDiv.addEventListener("pointerdown", startDrag);
    document.addEventListener("pointerup", stopDrag);

    return () => {
      mosaicDiv.removeEventListener("pointerdown", startDrag);
      document.removeEventListener("pointerup", stopDrag);
    };

    function startDrag() {
      document.documentElement.style.userSelect = "none";
      document.documentElement.style.cursor = "move";
      document.addEventListener("pointermove", drag);
    }

    function stopDrag() {
      document.documentElement.style.userSelect = "";
      document.documentElement.style.cursor = "auto";
      document.removeEventListener("pointermove", drag);
    }

    function drag(e: PointerEvent) {
      if (!mosaicDivRef.current) return;
      const mosaicDiv = mosaicDivRef.current;

      const oldTop =
        mosaicDiv.style.top === "" ? 0 : parseInt(mosaicDiv.style.top);
      const oldLeft =
        mosaicDiv.style.left === "" ? 0 : parseInt(mosaicDiv.style.left);

      const newTop =
        (oldTop - mosaicDiv.clientHeight + e.movementY) %
        (mosaicDiv.clientHeight / 2);
      const newLeft =
        (oldLeft - mosaicDiv.clientWidth + e.movementX) %
        (mosaicDiv.clientWidth / 2);

      mosaicDiv.style.top = `${newTop}px`;
      mosaicDiv.style.left = `${newLeft}px`;
    }
  });

  return (
    <div className={styles.scrollingImageWrapper}>
      <div ref={mosaicDivRef} className={styles.scrollingImage}></div>
    </div>
  );
}
