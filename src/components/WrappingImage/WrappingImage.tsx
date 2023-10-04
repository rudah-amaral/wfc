import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { returnOfGeneratorLoader } from "../../pages/Generator/Generator";
import styles from "./WrappingImage.module.scss";

const tilesPath = import.meta.glob<string>("/src/circuit-tileset/*.png", {
  import: "default",
  eager: true,
});

interface WrappingImageProps {
  gridTilesIds: number[];
}

export default function WrappingImage({ gridTilesIds }: WrappingImageProps) {
  const [imgURL, setImageURL] = useState<string>();
  const imgRef = useRef<HTMLImageElement>(null);
  const { rows, columns } = useLoaderData() as returnOfGeneratorLoader;

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
      const tiles = await loadTiles();
      patternTileSize = tiles[0].width;

      const canvas = document.createElement("canvas");
      canvas.width = patternTileSize * columns;
      canvas.height = patternTileSize * rows;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let offsetY = 0;
      for (let row = 0; row < rows; row++) {
        let offsetX = 0;
        for (let column = 0; column < columns; column++) {
          const tileId = gridTilesIds[column + row * columns];
          if (!tiles[tileId]) return;
          ctx.drawImage(
            tiles[tileId],
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

    async function loadTiles() {
      const tiles: Promise<HTMLImageElement>[] = [];
      for (const tilePath in tilesPath) {
        const tileId = Number(tilePath.split("/").pop()!.split(".").shift());
        tiles[tileId] = new Promise((resolve, reject) => {
          const tile = new Image();
          tile.src = tilePath;
          tile.addEventListener("load", () => resolve(tile));
          tile.addEventListener("error", (err) => reject(err));
        });
      }
      return await Promise.all(tiles);
    }
  }, [columns, rows, gridTilesIds]);

  return (
    <div className={styles.scrollingImageWrapper}>
      <img src={imgURL} ref={imgRef} className={styles.scrollingImage} />
    </div>
  );
}
