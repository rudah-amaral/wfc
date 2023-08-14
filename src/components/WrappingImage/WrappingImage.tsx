import { useEffect, useRef } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tileSize = Math.floor(
    Math.min(1200, window.innerWidth * 0.9) / columns
  );
  const canvasWidth = tileSize * columns;
  const canvasHeight = tileSize * rows;

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
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = canvasWidth;
    patternCanvas.height = canvasHeight;

    const ctx = patternCanvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const tiles = await loadTiles();
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

  async function drawPattern(offsetX: number, offsetY: number) {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const patternCanvas = await createPatternCanvas();
    if (!patternCanvas) return;

    ctx.fillStyle = patternCanvas;
    patternCanvas.setTransform({ e: offsetX, f: offsetY });
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  useEffect(() => {
    let offsetX = 2;
    let offsetY = 2;
    const interval = setInterval(() => {
      drawPattern(offsetX, offsetY);
      offsetX = (offsetX + 2) % canvasWidth;
      offsetY = (offsetY + 2) % canvasHeight;
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      className={styles.canvas}
      width={canvasWidth}
      height={canvasHeight}
      ref={canvasRef}
    ></canvas>
  );
}
