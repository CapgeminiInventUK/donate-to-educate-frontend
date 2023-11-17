import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import { Amplify } from 'aws-amplify';
import { configureAutoTrack } from 'aws-amplify/analytics';
import { amplifyConfig } from './amplify.config';

Amplify.configure(amplifyConfig);
configureAutoTrack({ enable: true, type: 'pageView', options: { appType: 'singlePage' } });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
