import styles from "./Tile.module.scss";

const tilesPath = import.meta.glob<string>("../../circuit-tileset/*.png", {
  import: "default",
  eager: true,
});

interface TileProps {
  id: number;
}

export default function Tile({ id }: TileProps) {
  const tilePath = tilesPath[`../../circuit-tileset/${id}.png`];
  return <img src={tilePath} className={styles.tile} />;
}
