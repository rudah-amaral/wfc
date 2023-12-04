const tilesMod = import.meta.glob<string>("./*.png", {
  import: "default",
  eager: true,
});

export interface Tile {
  path: string;
  edges: string[];
}

const tileset: Tile[] = [
  {
    path: tilesMod["./bridge.png"],
    edges: ["ABA", "ACA", "ABA", "ACA"],
  },
  {
    path: tilesMod["./component.png"],
    edges: ["DDD", "DDD", "DDD", "DDD"],
  },
  {
    path: tilesMod["./connection.png"],
    edges: ["ABA", "AAD", "DDD", "DAA"],
  },
  {
    path: tilesMod["./corner.png"],
    edges: ["AAA", "AAA", "AAD", "DAA"],
  },
  {
    path: tilesMod["./dskew.png"],
    edges: ["ABA", "ABA", "ABA", "ABA"],
  },
  {
    path: tilesMod["./skew.png"],
    edges: ["ABA", "ABA", "AAA", "AAA"],
  },
  {
    path: tilesMod["./substrate.png"],
    edges: ["AAA", "AAA", "AAA", "AAA"],
  },
  {
    path: tilesMod["./t.png"],
    edges: ["AAA", "ABA", "ABA", "ABA"],
  },
  {
    path: tilesMod["./track.png"],
    edges: ["ABA", "AAA", "ABA", "AAA"],
  },
  {
    path: tilesMod["./transition.png"],
    edges: ["ACA", "AAA", "ABA", "AAA"],
  },
  {
    path: tilesMod["./turn.png"],
    edges: ["ABA", "ABA", "AAA", "AAA"],
  },
  {
    path: tilesMod["./viad.png"],
    edges: ["AAA", "ABA", "AAA", "ABA"],
  },
  {
    path: tilesMod["./vias.png"],
    edges: ["ABA", "AAA", "AAA", "AAA"],
  },
  {
    path: tilesMod["./wire.png"],
    edges: ["AAA", "ACA", "AAA", "ACA"],
  },
];

export default tileset;
