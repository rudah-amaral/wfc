import type { BaseTile, BlacklistedPair, TilesetMetaData } from "@/tilesets";

const tilesMod = import.meta.glob<string>("./*.png", {
  import: "default",
  eager: true,
});

export const tilesetData: TilesetMetaData = {
  name: "circuit",
  designerName: "Maxin Gumin",
  designerSocial: "https://twitter.com/exutumno",
};

const baseTileset: BaseTile[] = [
  {
    name: "bridge",
    path: tilesMod["./bridge.png"],
    edges: ["ABA", "ACA", "ABA", "ACA"],
    timesCanBeRotated: 1,
  },
  {
    name: "component",
    path: tilesMod["./component.png"],
    edges: ["DDD", "DDD", "DDD", "DDD"],
    weight: 20,
  },
  {
    name: "connection",
    path: tilesMod["./connection.png"],
    edges: ["ABA", "AAD", "DDD", "DAA"],
    timesCanBeRotated: 3,
    weight: 10,
  },
  {
    name: "corner",
    path: tilesMod["./corner.png"],
    edges: ["AAA", "AAA", "AAD", "DAA"],
    timesCanBeRotated: 3,
    weight: 10,
  },
  {
    name: "dskew",
    path: tilesMod["./dskew.png"],
    edges: ["ABA", "ABA", "ABA", "ABA"],
    timesCanBeRotated: 1,
    weight: 2,
  },
  {
    name: "skew",
    path: tilesMod["./skew.png"],
    edges: ["ABA", "ABA", "AAA", "AAA"],
    timesCanBeRotated: 3,
    weight: 2,
  },
  {
    name: "substrate",
    path: tilesMod["./substrate.png"],
    edges: ["AAA", "AAA", "AAA", "AAA"],
    weight: 2,
  },
  {
    name: "t",
    path: tilesMod["./t.png"],
    edges: ["AAA", "ABA", "ABA", "ABA"],
    timesCanBeRotated: 3,
    weight: 0.1,
  },
  {
    name: "track",
    path: tilesMod["./track.png"],
    edges: ["ABA", "AAA", "ABA", "AAA"],
    timesCanBeRotated: 1,
    weight: 2,
  },
  {
    name: "transition",
    path: tilesMod["./transition.png"],
    edges: ["ACA", "AAA", "ABA", "AAA"],
    timesCanBeRotated: 3,
    weight: 0.4,
  },
  {
    name: "viad",
    path: tilesMod["./viad.png"],
    edges: ["AAA", "ABA", "AAA", "ABA"],
    timesCanBeRotated: 1,
    weight: 0.1,
  },
  {
    name: "vias",
    path: tilesMod["./vias.png"],
    edges: ["ABA", "AAA", "AAA", "AAA"],
    timesCanBeRotated: 3,
    weight: 0.3,
  },
  {
    name: "wire",
    path: tilesMod["./wire.png"],
    edges: ["AAA", "ACA", "AAA", "ACA"],
    timesCanBeRotated: 1,
    weight: 0.5,
  },
];

const blacklist: BlacklistedPair[] = [
  { left: "connection 1", right: "connection 3" },
  { left: "connection 1", right: "transition 1" },
  { left: "connection 3", right: "connection 1" },
  { left: "corner 2", right: "corner 1" },
  { left: "corner 3", right: "corner" },
  { left: "dskew 1", right: "dskew" },
  { left: "dskew 1", right: "skew 2" },
  { left: "dskew", right: "dskew 1" },
  { left: "dskew", right: "skew 3" },
  { left: "skew 1", right: "skew 2" },
  { left: "skew", right: "skew 3" },
  { left: "transition 1", right: "transition 3" },
  { left: "transition 3", right: "transition 1" },
  { left: "viad", right: "viad" },
  { left: "viad", right: "transition 1" },
  { left: "viad", right: "vias 3" },
  { left: "viad", right: "connection 3" },
  { left: "vias 1", right: "connection 3" },
  { left: "vias 1", right: "transition 1" },
  { left: "vias 1", right: "vias 3" },
];

export { baseTileset, blacklist };
