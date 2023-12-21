import type { BaseTile, BlacklistedPair } from "@/tilesets/circuit";

type ExpandedTile = Required<Omit<BaseTile, "timesCanBeRotated">>;
export interface Tile extends Omit<ExpandedTile, "edges"> {
  validNeighbors: Set<string>[];
}
let tileset: Tile[];
let fullBlacklist: FullBlacklist;
export async function getTileset(tilesetName: string) {
  const { baseTileset, blacklist } = await import(`./${tilesetName}/index.ts`);
  const expandedTileset = await expandTileset(baseTileset);
  fullBlacklist = getFullBlacklist(baseTileset, blacklist);
  tileset = calculateValidNeighbors(expandedTileset);
  return tileset;
}

type FullBlacklist = Record<
  string,
  [Set<string>, Set<string>, Set<string>, Set<string>]
>;
function getFullBlacklist(
  tileset: BaseTile[],
  baseBlacklist: BlacklistedPair[]
): FullBlacklist {
  const fullBlacklist: FullBlacklist = {};

  // Each rule in the base blacklist should be representend in all its four
  // rotations, e.g.:
  //
  // dskew   LR skew 1
  // dskew 1 TB skew 2
  // dskew   RL skew 3
  // dskew 1 BT skew 0
  baseBlacklist.forEach(({ left: tileA, right: tileB }) => {
    for (let side = 0; side < 4; side++) {
      const rotatedTileA = rotateTileName(tileset, tileA, side);
      const rotatedTileB = rotateTileName(tileset, tileB, side);

      if (!fullBlacklist[rotatedTileA]) {
        fullBlacklist[rotatedTileA] = [
          new Set<string>(),
          new Set<string>(),
          new Set<string>(),
          new Set<string>(),
        ];
      }
      if (!fullBlacklist[rotatedTileB]) {
        fullBlacklist[rotatedTileB] = [
          new Set<string>(),
          new Set<string>(),
          new Set<string>(),
          new Set<string>(),
        ];
      }

      // Each rule in the blacklist should be represented in its direct form
      // and in its inverted form, e.g.:
      //
      // dskew  LR skew 1
      // skew 1 RL dskew
      fullBlacklist[rotatedTileA][(1 + side) % 4].add(rotatedTileB);
      fullBlacklist[rotatedTileB][(3 + side) % 4].add(rotatedTileA);
    }
  });
  return fullBlacklist;
}

const timesCanBeRotated: Record<string, number> = {};
function rotateTileName(
  baseTileset: BaseTile[],
  tileName: string,
  rotations: number
) {
  const splitedTileName = tileName.split(" ");
  const baseTileName = splitedTileName[0];

  // Cache lookup
  if (!timesCanBeRotated[baseTileName]) {
    const baseTile = baseTileset.find(
      (baseTile) => baseTile.name === baseTileName
    );
    if (baseTile && baseTile.timesCanBeRotated) {
      timesCanBeRotated[baseTileName] = baseTile.timesCanBeRotated;
    } else {
      timesCanBeRotated[baseTileName] = 0;
    }
  }

  const tileTimesCanBeRotated = timesCanBeRotated[baseTileName];
  if (tileTimesCanBeRotated === 0) return baseTileName;

  let timesRotated = Number(splitedTileName[1]);
  if (!timesRotated) timesRotated = 0;
  const newRotation = (timesRotated + rotations) % (tileTimesCanBeRotated + 1);

  if (newRotation === 0) return baseTileName;

  return `${baseTileName} ${newRotation}`;
}

async function expandTileset(tileset: BaseTile[]) {
  const rotationableTiles = tileset.filter((tile) => tile.timesCanBeRotated);
  const tileImg = await loadTileImg(tileset[0].path);

  const canvas = document.createElement("canvas");
  const tileWidth = tileImg.width;
  const tileHeight = tileImg.height;

  canvas.width = tileWidth;
  canvas.height = tileHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw "canvas not generated";

  const expandedTileset = tileset.map<ExpandedTile>((tile) => {
    return {
      name: tile.name,
      path: tile.path,
      edges: tile.edges,
      weight: tile.weight ?? 1,
    };
  });
  for (const rotationableTile of rotationableTiles) {
    const rotationableTileImg = await loadTileImg(rotationableTile.path);
    const timesCanBeRotated = rotationableTile.timesCanBeRotated!;

    let rotatedTileEdges = rotationableTile.edges;
    for (let rotations = 1; rotations <= timesCanBeRotated; rotations++) {
      ctx.translate(tileWidth / 2, tileHeight / 2);
      ctx.rotate((rotations * Math.PI) / 2);
      ctx.translate(-tileWidth / 2, -tileHeight / 2);
      ctx.drawImage(rotationableTileImg, 0, 0, tileWidth, tileHeight);
      const rotatedTilePath = canvas.toDataURL();
      rotatedTileEdges = [...rotatedTileEdges];
      rotatedTileEdges.unshift(rotatedTileEdges.pop()!);

      expandedTileset.push({
        name: `${rotationableTile.name} ${rotations}`,
        path: rotatedTilePath,
        edges: rotatedTileEdges,
        weight: rotationableTile.weight ?? 1,
      });

      ctx.resetTransform();
    }
  }
  return expandedTileset;
}

async function loadTileImg(tilePath: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = tilePath;
  });
}

function calculateValidNeighbors(expandedTileset: ExpandedTile[]) {
  const tilesetWithSets = expandedTileset.map<Tile>((tile) => {
    return {
      name: tile.name,
      path: tile.path,
      weight: tile.weight,
      validNeighbors: [
        new Set<string>(),
        new Set<string>(),
        new Set<string>(),
        new Set<string>(),
      ],
    };
  });

  for (let aTile = 0; aTile < expandedTileset.length; aTile++) {
    for (let bTile = aTile; bTile < expandedTileset.length; bTile++) {
      for (let way = 0; way < 4; way++) {
        const oppositeWay = (way + 2) % 4;

        const baseTile = expandedTileset[aTile];
        const tileEdge = baseTile.edges[way];

        const comparatorTile = expandedTileset[bTile];
        const comparatorEdge = reverseString(comparatorTile.edges[oppositeWay]);

        if (
          fullBlacklist[baseTile.name] &&
          fullBlacklist[baseTile.name][way].has(comparatorTile.name)
        )
          continue;

        if (tileEdge === comparatorEdge) {
          tilesetWithSets[aTile].validNeighbors[way].add(comparatorTile.path);
          tilesetWithSets[bTile].validNeighbors[oppositeWay].add(baseTile.path);
        }
      }
    }
  }

  return tilesetWithSets;
}

function reverseString(string: string) {
  const stringArray = string.split("");
  stringArray.reverse();
  return stringArray.join("");
}
