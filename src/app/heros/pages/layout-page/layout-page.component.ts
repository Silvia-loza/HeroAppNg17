import { AuthService } from './../../../auth/servicios/auth.service';
import { Component } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  public sidebarItems = [
    { id: 1, label: 'listado', icon: 'label', route: './list' },
    { id: 2, label: 'Nuevo Heroe', icon: 'add', route: './new-hero' },
    { id: 3, label: 'Search', icon: 'search', route: './search' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
