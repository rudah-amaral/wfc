import { useEffect, useRef, useState } from "react";
import styles from "./WrappingImage.module.scss";

const tilesPath = import.meta.glob<string>("../../circuit-tileset/*.png", {
  import: "default",
  eager: true,
});

interface WrappingImageProps {
  gridTilesIds: number[];
  columns: number;
  rows: number;
}

export default function WrappingImage({
  gridTilesIds,
  columns,
  rows,
}: WrappingImageProps) {
  const [imgURL, setImageURL] = useState<string>();
  const imgRef = useRef<HTMLImageElement>(null);
  const tileSize = useRef<number | null>(null);

  const scaledTileSize = Math.floor(
    Math.min(1200, 0.9 * window.innerWidth) / columns
  );
  const imgWidth = scaledTileSize * columns;
  const imgHeight = scaledTileSize * rows;

  useEffect(() => {
    setScrollingImgURL().then(() => {
      if (!imgRef.current) return;

      const animationDuration = tileSize.current! * 50;
      const xDuration = columns * animationDuration;
      const yDuration = rows * animationDuration;
      imgRef.current.style.animationDuration = `${xDuration}ms, ${yDuration}ms`;
    });

    async function setScrollingImgURL() {
      const pattern = await createPattern();
      if (!pattern || !tileSize.current) return;

      const patternWidth = tileSize.current * columns;
      const patternHeight = tileSize.current * rows;

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
      tileSize.current = tiles[0].width;

      const canvas = document.createElement("canvas");
      canvas.width = tileSize.current * columns;
      canvas.height = tileSize.current * rows;

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
            tileSize.current,
            tileSize.current
          );
          offsetX += tileSize.current;
        }
        offsetY += tileSize.current;
      }

      const pattern = ctx.createPattern(canvas, "repeat");
      if (pattern) return pattern;
    }

    async function loadTiles() {
      const tilesetSize = Object.keys(tilesPath).length;
      const tiles: Promise<HTMLImageElement>[] = new Array(tilesetSize)
        .fill(null)
        .map((_, tileId) => {
          return new Promise((resolve, reject) => {
            const tile = new Image();
            tile.src = tilesPath[`../../circuit-tileset/${tileId}.png`];
            tile.addEventListener("load", () => resolve(tile));
            tile.addEventListener("error", (err) => reject(err));
          });
        });
      return await Promise.all(tiles);
    }
  }, [columns, rows, gridTilesIds]);

  return (
    <div
      className={styles.scrollingImageWrapper}
      style={{
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
      }}
    >
      <img
        src={imgURL}
        ref={imgRef}
        className={styles.scrollingImage}
        style={{
          width: `${imgWidth * 2}px`,
          height: `${imgHeight * 2}px`,
        }}
      />
    </div>
  );
}
