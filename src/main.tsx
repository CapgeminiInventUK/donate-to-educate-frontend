import React from 'react';
import ReactDOM from 'react-dom/client';
import RootComponent from './components/RootComponent/RootComponent';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
