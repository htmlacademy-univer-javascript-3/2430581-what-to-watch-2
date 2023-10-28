import { Fragment } from 'react';
import { FilmData } from '../../../../types';
import NotFound404 from '../../../not-found-404/not-found-404.tsx';


type DetailsProps = {
  film?: FilmData;
}

const Details = ({film}: DetailsProps): JSX.Element => film ? (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{film.director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {
            film.starring.map((item) =>
              (
                <Fragment key={self.crypto.randomUUID()}>
                  {item} <br></br>
                </Fragment>
              )
            )
          }
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{`${Math.trunc(film.runTime / 60)}:${film.runTime % 60}`}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{film.genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{film.released}</span>
      </p>
    </div>
  </div>
) : (
  <NotFound404/>
);
export default Details;
