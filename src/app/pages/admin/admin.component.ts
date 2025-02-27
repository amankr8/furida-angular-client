import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { NavbarV2Component } from '../components/navbar-v2/navbar-v2.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AdminSideMenuComponent } from './components/admin-side-menu/admin-side-menu.component';
import { BreakpointService } from '../../service/breakpoint/breakpoint.service';
import { toggleBoolSetting1 } from '../../state/config/config.actions';
import { selectAuthLoaded } from '../../state/auth/auth.selectors';
import { loadAuthUser } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarV2Component,
    MatSidenavModule,
    AdminSideMenuComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();
  opened$: Observable<boolean> = this.smallScreen$.pipe(
    map((small) => (small ? false : true))
  );
  mode$: Observable<any> = this.smallScreen$.pipe(
    map((small) => (small ? 'over' : 'side'))
  );

  constructor(
    private store: Store,
    private breakpointService: BreakpointService
  ) {
    this.breakpointService.isSmallerScreen().subscribe((small) => {
      if (small)
        this.store.dispatch(toggleBoolSetting1({ boolSetting1: false }));
    });
  }

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  toggleDrawer() {
    this.sidenav.toggle();
  }
}
