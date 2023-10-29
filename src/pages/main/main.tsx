import { useState } from 'react';
import { FilmData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmList from '../../components/film-list/film-list.tsx';
import FilmPreview from '../../components/film-preview/film-preview.tsx';
import Footer from '../../components/footer/footer.tsx';
import GenreList from '../../components/genre-list/genre-list.tsx';
import { changeGenre, getFilmsByGenre } from '../../store/action.ts';
import { filmsData } from '../../mocks/films.ts';
import { ShowMoreBtn } from '../../ui-components';

const START_CARDS_COUNT = 8;

function Main (): JSX.Element {
  const [cardsCount, setCardsCount] = useState(START_CARDS_COUNT);
  const dispatch = useAppDispatch();
  const genreName = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const [firstFilm] = films;
  const [filmPreview, setFilmPreview] = useState(firstFilm);
  const handleFilmCardClick = (film: FilmData) => {
    setFilmPreview(film);
  };
  const handleBtnClick = () => {
    if (cardsCount < films.length) {
      setCardsCount((prevState) => prevState + START_CARDS_COUNT);
    }
  };
  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(getFilmsByGenre({genre}));
    setCardsCount(START_CARDS_COUNT);
  };
  return (
    <>
      <FilmPreview film={filmPreview}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmsData={filmsData} activeGenre={genreName} clickHandler={handleGenreClick}/>

          <FilmList filmsData={films} maxCards={cardsCount} clickHandler={handleFilmCardClick}/>

          {
            cardsCount < films.length && (
              <ShowMoreBtn clickHandler={handleBtnClick}/>
            )
          }
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Main;
