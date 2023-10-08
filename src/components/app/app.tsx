import { FilmsData } from '../../types/film-data.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const/const.ts';
import Main from '../../pages/main/main.tsx';
import SignIn from '../../pages/sign-in/sign-in.tsx';
import MyList from '../../pages/my-list/my-list.tsx';
import Film from '../../pages/film/film.tsx';
import AddReview from '../../pages/add-review/add-review.tsx';
import Player from '../../pages/player/player.tsx';
import NotFound404 from '../../pages/not-found-404/not-found-404.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import { GenresData } from '../../types/genres-data.ts';
import ScrollToTop from '../scroll-to-top/scroll-to-top.tsx';
import { ReviewsData } from '../../types/reviews-data.ts';

type AppProps = {
  filmsData: FilmsData;
  genresData: GenresData;
  reviewsData: ReviewsData;
}

function App ({filmsData, genresData, reviewsData}: AppProps) {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main
              filmsData={filmsData}
              genresData={genresData}
            />
          }
        >
          <Route
            path={AppRoute.Genre}
            element={
              <Main filmsData={filmsData} genresData={genresData}/>
            }
          />
        </Route>
        <Route
          path={AppRoute.SignIn}
          element={<SignIn></SignIn>}
        >
        </Route>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <MyList filmsData={filmsData}></MyList>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Film}
          element={<Film filmsData={filmsData} reviewsData={reviewsData}></Film>}
        >
          {/*<Route path={FilmRoute.Reviews} element={<Film filmsData={filmsData}></Film> }/>*/}
          {/*<Route path={FilmRoute.Overview}/>*/}
          {/*<Route path={FilmRoute.Details}/>*/}
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <AddReview filmsData={filmsData}></AddReview>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Player}
          element={<Player filmsData={filmsData}></Player>}
        >
        </Route>
        <Route
          path="*"
          element={<NotFound404></NotFound404>}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
