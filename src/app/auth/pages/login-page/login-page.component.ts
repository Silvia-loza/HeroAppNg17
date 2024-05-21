import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService
      .login('Silvylozano@gmail.com', '12345678')
      .subscribe((user) => {
        this.router.navigate(['/heros/list']);
      });
  }
}
