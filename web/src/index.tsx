import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import MainPage from './views/MainPage';
import LoginPage from './views/LoginPage';

import './style.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "login",
    element: <LoginPage />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
