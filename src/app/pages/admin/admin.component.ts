import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { AuthService } from '../../service/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private snackBarRef = inject(MatSnackBar);

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBarRef.open('Logged out successfully!', 'Dismiss', {
      duration: 3000,
    });
  }
}
