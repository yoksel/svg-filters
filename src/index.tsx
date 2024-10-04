import React from 'react';
// import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom/client';
// import Root from './components/Root';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App, { loader as AppLoader } from './routes/App';
import Read from './routes/Read';
// import configureStore from './configureStore';
import { store } from './store';

import './index.scss';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/read',
    element: <Read />,
  },
  {
    path: '/:section?/:id?',
    element: <App />,
    loader: AppLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// registerServiceWorker();

// Filter
// -- Primitive

// PrimitiveControls
// -- PrimitiveControl

// FilterContsructor
// -- PrimitivePanel

// Presets
// -- Preset
