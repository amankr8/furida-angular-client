import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/interface/user';
import { HttpErrorResponse } from '@angular/common/http';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFail = createAction(
  '[Users] Load Users Fail',
  props<{ error: string }>()
);

export const AddUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);

export const openUserEditDialog = createAction('[User] Open Edit Dialog');

export const openUserDeleteDialog = createAction(
  '[User] Open Delete Dialog',
  props<{ userId: number }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFail = createAction(
  '[User] Delete User Fail',
  props<{ error: HttpErrorResponse }>()
);
