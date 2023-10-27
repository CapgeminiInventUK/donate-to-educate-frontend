import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from './amplify.config';

Amplify.configure(amplifyConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
