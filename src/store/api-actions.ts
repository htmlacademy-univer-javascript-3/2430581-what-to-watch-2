import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, FilmsPreviewData, State } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoutes, TIMEOUT_SHOW_ERROR } from '../const/const.ts';
import { loadFilmsData, setError, setFilmsDataLoadingStatus } from './action.ts';
import { store } from './';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<FilmsPreviewData>(APIRoutes.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilmsData(data));
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

