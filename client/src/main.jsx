import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import SearchPage from './features/movies/SearchPage.jsx'
import DetailsPage from './features/movies/DetailsPage.jsx'

const router = createBrowserRouter([
  {path:'/' , element : <SearchPage />},
  {path:'/movie/:id' , element : <DetailsPage />},
  
]);
ReactDom.createRoot(document.getElementById('root')).render(
    
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
