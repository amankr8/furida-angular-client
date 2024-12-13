import { createReducer, on } from '@ngrx/store';
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFail,
  signInUser,
  signInUserFail,
  signInUserSuccess,
  logoutUser,
  loadAuthUser,
  loadAuthUserFail,
  loadAuthUserSuccess,
} from './auth.actions';
import { User } from '../../interface/user';

export interface AuthState {
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(loadAuthUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(loadAuthUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loaded: true,
    loading: false,
  })),

  on(loadAuthUserFail, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  })),

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

  on(signInUserSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(signInUserFail, (state, { error }) => ({
    ...state,
    error: error.message,
    loading: false,
  })),

  on(logoutUser, (state) => ({
    ...state,
    user: null,
  }))
);
