import type { BaseTile, WhitelistedPair, TilesetMetaData } from "@/tilesets";

const tilesMod = import.meta.glob<string>("./*.png", {
  import: "default",
  eager: true,
});

export const tilesetData: TilesetMetaData = {
  name: "castle",
  designerName: "Maxin Gumin",
  designerSocial: "https://twitter.com/exutumno",
};

const baseTileset: BaseTile[] = [
  {
    name: "bridge",
    path: tilesMod["./bridge.png"],
    timesCanBeRotated: 1,
  },
  {
    name: "ground",
    path: tilesMod["./ground.png"],
  },
  {
    name: "river",
    path: tilesMod["./river.png"],
    timesCanBeRotated: 1,
  },
  {
    name: "riverturn",
    path: tilesMod["./riverturn.png"],
    timesCanBeRotated: 3,
  },
  {
    name: "road",
    path: tilesMod["./road.png"],
    timesCanBeRotated: 1,
  },
  {
    name: "roadturn",
    path: tilesMod["./roadturn.png"],
    timesCanBeRotated: 3,
  },
  {
    name: "t",
    path: tilesMod["./t.png"],
    timesCanBeRotated: 3,
  },
  {
    name: "tower",
    path: tilesMod["./tower.png"],
  },
  {
    name: "wall",
    path: tilesMod["./wall.png"],
    timesCanBeRotated: 1,
  },
  {
    name: "wallriver",
    path: tilesMod["./wallriver.png"],
    timesCanBeRotated: 1,
  },
  {
    name: "wallroad",
    path: tilesMod["./wallroad.png"],
    timesCanBeRotated: 1,
  },
];

const baseWhitelist: WhitelistedPair[] = [
  { left: "bridge", right: "road 1" },
  { left: "bridge", right: "roadturn 1" },
  { left: "bridge", right: "t" },
  { left: "bridge", right: "t 2" },
  { left: "bridge", right: "t 3" },
  { left: "bridge", right: "wallroad" },
  { left: "bridge 1", right: "river 1" },
  { left: "bridge 1", right: "riverturn 1" },
  { left: "bridge 1", right: "riverturn 2" },
  { left: "bridge 1", right: "wallriver" },
  { left: "ground", right: "ground" },
  { left: "ground", right: "river" },
  { left: "ground", right: "riverturn" },
  { left: "ground", right: "riverturn 3" },
  { left: "ground", right: "road" },
  { left: "ground", right: "roadturn" },
  { left: "ground", right: "roadturn 3" },
  { left: "ground", right: "t 1" },
  { left: "ground", right: "tower" },
  { left: "ground", right: "wall" },
  { left: "river", right: "riverturn" },
  { left: "river", right: "riverturn 3" },
  { left: "river", right: "road" },
  { left: "river", right: "roadturn" },
  { left: "river", right: "roadturn 3" },
  { left: "river", right: "t 1" },
  { left: "river", right: "tower" },
  { left: "river", right: "wall" },
  { left: "river 1", right: "river 1" },
  { left: "river 1", right: "riverturn 1" },
  { left: "river 1", right: "riverturn 2" },
  { left: "river 1", right: "wallriver" },
  { left: "riverturn", right: "riverturn 1" },
  { left: "riverturn", right: "riverturn 2" },
  { left: "riverturn", right: "wallriver" },
  { left: "riverturn 1", right: "road" },
  { left: "riverturn 1", right: "roadturn" },
  { left: "riverturn 1", right: "roadturn 3" },
  { left: "riverturn 1", right: "t 1" },
  { left: "riverturn 1", right: "tower" },
  { left: "riverturn 1", right: "wall" },
  { left: "riverturn 2", right: "road" },
  { left: "riverturn 2", right: "roadturn" },
  { left: "riverturn 2", right: "roadturn 3" },
  { left: "riverturn 2", right: "t 1" },
  { left: "riverturn 2", right: "tower" },
  { left: "riverturn 2", right: "wall" },
  { left: "riverturn 3", right: "riverturn 1" },
  { left: "riverturn 3", right: "wallriver" },
  { left: "road", right: "tower" },
  { left: "road", right: "wall" },
  { left: "road 1", right: "road 1" },
  { left: "road 1", right: "roadturn 1" },
  { left: "road 1", right: "roadturn 2" },
  { left: "road 1", right: "t" },
  { left: "road 1", right: "t 2" },
  { left: "road 1", right: "t 3" },
  { left: "road 1", right: "wallroad" },
  { left: "roadturn", right: "roadturn 1" },
  { left: "roadturn", right: "roadturn 2" },
  { left: "roadturn", right: "t" },
  { left: "roadturn", right: "t 2" },
  { left: "roadturn", right: "t 3" },
  { left: "roadturn", right: "wallroad" },
  { left: "roadturn 1", right: "tower" },
  { left: "roadturn 1", right: "wall" },
  { left: "roadturn 2", right: "tower" },
  { left: "roadturn 2", right: "wall" },
  { left: "roadturn 3", right: "roadturn 1" },
  { left: "roadturn 3", right: "t" },
  { left: "roadturn 3", right: "t 2" },
  { left: "roadturn 3", right: "t 3" },
  { left: "t", right: "t" },
  { left: "t", right: "t 2" },
  { left: "t", right: "t 3" },
  { left: "t", right: "wallroad" },
  { left: "t 1", right: "t" },
  { left: "t 1", right: "t 2" },
  { left: "t 1", right: "t 3" },
  { left: "t 1", right: "wallroad" },
  { left: "t 2", right: "t" },
  { left: "t 2", right: "t 2" },
  { left: "t 2", right: "t 3" },
  { left: "t 2", right: "wallroad" },
  { left: "t 3", right: "tower" },
  { left: "t 3", right: "wall" },
  { left: "tower", right: "wall 1" },
  { left: "tower", right: "wallriver 1" },
  { left: "tower", right: "wallroad 1" },
  { left: "wall 1", right: "wall 1" },
  { left: "wall 1", right: "wallriver 1" },
  { left: "wall 1", right: "wallroad 1" },
  { left: "wallriver 1", right: "wallroad 1" },
];

export { baseTileset, baseWhitelist };
