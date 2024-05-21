import { Injectable, inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap, of, map } from 'rxjs';

export const canActivatePublicGuard: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveF
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });
  const publicGuard = inject(PublicGuard);
  return publicGuard.checkStatus();
};
export const canMatchPublicGuard: CanMatchFn = (
  //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });
  const publicGuard = inject(PublicGuard);
  return publicGuard.checkStatus();
};

@Injectable({ providedIn: 'root' })
export class PublicGuard {
  constructor(private authService: AuthService, private router: Router) {}

  checkStatus(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        console.log('1. is authenticated Public Guard', isAuthenticated);
        if (isAuthenticated) {
          this.router.navigate(['/heros']);
        }
      }),
      map((isAuthenticated) => !isAuthenticated)
    );
  }
}
