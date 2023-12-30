import { useSearchParams } from "react-router-dom";
import type { TilesetMetaData } from "@/tilesets";
import styles from "./TilesetControls.module.scss";

const modules = import.meta.glob<TilesetMetaData>("@/tilesets/*/index.ts", {
  import: "tilesetData",
  eager: true,
});

interface TilesetControlsProps {
  disabled: boolean;
}

export default function TilesetControls({ disabled }: TilesetControlsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTilesetName = searchParams.get("tileset")!;

  const tilesets = Object.values(modules);
  const selectedTilesetInfo = tilesets.find((tileset) => {
    return tileset.name === selectedTilesetName;
  })!;

  const selectOptions = tilesets.map((tileset) => {
    const tilesetName = tileset.name;

    return (
      <option key={tilesetName} value={tilesetName}>
        {tilesetName}
      </option>
    );
  });

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("tileset", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.controls}>
      <label className={styles.controlsRow}>
        Tileset:{" "}
        <select
          disabled={disabled}
          value={selectedTilesetName}
          onChange={handleChange}
          className={styles.select}
        >
          {selectOptions}
        </select>
      </label>
      <p className={`${styles.controlsRow} ${styles.tilesetDetails}`}>
        Tileset Designer:{" "}
        <a href={selectedTilesetInfo.designerSocial} className={styles.social}>
          {selectedTilesetInfo.designerName}
        </a>
      </p>
    </div>
  );
}
