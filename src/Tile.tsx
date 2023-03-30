export default function Tile(props: { id: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}circuit-tileset/${props.id}.png`}
      alt={`${props.id}.png`}
    />
  );
}
