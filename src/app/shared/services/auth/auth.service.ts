import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiFailResponse,
  ApiSuccessResponse,
  signInData,
  signUpData,
} from '../../interfaces/data';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(data: signUpData): Observable<ApiFailResponse | ApiSuccessResponse> {
    return this.http.post<ApiFailResponse | ApiSuccessResponse>(
      `${environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }

  signin(data: signInData): Observable<any> {
    return this.http.post<ApiFailResponse | ApiSuccessResponse>(
      `${environment.baseURL}/api/v1/auth/signin`,
      data
    );
  }
}
