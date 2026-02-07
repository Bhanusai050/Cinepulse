import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userKey = 'cinepulse_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }

  private persistUser(user: User | null) {
    try {
      if (user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.userKey);
      }
    } catch {}
  }

  signIn(email: string, password: string): Observable<User> {
    // Mock sign-in: accept any non-empty email/password and return a fake user
    const user: User = {
      id: 'u_' + Math.random().toString(36).slice(2, 9),
      name: email.split('@')[0],
      email
    };
    this.currentUserSubject.next(user);
    this.persistUser(user);
    return of(user);
  }

  signOut() {
    this.currentUserSubject.next(null);
    this.persistUser(null);
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
