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

  let tileSize: number, canvasWidth: number, canvasHeight: number;
  const scaledTileSize = Math.floor(
    Math.min(1200, 0.9 * window.innerWidth) / columns
  );
  const imgWidth = scaledTileSize * columns;
  const imgHeight = scaledTileSize * rows;

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

  async function createPatternCanvas() {
    const tiles = await loadTiles();
    tileSize = tiles[0].width;
    canvasWidth = columns * tileSize;
    canvasHeight = rows * tileSize;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = canvasWidth;
    patternCanvas.height = canvasHeight;

    const ctx = patternCanvas.getContext("2d");
    if (!ctx) return;

    let offsetY = 0;
    for (let row = 0; row < rows; row++) {
      let offsetX = 0;
      for (let column = 0; column < columns; column++) {
        const tileId = gridTilesIds[column + row * columns];
        ctx.drawImage(tiles[tileId], offsetX, offsetY, tileSize, tileSize);
        offsetX += tileSize;
      }
      offsetY += tileSize;
    }

    const pattern = ctx.createPattern(patternCanvas, "repeat");
    if (pattern) return pattern;
  }

  async function getScrollingImg() {
    const patternCanvas = await createPatternCanvas();
    if (!patternCanvas) return;

    const imageCanvas = document.createElement("canvas");
    imageCanvas.width = canvasWidth * 3;
    imageCanvas.height = canvasHeight * 3;

    const ctx = imageCanvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = patternCanvas;
    let offsetY = 0;
    for (let row = 0; row < 3; row++) {
      let offsetX = 0;
      for (let column = 0; column < 3; column++) {
        ctx.fillRect(offsetX, offsetY, canvasWidth, canvasHeight);
        offsetX += canvasWidth;
      }
      offsetY += canvasHeight;
    }

    return imageCanvas.toDataURL();
  }

  useEffect(() => {
    async function setWrapAnimation() {
      const imageURL = await getScrollingImg();
      setImageURL(imageURL);

      if (!imgRef.current) return;
      const animationDuration = tileSize * 50;
      const xDuration = columns * animationDuration;
      const yDuration = rows * animationDuration;
      imgRef.current.style.animationDuration = `${xDuration}ms, ${yDuration}ms`;
    }
    setWrapAnimation();
  }, []);

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
          width: `${imgWidth * 3}px`,
          height: `${imgHeight * 3}px`,
        }}
      />
    </div>
  );
}
