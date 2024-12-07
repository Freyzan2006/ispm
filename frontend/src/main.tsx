import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import "./input.css"



import { Provider } from 'react-redux'

import store from './store/store.ts'


import { RouterProvider } from "react-router-dom";

import router from './routers/Routers.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
