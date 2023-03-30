import Tile from "./Tile";

function App() {
  let tiles: Array<JSX.Element> = [];

  for (let tileId = 0; tileId <= 13; tileId++) {
    tiles.push(<Tile key={tileId} id={tileId} size={70} />);
  }

  return <>{tiles}</>;
}

export default App;
