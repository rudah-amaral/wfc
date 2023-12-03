import styles from "./Tile.module.scss";

interface TileProps {
  path: string;
}

export default function Tile({ path }: TileProps) {
  return <img src={path} className={styles.tile} />;
}
