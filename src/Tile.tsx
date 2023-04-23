const tilesPath = import.meta.glob<string>("./circuit-tileset/*.png", {
  import: "default",
  eager: true,
});

interface TileProps {
  id: number;
  size: number;
}

export default function Tile({ id, size }: TileProps) {
  const tilePath = tilesPath[`./circuit-tileset/${id}.png`];
  return <img src={tilePath} width={size} height={size} />;
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
