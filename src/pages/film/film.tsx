import Header from '../../components/header/header.tsx';
import { FilmsData } from '../../types';
import NotFound404 from '../not-found-404/not-found-404.tsx';
import { Link, useParams } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import { AppRoute, FilmRoute } from '../../const/const.ts';
import { Details, Overview, Reviews } from './film-tabs';
import FilmNav from './film-nav/film-nav.tsx';
import { ReviewsData } from '../../types';
import { MyListBtn } from '../../ui-components';
import { useAppSelector } from '../../hooks';

const LIKE_THIS_CARDS = 4;

type FilmProps = {
  filmsData: FilmsData;
  reviewsData: ReviewsData;
};

const Film = ({filmsData, reviewsData}: FilmProps): JSX.Element => {
  const params = useParams();
  const film =
    filmsData
      .find((item) => item.id === params.id);
  const films = useAppSelector((state) => state.films);
  const renderTabs = (tabName: string | undefined): JSX.Element => {
    switch(tabName) {
      case FilmRoute.Overview:
        return <Overview film={film}/>;
      case FilmRoute.Details:
        return <Details film={film}/>;
      case FilmRoute.Reviews:
        return <Reviews reviews={reviewsData}/>;
      default:
        return <Overview film={film}/>;
    }
  };
  return film ? (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.posterImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <MyListBtn isFavorite={film.isFavorite}/>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={AppRoute.AddReview.replace(':id', film.id)} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage} alt={film.name} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <FilmNav film={film} activeTab={params.info}/>
              {renderTabs(params.info)}
              {/*<Overview/>*/}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList filmsPreviewData={films} maxCards={LIKE_THIS_CARDS}/>
        </section>

        <Footer/>
      </div>
    </>
  ) : (
    <NotFound404/>
  );
};

export default Film;
