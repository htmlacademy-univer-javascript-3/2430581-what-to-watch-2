import FilmCard from '../film-card/film-card.tsx';
import { FilmData, FilmsData } from '../../types';

type FilmListProps = {
  filmsData: FilmsData;
  maxCards?: number;
  clickHandler?: (item: FilmData) => void;
}

const FilmList = ({filmsData, maxCards, clickHandler}: FilmListProps): JSX.Element => (
  <div className="catalog__films-list">
    {
      filmsData
        .filter((item, index) => maxCards ? index < maxCards : item)
        .map((item): JSX.Element => (
          <FilmCard
            key={item.id}
            film={item}
            clickHandler={() => clickHandler ? clickHandler(item) : ''}
          />
        ))
    }
  </div>
);

export default FilmList;
