import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app.tsx';
import { filmsData } from './mocks/films.ts';
import { reviewsData } from './mocks/reviews.ts';
import { store } from './store';
import { fetchFilmsAction } from './store/api-actions.ts';
import ErrorMessage from './components/error-message/error-message.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilmsAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App
        filmsData={filmsData}
        reviewsData={reviewsData}
      />
    </Provider>
  </React.StrictMode>
);
