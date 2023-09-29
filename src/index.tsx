import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';

const filmData = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  promoDate: '2014',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App name={filmData.name} genre={filmData.genre} promoDate={filmData.promoDate}></App>
  </React.StrictMode>
);
