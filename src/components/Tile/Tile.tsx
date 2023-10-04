import styles from "./Tile.module.scss";

interface TileProps {
  id: number;
}

export default function Tile({ id }: TileProps) {
  return <img src={`/src/circuit-tileset/${id}.png`} className={styles.tile} />;
}
