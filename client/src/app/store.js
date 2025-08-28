import {configureStore} from '@reduxjs/toolkit';
import apislice from './apiSlice';

export const store = configureStore({
    reducer:{ [apislice.reducerPath]: apislice.reducer},
    middleware :    (gDM)=> gDM().concat(apislice.middleware),
})
