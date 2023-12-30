import type { BaseTile, TilesetMetaData } from "@/tilesets";

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
    edges: ["A", "A", "B", "B"],
    timesCanBeRotated: 3,
  },
  {
    name: "cross",
    path: tilesMod["./cross.png"],
    edges: ["A", "A", "A", "A"],
    timesCanBeRotated: 1,
  },
  {
    name: "empty",
    path: tilesMod["./empty.png"],
    edges: ["B", "B", "B", "B"],
  },
  {
    name: "line",
    path: tilesMod["./line.png"],
    edges: ["B", "A", "B", "A"],
    timesCanBeRotated: 1,
  },
  {
    name: "t",
    path: tilesMod["./t.png"],
    edges: ["B", "A", "A", "A"],
    timesCanBeRotated: 3,
  },
];

export { baseTileset };
