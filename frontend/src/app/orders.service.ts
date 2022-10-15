import { Inject, Injectable } from '@angular/core';
import {
  deserializeOrder,
  NetworkOrder,
  Order,
  serializeOrder,
} from './models/order';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-config.module';
import { forkJoin, map, Observable } from 'rxjs';
import { TransportTypesService } from './transport-types.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly transportTypesService: TransportTypesService
  ) {}

  getAll(): Observable<Order[]> {
    return forkJoin([
      this.httpClient.get<NetworkOrder[]>(`${this.apiBaseUrl}/order/all`),
      this.transportTypesService.get(),
    ]).pipe(
      map(([orders, transportTypes]) => {
        return orders.map(o => deserializeOrder(o, transportTypes));
      })
    );
  }

  create(order: Order) {
    return this.httpClient
      .post(`${this.apiBaseUrl}/order/create`, serializeOrder(order))
      .pipe(map(() => {}));
  }
}
