import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const OMDB = axios.create({
    baseURL: 'https://www.omdbapi.com/',
    params: { apikey: process.env.VITE_OMDB_API_KEY }
})


export const searchmovies = async ({ query, page= 1 }) => {

    const data = await OMDB.get('/', {
        params: { s: query, page },
    });
return data;
}

export const getmovies = async (id)=>{
    const data = await OMDB.get('/',{
        params:{ i: id, plot: "full" },
    })
    return data ;

};