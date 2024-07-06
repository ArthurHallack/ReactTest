import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import SingIn from './routes/Cadastrar.jsx'
import PaisCrud from './routes/Pais.jsx'
import Grafico from './routes/Grafico.jsx'
import Config from './routes/Config.jsx'
import Municipio from './routes/Municipio.jsx'
import Aeroporto from './routes/Aeroporto.jsx'
import Usuario from './routes/Usuario.jsx'


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
  },
  {
    path: "/Grafico",
    element: <Grafico/>
  },
  {
    path: "/Config",
    element: <Config/>
  },
  {
    path: "/Municipio",
    element: <Municipio/>
  },
  {
    path: "/Aeroporto",
    element: <Aeroporto/>
  },
  {
    path: "/Usuario",
    element: <Usuario/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
