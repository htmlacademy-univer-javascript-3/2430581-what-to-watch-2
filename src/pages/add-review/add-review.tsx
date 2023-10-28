import { FilmsData } from '../../types';
import Header from '../../components/header/header.tsx';
import { Link, useParams } from 'react-router-dom';
import NotFound404 from '../not-found-404/not-found-404.tsx';
import { AppRoute, FilmRoute } from '../../const/const.ts';
import AddReviewForm from '../../components/add-review-form/add-review-form.tsx';

type ReviewProps = {
  filmsData: FilmsData;
};

const AddReview = ({filmsData}: ReviewProps) => {
  const params = useParams();
  const film =
    filmsData
      .find((item) => item.id === params.id);

  return film ? (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header isLoggedIn>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film.replace(':id', film.id) + FilmRoute.Overview} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={AppRoute.AddReview.replace(':id', film.id)} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm/>

    </section>
  ) : (
    <NotFound404/>
  );
};
export default AddReview;
