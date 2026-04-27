export default function FilterBar({ query, onChange }) {
  return (
    <input
      className="border p-2 w-full mb-4"
      placeholder="Buscar cliente..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
