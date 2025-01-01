import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import {
  toggleBoolSetting1,
  toggleBoolSetting2,
} from '../../../../../state/config/config.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { selectConfig } from '../../../../../state/config/config.selectors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-config-settings',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, FormsModule, MatTooltipModule],
  templateUrl: './config-settings.component.html',
  styleUrl: './config-settings.component.scss',
})
export class ConfigSettingsComponent {
  isBoolSetting1$: Observable<boolean> = this.store
    .select(selectConfig)
    .pipe(map((config) => config.boolSetting1));
  isBoolSetting2$: Observable<boolean> = this.store
    .select(selectConfig)
    .pipe(map((config) => config.boolSetting2));
  isMobile: boolean = false;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  toggleHomeHeader(checked: boolean) {
    this.store.dispatch(toggleBoolSetting1({ boolSetting1: checked }));
  }

  toggleAdminHeader(checked: boolean) {
    this.store.dispatch(toggleBoolSetting2({ boolSetting2: checked }));
  }
}
