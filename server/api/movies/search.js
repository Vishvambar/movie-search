import { z } from "zod";
import { searchmovies } from "../../src/services/omdb.js";

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
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
