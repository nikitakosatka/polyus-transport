import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() orders: Order[] = [];
  @Output() orderDelete = new EventEmitter<Order>();

  constructor() {}

  ngOnInit(): void {}

  deleteOrder(order: Order) {
    const ans = confirm(`Вы точно хотите отозвать заявку "${order.title}"?`);
    if (ans) {
      this.orderDelete.emit(order);
    }
  }
}
