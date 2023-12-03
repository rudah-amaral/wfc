const tilesMod = import.meta.glob<string>("./*.png", {
  import: "default",
  eager: true,
});

export interface Tile {
  path: string;
  edges: string[];
}

const tileset: Tile[] = [
  // Tile 0
  {
    path: tilesMod["./0.png"],
    edges: ["ABA", "ACA", "ABA", "ACA"],
  },
  // Tile 1
  {
    path: tilesMod["./1.png"],
    edges: ["ACA", "ABA", "ACA", "ABA"],
  },
  // Tile 2
  {
    path: tilesMod["./2.png"],
    edges: ["DDD", "DDD", "DDD", "DDD"],
  },
  // Tile 3
  {
    path: tilesMod["./3.png"],
    edges: ["ABA", "AAD", "DDD", "DAA"],
  },
  // Tile 4
  {
    path: tilesMod["./4.png"],
    edges: ["DAA", "ABA", "AAD", "DDD"],
  },
  // Tile 5
  {
    path: tilesMod["./5.png"],
    edges: ["DDD", "DAA", "ABA", "AAD"],
  },
  // Tile 6
  {
    path: tilesMod["./6.png"],
    edges: ["AAD", "DDD", "DAA", "ABA"],
  },
  // Tile 7
  {
    path: tilesMod["./7.png"],
    edges: ["AAA", "AAA", "AAD", "DAA"],
  },
  // Tile 8
  {
    path: tilesMod["./8.png"],
    edges: ["DAA", "AAA", "AAA", "AAD"],
  },
  // Tile 9
  {
    path: tilesMod["./9.png"],
    edges: ["AAD", "DAA", "AAA", "AAA"],
  },
  // Tile 10
  {
    path: tilesMod["./10.png"],
    edges: ["AAA", "AAD", "DAA", "AAA"],
  },
  // Tile 11
  {
    path: tilesMod["./11.png"],
    edges: ["ABA", "ABA", "ABA", "ABA"],
  },
  // Tile 12
  {
    path: tilesMod["./12.png"],
    edges: ["ABA", "ABA", "ABA", "ABA"],
  },
  // Tile 13
  {
    path: tilesMod["./13.png"],
    edges: ["ABA", "ABA", "AAA", "AAA"],
  },
  // Tile 14
  {
    path: tilesMod["./14.png"],
    edges: ["AAA", "ABA", "ABA", "AAA"],
  },
  // Tile 15
  {
    path: tilesMod["./15.png"],
    edges: ["AAA", "AAA", "ABA", "ABA"],
  },
  // Tile 16
  {
    path: tilesMod["./16.png"],
    edges: ["ABA", "AAA", "AAA", "ABA"],
  },
  // Tile 17
  {
    path: tilesMod["./17.png"],
    edges: ["AAA", "AAA", "AAA", "AAA"],
  },
  // Tile 18
  {
    path: tilesMod["./18.png"],
    edges: ["AAA", "ABA", "ABA", "ABA"],
  },
  // Tile 19
  {
    path: tilesMod["./19.png"],
    edges: ["ABA", "AAA", "ABA", "ABA"],
  },
  // Tile 20
  {
    path: tilesMod["./20.png"],
    edges: ["ABA", "ABA", "AAA", "ABA"],
  },
  // Tile 21
  {
    path: tilesMod["./21.png"],
    edges: ["ABA", "ABA", "ABA", "AAA"],
  },
  // Tile 22
  {
    path: tilesMod["./22.png"],
    edges: ["ABA", "AAA", "ABA", "AAA"],
  },
  // Tile 23
  {
    path: tilesMod["./23.png"],
    edges: ["AAA", "ABA", "AAA", "ABA"],
  },
  // Tile 24
  {
    path: tilesMod["./24.png"],
    edges: ["ACA", "AAA", "ABA", "AAA"],
  },
  // Tile 25
  {
    path: tilesMod["./25.png"],
    edges: ["AAA", "ACA", "AAA", "ABA"],
  },
  // Tile 26
  {
    path: tilesMod["./26.png"],
    edges: ["ABA", "AAA", "ACA", "AAA"],
  },
  // Tile 27
  {
    path: tilesMod["./27.png"],
    edges: ["AAA", "ABA", "AAA", "ACA"],
  },
  // Tile 28
  {
    path: tilesMod["./28.png"],
    edges: ["ABA", "ABA", "AAA", "AAA"],
  },
  // Tile 29
  {
    path: tilesMod["./29.png"],
    edges: ["AAA", "ABA", "ABA", "AAA"],
  },
  // Tile 30
  {
    path: tilesMod["./30.png"],
    edges: ["AAA", "AAA", "ABA", "ABA"],
  },
  // Tile 31
  {
    path: tilesMod["./31.png"],
    edges: ["ABA", "AAA", "AAA", "ABA"],
  },
  // Tile 32
  {
    path: tilesMod["./32.png"],
    edges: ["AAA", "ABA", "AAA", "ABA"],
  },
  // Tile 33
  {
    path: tilesMod["./33.png"],
    edges: ["ABA", "AAA", "ABA", "AAA"],
  },
  // Tile 34
  {
    path: tilesMod["./34.png"],
    edges: ["ABA", "AAA", "AAA", "AAA"],
  },
  // Tile 35
  {
    path: tilesMod["./35.png"],
    edges: ["AAA", "ABA", "AAA", "AAA"],
  },
  // Tile 36
  {
    path: tilesMod["./36.png"],
    edges: ["AAA", "AAA", "ABA", "AAA"],
  },
  // Tile 37
  {
    path: tilesMod["./37.png"],
    edges: ["AAA", "AAA", "AAA", "ABA"],
  },
  // Tile 38
  {
    path: tilesMod["./38.png"],
    edges: ["AAA", "ACA", "AAA", "ACA"],
  },
  // Tile 39
  {
    path: tilesMod["./39.png"],
    edges: ["ACA", "AAA", "ACA", "AAA"],
  },
];

export default tileset;
