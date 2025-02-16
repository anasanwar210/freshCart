import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  IChangePassword,
  IChangePasswordData,
  IChangePasswordResponse,
  IFailSignInResponse,
  IFailSignUpResponse,
  IForgottenPasswordData,
  IForgottenPasswordResponse,
  ISignInData,
  ISignUpData,
  ISubmitCodeData,
  ISubmitCodeResponse,
  ISuccessSignInResponse,
  ISuccessSignUpResponse,
} from './../../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<null | JwtPayload> =
    new BehaviorSubject<null | JwtPayload>(null);

  userId!: string;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) id: object,
    private _Router: Router
  ) {
    if (isPlatformBrowser(id)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.tokenDecoded();
        this.verifyToken().subscribe({
          next: () => {
            this.tokenDecoded();
          },
          error: () => {
            if (token) {
              this.verifyToken();
              this.tokenDecoded();
            } else {
              this.logout();
            }
          },
        });
      }
    }
  }
  /*
  ===============================================================
  -----------------------Start SignUp Method
  ===============================================================
  */

  signup(
    data: ISignUpData
  ): Observable<IFailSignUpResponse | ISuccessSignUpResponse> {
    return this.http.post<IFailSignUpResponse | ISuccessSignUpResponse>(
      `${environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }

  /*
  ===============================================================
  -----------------------Start SignIn Method
  ===============================================================
  */

  signin(
    data: ISignInData
  ): Observable<IFailSignInResponse | ISuccessSignInResponse> {
    return this.http.post<IFailSignInResponse | ISuccessSignInResponse>(
      `${environment.baseURL}/api/v1/auth/signin`,
      data
    );
  }

  /*
  ===============================================================
  -----------------------Start LogOut Method
  ===============================================================
  */
  logout() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this._Router.navigate(['/signin']);
  }

  /*
  ===============================================================
  ----------------Start Forget Password Method
  ===============================================================
  */

  forgetPassword(
    data: IForgottenPasswordData
  ): Observable<IForgottenPasswordResponse> {
    return this.http.post<IForgottenPasswordResponse>(
      `${environment.baseURL}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  // Other methods for authentication and authorization
  tokenDecoded(): void {
    const token = localStorage.getItem('token') || '';
    const decoded: any = jwtDecode(token);
    this.userData.next(decoded);
    this.userId = decoded.id;
  }

  verifyToken(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${environment.baseURL}/api/v1/auth/verifyToken`, {
      headers: { token: token },
    });
  }

  resetCode(data: ISubmitCodeData): Observable<ISubmitCodeResponse> {
    return this.http.post<ISubmitCodeResponse>(
      `${environment.baseURL}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  newPassword(data: IChangePasswordData): Observable<IChangePasswordResponse> {
    return this.http.put<IChangePasswordResponse>(
      `${environment.baseURL}/api/v1/auth/resetPassword`,
      data
    );
  }

  changeCurrentPassword(
    curPass: string,
    newPass: string,
    reNewPass: string
  ): Observable<IChangePassword> {
    const body = {
      currentPassword: curPass,
      password: newPass,
      rePassword: reNewPass,
    };

    return this.http.put<IChangePassword>(
      `${environment.baseURL}/api/v1/users/changeMyPassword`,
      body,
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }
}
