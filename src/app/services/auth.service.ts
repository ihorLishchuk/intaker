import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

type LoginBody = { email: string; password: string };
type LoginResp = { access_token: string; token_type: 'Bearer'; expires_in: string };

const TOKEN_KEY = 'access_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #http = inject(HttpClient);
  #base = environment.apiBase;

  // TODO: Replace it with real auth dialog
  constructor() {
    if (!this.token) {
      this.login({ email: 'demo@example.com', password: 'demo12345' }).subscribe();
    }
  }

  login(body: LoginBody) {
    return this.#http.post<LoginResp>(`${this.#base}/auth/login`, body)
      .pipe(tap(res => localStorage.setItem(TOKEN_KEY, res.access_token)));
  }

  get token(): string | null { return localStorage.getItem(TOKEN_KEY); }

  logout() { localStorage.removeItem(TOKEN_KEY); }
}
