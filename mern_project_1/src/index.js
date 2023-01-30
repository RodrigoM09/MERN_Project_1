import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { store } from "./app/store";
import { Provider } from "react-redux";

// ReactDOM.CreateRoot is a new method in React 18
// its purpose is to render a React element into the DOM in the supplied container and return a reference to the component
// It is a replacement for ReactDOM.render, ReactDOM.render is deprecated in React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

