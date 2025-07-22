import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports:[RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  irParaMarcacao() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/marcarcao']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    }
    
    isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
    }
}
