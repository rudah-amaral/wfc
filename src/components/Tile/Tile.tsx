import styles from "./Tile.module.scss";

interface TileProps {
  path: string;
}

export default function Tile({ path }: TileProps) {
  return (
    <div
      style={{ backgroundImage: `url(${path})` }}
      className={styles.tile}
    ></div>
  );
}
