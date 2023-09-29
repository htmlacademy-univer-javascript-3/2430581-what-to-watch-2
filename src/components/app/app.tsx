import { FilmDataProps } from '../../types/film-data-props.ts';
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

const App = ({name, genre, promoDate}: FilmDataProps) =>
  (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main
              name={name}
              genre={genre}
              promoDate={promoDate}
            />
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
            <PrivateRoute authStatus={AuthStatus.NoAuth}>
              <MyList></MyList>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Film}
          element={<Film></Film>}
        >
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authStatus={AuthStatus.NoAuth}>
              <AddReview></AddReview>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Player}
          element={<Player></Player>}
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

export default App;
