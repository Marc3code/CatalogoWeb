import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './Global';
import Rotas from './Rotas';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Rotas/>
    <GlobalStyles />
  </React.StrictMode>
);
