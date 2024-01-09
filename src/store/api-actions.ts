import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, FilmData, FilmsPreviewData, ReviewsData, State, UserData } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const/const.ts';
import {
  loadFilmsData,
  redirectToRoute,
  requireAuthorization,
  setError,
  getFilmById,
  setFilmsDataLoadingStatus,
  setUserData, setFilmDataLoadingStatus, getFilmsLikeThis, getFilmReviews
} from './action.ts';
import { store } from './';
import { dropToken, saveToken } from '../services/token/token.ts';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/loadFilmsData',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<FilmsPreviewData>(APIRoute.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilmsData(data));
  },
);

export const fetchFilmByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/getFilmById',
  async (id, {dispatch, extra: api}) => {
    dispatch(setFilmDataLoadingStatus(true));
    const {data} = await api.get<FilmData>(APIRoute.Film + id);
    dispatch(setFilmDataLoadingStatus(false));
    dispatch(getFilmById(data));
  },
);

export const fetchFilmsLikeThis = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/getFilmsLikeThis',
  async (id, {dispatch, extra: api}) => {
    dispatch(setFilmDataLoadingStatus(true));
    const {data} = await api.get<FilmsPreviewData>(APIRoute.Film + id + APIRoute.LikeThis);
    dispatch(setFilmDataLoadingStatus(false));
    dispatch(getFilmsLikeThis(data));
  },
);

export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('comments/getFilmReviews',
  async (id, {dispatch, extra: api}) => {
    dispatch(setFilmDataLoadingStatus(true));
    const {data} = await api.get<ReviewsData>(APIRoute.Comments + id);
    dispatch(setFilmDataLoadingStatus(false));
    dispatch(getFilmReviews(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl, name}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setUserData({
      email, avatarUrl, name
    }));
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(setUserData({
      name: '',
      avatarUrl: '',
      email: '',
    }));
  },
);


export const clearErrorAction = createAsyncThunk(
  'films/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  },
);

