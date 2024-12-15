import { createReducer, on } from '@ngrx/store';
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFail,
  signInUser,
  signInUserFail,
  signInUserSuccess,
  logoutUser,
  logoutUserFail,
  logoutUserSuccess,
} from '../actions/auth.actions';
import { initialAuthState } from '../auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(signUpUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(signUpUserSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(signUpUserFail, (state, { error }) => ({
    ...state,
    error: error.message,
    loading: false,
  })),

  on(signInUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(signInUserSuccess, (state, { username }) => ({
    ...state,
    username,
    loading: false,
  })),

  on(signInUserFail, (state, { error }) => ({
    ...state,
    error: error.message,
    loading: false,
  })),

  on(logoutUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(logoutUserSuccess, (state) => ({
    ...state,
    username: null,
    loading: false,
  })),

  on(logoutUserFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
