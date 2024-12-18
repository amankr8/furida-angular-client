import { createAction, props } from '@ngrx/store';
import { User } from '../../interface/user';
import { HttpErrorResponse } from '@angular/common/http';

export const loadAuthUser = createAction('[Auth] Load Auth User');

export const loadAuthUserSuccess = createAction(
  '[Auth] Load Auth User Success',
  props<{ user: User }>()
);

export const loadAuthUserFail = createAction(
  '[Auth] Load Auth User Fail',
  props<{ error: string }>()
);

export const signUpUser = createAction(
  '[Auth] Sign Up User',
  props<{ user: User }>()
);

export const signUpUserSuccess = createAction('[Auth] Sign Up User Success');

export const signUpUserFail = createAction(
  '[Auth] Sign Up User Fail',
  props<{ error: HttpErrorResponse }>()
);

export const signInUser = createAction(
  '[Auth] Sign In User',
  props<{ user: User }>()
);

export const signInUserSuccess = createAction('[Auth] Sign In User Success');

export const signInUserFail = createAction(
  '[Auth] Sign In User Fail',
  props<{ error: HttpErrorResponse }>()
);

export const logoutUser = createAction('[Auth] Logout User');

export const logoutUserSuccess = createAction('[Auth] Logout User Success');

export const logoutUserFail = createAction(
  '[Auth] Logout User Fail',
  props<{ error: string }>()
);