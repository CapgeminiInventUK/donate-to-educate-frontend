import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import { Amplify, Analytics } from 'aws-amplify';
import { amplifyConfig } from './amplify.config';

Amplify.configure(amplifyConfig);
Analytics.autoTrack('pageView', {
  enable: true,
  type: 'SPA',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
