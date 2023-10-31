import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main.tsx';
import SignIn from '../../pages/sign-in/sign-in.tsx';
import MyList from '../../pages/my-list/my-list.tsx';
import Film from '../../pages/film/film.tsx';
import AddReview from '../../pages/add-review/add-review.tsx';
import Player from '../../pages/player/player.tsx';
import NotFound404 from '../../pages/not-found-404/not-found-404.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import ScrollToTop from '../scroll-to-top/scroll-to-top.tsx';
import { FilmsData, ReviewsData } from '../../types';
import { AppRoute, AuthStatus } from '../../const/const.ts';
import { useAppSelector } from '../../hooks';
import { LoadingScreen } from '../loading-screen/loading-screen.tsx';

type AppProps = {
  filmsData: FilmsData;
  reviewsData: ReviewsData;
}

function App ({filmsData, reviewsData}: AppProps) {
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);

  if (isFilmsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main/>
          }
        >
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
