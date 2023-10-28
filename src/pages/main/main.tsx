import { FilmData } from '../../types';
import FilmList from '../../components/film-list/film-list.tsx';
import FilmPreview from '../../components/film-preview/film-preview.tsx';
import Footer from '../../components/footer/footer.tsx';
import { useState } from 'react';
import GenreList from '../../components/genre-list/genre-list.tsx';
import { changeGenre, getFilmsByGenre } from '../../store/action.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filmsData } from '../../mocks/films.ts';

function Main (): JSX.Element {
  const dispatch = useAppDispatch();
  const genreName = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const [firstFilm] = films;
  const [filmPreview, setFilmPreview] = useState(firstFilm);
  const handleFilmCardClick = (film: FilmData) => {
    setFilmPreview(film);
  };
  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(getFilmsByGenre({genre}));
  };
  return (
    <>
      <FilmPreview film={filmPreview}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmsData={filmsData} activeGenre={genreName} clickHandler={handleGenreClick}/>

          <FilmList filmsData={films} clickHandler={handleFilmCardClick}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Main;
