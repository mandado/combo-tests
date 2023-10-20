import { defaultTheme, Provider } from '@adobe/react-spectrum';
import React from 'react';
import ReactDOM from 'react-dom/client';
import PlaceListings from './places-listings/index.tsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider height="100%" theme={defaultTheme}>
      <PlaceListings />
    </Provider>
  </React.StrictMode>,
);
