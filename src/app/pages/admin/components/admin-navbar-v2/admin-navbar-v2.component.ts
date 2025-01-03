import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrandLogoV2Component } from '../../../components/brand-logo-v2/brand-logo-v2.component';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { confirmLogout } from '../../../../state/auth/auth.actions';
import { map, Observable } from 'rxjs';
import { User } from '../../../../shared/interface/user';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../state/auth/auth.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-navbar-v2',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    BrandLogoV2Component,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './admin-navbar-v2.component.html',
  styleUrl: './admin-navbar-v2.component.scss',
})
export class AdminNavbarV2Component {
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);
  authLoading$: Observable<boolean> = this.store.select(selectAuthLoading);

  constructor(private store: Store) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(confirmLogout());
  }

  getAuthUsername(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => (user ? user.username : 'Unknown'))
    );
  }

  getAuthEmail(): Observable<string> {
    return this.authUser$.pipe(map((user) => (user ? user.email : 'Unknown')));
  }
}
