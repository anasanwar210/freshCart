import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { IBrandResponse } from '../../interfaces/brands';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(): Observable<IBrandResponse> {
    return this._HttpClient.get<IBrandResponse>(
      `${environment.baseURL}/api/v1/brands`
    );
  }
}
