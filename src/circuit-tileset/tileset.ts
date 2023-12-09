const tilesMod = import.meta.glob<string>("./*.png", {
  import: "default",
  eager: true,
});

export interface BaseTile {
  path: string;
  edges: string[];
  timesCanBeRotated?: number[];
}

const baseTileset: BaseTile[] = [
  {
    path: tilesMod["./bridge.png"],
    edges: ["ABA", "ACA", "ABA", "ACA"],
    timesCanBeRotated: [1],
  },
  {
    path: tilesMod["./component.png"],
    edges: ["DDD", "DDD", "DDD", "DDD"],
  },
  {
    path: tilesMod["./connection.png"],
    edges: ["ABA", "AAD", "DDD", "DAA"],
    timesCanBeRotated: [1, 2, 3],
  },
  {
    path: tilesMod["./corner.png"],
    edges: ["AAA", "AAA", "AAD", "DAA"],
    timesCanBeRotated: [1, 2, 3],
  },
  {
    path: tilesMod["./dskew.png"],
    edges: ["ABA", "ABA", "ABA", "ABA"],
    timesCanBeRotated: [1],
  },
  {
    path: tilesMod["./skew.png"],
    edges: ["ABA", "ABA", "AAA", "AAA"],
    timesCanBeRotated: [1, 2, 3],
  },
  {
    path: tilesMod["./substrate.png"],
    edges: ["AAA", "AAA", "AAA", "AAA"],
  },
  {
    path: tilesMod["./t.png"],
    edges: ["AAA", "ABA", "ABA", "ABA"],
    timesCanBeRotated: [1, 2, 3],
  },
  {
    path: tilesMod["./track.png"],
    edges: ["ABA", "AAA", "ABA", "AAA"],
    timesCanBeRotated: [1],
  },
  {
    path: tilesMod["./transition.png"],
    edges: ["ACA", "AAA", "ABA", "AAA"],
    timesCanBeRotated: [1, 2, 3],
  },
  {
    path: tilesMod["./turn.png"],
    edges: ["ABA", "ABA", "AAA", "AAA"],
    timesCanBeRotated: [1, 2, 3],
  },
  {
    path: tilesMod["./viad.png"],
    edges: ["AAA", "ABA", "AAA", "ABA"],
    timesCanBeRotated: [1],
  },
  {
    path: tilesMod["./vias.png"],
    edges: ["ABA", "AAA", "AAA", "AAA"],
    timesCanBeRotated: [1, 2, 3],
  },
  {
    path: tilesMod["./wire.png"],
    edges: ["AAA", "ACA", "AAA", "ACA"],
    timesCanBeRotated: [1],
  },
];

export default baseTileset;
