import { Router } from 'express';
import { z } from 'zod';
import { searchmovies } from '../services/omdb';

const router = Router();

router.get('/search', async (req, res) => {
    try {
        const schema = z.object({
            q: z.string().min(1),
            page: z.string().optional(),

        });
        const { q, page } = schema.parse({ q: req.query.q, page: req.query.page });
        const data = await searchmovies({ query: q, page });
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
});


router.get('/:id', async (req, res)=>{
    try {
        const data = await getmovies(req.params.id);
        res.json(data);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


export default router;

