import { defaultTheme, Provider } from '@adobe/react-spectrum';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider height="100%" theme={defaultTheme}>
      <App />
    </Provider>
  </React.StrictMode>,
)
