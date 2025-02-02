import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  IFailSignInResponse,
  IFailSignUpResponse,
  ISignInData,
  ISignUpData,
  ISuccessSignInResponse,
  ISuccessSignUpResponse,
} from './../../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<null | JwtPayload> =
    new BehaviorSubject<null | JwtPayload>(null);
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) id: object,
    private _Router: Router
  ) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('token') != null) {
        this.verifyToken().subscribe({
          next: () => {
            this.tokenDecoded();
          },
          error: () => {
            this.logout();
          },
        });

        this.tokenDecoded();
      }
    }
  }
  signup(
    data: ISignUpData
  ): Observable<IFailSignUpResponse | ISuccessSignUpResponse> {
    return this.http.post<IFailSignUpResponse | ISuccessSignUpResponse>(
      `${environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }

  signin(
    data: ISignInData
  ): Observable<IFailSignInResponse | ISuccessSignInResponse> {
    return this.http.post<IFailSignInResponse | ISuccessSignInResponse>(
      `${environment.baseURL}/api/v1/auth/signin`,
      data
    );
  }

  // Other methods for authentication and authorization
  tokenDecoded(): void {
    const token = localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
  }

  logout() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this._Router.navigate(['/signin']);
  }

  verifyToken(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${environment.baseURL}/api/v1/auth/verifyToken`, {
      headers: { token: token },
    });
  }
}
