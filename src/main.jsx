import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './Router/router.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import Auth from './Auth/Auth.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </HelmetProvider>

  </React.StrictMode>
)
