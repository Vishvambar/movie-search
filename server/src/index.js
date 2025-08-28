import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movie.routes.js';
const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/health', (_req, res)=> res.json({ok:true}));
app.use('/api/movies', movieRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server Listening on port ${PORT}`);

});
