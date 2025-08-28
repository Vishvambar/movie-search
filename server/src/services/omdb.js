import axios from 'axios';
import 'dotenv/config';
const OMDB = axios.create({
    baseURL: 'http://www.omdbapi.com/',
    params: { apikey: process.env.OMDB_API_KEY }
})


export const searchmovies = async ({ query, page= 1 }) => {

    const data = await OMDB.get('/', {
        params: { s: query, page },
    });
return data;
}

export const getmovies = async (id)=>{
    const data = await OMDB.get('/',{
        params:{ i: id, plot: "full"  },
    })
    return data ;

};