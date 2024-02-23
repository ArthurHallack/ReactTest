import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import SingIn from './routes/Cadastrar.jsx'
import PaisCrud from './routes/Pais.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/Cadastro",
    element: <SingIn/>
  },
  {
    path: "/Home",
    element: <Home/>
  },
  {
    path: "/Pais",
    element: <PaisCrud/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
