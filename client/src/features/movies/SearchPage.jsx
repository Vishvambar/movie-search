import { useSearchParams } from "react-router-dom";
import { useSearchMoviesQuery } from "../../app/apiSlice";
import MovieCard from "./MovieCard";
import SearchBar from "../../components/SearchBar";

export default function SearchPage() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "avengers";
  const page = Number(sp.get("page") || 1);
  const { data, isFetching, isError } = useSearchMoviesQuery({ q, page });
  console.log("API Data:", data);


  const next = () => setSp({ q, page: page + 1 });
  const prev = () => setSp({ q, page: Math.max(1, page - 1) });

  return (
    <div className="max-w-6xl mx-auto">
      <SearchBar />
      {isFetching && <p className="p-4">Loading…</p>}
      {isError && <p className="p-4 text-red-600">Error loading results.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {data?.Search?.map((m) => (
            <MovieCard key={m.imdbID} m={m} />
          ))}
        </div>

      </div>
      {data?.total_pages > 1 && (
        <div className="flex justify-center gap-4 p-6">
          <button onClick={prev} disabled={page === 1} className="border rounded px-3 py-2">Prev</button>
          <span>Page {page} of {data.total_pages}</span>
          <button onClick={next} disabled={page >= data.total_pages} className="border rounded px-3 py-2">Next</button>
        </div>
      )}
    </div>
  );
}
