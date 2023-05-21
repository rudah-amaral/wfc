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

export const tilesetProperties = [
  // Tile 0
  {
    edges: ["ACA", "ABA", "ACA", "ABA"],
    maxRotations: 1,
  },
  // Tile 1
  {
    edges: ["DDD", "DDD", "DDD", "DDD"],
    maxRotations: 0,
  },
  // Tile 2
  {
    edges: ["DAA", "ABA", "AAD", "DDD"],
    maxRotations: 3,
  },
  // Tile 3
  {
    edges: ["AAA", "AAA", "AAD", "DAA"],
    maxRotations: 3,
  },
  // Tile 4
  {
    edges: ["ABA", "ABA", "ABA", "ABA"],
    maxRotations: 1,
  },
  // Tile 5
  {
    edges: ["ABA", "ABA", "AAA", "AAA"],
    maxRotations: 3,
  },
  // Tile 6
  {
    edges: ["AAA", "AAA", "AAA", "AAA"],
    maxRotations: 0,
  },
  // Tile 7
  {
    edges: ["ABA", "AAA", "ABA", "ABA"],
    maxRotations: 3,
  },
  // Tile 8
  {
    edges: ["AAA", "ABA", "AAA", "ABA"],
    maxRotations: 1,
  },
  // Tile 9
  {
    edges: ["AAA", "ACA", "AAA", "ABA"],
    maxRotations: 3,
  },
  // Tile 10
  {
    edges: ["ABA", "ABA", "AAA", "AAA"],
    maxRotations: 3,
  },
  // Tile 11
  {
    edges: ["ABA", "AAA", "ABA", "AAA"],
    maxRotations: 1,
  },
  // Tile 12
  {
    edges: ["AAA", "ABA", "AAA", "AAA"],
    maxRotations: 3,
  },
  // Tile 13
  {
    edges: ["ACA", "AAA", "ACA", "AAA"],
    maxRotations: 1,
  },
];
