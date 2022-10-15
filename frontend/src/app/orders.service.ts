import { Inject, Injectable } from '@angular/core';
import {
  deserializeOrder,
  NetworkOrder,
  Order,
  serializeOrder,
} from './models/order';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-config.module';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string
  ) {}

  getAll() {
    return this.httpClient
      .get<NetworkOrder[]>(`${this.apiBaseUrl}/order/all`)
      .pipe(map(orders => orders.map(order => deserializeOrder(order))));
  }

  create(order: Order) {
    return this.httpClient
      .post(`${this.apiBaseUrl}/order/create`, serializeOrder(order))
      .pipe(map(() => {}));
  }
}
