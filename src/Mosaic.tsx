import Tile from "./Tile";

interface MosaicProps {
  columns: number;
  rows: number;
  tileSize: number;
}

export default function Mosaic({ columns, rows, tileSize }: MosaicProps) {
  let tiles: Array<JSX.Element> = [];

  for (let tileId = 0; tileId <= 13; tileId++) {
    tiles.push(<Tile key={tileId} id={tileId} size={tileSize} />);
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    width: "min-content",
    gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
    gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
  };

  return (
    <>
      <div>{tiles}</div>
      <div style={gridStyle}></div>
    </>
  );
}
