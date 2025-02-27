import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError, of, tap, first } from 'rxjs';
import { ConfirmDialogComponent } from '../../pages/admin/components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../service/user/user.service';
import {
  openUserEditDialog,
  openUserDeleteDialog,
} from '../../state/user/user.actions';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
} from '../../state/user/user.actions';
import { UpdateUserComponent } from '../../pages/admin/users/components/update-user/update-user.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  readonly matDialog = inject(MatDialog);

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFail({ error: error.message })))
        )
      )
    )
  );

  openEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openUserEditDialog),
        tap(() =>
          this.matDialog.open(UpdateUserComponent, {
            panelClass: 'custom-dialog-container',
          })
        )
      ),
    { dispatch: false }
  );

  openDeleteDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openUserDeleteDialog),
        tap(({ userId }) => {
          this.showDeleteWarningDialog(deleteUser({ userId }));
        })
      ),
    { dispatch: false }
  );

  showDeleteWarningDialog(action: Action) {
    this.matDialog.open(ConfirmDialogComponent, {
      panelClass: 'alert-dialog-container',
      data: {
        action: action,
        message: 'Are you sure you want to delete this user?',
      },
    });
  }

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => deleteUserSuccess({ userId })),
          catchError((err) => of(deleteUserFail({ error: err })))
        )
      )
    )
  );

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteUserSuccess),
        tap(() => {
          this.snackBar.open('User deleted successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  deleteUserFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteUserFail),
        tap(({ error }) => {
          this.snackBar.open(this.getDelUserErrMsg(error), 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  getDelUserErrMsg(err: HttpErrorResponse): string {
    switch (err.status) {
      case 400:
        return 'Error: Logged in user cannot be deleted';
      case 404:
        return 'Error: User not found';
      default:
        return 'Error: An unknown error occurred';
    }
  }
}
