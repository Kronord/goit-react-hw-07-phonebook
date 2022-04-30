import React from 'react';
import { store } from 'components/Redux/Store';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from 'components/App';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);


