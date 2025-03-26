import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router'
import {Provider} from "react-redux"
import store from './store/index.js'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>

    <App/>

    </Provider>
    

    </Router>
    <Toaster />
  </React.StrictMode>,
)
