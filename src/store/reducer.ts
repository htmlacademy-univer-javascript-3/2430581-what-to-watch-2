import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  getFilmById,
  getFilmsByGenre,
  loadFilmsData,
  requireAuthorization,
  setError,
  setFilmsDataLoadingStatus,
  setFilmDataLoadingStatus,
  setUserData,
  getFilmsLikeThis,
  getFilmReviews,
} from './action.ts';
import { AuthStatus, GENRE_ALL_GENRES } from '../const/const.ts';
import { FilmData, FilmsPreviewData, ReviewsData, User } from '../types';

type InitialState = {
  genre: string;
  isFilmDataLoading: boolean;
  isFilmsDataLoading: boolean;
  film: FilmData;
  films: FilmsPreviewData;
  sortedFilms: FilmsPreviewData;
  filmsLikeThis: FilmsPreviewData;
  filmReviews: ReviewsData;
  authStatus: AuthStatus;
  user: User;
  error: string | null;
}

const initialState: InitialState = {
  genre: 'All genres',
  isFilmDataLoading: false,
  isFilmsDataLoading: false,
  film: null,
  films: [],
  sortedFilms: [],
  filmsLikeThis: [],
  filmReviews: [],
  authStatus: AuthStatus.Unknown,
  user: {
    name: '',
    avatarUrl: '',
    email: '',
  },

  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(getFilmsByGenre, (state, action) => {
      const {genre} = action.payload;
      state.sortedFilms =
        state.films
          .filter((item) => genre === GENRE_ALL_GENRES ? item : item.genre === genre);
    })
    .addCase(loadFilmsData, (state, action) => {
      state.films = action.payload;
      state.sortedFilms = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(setFilmDataLoadingStatus, (state, action) => {
      state.isFilmDataLoading = action.payload;
    })
    .addCase(getFilmById, (state, action) => {
      state.film = action.payload;
    })
    .addCase(getFilmsLikeThis, (state, action) => {
      state.filmsLikeThis = action.payload;
    })
    .addCase(getFilmReviews, (state, action) => {
      state.filmReviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
