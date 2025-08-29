import { useState } from 'react';
import { useNavigate, createSearchParams } from "react-router-dom";




export default function SearchBar() {
    const [q, setQ] = useState('');
    const nav = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        if (!q.trim()) return;
        nav({ pathname: "/", search: `?${createSearchParams({ q, page: 1 })}` });

    };



    return (
        <form onSubmit={submit} className="flex gap-2 p-4">
          <input className="flex-1 border rounded px-3 py-2" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search movies…" />
          <button className="px-4 py-2 rounded bg-black text-white">Search</button>
        </form>
      );

}
