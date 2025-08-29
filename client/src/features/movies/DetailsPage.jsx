import { useParams, Link } from "react-router-dom";
import { useGetMovieQuery } from "../../app/apiSlice";

export default function DetailsPage() {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetMovieQuery(id);

  if (isFetching) return <p className="p-4">Loading…</p>;
  if (isError || !data) return <p className="p-4 text-red-600">Not found.</p>;

  const img = data.poster_path ? `${import.meta.env.VITE_IMG_BASE}${data.poster_path}` : "/no-poster.png";
  const trailer = data.videos?.results?.find(v => v.site === "YouTube" && v.type === "Trailer");

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Link to="/" className="underline">&larr; Back</Link>
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        <img src={img} alt={data.title} className="rounded-xl shadow" />
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{data.title} ({(data.release_date||"").slice(0,4)})</h1>
          <p className="opacity-80 mt-2">{data.overview}</p>
          <p className="mt-3">⭐ {data.vote_average?.toFixed?.(1)} | {data.runtime} min</p>
          <p className="mt-2">Genres: {data.genres?.map(g=>g.name).join(", ")}</p>
          {trailer && (
            <div className="mt-4 aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
