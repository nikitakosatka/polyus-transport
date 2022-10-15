import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransportType } from './models/transport-type';
import { API_BASE_URL } from './api-config.module';

@Injectable({
  providedIn: 'root',
})
export class TransportTypesService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string
  ) {}

  get(): Observable<TransportType[]> {
    return this.httpClient.get<TransportType[]>(
      `${this.apiBaseUrl}/transport_type/all`
    );
  }
}
