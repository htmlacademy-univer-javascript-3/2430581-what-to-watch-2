import { createAction } from '@reduxjs/toolkit';
import { FilmData, FilmsPreviewData, ReviewsData, User } from '../types';
import { AppRoute, AuthStatus } from '../const/const.ts';

export const changeGenre = createAction<{genre: string}>('genre/changeGenre');
export const getFilmsByGenre = createAction<{genre: string}>('films/getFilmsByGenre');

export const loadFilmsData = createAction<FilmsPreviewData>('films/loadFilmsData');

export const setError = createAction<string | null>('films/setError');

export const setFilmsDataLoadingStatus = createAction<boolean>('films/setFilmsDataLoadingStatus');

export const setFilmDataLoadingStatus = createAction<boolean>('films/setFilmDataLoadingStatus');

export const getFilmById = createAction<FilmData>('films/getFilmById');

export const getFilmsLikeThis = createAction<FilmsPreviewData>('films/getFilmsLikeThis');

export const getFilmReviews = createAction<ReviewsData>('comments/getFilmReviews');

export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');

export const setUserData = createAction<User>('user/setUserData');

export const redirectToRoute = createAction<AppRoute>('common/redirectToRoute');
