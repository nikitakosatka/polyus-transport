import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../models/order';
import { AuthService, UserRole } from '../auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() orders: Order[] = [];
  @Output() orderEdit = new EventEmitter<Order>();
  @Output() orderDelete = new EventEmitter<Order>();

  readonly shouldShowEditButton$ = this.authService.role$.pipe(
    map(role => role === UserRole.Dispatcher)
  );

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  editOrder(order: Order) {
    this.orderEdit.emit(order);
  }

  deleteOrder(order: Order) {
    const ans = confirm(`Вы точно хотите отозвать заявку "${order.title}"?`);
    if (ans) {
      this.orderDelete.emit(order);
    }
  }
}
