import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  errorMessage: string | null = null;
  returnUrl: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || null;
    });
  }

  onSubmit(): void {
    this.errorMessage = null;

    const loginSuccess = this.authService.login(this.loginData.email, this.loginData.password);

    if (loginSuccess) {
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigate(['/perfil']);
      }
    } else {
      this.errorMessage = 'E-mail ou senha inválidos. Por favor, tente novamente.';
    }
  }
}
