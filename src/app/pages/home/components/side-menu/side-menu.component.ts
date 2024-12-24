import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AdminButtonComponent } from '../admin-button/admin-button.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    AdminButtonComponent,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  toggleMenu() {
    this.toggleSidenav.emit();
  }
}
