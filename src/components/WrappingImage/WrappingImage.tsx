import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./WrappingImage.module.scss";
import type { ReturnOfGeneratorLoader } from "@/pages/Generator";

interface WrappingImageProps {
  gridTilesPaths: string[];
}

export default function WrappingImage({ gridTilesPaths }: WrappingImageProps) {
  const [imgURL, setImageURL] = useState<string>();
  const imgRef = useRef<HTMLImageElement>(null);
  const { rows, columns } = useLoaderData() as ReturnOfGeneratorLoader;

  useEffect(() => {
    let patternTileSize: number;
    setScrollingImgURL().then(() => {
      if (!imgRef.current) return;

      const animationDuration = patternTileSize * 50;
      const xDuration = columns * animationDuration;
      const yDuration = rows * animationDuration;
      imgRef.current.style.animationDuration = `${xDuration}ms, ${yDuration}ms`;
    });

    async function setScrollingImgURL() {
      const pattern = await createPattern();
      if (!pattern || !patternTileSize) return;

      const patternWidth = patternTileSize * columns;
      const patternHeight = patternTileSize * rows;

      const imageCanvas = document.createElement("canvas");
      imageCanvas.width = patternWidth * 2;
      imageCanvas.height = patternHeight * 2;

      const ctx = imageCanvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = pattern;
      let offsetY = 0;
      for (let row = 0; row < 2; row++) {
        let offsetX = 0;
        for (let column = 0; column < 2; column++) {
          ctx.fillRect(offsetX, offsetY, patternWidth, patternHeight);
          offsetX += patternWidth;
        }
        offsetY += patternHeight;
      }

      setImageURL(imageCanvas.toDataURL());
    }

    async function createPattern() {
      const tileImg = await loadTileImg(gridTilesPaths[0]);
      patternTileSize = tileImg.width;

      const canvas = document.createElement("canvas");
      canvas.width = patternTileSize * columns;
      canvas.height = patternTileSize * rows;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let offsetY = 0;
      for (let row = 0; row < rows; row++) {
        let offsetX = 0;
        for (let column = 0; column < columns; column++) {
          const tilePath = gridTilesPaths[column + row * columns];
          const tileImg = await loadTileImg(tilePath);
          ctx.drawImage(
            tileImg,
            offsetX,
            offsetY,
            patternTileSize,
            patternTileSize
          );
          offsetX += patternTileSize;
        }
        offsetY += patternTileSize;
      }

      const pattern = ctx.createPattern(canvas, "repeat");
      if (pattern) return pattern;
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

  return (
    <div className={styles.scrollingImageWrapper}>
      <img src={imgURL} ref={imgRef} className={styles.scrollingImage} />
    </div>
  );
}
