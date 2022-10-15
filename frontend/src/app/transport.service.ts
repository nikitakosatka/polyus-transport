import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-config.module';
import { deserializeTransport, NetworkTransport } from './models/transport';
import { forkJoin, map } from 'rxjs';
import { TransportTypesService } from './transport-types.service';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly transportTypesService: TransportTypesService
  ) {}

  getAll() {
    return forkJoin([
      this.httpClient.get<NetworkTransport[]>(
        `${this.apiBaseUrl}/transport/all`
      ),
      this.transportTypesService.get(),
    ]).pipe(
      map(([transports, transportTypes]) =>
        transports.map(t => deserializeTransport(t, transportTypes))
      )
    );
  }
}
