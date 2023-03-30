interface TileProps {
  id: number;
  size: number;
}

export default function Tile({ id, size }: TileProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}circuit-tileset/${id}.png`}
      alt={`${id}.png`}
      width={size}
      height={size}
    />
  );
}
