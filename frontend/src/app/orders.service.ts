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
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
    private readonly transportTypesService: TransportTypesService,
    private readonly authService: AuthService
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

  getMine(): Observable<Order[]> {
    return this.getAll().pipe(
      map(orders =>
        orders.filter(o => o.customerId === this.authService.userId)
      )
    );
  }

  create(order: Order) {
    return this.httpClient
      .post(
        `${this.apiBaseUrl}/order/create`,
        serializeOrder(order, this.authService.userId!)
      )
      .pipe(map(() => {}));
  }

  delete(order: Order) {
    return this.httpClient
      .delete(`${this.apiBaseUrl}/order/${order.id}`)
      .subscribe(() => {
        window.location.reload();
      });
  }
}
