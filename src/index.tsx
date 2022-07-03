import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from 'src/App';
import { persistor, store } from 'src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
