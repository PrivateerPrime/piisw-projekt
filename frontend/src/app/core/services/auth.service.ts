import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from "../models/user";

const AUTH_API = 'http://localhost:8080/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = localStorage.getItem('token');
  sub: string = this.token ? this.jwtService.decodeToken(this.token).sub : '';
  private messageSource = new BehaviorSubject(this.sub);
  currentMessage$ = this.messageSource.asObservable();
  public urlRedirect: string | undefined;

  sendMessage(message: string) {
    this.messageSource.next(message);
  }
  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}

  // Na ten moment prosty system autentykacji (sprawdzenie czy token jest expired)
  // W przyszłości - zapytanie do bazy danych czy użytkownik x ma taki token
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtService.isTokenExpired(token);
  }

  public getUser(): Observable<User>{
    return this.http.get<User>(AUTH_API + 'user')
  }

  public login(
    username: string,
    password: string
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  public register(username: string, password: string) {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        password,
      },
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
}
