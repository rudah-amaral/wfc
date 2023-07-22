import styles from "./Tile.module.scss";

const tilesPath = import.meta.glob<string>("../../circuit-tileset/*.png", {
  import: "default",
  eager: true,
});

interface TileProps {
  id: number;
  size: number;
}

export default function Tile({ id, size }: TileProps) {
  const tilePath = tilesPath[`../../circuit-tileset/${id}.png`];
  return (
    <img src={tilePath} width={size} height={size} className={styles.tile} />
  );
}
