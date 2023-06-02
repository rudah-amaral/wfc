const tilesPath = import.meta.glob<string>("./circuit-tileset/*.png", {
  import: "default",
  eager: true,
});

interface TileProps {
  id: number;
  size: number;
  rotations: number;
}

export default function Tile({ id, size, rotations }: TileProps) {
  rotations = rotations % 4;
  const tilePath = tilesPath[`./circuit-tileset/${id}.png`];
  const tileStyles: React.CSSProperties = {
    rotate: `-${0.25 * rotations}turn`,
  };
  return <img src={tilePath} width={size} height={size} style={tileStyles} />;
}
