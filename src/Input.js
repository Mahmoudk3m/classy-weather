export default function Input({ location, onChangeLocation }) {
  return (
    <input
      placeholder="Search From Location ..."
      type="text"
      value={location}
      onChange={(e) => onChangeLocation(e.target.value)}
    />
  );
}
