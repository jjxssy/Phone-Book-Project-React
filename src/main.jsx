import React from 'react';
import ReactDOM from 'react-dom/client';

import 'normalize.css';

import './index.css';

import App from './app/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />

 
  </React.StrictMode>,
);

// const h1 = document.createElement('h1')
// h1.textContent = 'Hello'
// document.getElementById('root').append(h1)
