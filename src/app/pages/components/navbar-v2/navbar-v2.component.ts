import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../interface/user';
import { loadAuthUser } from '../../../state/auth/auth.actions';
import {
  selectAuthLoaded,
  selectAuthUser,
} from '../../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-v2',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './navbar-v2.component.html',
  styleUrl: './navbar-v2.component.scss',
})
export class NavbarV2Component {
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);

  constructor(private store: Store) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user !== null));
  }
}
