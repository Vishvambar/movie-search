export default function MovieCard({ m }) {
  return (
    <div className="border rounded p-2 shadow">
      <img
        src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450"}
        alt={m.Title}
        className="w-full h-72 object-cover rounded"
      />
      <h3 className="font-bold text-lg mt-2">{m.Title}</h3>
      <p className="text-sm text-gray-600">{m.Year}</p>
    </div>
  );
}
