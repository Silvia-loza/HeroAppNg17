import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    //   return structuredClone(this.user); deep clone no requerido ya que no es muy profundo.
    return { ...this.user };
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const isAuthenticated = this.httpClient
      .get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((user) => (this.user = user)),
        map((user) => !!user),
        catchError((err) => of(false))
      );

    console.log('En servicio autenticacion', isAuthenticated);
    return isAuthenticated;
  }

  login(email: string, password: string): Observable<User> {
    // return this.httpClient.post(`${this.baseUrl}/auth`, { email, password }).pipe(

    // )
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', 'kljsabdkjbfb'))
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
