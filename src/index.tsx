import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { filmsData } from './mocks/films.ts';
import { genresData } from './mocks/genres.ts';
import { reviewsData } from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      filmsData={filmsData}
      genresData={genresData}
      reviewsData={reviewsData}
    />
  </React.StrictMode>
);
