import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import routes from './utils/routes.tsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
