import { z } from "zod";
import { searchmovies } from "../../services/omdb.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const schema = z.object({
      q: z.string().min(1),
      page: z.string().optional(),
    });

    const { q, page } = schema.parse({
      q: req.query.q,
      page: req.query.page,
    });

    const { data } = await searchmovies({ query: q, page });
    
    // Handle OMDB API errors
    if (data.Error) {
      return res.status(200).json(data); // Return the error from OMDB but with 200 status
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("Search API error:", error);
    return res.status(400).json({ error: error.message });
  }
}