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

export const tilesetData = [
  // Tile 0
  ["ACA", "ABA", "ACA", "ABA"],
  // Tile 1
  ["DDD", "DDD", "DDD", "DDD"],
  // Tile 2
  ["DAA", "ABA", "AAD", "DDD"],
  // Tile 3
  ["AAA", "AAA", "AAD", "DAA"],
  // Tile 4
  ["ABA", "ABA", "ABA", "ABA"],
  // Tile 5
  ["ABA", "ABA", "AAA", "AAA"],
  // Tile 6
  ["AAA", "AAA", "AAA", "AAA"],
  // Tile 7
  ["ABA", "AAA", "ABA", "ABA"],
  // Tile 8
  ["AAA", "ABA", "AAA", "ABA"],
  // Tile 9
  ["AAA", "ACA", "AAA", "ABA"],
  // Tile 10
  ["ABA", "ABA", "AAA", "AAA"],
  // Tile 11
  ["ABA", "AAA", "ABA", "AAA"],
  // Tile 12
  ["AAA", "ABA", "AAA", "AAA"],
  // Tile 13
  ["ACA", "AAA", "ACA", "AAA"],
];
