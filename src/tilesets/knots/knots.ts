import type { BaseTile, TilesetMetaData, WhitelistedPair } from "@/tilesets";

const tilesMod = import.meta.glob<string>("./*.png", {
  import: "default",
  eager: true,
});

export const tilesetData: TilesetMetaData = {
  name: "knots",
  designerName: "Maxin Gumin",
  designerSocial: "https://twitter.com/exutumno",
};

const baseTileset: BaseTile[] = [
  {
    name: "corner",
    path: tilesMod["./corner.png"],
    timesCanBeRotated: 3,
  },
  {
    name: "cross",
    path: tilesMod["./cross.png"],
    timesCanBeRotated: 1,
  },
  {
    name: "empty",
    path: tilesMod["./empty.png"],
  },
  {
    name: "line",
    path: tilesMod["./line.png"],
    timesCanBeRotated: 1,
  },
  {
    name: "t",
    path: tilesMod["./t.png"],
    timesCanBeRotated: 3,
  },
];

const baseWhitelist: WhitelistedPair[] = [
  { left: "corner", right: "corner 1" },
  { left: "corner", right: "corner 2" },
  { left: "corner", right: "cross" },
  { left: "corner", right: "cross 1" },
  { left: "corner", right: "line" },
  { left: "corner", right: "t" },
  { left: "corner", right: "t 2" },
  { left: "corner", right: "t 3" },
  { left: "corner 1", right: "corner" },
  { left: "corner 1", right: "corner 3" },
  { left: "corner 1", right: "empty" },
  { left: "corner 1", right: "line 1" },
  { left: "corner 1", right: "t 1" },
  { left: "corner 2", right: "corner" },
  { left: "corner 2", right: "empty" },
  { left: "corner 2", right: "line 1" },
  { left: "corner 2", right: "t 1" },
  { left: "corner 3", right: "corner 1" },
  { left: "corner 3", right: "cross" },
  { left: "corner 3", right: "cross 1" },
  { left: "corner 3", right: "line" },
  { left: "corner 3", right: "t" },
  { left: "corner 3", right: "t 2" },
  { left: "corner 3", right: "t 3" },
  { left: "cross", right: "cross" },
  { left: "cross", right: "cross 1" },
  { left: "cross", right: "line" },
  { left: "cross", right: "t" },
  { left: "cross", right: "t 2" },
  { left: "cross", right: "t 3" },
  { left: "cross 1", right: "cross" },
  { left: "cross 1", right: "line" },
  { left: "cross 1", right: "t" },
  { left: "cross 1", right: "t 2" },
  { left: "cross 1", right: "t 3" },
  { left: "empty", right: "empty" },
  { left: "empty", right: "line 1" },
  { left: "empty", right: "t 1" },
  { left: "line", right: "line" },
  { left: "line", right: "t" },
  { left: "line", right: "t 2" },
  { left: "line", right: "t 3" },
  { left: "line 1", right: "line 1" },
  { left: "line 1", right: "t 1" },
  { left: "t", right: "t" },
  { left: "t", right: "t 2" },
  { left: "t", right: "t 3" },
  { left: "t 1", right: "t" },
  { left: "t 1", right: "t 3" },
  { left: "t 2", right: "t" },
  { left: "t 3", right: "t 1" },
];

export { baseTileset, baseWhitelist };
