import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import NotFound404 from '../not-found-404/not-found-404.tsx';
import FilmList from '../../components/film-list/film-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import { AppRoute, AuthStatus, FilmRoute } from '../../const/const.ts';
import { Details, Overview, Reviews } from './film-tabs';
import FilmNav from './film-nav/film-nav.tsx';
import { MyListBtn } from '../../ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchComments, fetchFilmByIdAction, fetchFilmsLikeThis } from '../../store/api-actions.ts';
import { LoadingScreen } from '../../components/loading-screen/loading-screen.tsx';
import { useEffect } from 'react';

const LIKE_THIS_CARDS = 4;

const Film = (): JSX.Element => {
  const params = useParams();
  const authStatus = useAppSelector((state) => state.authStatus);
  const film = useAppSelector((state) => state.film);
  const filmsLikeThis = useAppSelector((state) => state.filmsLikeThis);
  const reviews = useAppSelector((state) => state.filmReviews);
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Если убрать проверку !film, то будут бесконечно отправляться запросы :)
  // if (params.id && !film) {
  //   store.dispatch(fetchFilmByIdAction(params.id));
  //   store.dispatch(fetchFilmsLikeThis(params.id));
  // store.dispatch(fetchComments(params.id));
  // }

  useEffect(() => {
    if (!params.id) {
      return navigate(AppRoute.NotFoundPage);
    }

    dispatch(fetchFilmByIdAction(params.id));
    dispatch(fetchFilmsLikeThis(params.id));
    dispatch(fetchComments(params.id));
  }, [params.id, navigate]);

  const renderTabs = (tabName: string | undefined): JSX.Element => {
    switch(tabName) {
      case FilmRoute.Overview:
        return <Overview film={film}/>;
      case FilmRoute.Details:
        return <Details film={film}/>;
      case FilmRoute.Reviews:
        return <Reviews reviews={reviews}/>;
      default:
        return <Overview film={film}/>;
    }
  };

  if (isFilmsDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return film && params.id ? (
    <>
      <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
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
                {
                  authStatus === AuthStatus.Auth
                  && <Link to={AppRoute.AddReview.replace(':id', film.id)} className="btn film-card__button">Add review</Link>
                }
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
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList filmsPreviewData={filmsLikeThis} maxCards={LIKE_THIS_CARDS}/>
        </section>

        <Footer/>
      </div>
    </>
  ) : (
    <NotFound404/>
  );
};

export default Film;
