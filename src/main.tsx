import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import { Amplify } from 'aws-amplify';
import { configureAutoTrack } from 'aws-amplify/analytics';
import { amplifyConfig } from './amplify.config';

Amplify.configure(amplifyConfig);
configureAutoTrack({
  enable: true,
  type: 'pageView',
  options: {
    appType: 'singlePage',
    eventName: 'pageView',
    urlProvider: () => window.location.origin + window.location.pathname,
  },
});
configureAutoTrack({
  enable: true,
  type: 'session',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
