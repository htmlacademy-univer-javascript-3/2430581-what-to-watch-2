import FilmCard from '../film-card/film-card.tsx';
import { FilmData, FilmsData } from '../../types/film-data.ts';
import { useState } from 'react';

type FilmListProps = {
  filmsData: FilmsData;
  maxCards?: number;
  genre?: string;
  clickHandler?: (item: FilmData) => void;
}
const FilmList = ({filmsData, maxCards, genre, clickHandler}: FilmListProps): JSX.Element => {
  const [activeCardFilm, setActiveCardFilm] = useState(filmsData[0]);
  const handleMouseOver = (film: FilmData) => {
    setActiveCardFilm(film);
  };
  return (
    <div className="catalog__films-list">
      {
        filmsData
          .filter((item) => genre ? item.genre.toLowerCase() === genre?.toLowerCase() : item)
          .filter((item, index) => maxCards ? index < maxCards : item)
          .map((item): JSX.Element => (
            <FilmCard
              key={item.id}
              film={item}
              clickHandler={() => clickHandler ? clickHandler(item) : ''}
              mouseOverHandler={handleMouseOver}
            />
          ))
      }
    </div>
  );
};

export default FilmList;
